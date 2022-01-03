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

    constructor(element = null, parameters = {})
    {
        this.element = element;
    }

    static async returnCorrectClass(type, element, parameters)
    {
        switch (type)
        {
            case 'text':
                return await import('./hai-input-text-class.js')
                    .then((module) => {
                        let haiInput = new module.HaiInputText(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'number':
                return await import('./hai-input-number-class.js')
                    .then((module) => {
                        let haiInput = new module.HaiInputNumber(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'url':
                return await import('./hai-input-url-class.js')
                    .then((module) => {
                        let haiInput = new module.HaiInputUrl(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });

            case 'switch':
                return await import('./hai-input-switch-class.js')
                    .then((module) => {
                        let haiInput = new module.HaiInputSwitch(element, parameters);
                        haiInput.transformElementToHaiInput();
                        return haiInput;
                    });
        }
    }

    saveValueToTwin()
    {
        this.twin.value = this.value;
    }

    transformElementToHaiInput()
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
        twin.type = 'hidden';
        twin.value = this.element.value;

        let min = 1;
        let max = 100000000;
        let id = Math.floor(Math.random() * (max - min) + min);
        twin.id = `input-${id}`;

        this.element.parentElement.appendChild(twin);

        this.twin = twin;


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

    handleInput(event)
    {
        this.saveValueToTwin();
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
        return {success: true};
    }

    handleFocusOut(event)
    {

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