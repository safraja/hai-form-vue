import {HaiInputText} from "./hai-input-text-class";
import {HaiInput} from "./hai-input-class";


/**
 *  Class representing a password input.
 * @extends HaiInput
 */
class HaiInputPassword extends HaiInputText
{
    /** @type {null|number} - Minimum entropy (strength) of password.*/
    minEntropy = null;

    /** @type {object} - Required character which password must contain.*/
    requiredCharacters = {
        lowercaseLetter: 0,
        uppercaseLetter: 0,
        number: 0,
        special: 0,
    };

    /** @type {null|number} - Minimum password strength on a scale of 0 (weakest) to 4 (strongest)*/
    minPasswordStrength = null;

    /** @type {null|function} - */
    customPasswordCalcFun = null;


    /** @type {number} - Entropy (strength) of password.*/
    entropy = 0;

    passwordStrength = 0;

    newPassword = false;

    strengthInfoElement = null;

    runningCalc = null;
    nextCalc = null;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'password';
    }

    /** @override */
    async transformElementToHaiInput()
    {
        let name = this.element.name;
        this.element.removeAttribute('name');
        this.element.type = 'password';
        this.element.haiInput = this;

        this.rawValue = this.extractRawValue(this.element.value);
        this.element.value = this.rawValue;
        this.value = this.formatValue(this.rawValue);

        let twin = document.createElement('input');
        twin.name = name;
        twin.type = 'password';
        twin.hidden = true;
        twin.classList.add('hidden');
        twin.value = this.element.value;

        let min = 1;
        let max = 100000000;
        let id = Math.floor(Math.random() * (max - min) + min);
        twin.id = `input-${id}`;

        let inputWrapper = document.createElement('div');
        inputWrapper.classList.add('hai-input-element');

        let label = document.createElement('label');
        let labelDiv = document.createElement('div');
        labelDiv.classList.add('label-text');

        let wrapper = document.createElement('div');
        wrapper.classList.add('input-wrapper');

        if(this.newPassword === true)
        {
            let strengthInfo = document.createElement('div');
            strengthInfo.classList.add('strength-info');

            let strengthInfoText = document.createElement('div');
            strengthInfoText.classList.add('description');

            let strengthMeter = document.createElement('meter');
            strengthMeter.classList.add('meter');
            strengthMeter.min = 0;
            strengthMeter.max = 5;
            strengthMeter.optimum = 5;
            strengthMeter.low = 3;
            strengthMeter.high = 3;
            strengthMeter.value = 0;

            strengthInfo.append(strengthInfoText, strengthMeter);

            this.strengthInfoElement = strengthInfo;
        }

        let warningDiv = document.createElement('div');
        warningDiv.classList.add('alert');

        inputWrapper.append(label, twin);
        this.element.parentElement.insertBefore(inputWrapper,this.element);
        wrapper.appendChild(this.element);
        label.append(labelDiv, wrapper);

        if(this.strengthInfoElement !== null)
        {
            label.append(this.strengthInfoElement);
        }

        label.append(warningDiv);

        this.twin = twin;
        this.labelElement = labelDiv;
        this.warningElement = warningDiv;

        await this.processAttributes();
        await this.processParameters();

        if(this.placeholder !== null)
        {
            this.element.placeholder = this.placeholder;
        }

        if(this.disabled)
        {
            this.twin.disabled = true;
        }
        if(this.required)
        {
            this.twin.required = true;
        }

        if(this.label !== undefined)
        {
            this.labelElement.textContent = this.label;
        }

        this.element.addEventListener('input', (event) =>
        {
            this.handleInput(event);
        });

        this.element.addEventListener('keydown', (event) =>
        {
            this.handleKeyAction(event);
        });

        this.element.addEventListener('focusout', (event) =>
        {
            this.handleFocusOut(event);
        });
        this.element.addEventListener('wheel', (event) =>
        {
            this.handleWheel(event);
        });


        let form = twin.form;
        if(form !== null)
        {
            form.addEventListener('submit', (event) =>
            {
                let validity = this.checkValidity();
                if(validity.success === false)
                {
                    event.preventDefault();
                    this.updateValidity(validity, this.element);
                    return false;
                }
                return true;
            });
        }
    }

    /** @override */
    processParameters(parameters = null)
    {
        if(parameters === null)
        {
            parameters = this.parameters;
        }

        super.processParameters(parameters);

        if (parameters.newPassword !== undefined)
        {
            this.newPassword = Boolean(parameters.newPassword);
        }

        if (parameters.requiredCharacters !== undefined)
        {
            if(typeof parameters.requiredCharacters !== 'object')
            {
                console.warn('HaiForm: Parameter "requiredCharacters" must by an object.');
            }
            else
            {
                if (parameters.requiredCharacters.lowercaseLetter !== undefined)
                {
                    if(typeof parameters.requiredCharacters.lowercaseLetter !== 'number')
                    {
                        console.warn('HaiForm: Parameter "requiredCharacters.lowercaseLetter" must be a number.');
                    }
                    else
                    {
                        this.requiredCharacters.lowercaseLetter = parameters.requiredCharacters.lowercaseLetter;
                    }
                }
                if (parameters.requiredCharacters.uppercaseLetter !== undefined)
                {
                    if(typeof parameters.requiredCharacters.uppercaseLetter !== 'number')
                    {
                        console.warn('HaiForm: Parameter "requiredCharacters.uppercaseLetter" must be a number.');
                    }
                    else
                    {
                        this.requiredCharacters.uppercaseLetter = parameters.requiredCharacters.uppercaseLetter;
                    }
                }
                if (parameters.requiredCharacters.number !== undefined)
                {
                    if(typeof parameters.requiredCharacters.number !== 'number')
                    {
                        console.warn('HaiForm: Parameter "requiredCharacters.number" must be a number.');
                    }
                    else
                    {
                        this.requiredCharacters.number = parameters.requiredCharacters.number;
                    }
                }
                if (parameters.requiredCharacters.special !== undefined)
                {
                    if(typeof parameters.requiredCharacters.special !== 'number')
                    {
                        console.warn('HaiForm: Parameter "requiredCharacters.special" must be a number.');
                    }
                    else
                    {
                        this.requiredCharacters.special = parameters.requiredCharacters.special;
                    }
                }
            }
        }

        if (parameters.minEntropy !== undefined)
        {
            if(typeof parameters.minEntropy !== 'number' || parameters.minEntropy < 0)
            {
                console.warn('HaiForm: Parameter "minEntropy" must be a non negative number.');
            }
            else
            {
                this.minEntropy = parameters.minEntropy;
            }
        }

        if (parameters.minPasswordStrength !== undefined)
        {
            if(typeof parameters.minPasswordStrength !== 'number' || parameters.minPasswordStrength < 0 ||
                parameters.minPasswordStrength > 4)
            {
                console.warn('HaiForm: Parameter "minEntropy" must be a number from 0 to 4 including.');
            }
            else
            {
                this.minPasswordStrength = parameters.minPasswordStrength;
            }
        }

        if (parameters.customPasswordCalcFun !== undefined)
        {
            if(typeof parameters.customPasswordCalcFun !== 'function')
            {
                console.warn('HaiForm: Parameter "customPasswordCalcFun" must be a function.');
            }
            else
            {
                this.customPasswordCalcFun = parameters.customPasswordCalcFun;
            }
        }


        if(this.minEntropy > 0 || this.requiredCharacters.lowercaseLetter > 0 ||
            this.requiredCharacters.uppercaseLetter > 0 || this.requiredCharacters.number > 0 ||
            this.requiredCharacters.special > 0 || this.minPasswordStrength > 0)
        {   // Set Hai Input as required if this is implied by other parameters.
            this.required = true;
        }
    }

    /** @override */
    handleInput(event)
    {
        if(this.readonly || this.disabled)
        {
            event.target.value = this.value;
            return {success: false};
        }
        let value = event.target.value;

        if(this.mask != null)
        {
            value = this.formatValueByMask(value);
        }

        this.value = value;
        this.rawValue = value;
        event.target.value = value;

        if(this.newPassword === true)
        {
            this.entropy = this.calcPasswordEntropy(value);

            let checkStrength = async () =>
            {
                let strength =  this.checkPasswordStrength();
                this.passwordStrength = strength;
                this.updateStrengthInfo(strength);

                if(this.nextCalc != null)
                {
                    this.runningCalc = async () =>
                    {
                        let help = this.nextCalc;
                        window.setTimeout(help, 20);
                    }
                    this.runningCalc();
                    this.nextCalc = null;
                }
                else
                {
                    this.runningCalc = null;
                }
            };

            if(this.runningCalc == null)
            {
                this.runningCalc = async () =>
                {
                    window.setTimeout(checkStrength, 20);
                }

                this.runningCalc();
            }
            else
            {
                this.nextCalc = checkStrength;
            }
        }

        this.saveValueToTwin();
        return {success: true};
    }

    calcPasswordEntropy(password = null)
    {
        if(password === null)
        {
            password = this.value;
        }

        let entropy = 0;

        if(password.length > 0)
        {
            let poolSize = 0;

            if(/[0-9]/.test(password))
            {
                poolSize += 10;
            }

            if(/[a-z]/.test(password))
            {
                poolSize += 26;
            }

            if(/[A-Z]/.test(password))
            {
                poolSize += 26;
            }

            if(/[^a-zA-Z0-9]/.test(password))
            {   // Special keyboard characters.
                poolSize += 32;
            }

            entropy = Math.floor(password.length * Math.log2(poolSize));
        }

        return entropy;
    }

    checkPasswordStrength()
    {
        let passwordStrength;

        if(this.customPasswordCalcFun !== null)
        {
            if(typeof this.customPasswordCalcFun === 'function')
            {
                return this.customPasswordCalcFun(this.value);
            }
            else
            {
                console.warn('HaiForm: attribute customFunction must be a function, reverting back to default.');
            }
        }

        if(this.entropy < 28)
        {
            passwordStrength = 0;
        }
        else if (this.entropy < 36)
        {
            passwordStrength = 1;
        }
        else if (this.entropy < 60)
        {
            passwordStrength = 2;
        }
        else if (this.entropy < 128)
        {
            passwordStrength = 3;
        }
        else
        {
            passwordStrength = 4;
        }
        
        return passwordStrength;
    }

    /** @override */
    checkValidity()
    {
        let superValidity = super.checkValidity();

        if(superValidity.success === false)
        {
            return superValidity;
        }

        if(this.newPassword === false)
        {
            return {success: true};
        }

        if(this.requiredCharacters.lowercaseLetter > this.countOccurrences(this.value, /[a-z]/g))
        {
            return {success: false, message: HaiInput.dictionary['min-lowercase-letters']
                    .replace('{{lowercaseLetter}}', this.requiredCharacters.lowercaseLetter)};
        }
        if(this.requiredCharacters.uppercaseLetter > this.countOccurrences(this.value, /[A-Z]/g))
        {
            return {success: false, message: HaiInput.dictionary['min-lowercase-letters']
                    .replace('{{uppercaseLetter}}', this.requiredCharacters.uppercaseLetter)};
        }
        if(this.requiredCharacters.number > this.countOccurrences(this.value, /[0-9]/g))
        {
            return {success: false, message: HaiInput.dictionary['min-numbers']
                    .replace('{{number}}', this.requiredCharacters.number)};
        }
        if(this.requiredCharacters.special > this.countOccurrences(this.value, /[^a-zA-Z0-9]/g))
        {
            return {success: false, message: HaiInput.dictionary['min-special-characters']
                    .replace('{{special}}', this.requiredCharacters.special)};
        }

        if(this.minEntropy != null)
        {
            this.entropy = this.calcPasswordEntropy();
            if (this.entropy < this.minEntropy)
            {
                return {success: false, message: HaiInput.dictionary['weak-password']};
            }
        }

        if(this.minPasswordStrength != null)
        {
            this.entropy = this.calcPasswordEntropy();
            this.passwordStrength = this.checkPasswordStrength();

            if (this.passwordStrength < this.minPasswordStrength)
            {
                return {success: false, message: HaiInput.dictionary['weak-password']};
            }
        }

        return {success: true};
    }

    updateStrengthInfo(passwordStrength = null)
    {
        if(passwordStrength === null)
        {
            passwordStrength = this.passwordStrength;
        }

        let description;
        let titles = ['Very weak', 'Weak', 'Reasonable', 'Strong', 'Very strong'];

        description = titles[passwordStrength];

        this.strengthInfoElement.querySelector('.description').textContent = description;

        if(this.value !== '')
        {
            this.strengthInfoElement.querySelector('.meter').value = passwordStrength + 1;  // Must by increased by one to empty meter in case of empty password.
        }
        else
        {
            this.strengthInfoElement.querySelector('.meter').value = 0;
        }
    }

    countOccurrences(string, regExp)
    {
        let regMatchResult = string.match(regExp);
        if(regMatchResult === null)
        {
            return 0;
        }

        return regMatchResult.length
    }
}

export {HaiInputPassword};