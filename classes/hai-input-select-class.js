import {HaiInput} from './hai-input-class.js';
import Fuse from '../dependencies/fuse.basic.esm.min.js';

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
                this.addTag(selectedOption, tagsUl)
            }
        }

        let dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        let searchInputDiv = document.createElement('div');
        searchInputDiv.classList.add('search-container');

        let searchInput = document.createElement('input');
        searchInput.placeholder = 'Search...';
        searchInputDiv.appendChild(searchInput);
        dropdown.appendChild(searchInputDiv);

        let optionsUl = document.createElement('ul');
        optionsUl.classList.add('options-container');

        dropdown.appendChild(optionsUl);

        let infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        dropdown.appendChild(infoDiv);

        wrapper.appendChild(dropdown);

        selectWrapper.append(labelDiv, wrapper, warningDiv);
        this.element.after(selectWrapper);
        this.element.remove();
        this.element = wrapper;


        this.element.haiInput = this;
        this.renderOptionsItems(this.options, optionsUl);

        let min = 1;
        let max = 100000000;
        let id = Math.floor(Math.random() * (max - min) + min);
        twin.id = `select-${id}`;

        if(this.multiple === true)
        {
            twin.multiple = true;
        }

        this.element.parentElement.appendChild(twin);

        this.twin = twin;
        this.labelElement = labelDiv;
        this.warningElement = warningDiv;
        if(this.label !== undefined)
        {
            this.labelElement.textContent = this.label;
        }
        this.setTwinOptions();

        inputField.addEventListener('click', (event) =>
        {
            searchInput.click();
        });

        searchInput.addEventListener('input', (event) =>
        {
            let searchValue = event.target.value;

            if(searchValue === '')
            {
                this.renderOptionsItems();
                return;
            }

            const settingOptions =
            {
                keys: ["label", "value"]
            };

            const fuse = new Fuse(this.options, settingOptions);
            let searchResult = fuse.search(searchValue);

            searchResult = Array.from(searchResult, result => result.item); // Extract objects from Fuse search.
            this.renderOptionsItems(searchResult);
        });

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
        if(dropdown.matches('.active'))
        {   // No action necessary if dropdown is already active.
            return;
        }
        dropdown.classList.add('active');

        let mobileThreshold = window.getComputedStyle(document.documentElement)
            .getPropertyValue('--hai-input-mobile-threshold');

        if(window.matchMedia(`(max-width: ${mobileThreshold})`).matches)
        {
            this.element.classList.add('dialog-display');
        }
        else
        {
            let focusOutFunc = (event) =>
            {
                //console.log(document.activeElement)
                if(event.currentTarget.contains(event.relatedTarget) === false)
                {
                    dropdown.classList.remove('active');
                    this.element.classList.remove('dialog-display');
                    this.element.removeEventListener('focusout',focusOutFunc);
                }

            };
            this.element.addEventListener('focusout', focusOutFunc);
        }
    }

    handleInput(event)
    {
        let optionElement;
        if(event.target.matches('.option'))
        {
            optionElement = event.target;
        }
        else
        {
            optionElement = event.target.closest('.option');
        }

        let option = optionElement.haiInputOption;

        if(this.isSelected(option))
        {
            this.unselectOption(option);
        }
        else
        {
            this.selectOption(option);
        }
    }

    selectOption(option)
    {
        this.valueArray.push(option.value);
        this.selectedOptions.push(option);
        this.value = this.valueArray.join(',');
        this.rawValue = this.value;
        this.setTwinOptions();

        this.addTag(option);
        this.hideOptionItem(option);
    }

    unselectOption(option)
    {
        for(let i = 0; i < this.selectedOptions.length; i++)
        {
            if(this.selectedOptions[i].value === option.value && this.selectedOptions[i].label === option.label)
            {
                this.selectedOptions.splice(i, 1);
                break;
            }
        }

        for(let i = 0; i < this.valueArray.length; i++)
        {
            if(this.valueArray[i] === option.value)
            {
                this.valueArray.splice(i, 1);
                break;
            }
        }

        this.value = this.valueArray.join(',');
        this.rawValue = this.value;
        this.setTwinOptions();

        this.removeTag(option);
        this.showOptionItem(option);
    }

    setTwinOptions()
    {
        this.twin.innerHTML = '';

        for(let option of this.selectedOptions)
        {
            let optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            optionElement.selected = true;
            this.twin.appendChild(optionElement);
        }
    }

    addTag(option, tagsUl = null)
    {
        if(tagsUl === null)
        {
            tagsUl = this.element.querySelector('.tags');
        }
        let tag = document.createElement('li');
        tag.classList.add('tag');
        tag.haiInputOption = option;
        let label = document.createElement('span');
        label.textContent = option.label;
        tag.appendChild(label);

        if(this.showTagRemoveButton === true)
        {
            let remove = document.createElement('button');
            remove.textContent = '×';
            remove.classList.add('remove');
            remove.addEventListener('click', (event) =>
            {
                this.unselectOption(option);
                this.showOptionItem(option);
                tag.remove();
            });
            tag.appendChild(remove);
        }

        tagsUl.appendChild(tag)
    }

    removeTag(option, tagsUl = null)
    {
        if(tagsUl === null)
        {
            tagsUl = this.element.querySelector('.tags');
        }

        for(let tag of tagsUl.querySelectorAll('.tag'))
        {
            if(option.value === tag.haiInputOption.value && option.label === tag.haiInputOption.label)
            {
                tag.remove();
                break;
            }
        }
    }

    renderOptionsItems(optionsList = null, optionsUl = null)
    {
        if(optionsList === null)
        {
            optionsList = this.options;
        }
        if(optionsUl === null)
        {
            optionsUl = this.element.querySelector('.options-container');
        }

        optionsUl.innerHTML = '';

        let infoDiv = this.element.querySelector('.dropdown .info');

        if(optionsList.length === 0)
        {
            infoDiv.classList.add('active');
            infoDiv.textContent = 'No options found';
            return;
        }

        infoDiv.classList.remove('active');

        for(let option of optionsList)
        {
            let label = document.createElement('li');
            label.classList.add('option');
            label.setAttribute('data-value', option.value)
            label.haiInputOption = option;

            let spanElement = document.createElement('span');

            if(option.label !== null)
            {
                spanElement.textContent = option.label;
            }

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
                    label.classList.add('selected');
                }
            }

            label.addEventListener('click', (event) =>
            {
                this.handleInput(event);
            });

            label.append(spanElement);
            optionsUl.appendChild(label);
        }
    }

    removeOptionItem(option)
    {
        let optionsContainer = this.element.querySelector('.options-container');
        let optionElements = optionsContainer.querySelectorAll(`.option[data-value='${option.value}']`);
        for(let optionElement of optionElements)
        {
            if(option.value === optionElement.haiInputOption.value && option.label === optionElement.haiInputOption.label)
            {
                optionElement.remove();
            }
        }
    }

    hideOptionItem(option)
    {
        let optionsContainer = this.element.querySelector('.options-container');
        let optionElements = optionsContainer.querySelectorAll(`.option[data-value='${option.value}']`);
        for(let optionElement of optionElements)
        {
            if(option.value === optionElement.haiInputOption.value && option.label === optionElement.haiInputOption.label)
            {
                optionElement.classList.add('selected');
            }
        }
    }

    showOptionItem(option)
    {
        let optionsContainer = this.element.querySelector('.options-container');
        let optionElements = optionsContainer.querySelectorAll(`.option.selected[data-value='${option.value}']`);
        for(let optionElement of optionElements)
        {
            if(option.value === optionElement.haiInputOption.value && option.label === optionElement.haiInputOption.label)
            {
                optionElement.classList.remove('selected');
            }
        }
    }

    isSelected(option)
    {
        for(let testedOption of this.selectedOptions)
        {
            if(option.value === testedOption.value && option.label === testedOption.label)
            {
                return  true;
            }
        }

        return false;
    }
}

export {HaiInputSelect};