import {HaiInput} from './hai-input-class.js';

/**
 *  Class representing a switch.
 * @extends HaiInput
 */
class HaiInputSwitch extends HaiInput
{
    /** @type {array|null} - Switchable options.*/
    options = ['', 'on'];
    /** @type {string} - Switch variant (can be 'on/off' or 'multiple').*/
    variant = 'on/off';
    /** @type {string|null} - In the on/off variant, it specifies which value is taken as ON. (If null is specified, the second option in the field is taken as ON.).*/
    optionOnValue = null;

    /** @type {array} - Inner radio inputs.*/
    inputs = [];

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'switch';
    }

    /** @override */
    async transformElementToHaiInput()
    {
        let name = this.element.name;
        this.value = this.element.value;
        this.rawValue = this.value;

        let twin = document.createElement('input');

        if (name !== undefined)
        {
            this.element.removeAttribute('name');
            twin.name = name;
        }

        twin.type = 'text';
        twin.hidden = true;
        twin.classList.add('hidden');
        twin.value = this.rawValue;

        await this.processAttributes();
        await this.processParameters();
        this.convertOptionsToObjectArray();

        if(this.disabled)
        {
            twin.disabled = true;
        }

        if(this.options.length < 2)
        {
            console.error('There must be at least 2 options specified.');
            return;
        }

        if (this.variant === 'on/off')
        {
            if(this.options.length > 2)
            {
                this.variant = 'multiple';
                console.warn('Variant "on/off" is not usable with more then 2 specified ' +
                    'options, reverting to "multiple" variant.');
            }
            else if(this.optionOnValue === null)
            {
                this.optionOnValue = this.options[this.options.length - 1].value;
            }
            else if(this.options[0].value === this.optionOnValue)
            {
                this.options = this.options.reverse();
            }
        }

        let inputWrapper = document.createElement('div');
        inputWrapper.classList.add('hai-input-element');
        inputWrapper.classList.add('switch');

        let labelDiv = document.createElement('div');
        labelDiv.classList.add('label-text');

        let warningDiv = document.createElement('div');
        warningDiv.classList.add('alert');

        let wrapper = document.createElement('div');
        wrapper.classList.add('switch-wrapper');
        if(this.variant === 'on/off')
        {
            wrapper.setAttribute('data-variant', 'on/off');
            if (this.optionOnValue !== null && this.rawValue === String(this.optionOnValue))
            {
                wrapper.setAttribute('data-state', 'on');
            }
            else
            {
                wrapper.setAttribute('data-state', 'off');
            }
        }

        if(this.disabled === true || this.readonly === true)
        {
            wrapper.classList.add('inactive');
        }

        let optionGroup = document.createElement('div');
        optionGroup.classList.add('option-group');

        wrapper.appendChild(optionGroup);

        if(this.variant === 'on/off')
        {
            let toogle = document.createElement('span');
            toogle.classList.add('toggle');
            optionGroup.appendChild(toogle);
        }

        for(let option of this.options)
        {
            let label = document.createElement('label');
            label.classList.add('option');

            let optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.value = option.value;

            this.inputs.push(optionInput);

            if(this.value === option.value)
            {
                optionInput.checked = true;
                if(this.variant === 'multiple')
                {
                    label.classList.add('selected');
                }
            }

            let spanElement = document.createElement('span');

            if(option.label !== null)
            {
                spanElement.textContent = option.label;
            }

            label.append(optionInput, spanElement);
            optionGroup.appendChild(label);
        }

        inputWrapper.append(labelDiv, wrapper, warningDiv);
        this.element.after(inputWrapper);
        this.element.remove();
        this.element = wrapper;


        this.element.haiInput = this;

        let min = 1;
        let max = 100000000;
        let id = Math.floor(Math.random() * (max - min) + min);
        twin.id = `input-${id}`;

        this.element.parentElement.appendChild(twin);

        this.twin = twin;
        this.labelElement = labelDiv;
        this.warningElement = warningDiv;
        if(this.label !== undefined)
        {
            this.labelElement.textContent = this.label;
        }

        this.element.querySelector('.option-group').addEventListener('click', (event) =>
        {
            this.handleInput(event);
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

        if(parameters.optionOnValue !== undefined)
        {
            if (typeof parameters.optionOnValue !== 'string')
            {
                console.warn('HaiForm: Parameter "optionOnValue" must by a string containing value of one of options.');
            }
            else
            {
                this.optionOnValue = parameters.optionOnValue;
            }
        }

        if(parameters.list !== undefined)
        {
            if(typeof parameters.list !== 'string')
            {
                console.warn('HaiForm: List parameter must by a string.');
            }
            else
            {
                let datalist = document.getElementById(parameters.list);
                if(datalist === null)
                {
                    console.warn(`HaiForm: Datalist with id ${parameters.list} was not found.`);
                }
                else
                {
                    let options = datalist.querySelectorAll('option');
                    this.options = [];

                    for(let option of options)
                    {
                        this.options.push({
                            label: option.textContent,
                            value: option.getAttribute('value')
                        });
                    }
                }
            }
        }

        if (parameters.variant !== undefined)
        {
            if(['on/off', 'multiple'].includes(parameters.variant) === false)
            {
                console.warn('HaiForm: Parameter "variant" can be either "on/off" or "multiple", reverting back to default.');
            }
            else
            {
                this.variant = parameters.variant;
            }
        }

        if (parameters.options !== undefined)
        {
            this.options = parameters.options;
        }
    }

    /**
     * If the options were specified only as an array of values, converts them to an
     * array of objects with value and label (which remains undefined).
     */
    convertOptionsToObjectArray()
    {
        let originalOptions = this.options;
        let convertedOptions = originalOptions;

        if (typeof convertedOptions === 'string')
        {
            convertedOptions = JSON.parse(convertedOptions);
        }

        if(Array.isArray(convertedOptions) && convertedOptions.length > 0 && typeof convertedOptions[0] == 'string')
        {
            let help = [];
            for(let option of convertedOptions)
            {
                help.push({value: option});
            }
            convertedOptions = help;
        }

        this.options = convertedOptions;
    }

    /** @override */
    handleInput(event)
    {
        if(this.readonly || this.disabled)
        {
            return {success: false};
        }

        if(this.variant === 'on/off')
        {
            return this.handleInputOfOnOffVariant(event);
        }
        else
        {
            return this.handleInputOfMultipleVariant(event);
        }
    }

    /**
     * Processes the input event in the 'multiple' variant field.
     *
     * @param {Event} event
     * @returns {{success: boolean}} - Object with information about the input success.
     */
    handleInputOfMultipleVariant(event)
    {
        event.preventDefault();

        let clickedOption = event.target;
        if(clickedOption.matches('.option') === false)
        {
            clickedOption = clickedOption.closest('.option');
        }

        for (let input of this.inputs)
        {
            input.checked = false
            input.parentElement.classList.remove('selected');
        }

        let selectedInput = clickedOption.querySelector('input');
        selectedInput.checked = true;

        this.value = selectedInput.value;
        this.rawValue = selectedInput.value;

        clickedOption.classList.add('selected');

        this.saveValueToTwin();
        return {success: true};
    }

    /**
     * Processes the input event in the 'on/off' variant field.
     *
     * @param {Event} event
     * @returns {{success: boolean}} - Object with information about the input success.
     */
    handleInputOfOnOffVariant(event)
    {
        event.preventDefault();
        let newValue;

        for(let option of this.options)
        {
            if(this.rawValue !== option.value)
            {
                newValue = option.value;
            }
        }

        for (let input of this.inputs)
        {
            if(newValue === input.value)
            {
                input.checked = true;
                continue;
            }
            input.checked = false
        }

        this.value = newValue;
        this.rawValue = newValue;

        if (this.element !== null)
        {
            if (this.rawValue === this.optionOnValue)
            {
                this.element.setAttribute('data-state', 'on');
            }
            else
            {
                this.element.setAttribute('data-state', 'off');
            }
        }

        this.saveValueToTwin();
        return {success: true};
    }

}

export {HaiInputSwitch};