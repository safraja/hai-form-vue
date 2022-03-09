import {HaiInput} from './hai-input-class.js';
import Fuse from '../dependencies/fuse.basic.esm.min.js';

class HaiInputSelect extends HaiInput
{
    options = new Map();
    optGroups = new Set();
    selectedOptions = new Map();
    valuesSet = new Set();
    multiple = false;
    showTagRemoveButton = true;
    enableSearch = true;
    tabIndex = 0;

    optionsItemsContainer = null;
    tagsContainer = null;
    searchInput = null;
    inputText = null;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'select';
    }

    async transformElementToHaiInput()
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

        this.processElementContentAndAttributes(this.element);
        await this.processAttributes();
        await this.processParameters();

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
        if(this.multiple === true)
        {
            wrapper.classList.add('multiple');
        }
        else
        {
            wrapper.classList.add('single');
        }

        let inputField = document.createElement('div');
        inputField.classList.add('input-field');
        inputField.tabIndex = this.tabIndex;

        wrapper.appendChild(inputField);

        if(this.multiple === true)
        {
            let tagsUl = document.createElement('ul');
            tagsUl.classList.add('tags');
            this.tagsContainer = tagsUl;
            inputField.appendChild(tagsUl);

            for(const selectedOption of this.selectedOptions.values())
            {
                this.addTag(selectedOption, tagsUl)
            }
        }
        else
        {
            let inputText = document.createElement('span');
            inputText.classList.add('inputText');
            inputField.appendChild(inputText);
            this.inputText = inputText;

            if(this.selectedOptions.size > 0)
            {
                let selectedOption = Array.from(this.selectedOptions.values())[0];
                inputText.textContent = selectedOption.label;
                inputText.setAttribute('data-value', selectedOption.value);
            }
        }

        let dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        let optionsUl = document.createElement('ul');
        optionsUl.classList.add('options-container');
        this.optionsItemsContainer = optionsUl;
        dropdown.appendChild(optionsUl);

        let infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        dropdown.appendChild(infoDiv);

        let buttons = document.createElement('div');
        buttons.classList.add('control-buttons');
        dropdown.appendChild(buttons);

        let confirm = document.createElement('div');
        confirm.classList.add('button');
        confirm.textContent = 'Confirm';
        buttons.appendChild(confirm);
        confirm.addEventListener('click', (event) =>
        {
            this.hideDropdown(event);
        });

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

        if(this.enableSearch === true)
        {
            let searchInputDiv = document.createElement('div');
            searchInputDiv.classList.add('search-container');

            let searchInput = document.createElement('input');
            searchInput.placeholder = 'Search...';
            this.searchInput = searchInput;
            searchInputDiv.appendChild(searchInput);
            dropdown.prepend(searchInputDiv);
            inputField.addEventListener('click', (event) =>
            {
                //console.log('inputField clicked')
                searchInput.focus();
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
                        keys: ["label", "value", "group"],
                        threshold: 0.45
                    };

                const fuse = new Fuse(Array.from(this.options.values()), settingOptions);
                let searchResult = fuse.search(searchValue);
                let searchResultMap = new Map();

                for(const foundOption of searchResult)
                {   // Convert Fuse search results to Map.
                    searchResultMap.set(this.generateOptionKey(foundOption.item), foundOption.item);
                }

                this.renderOptionsItems(searchResultMap);
            });
        }

        this.element.addEventListener('focusin', (event) =>
        {
            this.showDropdown(event);
            if(event.target === inputField)
            {
                this.element.focus();
            }

        });
    }

    processElementContentAndAttributes(element = null)
    {
        if(element === null)
        {
            element = this.element;
        }

        if(element.nodeName === 'SELECT')
        {   // Process children of original select.
            let optGroups = element.querySelectorAll('optgroup');
            let options = element.options;

            if(optGroups.length === 0)
            {
                for(const option of options)
                {
                    this.options.set(this.generateOptionKey(option), {value: option.value, label: option.label});
                }
            }
            else
            {
                for(const optGroup of optGroups)
                {
                    this.optGroups.add(optGroup.label);
                }
                for(const option of options)
                {
                    if(option.parentElement.nodeName === 'OPTGROUP')
                    {
                        this.options.set(this.generateOptionKey(option),
                            {value: option.value, label: option.label, group: option.parentElement.label});
                    }
                    else
                    {
                        this.options.set(this.generateOptionKey(option), {value: option.value, label: option.label});
                    }
                }
            }

            // This seems to work even with single value select, so no need to crate a specific solution.
            let selectedOptions = element.selectedOptions;

            for(let option of selectedOptions)
            {
                if(option.parentElement.nodeName === 'OPTGROUP')
                {
                    this.selectedOptions.set(this.generateOptionKey(option),
                        {value: option.value, label: option.label, group: option.parentElement.label});
                }
                else
                {
                    this.selectedOptions.set(this.generateOptionKey(option),
                        {value: option.value, label: option.label});
                }
                this.valuesSet.add(option.value);
            }

            this.value = Array.from(this.valuesSet.values()).join(',');
            this.rawValue = this.value;
        }
    }

    async processParameters(parameters = null)
    {
        if(parameters === null)
        {
            parameters = this.parameters;
        }
        super.processParameters(parameters);

        if(parameters.multiple !== undefined)
        {
            this.multiple = Boolean(parameters.multiple);
        }

        if (parameters.options !== undefined)
        {
            if(typeof parameters.options === 'string')
            {
                parameters.options = await this.fetchFile(parameters.options);
            }

            if(parameters.options instanceof Map)
            {
                for(let [key, option] of parameters.options)
                {
                    if(typeof option !== 'object')
                    {
                        console.warn('HaiForm: Parameter "options" must contain only objects if given as Map. Option skipped.');
                        continue;
                    }
                    if(option.value === undefined)
                    {
                        console.warn('HaiForm: Each option given by parameter "options" must have a "value" property. Option skipped.');
                        continue;
                    }
                    if(option.label === undefined)
                    {
                        console.warn('HaiForm: Each option given by parameter "options" must have a "label" property. Option skipped.');
                        continue;
                    }
                    option.key = key;    // Key must be saved even in the value object.
                    this.options.set(key, option);

                    if(option.selected === true)
                    {
                        if(this.multiple === false)
                        {   // If multiple is false, only last "selected" must be saved as selected option, so delete all others.
                            this.selectedOptions.clear();
                            this.valuesSet.clear();
                        }
                        this.selectedOptions.set(key, option);
                        this.valuesSet.add(option.value);
                        this.value = Array.from(this.valuesSet.values()).join(',');
                        this.rawValue = this.value;
                    }

                    if(option.group !== undefined)
                    {
                        this.optGroups.add(option.group);
                    }
                }
            }
            else if(Array.isArray(parameters.options) === false)
            {
                console.warn('HaiForm: Parameter "options" must be either a Map or an array of objects.');
            }
            else
            {
                for(const option of parameters.options)
                {
                    if(option.value === undefined)
                    {
                        console.warn('HaiForm: Each option given by parameter "options" must have a "value" property. Option skipped.');
                        continue;
                    }
                    if(option.label === undefined)
                    {
                        console.warn('HaiForm: Each option given by parameter "options" must have a "label" property. Option skipped.');
                        continue;
                    }
                    let key = this.generateOptionKey(option);
                    this.options.set(key, option);

                    if(option.selected === true)
                    {
                        if(this.multiple === false)
                        {   // If multiple is false, only last "selected" must be saved as selected option, so delete all others.
                            this.selectedOptions.clear();
                            this.valuesSet.clear();
                        }
                        this.selectedOptions.set(key, option);
                        this.valuesSet.add(option.value);
                        this.value = Array.from(this.valuesSet.values()).join(',');
                        this.rawValue = this.value;
                    }

                    if(option.group !== undefined)
                    {
                        this.optGroups.add(option.group);
                    }
                }
            }
        }

        if(parameters.enableSearch !== undefined)
        {
            this.enableSearch = Boolean(parameters.enableSearch);
        }
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
        let focusOutFunc = (event) =>
        {
            this.hideDropdown(event);
        };
        this.element.addEventListener('blur', focusOutFunc);
        if(this.searchInput !== null)
        {
            this.searchInput.addEventListener('blur', focusOutFunc);
        }
    }

    hideDropdown(event)
    {
        let dropdown = this.element.querySelector('.dropdown');
        if(event.currentTarget.contains(event.relatedTarget) === false)
        {
            dropdown.classList.remove('active');
            this.element.classList.remove('dialog-display');
            this.element.removeEventListener('blur',this.hideDropdown);
            if(this.searchInput !== null)
            {
                this.searchInput.removeEventListener('blur', this.hideDropdown);
            }
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

        let option = this.options.get(optionElement.getAttribute('data-key'));

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
        if(this.multiple === true)
        {
            this.valuesSet.add(option.value);
            this.selectedOptions.set(this.generateOptionKey(option), option);
            this.value = Array.from(this.valuesSet.values()).join(',');
            this.rawValue = this.value;
            this.setTwinOptions();

            this.addTag(option);
        }
        else
        {
            this.inputText.textContent = option.label;
            this.inputText.setAttribute('data-value', option.value);
            this.showAllOptionItems();

            this.valuesSet.clear();
            this.selectedOptions.clear();
            this.valuesSet.add(option.value);
            this.selectedOptions.set(this.generateOptionKey(option), option);
            this.value = option.value;
            this.rawValue = this.value;
            this.setTwinOptions();
        }

        this.hideOptionItem(option);
        if(this.searchInput !== null && this.searchInput.value !== '')
        {   // Reset filter.
            this.searchInput.value = '';
            this.renderOptionsItems();
            this.searchInput.focus();
        }

    }

    unselectOption(option)
    {
        if(this.multiple === false)
        {   // In single select, unselecting practically mean select the same option again, so no action necessary.
            return;
        }
        this.selectedOptions.delete(this.generateOptionKey(option));
        this.valuesSet.delete(option.value);

        this.value = Array.from(this.valuesSet.values()).join(',');
        this.rawValue = this.value;
        this.setTwinOptions();

        this.removeTag(option);
        this.showOptionItem(option);
    }

    setTwinOptions()
    {
        this.twin.innerHTML = '';

        for(const option of this.selectedOptions.values())
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
        tag.setAttribute('data-key', this.generateOptionKey(option));
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
            tagsUl = this.tagsContainer;
        }

        let tag = tagsUl.querySelector(`.tag[data-key='${this.generateOptionKey(option)}']`);

        if(tag !== null)
        {
            tag.remove();
        }

        if(this.searchInput !== null)
        {
            this.searchInput.focus();
        }
    }

    renderOptionsItems(optionsList = null, optionsUl = null, groupsList = null)
    {
        if(optionsList === null)
        {
            optionsList = this.options;
        }
        if(optionsUl === null)
        {
            optionsUl = this.optionsItemsContainer;
        }
        if(groupsList === null)
        {
            groupsList = this.optGroups;
        }

        optionsUl.innerHTML = '';

        let infoDiv = this.element.querySelector('.dropdown .info');

        if(optionsList.size === 0)
        {
            infoDiv.classList.add('active');
            infoDiv.textContent = 'No options found';
            return;
        }

        infoDiv.classList.remove('active');

        if(groupsList.size === 0)
        {
            for(const [key, option] of optionsList)
            {
                this.addOptionItem(option, key, optionsUl);
            }
        }
        else
        {
            let notAddedOptions = new Map(optionsList);

            for(const group of groupsList)
            {
                let header = document.createElement('li');
                header.classList.add('option-group-header');
                let strong = document.createElement('strong');
                strong.textContent = group;
                header.appendChild(strong);
                optionsUl.appendChild(header);

                let unselectedOptions = 0;
                let optionsInGroup = 0;

                for(const [key, option] of notAddedOptions)
                {
                    if(option.group !== group)
                    {
                        continue;
                    }
                    this.addOptionItem(option, key, optionsUl);
                    notAddedOptions.delete(key);

                    if(this.isSelected(option) === false)
                    {
                        unselectedOptions++;
                    }
                    optionsInGroup++;
                }

                if(optionsInGroup === 0)
                {
                    header.remove();
                }
                else
                {
                    header.setAttribute('data-unselected-options', `${unselectedOptions}`);
                }
            }

            if(notAddedOptions.size > 0)
            {   // If there are some options remaining (do not belong to any group), add them here.
                let header = document.createElement('li');
                header.classList.add('option-group-header');
                let strong = document.createElement('strong');
                header.appendChild(strong);
                optionsUl.appendChild(header);

                for(const [key, option] of notAddedOptions)
                {
                    this.addOptionItem(option, key, optionsUl);
                }
            }
        }
    }

    addOptionItem(option, key, optionsUl = null)
    {
        if(optionsUl === null)
        {
            optionsUl = this.optionsItemsContainer;
        }

        let label = document.createElement('li');
        label.classList.add('option');
        label.setAttribute('data-key', key);
        label.setAttribute('data-value', option.value);

        let spanElement = document.createElement('span');

        if(option.label !== null)
        {
            spanElement.textContent = option.label;
        }

        if(this.isSelected(option))
        {
            label.classList.add('selected');
        }

        label.addEventListener('click', (event) =>
        {
            this.handleInput(event);
        });

        label.append(spanElement);
        optionsUl.appendChild(label);
    }

    removeOptionItem(option)
    {
        let optionItem = this.optionsItemsContainer.querySelector(`.option[data-key='${this.generateOptionKey(option)}']`);
        if(optionItem !== null)
        {
            optionItem.remove();
        }
    }

    hideOptionItem(option)
    {
        let optionItem = this.optionsItemsContainer.querySelector(`.option[data-key='${this.generateOptionKey(option)}']`);
        if(optionItem !== null)
        {
            optionItem.classList.add('selected');
            if(option.group !== undefined)
            {
                this.updateGroupHeaderUnselectedOpt(optionItem, -1);
            }
        }
    }

    showAllOptionItems()
    {
        let options = this.optionsItemsContainer.querySelectorAll('.option.selected');
        for(const optionItem of options)
        {
            if(optionItem.matches('.selected'))
            {
                optionItem.classList.remove('selected');
                if(this.optGroups.length !== 0)
                {
                    this.updateGroupHeaderUnselectedOpt(optionItem, 1);
                }
            }
        }
    }

    showOptionItem(option)
    {
        let optionItem = this.optionsItemsContainer.querySelector(`.option[data-key='${this.generateOptionKey(option)}']`);
        if(optionItem !== null)
        {
            optionItem.classList.remove('selected');
            if(option.group !== undefined)
            {
                this.updateGroupHeaderUnselectedOpt(optionItem, 1);
            }
        }
    }

    updateGroupHeaderUnselectedOpt(optionItem, addValue)
    {
        let groupHeader;
        let previousElement = optionItem.previousElementSibling;

        while(previousElement !== null)
        {
            if(previousElement.matches('.option-group-header'))
            {
                groupHeader = previousElement;
                break;
            }
            previousElement = previousElement.previousElementSibling;
        }

        if(groupHeader !== undefined)
        {
            let unselectedOptions = parseInt(groupHeader.getAttribute('data-unselected-options'));
            unselectedOptions += addValue;
            groupHeader.setAttribute('data-unselected-options', `${unselectedOptions}`);
        }
    }

    isSelected(option)
    {
        return this.selectedOptions.has(this.generateOptionKey(option));
    }

    generateOptionKey(option)
    {
        if(option.key !== undefined)
        {
            return option.key;
        }
        return `${option.label} (${option.value})`;
    }

    async fetchFile(fileName)
    {
        let response = await fetch(fileName)
        return await response.json();
    }
}

export {HaiInputSelect};