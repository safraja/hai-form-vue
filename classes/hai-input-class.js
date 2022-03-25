/** Class representing a form field. */
class HaiInput
{
    /** @type {string} - Type of input.*/
    type;
    /** @type {string} - Real value of input, may be formatted.*/
    value;
    /** @type {string | number} - Raw value of input (without formatting).*/
    rawValue;
    /** @type {HTMLInputElement|HTMLElement} - Input element on which was HaiInput initiated.*/
    element;
    /** @type {HTMLInputElement|HTMLElement} - Associated input, which should be send with submit and which always copy value of original element.*/
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

    /**
     * Create HaiInput.
     *
     * @param {HTMLElement} element - The element over which the HaiInput is to be created.
     * @param {object} parameters - Parameters determining the properties of the field.
     */
    constructor(element = null, parameters = {})
    {
        this.element = element;
        this.parameters = parameters;
    }

    /**
     * Creates and returns a new instance of the HaiInput class based on the specified field type.
     *
     * @param {string} type - Form field type.
     * @param {HTMLElement} element - The element over which the HaiInput is to be created.
     * @param {object} parameters - Parameters determining the properties of the field.
     * @returns {Promise<HaiInput>} - Promise with a new instance of the HaiInput class.
     */
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

    /**
     * Transfers the field value to the associated hidden field (twin).
     */
    saveValueToTwin()
    {
        this.twin.value = this.value;
    }

    /**
     * Transforms the HTML structure of the field.
     *
     * @returns {Promise<void>}
     */
    async transformElementToHaiInput()
    {

    }

    /**
     * Processes the given parameters and, if they are valid, stores them in the HaiInput class.
     *
     * @param {object} parameters - Parameters to be processed.
     */
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

    /**
     * Processes the HTML attributes of the original element over which the HaiInput class is created.
     *
     * @returns {Promise<void>}
     */
    async processAttributes()
    {
        await this.processDataAttributes();
    }

    /**
     * Processes the HTML data attributes of the original element over which the HaiInput class is created.
     *
     * @returns {Promise<void>}
     */
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

    /**
     * Handles the input event in the field.
     *
     * @param {Event} event
     * @returns {{success: boolean}} - Object with information about the input success.
     */
    handleInput(event)
    {
        this.saveValueToTwin();
        return {success: true};
    }

    /**
     * Verifies that the key clicked was Enter, if so, submits the form.
     *
     * @param {KeyboardEvent} event
     * @returns {boolean} - True, if Enter was clicked, false otherwise.
     */
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

    /**
     * Processes a key click.
     *
     * @param event
     */
    handleKeyAction(event)
    {
        this.verifyEnterKey(event);
    }

    /**
     * Verifies the validity of the field value.
     *
     * @returns {{success: boolean, message: string}|{success: boolean}} - Object with information about the result of the validity test. In case of a negative result, it also returns an error message.
     */
    checkValidity()
    {
        if(this.required === true && this.rawValue === '')
        {
            return {success: false, message: `Please specify a value.`};
        }

        return {success: true};
    }

    /**
     * Processes a focus out event.
     *
     * @param event
     */
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

    /**
     * Handles mouse wheel scrolling.
     *
     * @param event
     */
    handleWheel(event)
    {

    }

    /**
     * Extracts the raw value from its formatted form.
     *
     * @param {string|number|null} formattedValue - Formatted field value.
     * @returns {string|null} - Extracted raw value.
     */
    extractRawValue(formattedValue = null)
    {
        if(formattedValue === null)
        {
            return this.value;
        }
        return formattedValue;
    }

    /**
     * Transforms the value into a formatted form.
     *
     * @param {string|number|null} rawValue - The value to be formatted.
     * @returns {string|number|null} - Formatted value.
     */
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