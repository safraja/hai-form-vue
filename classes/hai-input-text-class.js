import {HaiInput} from './hai-input-class.js';

/**
 *  Class representing a text input.
 * @extends HaiInput
 */
class HaiInputText extends HaiInput
{
    /** @type {string|null} - Maximum length of text in the field.*/
    maxLength = null;
    /** @type {string|null} - Minimum length of text in the field.*/
    minLength = null;
    /** @type {string|null} - Mask for the field content.*/
    mask = null;
    /** @type {object|null} - Object defining the meaning of tokens used in the mask.*/
    maskTokens = null;
    /** @type {string|null} - The text of the placeholder for the field.*/
    placeholder = null;
    /** @type {boolean} - Current field validity status.*/
    validByMask;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'text';
    }

    /** @override */
    async transformElementToHaiInput()
    {
        let name = this.element.name;
        this.element.removeAttribute('name');
        this.element.type = 'text';
        this.element.haiInput = this;

        this.rawValue = this.extractRawValue(this.element.value);
        this.element.value = this.rawValue;
        this.value = this.formatValue(this.rawValue);

        let twin = document.createElement('input');
        twin.name = name;
        twin.type = 'text';
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

        let warningDiv = document.createElement('div');
        warningDiv.classList.add('alert');

        inputWrapper.append(label, twin);
        this.element.parentElement.insertBefore(inputWrapper,this.element);
        wrapper.appendChild(this.element);
        label.append(labelDiv, wrapper, warningDiv);

        this.twin = twin;
        this.labelElement = labelDiv;
        this.warningElement = warningDiv;

        await this.processAttributes();
        await this.processParameters();

        if(this.placeholder !== null)
        {
            this.element.placeholder = this.placeholder;
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
    }

    /** @override */
    processParameters(parameters = null)
    {
        if(parameters === null)
        {
            parameters = this.parameters;
        }

        super.processParameters(parameters);

        if (parameters.placeholder !== undefined)
        {
            if(typeof parameters.placeholder !== 'string')
            {
                console.warn(`HaiForm: Parameter "placeholder" must be a string.`);
            }
            else
            {
                this.placeholder = parameters.placeholder;
            }
        }

        if (parameters.mask !== undefined)
        {
            if(typeof parameters.mask !== 'string')
            {
                console.warn(`HaiForm: Parameter "mask" must be a string.`);
            }
            else
            {
                this.mask = parameters.mask;
            }
        }

        if(parameters.maxLength !== undefined)
        {
            if(isNaN(parameters.maxLength) === true)
            {
                console.warn(`HaiForm: Parameter "maxLength" must be a number, reverting back to null.`);
            }
            else
            {
                this.maxLength = parameters.maxLength;
            }
        }

        if(parameters.minLength !== undefined)
        {
            if(isNaN(parameters.minLength) === true)
            {
                console.warn(`HaiForm: Parameter "minLength" must be a number, reverting back to null.`);
            }
            else
            {
                this.minLength = parameters.minLength;
            }
        }

        if(parameters.maskTokens !== undefined)
        {
            if(typeof parameters.maskTokens !== 'object')
            {
                console.warn(`HaiForm: Parameter "maskTokens" must be an object, reverting back to null.`);
            }
            else
            {
                this.maskTokens = parameters.maskTokens;
            }
        }
    }

    /** @override */
    handleInput(event)
    {
        let value = event.target.value;

        if(this.mask != null)
        {
            value = this.formatValueByMask(value);
        }

        this.value = value;
        this.rawValue = value;
        event.target.value = value;
        this.saveValueToTwin();
        return {success: true};
    }

    /**
     * Formats the text (value) of the field based on the specified mask. It also checks validity and prevents
     * characters from being written if they do not match the mask.
     *
     * @param {string|null} value - The value to be formatted.
     * @param {string|null} mask - Mask by which the value is to be formatted.
     * @returns {string} - The processed part of the text corresponding to the mask.
     */
    formatValueByMask(value = null, mask = null)
    {
        if (value === null)
        {
            value = this.value;
        }

        if (mask === null)
        {
            mask = this.mask;
        }

        let tokens;

        if (this.maskTokens !== null)
        {
            tokens = this.maskTokens;
        }
        else
        {
            tokens =
            {
                '0': {pattern: /\d/},
                'A': {pattern: /[a-zA-Z0-9]/},
                'S': {pattern: /[a-zA-Z]/},
                '!': {escape: true},
                // 'X': {pattern: /[a-zA-Z0-9]/, transform: (char) => char.toUpperCase()}, // Example of transform function.
            };
        }


        let valuePosition = 0;
        let maskPosition = 0;
        let valid = true;
        let stringToPrepend = '';
        let escapeMaskChar = false;
        let formattedValue = '';

        while(valuePosition < value.length && maskPosition < mask.length)
        {
            let char = value[valuePosition];
            let maskChar = mask[maskPosition];

            let token = tokens[maskChar];

            if(token === undefined || escapeMaskChar === true)
            {   // Did the user tried to write fixed character?
                escapeMaskChar = false;
                if(String(maskChar) === char)
                {   // If yes, add this character like normal.
                    formattedValue += stringToPrepend;
                    stringToPrepend = '';
                    formattedValue += char;
                    maskPosition++;
                    valuePosition++;
                    continue;
                }

                // Else, test if he did not try to write the next character.
                //token = tokens[mask[maskPosition + 1]]
                stringToPrepend += maskChar;
                maskPosition++;
                continue;
            }
            else
            {
                if(token.escape === true)
                {
                    escapeMaskChar = true;
                    maskPosition++;
                    continue;
                }

                let validityResult = token.pattern.test(char)

                if(validityResult === false)
                {
                    valid = false;
                    break;
                }

                formattedValue += stringToPrepend;
                stringToPrepend = '';

                if(token.transform !== undefined)
                {
                    char = token.transform(char);
                }
                formattedValue += char;
            }

            maskPosition++;
            valuePosition++;
        }

        if(maskPosition < mask.length)
        {
            valid = false;
        }

        this.validByMask = valid;

        return formattedValue;
    }

    /** @override */
    checkValidity()
    {
        let superValidity = super.checkValidity();

        if(superValidity.success === false)
        {
            return superValidity.success;
        }

        if(this.maxLength != null && this.value.length > this.maxLength)
        {
            return {success: false, message: `Text length must be shorter or same as ${this.maxLength}`};
        }

        if(this.minLength != null && this.value.length < this.minLength)
        {
            return {success: false, message: `Text length must be longer or same as ${this.minLength}`};
        }

        if(this.mask != null && this.rawValue !== '' && this.validByMask === false)
        {
            return {success: false, message: `Inserted value does not match the mask.`};
        }

        return {success: true};
    }
}

export {HaiInputText};