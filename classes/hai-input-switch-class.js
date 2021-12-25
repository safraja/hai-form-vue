import {HaiInput} from './hai-input-class.js';

class HaiInputSwitch extends HaiInput
{
    options = ['', 'on'];
    variant = 'on/off';
    inputs = [];

    constructor(element = null)
    {
        super('switch', element);
    }

    transformElementToHaiInput()
    {
        let name = this.element.name;
        this.value = this.element.value;
        this.rawValue = this.value;

        let twin = document.createElement('input');

        if(name !== undefined)
        {
            this.element.removeAttribute('name');
            twin.name = name;
        }

        twin.type = 'hidden';
        twin.value = this.rawValue;


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
            optionInput.value = option;

            this.inputs.push(optionInput);

            if(this.value === option)
            {
                optionInput.checked = true;
            }

            let spanElement = document.createElement('span');

            label.append(optionInput, spanElement);
            optionGroup.appendChild(label);
        }

        this.element.after(wrapper);
        this.element.remove();
        this.element = wrapper;

        this.element.setAttribute('data-state', this.rawValue);

        this.element.haiInput = this;


        let min = 1;
        let max = 100000000;
        let id = Math.floor(Math.random() * (max - min) + min);
        twin.id = `input-${id}`;

        this.element.parentElement.appendChild(twin);

        this.twin = twin;

        if(this.variant === 'on/off')
        {
            this.element.addEventListener('click', (event) =>
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

    handleInput(event)
    {
        event.preventDefault();
        let newValue;

        for(let option of this.options)
        {
            if(this.rawValue !== option)
            {
                newValue = option;
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

        this.element.setAttribute('data-state', this.rawValue);

        this.saveValueToTwin();
    }

}

export {HaiInputSwitch};