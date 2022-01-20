import {HaiInput} from './hai-input-class.js';

class HaiInputSwitch extends HaiInput
{
    options = ['', 'on'];
    variant = 'on/off';
    optionOnValue = null;
    inputs = [];

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'switch';
    }

    transformElementToHaiInput()
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

        twin.type = 'hidden';
        twin.value = this.rawValue;

        this.processParameters();
        this.convertOptionsToObjectArray();

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


        let wrapper = document.createElement('div');
        wrapper.classList.add('switch-wrapper');

        let optionGroup = document.createElement('div');
        optionGroup.classList.add('option-group');

        wrapper.appendChild(optionGroup);

        let toogle = document.createElement('span');
        toogle.classList.add('toggle');
        optionGroup.appendChild(toogle);

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
            }

            let spanElement = document.createElement('span');

            if(option.label !== null)
            {
                spanElement.textContent = option.label;
            }

            label.append(optionInput, spanElement);
            optionGroup.appendChild(label);
        }

        this.element.after(wrapper);
        this.element.remove();
        this.element = wrapper;


        this.element.haiInput = this;


        let min = 1;
        let max = 100000000;
        let id = Math.floor(Math.random() * (max - min) + min);
        twin.id = `input-${id}`;

        this.element.parentElement.appendChild(twin);

        this.twin = twin;

        if(this.variant === 'on/off')
        {
            if (this.rawValue === this.optionOnValue)
            {
                this.element.setAttribute('data-state', 'on');
            }
            else
            {
                this.element.setAttribute('data-state', 'off');
            }


            this.element.querySelector('.option-group').addEventListener('click', (event) =>
            {
                this.handleInput(event);
            });
        }

        /*
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
        });*/
    }

    processParameters()
    {
        if (this.parameters.options !== null)
        {
            this.options = this.parameters.options;
        }

        if(this.parameters.list !== null)
        {
            if(typeof this.parameters.list !== 'string')
            {
                console.warn('HaiForm: List parameter must by a string.');
            }
            else
            {
                let datalist = document.getElementById(this.parameters.list);
                if(datalist === null)
                {
                    console.warn(`HaiForm: Datalist with id ${this.parameters.list} was not found.`);
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
    }

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

    handleInput(event)
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

        if(this.element !== null)
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