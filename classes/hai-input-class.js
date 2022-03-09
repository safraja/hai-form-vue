class HaiInput
{
    /** @type {string} - Type of input.*/
    type;
    /** @type {string} - Real value of input, may be formatted.*/
    value;
    /** @type {string | number} - Raw value of input (without formatting).*/
    rawValue;
    /** @type {HTMLInputElement} - Input element on which wa HaiInput initiated.*/
    element;
    /** @type {HTMLInputElement} - Associated input, which should be send with submit and which always copy value of original element.*/
    twin;
    /** @type {Object} - Object containing parameters.*/
    parameters;
    /** @type {boolean} - If validity warnings should be displayed to the user.*/
    displayValidityWarnings = true;
    /** @type {string} - Label, which should by generated for the input.*/
    label;
    /** @type {HTMLElement} - Generated input label element.*/
    labelElement;
    /** @type {HTMLElement} - Generated element which should display validity and other warnings.*/
    warningElement;
    /** @type {boolean} - Indicates, if user must specify a value.*/
    required;

    constructor(element = null, parameters = {})
    {
        this.element = element;
        this.parameters = parameters;
    }

    static async create(type, element, parameters)
    {
        switch (type)
        {
            case 'text':
                return await import('./hai-input-text-class.js')
                    .then((module) =>
                    {
                        let haiInput = new module.HaiInputText(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'number':
                return await import('./hai-input-number-class.js')
                    .then((module) =>
                    {
                        let haiInput = new module.HaiInputNumber(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'url':
                return await import('./hai-input-url-class.js')
                    .then((module) =>
                    {
                        let haiInput = new module.HaiInputUrl(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'switch':
                return await import('./hai-input-switch-class.js')
                    .then((module) =>
                    {
                        let haiInput = new module.HaiInputSwitch(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'select':
                return await import('./hai-input-select-class.js')
                    .then((module) =>
                    {
                        let haiInput = new module.HaiInputSelect(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'file':
                return await import('./hai-input-file-class.js')
                    .then((module) =>
                    {
                        let haiInput = new module.HaiInputFile(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });
        }
    }

    saveValueToTwin()
    {
        this.twin.value = this.value;
    }

    async transformElementToHaiInput()
    {
        let name = this.element.name;
        //this.element.name = `hai-form[${name}]`;
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

    processParameters(parameters = null)
    {
        if(parameters === null)
        {
            parameters = this.parameters;
        }

        if (parameters.label !== undefined)
        {
            if(typeof parameters.label !== 'string')
            {
                console.warn(`HaiForm: Parameter "label" must be a string.`);
            }
            else
            {
                this.label = parameters.label;
            }
        }

        if(parameters.displayValidityWarnings !== undefined)
        {
            this.displayValidityWarnings = Boolean(parameters.displayValidityWarnings);
        }
    }

    async processAttributes()
    {
        await this.processDataAttributes();
    }

    async processDataAttributes()
    {
        let attributes = this.element.attributes;
        let dataAttributes = {};

        for (let attribute of attributes)
        {
            if(attribute.name.startsWith('data-') === false)
            {
                continue;
            }

            let camelize = s => s.replace(/-./g, x=>x[1].toUpperCase());

            let name = camelize(attribute.name.substring(5));

            dataAttributes[name] = attribute.nodeValue;
        }

        await this.processParameters(dataAttributes);
    }

    handleInput(event)
    {
        this.saveValueToTwin();
        return {success: true};
    }

    verifyEnterKey(event)
    {
        if(event.keyCode === 13 || event.code === 'Enter' || event.code === 'NumpadEnter')    // Mobile code for "Enter".
        {
            event.preventDefault();
            this.twin.form.submit();
            return true;
        }
        return false;
    }

    handleKeyAction(event)
    {
        let submit = this.verifyEnterKey(event);
    }

    checkValidity()
    {
        if(this.required === true && this.rawValue === '')
        {
            return {success: false, message: `Please specify a value.`};
        }

        return {success: true};
    }

    handleFocusOut(event)
    {
        let validity = this.checkValidity();
        if(validity.success === false)
        {
            event.target.classList.add('invalid');
            event.target.setCustomValidity(validity.message);
            if(this.displayValidityWarnings === true && this.warningElement !== undefined)
            {
                this.warningElement.textContent = validity.message;
            }
        }
        else
        {
            event.target.classList.remove('invalid');
            event.target.setCustomValidity('');
            if(this.warningElement !== undefined)
            {
                this.warningElement.textContent = '';
            }
        }
    }

    handleWheel(event)
    {

    }

    extractRawValue(formatedValue = null)
    {
        if(formatedValue === null)
        {
            return this.value;
        }
        return formatedValue;
    }

    formatValue(rawValue = null)
    {
        if(rawValue === null)
        {
            return this.rawValue;
        }
        return rawValue;
    }
}

export {HaiInput};