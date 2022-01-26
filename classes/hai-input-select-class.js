import {HaiInput} from './hai-input-class.js';

class HaiInputSelect extends HaiInput
{
    options = [];
    selectedOptions = [];
    valueArray = [];
    multiple = false;
    showTagRemoveButton = true;
    enableSearch = true;
    tabIndex = 0;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'select';
    }

    transformElementToHaiInput()
    {
        let name = this.element.name;
        this.value = this.element.value;
        this.rawValue = this.value;

        let twin = document.createElement('select');

        if (name !== undefined)
        {
            this.element.removeAttribute('name');
            twin.name = name;
        }

        twin.hidden = true;
        twin.classList.add('hidden');
        // twin.value = this.rawValue; TODO - toto se bude muset pro select udělat jinak.

        if(this.element.nodeName === 'SELECT')
        {   // Process children of original select.
            let optGroups = this.element.querySelectorAll('optgroup');

            if(optGroups.length === 0)
            {
                let options = this.element.options;
                let help = [];

                for(let option of options)
                {
                    help.push({value: option.value, label: option.label});
                }

                this.options = help;
            }
            else
            {
                // TODO - zpracovat option group
            }

            let selectedOptions = this.element.selectedOptions;
            let help = [];
            let helpValue = [];

            for(let option of selectedOptions)
            {
                help.push({value: option.value, label: option.label});
                helpValue.push(option.value);
            }

            this.selectedOptions = help;
            this.valueArray = helpValue;
            this.value = this.valueArray.join(',');
            this.rawValue = this.value;
        }


        this.processParameters();
        this.convertOptionsToObjectArray();

        let selectWrapper = document.createElement('div');
        selectWrapper.classList.add('hai-input-element');
        selectWrapper.classList.add('select');

        let labelDiv = document.createElement('div');
        labelDiv.classList.add('label-text');

        let warningDiv = document.createElement('div');
        warningDiv.classList.add('alert');

        let wrapper = document.createElement('div');
        wrapper.classList.add('select-wrapper');
        wrapper.tabIndex = -1;

        let inputField = document.createElement('div');
        inputField.classList.add('input-field');
        inputField.tabIndex = this.tabIndex;

        wrapper.appendChild(inputField);

        if(this.multiple === true)
        {
            let tagsUl = document.createElement('ul');
            tagsUl.classList.add('tags');
            inputField.appendChild(tagsUl);

            for(let selectedOption of this.selectedOptions)
            {
                let tag = document.createElement('li');
                let label = document.createElement('span');
                label.textContent = selectedOption.label;
                tag.appendChild(label);
                tagsUl.appendChild(tag)
            }
        }

        let dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        let optionsUl = document.createElement('ul');
        optionsUl.classList.add('options-container');

        dropdown.appendChild(optionsUl);
        wrapper.appendChild(dropdown);

        for(let option of this.options)
        {
            if(this.valueArray.includes(option.value))
            {
                let found = false;
                for (let selectedOption of this.selectedOptions)
                {
                    if(option.value === selectedOption.value && option.label === selectedOption.label)
                    {
                        found = true;
                        break;
                    }
                }
                if(found === true)
                {
                    continue;
                }
            }

            let label = document.createElement('li');
            label.classList.add('option');
            label.setAttribute('data-value', option.value)
            label.haiInputOption = option;

            let spanElement = document.createElement('span');

            if(option.label !== null)
            {
                spanElement.textContent = option.label;
            }

            label.addEventListener('click', (event) =>
            {
                this.handleInput(event);
            });

            label.append(spanElement);
            optionsUl.appendChild(label);
        }

        selectWrapper.append(labelDiv, wrapper, warningDiv);
        this.element.after(selectWrapper);
        this.element.remove();
        this.element = wrapper;


        this.element.haiInput = this;


        let min = 1;
        let max = 100000000;
        let id = Math.floor(Math.random() * (max - min) + min);
        twin.id = `select-${id}`;

        this.element.parentElement.appendChild(twin);

        this.twin = twin;
        this.labelElement = labelDiv;
        this.warningElement = warningDiv;
        if(this.label !== undefined)
        {
            this.labelElement.textContent = this.label;
        }

        this.element.addEventListener('focusin', (event) =>
        {
            this.showDropdown(event);
        });


    }

    processParameters()
    {
        super.processParameters();

        if (this.parameters.options !== undefined)
        {
            this.options = this.parameters.options;
        }

        if(this.parameters.multiple !== undefined)
        {
            this.multiple = Boolean(this.parameters.multiple);
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

    showDropdown(event)
    {
        let dropdown = this.element.querySelector('.dropdown');
        dropdown.classList.add('active');

        let focusOutFunc = (event) =>
        {
            dropdown.classList.remove('active');
            this.element.removeEventListener('focusout',focusOutFunc);
        };
        this.element.addEventListener('focusout', focusOutFunc);
    }

    handleInput(event)
    {
        let selectedOption = event.target.haiInputOption;
        this.selectOption(selectedOption);
    }

    selectOption(option)
    {
        this.valueArray.push(option.value);
        this.selectedOptions.push(option);
        this.value = this.valueArray.join(',');
        this.rawValue = this.value;

        this.addTag(option);
        this. removeOptionElement(option);
    }

    addTag(option, tagsUl = null)
    {
        if(tagsUl === null)
        {
            tagsUl = this.element.querySelector('.tags');
        }
        let tag = document.createElement('li');
        let label = document.createElement('span');
        label.textContent = option.label;
        tag.appendChild(label);
        tagsUl.appendChild(tag)
    }

    removeOptionElement(option)
    {
        let optionsContainer = this.element.querySelector('.options-container');
        let optionElements = optionsContainer.querySelectorAll(`.option[data-value='${option.value}']`);
        for(let optionElement of optionElements)
        {
            console.log(optionElement)
            if(option.value === optionElement.haiInputOption.value && option.label === optionElement.haiInputOption.label)
            {
                optionElement.remove();
            }
        }
    }
}

export {HaiInputSelect};