import {
    HaiInput,
    HaiInputText,
    HaiInputNumber,
    HaiInputUrl,
    HaiInputSwitch,
    HaiInputSelect,
    HaiInputFile
} from "./hai-input-classes.js";

export default {
    name: 'hai-input',
    props: {
        // General attributes.
        'label': {
            'type': String
        },
        'twin-id': {
            'type': String
        },
        'value': {
            'type': String,
            'default': ''
        },
        'type': {
            'type': String,
            'default': 'text'
        },
        'name': {
            'type': String
        },
        'required': {
            'type': Boolean
        },
        'disabled': {
            'type': Boolean
        },
        'readonly': {
            'type': Boolean
        },
        // Text type attributes.
        'mask': {
            'type': String
        },
        'mask-tokens': {
            'type': [String, Object]
        },
        'placeholder': {
            'type': String
        },
        'max-length': {
            'type': [String, Number],
        },
        'min-length': {
            'type': [String, Number],
        },
        // Number type attributes.
        'min': {
            'type': Number,
        },
        'max': {
            'type': Number,
        },
        'allow-e-notation': {
            'type': Boolean,
        },
        'decimal-separator': {
            'type': String,
        },
        'delimiter': {
            'type': String,
        },
        'enable-value-formation': {
            'type': Boolean,
            'default': true
        },
        'step': {
            'type': [String, Number]
        },
        'strip-leading-zeros': {
            'type': Boolean,
            'default': true
        },
        'thousand-group-style': {
            'type': String,
        },
        // URL type attributes.
        'allow-part': {
            'type': [String, Object],
        },
        'default-scheme': {
            'type': String,
        },
        'require-host': {
            'type': Boolean,
            'default': true
        },
        'strip-part': {
            'type': [String, Object],
        },
        // Switch type attributes.
        'options': {
            'type': [String, Array, Object]
        },
        'list': {
            'type': String
        },
        'variant': {
            'type': String
        },
        'multiple': {
            'type': Boolean
        },
        'options-on-value': {
            'type': String
        },
        // Select type attributes.
        'options-source': {
            'type': String
        },
        'enable-search': {
            'type': Boolean,
            'default': true
        },
        // File type attributes.
        'allowed-file-types': {
            'type': [String, Array]
        },
        'allowed-schemes': {
            'type': [String, Array]
        },
        'max-files-count': {
            'type': [String, Number],
        },
        'max-file-size': {
            'type': [String, Number],
        },
        'max-total-size': {
            'type': [String, Number],
        },
    },
    styles: ["@import './hai-input-vue.css'"],
    data()
    {
        return {
            id: '',
            innerType: '',
            innerOptions: '',
            inputmode: ''
        }
    },
    async created()
    {
        this.innerType = this.type;
        this.assignObject();  // Assign a HaiInput object tu the element.
        await this.haiInput.processParameters();

        this.haiInput.rawValue = this.value;
        this.haiInput.value = this.value;

        if(this.type === 'switch')
        {
            // this.haiInput.rawValue = this.haiInput.extractRawValue(this.value);
            // this.haiInput.value = this.haiInput.formatValue(this.value);

            this.haiInput.convertOptionsToObjectArray();

            if (this.haiInput.variant === 'on/off')
            {
                if (this.haiInput.optionOnValue === null)
                {
                    this.haiInput.optionOnValue = this.haiInput.options[this.haiInput.options.length - 1].value;
                }
                else if (this.haiInput.options[0].value === this.haiInput.optionOnValue)
                {
                    this.haiInput.options = this.haiInput.options.reverse();
                }

                if (this.haiInput.rawValue === this.haiInput.optionOnValue)
                {
                    this.haiInput.element.setAttribute('data-state', 'on');
                }
                else
                {
                    this.haiInput.element.setAttribute('data-state', 'off');
                }
            }


            if(this.value === '' && !this.haiInput.options.includes(''))
            {
                this.haiInput.rawValue = this.haiInput.options[0].value;
                this.haiInput.value= this.haiInput.options[0].value;
            }
        }
        else if(this.type === 'select')
        {
            this.haiInput.renderOptionsItems();
        }
    },
    mounted()
    {
        if(this.type === 'switch')
        {
            this.haiInput.element = this.$refs.wrapper;

            let inputs = this.$refs.wrapper.querySelectorAll('input[type=radio]');

            for(let input of inputs)
            {
                this.haiInput.inputs.push(input);
            }
        }
        else if(this.type === 'select')
        {
            this.haiInput.element = this.$refs.wrapper;
            this.haiInput.tagsContainer = this.$refs.tags;
            this.haiInput.optionsItemsContainer = this.$refs.optionsContainer;
            this.haiInput.searchInput = this.$refs.searchInput;

            if(this.haiInput.multiple === false)
            {
                this.haiInput.inputText = this.$refs.inputText;
                if(this.haiInput.selectedOptions.size > 0)
                {
                    let selectedOption = Array.from(this.haiInput.selectedOptions.values())[0];
                    this.$refs.inputText.textContent = selectedOption.label;
                    this.$refs.inputText.setAttribute('data-value', selectedOption.value);
                }
            }

            if(this.haiInput.multiple === true)
            {
                for(let [key, option] of this.haiInput.selectedOptions)
                {
                    this.haiInput.addTag(option, this.$refs.tags);
                }
            }

            this.$el.parentNode.host.addEventListener('blur', (event) =>
            {
                let dropdown = this.haiInput.element.querySelector('.dropdown');

                if(this.$el.parentNode.contains(event.explicitOriginalTarget) === false)
                {
                    dropdown.classList.remove('active');
                    this.haiInput.element.classList.remove('dialog-display');
                    this.haiInput.element.removeEventListener('blur',this.hideDropdown);
                    if(this.haiInput.searchInput !== null)
                    {
                        this.haiInput.searchInput.removeEventListener('blur', this.hideDropdown);
                    }
                }
            })
        }
        else if(this.type === 'file')
        {
            this.haiInput.element = this.$refs.wrapper;
            this.haiInput.messageContainer = this.$refs.message;
            this.haiInput.warningElement = this.$refs.alert;
            this.haiInput.filesContainer = this.$refs.files;
            this.haiInput.innerFileInput = this.$refs.innerFileInput;
            this.haiInput.addWrapperEvents(this.$refs.wrapper);

            this.haiInput.innerFileInput.addEventListener('change', (event) =>
            {
                for(let file of this.haiInput.innerFileInput.files)
                {
                    this.haiInput.addFile(file);
                }

                let dataTransfer = new DataTransfer();
                this.haiInput.innerFileInput.files = dataTransfer.files; // Empty the file input.
            });
        }


        if (this.$attrs.id === undefined)
        {
            let min = 1;
            let max = 100000000;
            let id = Math.floor(Math.random() * (max - min) + min);
            this.id = `input-${id}`;
        }
        else
        {
            this.id = this.$attrs.id;
        }

        let twin;
        if (this.type === 'select')
        {
            twin = container.ownerDocument.createElement('select');
            if(this.haiInput.multiple)
            {
                twin.multiple = true;
            }
        }
        else if (this.type === 'file')
        {
            twin = container.ownerDocument.createElement('input');
            twin.type = 'file';
        }
        else
        {
            twin = container.ownerDocument.createElement('input');
            twin.type = 'text';
        }
        twin.hidden = true;
        this.$el.parentNode.host.parentElement.appendChild(twin);

        if(this.name !== undefined)
        {
            twin.name = this.name;
        }
        if(this.disabled)
        {
            twin.disabled = true;
        }

        if(this.inputTwin !== undefined)
        {
            twin.id = this.inputTwin;
        }
        else
        {
            let min = 1;
            let max = 100000000;
            let id = Math.floor(Math.random() * (max - min) + min);
            twin.id = `input-${id}`;
        }

        this.haiInput.twin = twin;

        if (this.type === 'select')
        {
            this.haiInput.setTwinOptions();
        }
        else if (this.type !== 'file')
        {
            twin.value = this.value;
        }


        //TODO - management of inputmode, not crucial, but should be addressed in the future.
        if(this.innerType === 'number')
        {
            this.inputmode = 'numeric';
        }

        if(this.type === 'switch')
        {
            if(typeof this.options === 'string')
            {
                this.innerOptions = JSON.parse(this.options);
            }
            else
            {
                this.innerOptions = this.options;
            }

            if(Array.isArray(this.innerOptions))
            {
                let help = [];
                for(let option of this.innerOptions)
                {
                    help.push({value: option});
                }
                this.innerOptions = help;
            }
        }

    },
    methods: {
        assignObject()
        {
            let parameters = [];
            switch (this.innerType)
            {
                case 'text':
                    this.haiInput = new HaiInputText();
                    parameters.push('mask', 'maxLength', 'minLength');
                    break;

                case 'number':
                    this.haiInput = new HaiInputNumber();
                    parameters.push('mask', 'maxLength', 'minLength', 'max', 'min', 'step', 'allowENotation',
                        'stripLeadingZeroes', 'decimalSeparator', 'delimiter', 'thousandsGroupStyle',
                        'enableValueFormation');
                    break;

                case "url":
                    this.haiInput = new HaiInputUrl();
                    parameters.push('mask', 'maxLength', 'minLength', 'allowedSchemes', 'defaultScheme', 'requireHost',
                        'allowPart', 'stripPart');
                    break;

                case "switch":
                    this.haiInput = new HaiInputSwitch();
                    parameters.push('options', 'variant', 'optionOnValue', 'list');
                    break;

                case "select":
                    this.haiInput = new HaiInputSelect();
                    parameters.push('options', 'optionsSource', 'optGroups', 'selectedOptions', 'valuesSet', 'multiple',
                        'showTagRemoveButton', 'enableSearch', 'tabIndex', 'list');
                    break;

                case "file":
                    this.haiInput = new HaiInputFile();
                    parameters.push('multiple', 'maxFilesCount', 'maxFileSize', 'maxTotalSize', 'allowedFileTypes');
                    break;
            }

            parameters.push('value', 'required', 'label', 'readonly', 'disabled')

            //console.log(`%cNew hai-input element (type ${this.innerType})`, 'font-size:18px')
            for (let parameter of parameters)
            {
                if (this[parameter] !== undefined)
                {
                    //console.log('Parameter:', parameter, 'Value:', this[parameter])
                    this.haiInput.parameters[parameter] = this[parameter];
                }
            }

        },
        handleInput(event)
        {
            let result = this.haiInput.handleInput(event);

            if (this.innerType !== 'switch' && this.innerType !== 'select')
            {
                if (result.success === true)
                {
                    this.$refs.alert.textContent = '';
                }
                else
                {
                    this.$refs.alert.textContent = result.message;
                }
            }
            else
            {
                //this.$refs.wrapper.setAttribute('data-state', this.haiInput.rawValue);
            }
        },
        handleFocusIn(event)
        {
            if (this.innerType === 'select')
            {
                this.haiInput.showDropdown(event);
                if(event.target === this.$refs.inputField || event.composedPath().includes(this.$refs.inputField))
                {
                    //console.log('handleFocusIn  ---  2', event.target)
                    this.haiInput.element.focus();
                }
            }
        },
        handleFocusOut(event)
        {
            //console.log('handleFocusOut')

            if (this.innerType === 'select')
            {
                event.preventDefault();
                //console.log(event);
            }
            else
            {
                this.haiInput.handleFocusOut(event);
                let validity = this.haiInput.checkValidity();

                let fn = (invalidEvent) =>
                {
                    this.$refs.input.reportValidity();
                };

                if(validity.success === false)
                {
                    this.$refs.alert.textContent = validity.message;
                    this.haiInput.twin.style.display = 'none';
                    this.haiInput.twin.setCustomValidity(validity.message);
                    this.haiInput.twin.addEventListener('invalid', fn);
                }
                else
                {
                    this.$refs.alert.textContent = '';
                    this.haiInput.twin.setCustomValidity('');
                    this.haiInput.twin.removeEventListener('invalid', fn);
                }
            }
        },
        handleKeyAction(event)
        {console.log('handleKeyAction')
            this.haiInput.handleKeyAction(event);
        },
        handleWheel(event)
        {
            this.haiInput.handleWheel(event);
        },
        handleSearch(event)
        {
            this.haiInput.useFuseSearch(event);
        },
        dropdownClick(event)
        {
            if(event.target !== this.haiInput.searchInput && event.originalTarget !== this.$refs.confirmButton)
            {
                console.log('?',event.originalTarget ,this.$refs.confirmButton)
                //this.$refs.inputField.focus();
            }
        },
        closeDropdown(event)
        {
            let dropdown = this.haiInput.element.querySelector('.dropdown');
            dropdown.classList.remove('active');
            this.haiInput.element.classList.remove('dialog-display');
        }
    },
    template: `
        <template v-if='this.type === "switch"'>
            <div class='label-text'>{{ label }}</div>
            <div ref='wrapper' v-bind:class='"switch-wrapper" + " " +
                ((this.haiInput.disabled === true || this.haiInput.readonly === true) ? "inactive" : "")' 
                v-bind:data-variant='this.haiInput.variant'>
                <div class='option-group' v-on:click='handleInput($event)'>
                    <span v-if='this.haiInput.variant === "on/off"' ref='toggle' class='toggle'></span>
                    <label v-for='item in this.haiInput.options' v-bind:class='(this.haiInput.variant === "multiple" 
                            && item.value === this.value) ? "option selected" : "option"'>
                        <input type='radio' v-bind:VALUE='item.value' v-bind:checked='(item.value === this.value)'>
                        <span>{{ (this.haiInput.variant === 'multiple') ? item.label : '' }}</span>
                    </label>
                </div>
            </div>
        </template>
        <template v-else-if='this.type === "select"'>
            <div class='label-text' v-on:click='closeDropdown($event)'>{{ label }}</div>
            <div ref='wrapper' v-bind:class='(this.haiInput.multiple === true) ? "select-wrapper multiple" : "select-wrapper single"'
                v-on:focusout='handleFocusOut($event)' v-on:focusin='handleFocusIn($event)' tabindex='0'>
                <div ref='inputField' class='input-field' tabindex='0'>
                    <ul v-if='this.haiInput.multiple === true' ref='tags' class='tags'>
                        
                    </ul>
                    <span v-else ref='inputText' class='input-text'></span>
                </div>
                <div class='dropdown' v-on:click='dropdownClick($event)'>
                    <div class='search-container'>
                        <input ref='searchInput' placeholder='Search...' v-on:input='handleSearch($event)'>
                    </div>
                    <ul ref='optionsContainer' class='options-container'>
                        
                    </ul>
                    <div class='info'></div>
                    <div class='control-buttons'>
                        <div ref='confirmButton' class='button' v-on:click='closeDropdown($event)'>Confirm</div>
                    </div>
                </div>
            </div>
            <span ref='alert' class='alert'></span>
        </template>
        <template v-else-if='this.type === "file"'>
            <div class='label-text'>{{ label }}</div>
            <div ref='wrapper' v-bind:class='(this.haiInput.multiple === true) ? "file-zone-wrapper multiple" : "file-zone-wrapper"'>
                <div ref='message' class='message active'><strong>Drop a file here</strong><small>or click to select</small></div>
                <ul ref='files' class='files'>
                
                </ul>
                <input ref='innerFileInput' type='file' v-bind:multiple='this.multiple == true'>
            </div>
            <span ref='alert' class='alert'></span>
        </template>
        
        <template v-else>
            <label>
                <div class='label-text'>{{ label }}</div>
                <div class='input-wrapper'>
                    <input ref='input' type='text' :id='id' :name='name' :value='value' :inputmode='inputmode'
                            :placeholder='placeholder'
                            v-on:input='handleInput($event)' v-on:focusout='handleFocusOut($event)'
                            v-on:keydown='handleKeyAction($event)' v-on:wheel='handleWheel($event)'>
                </div>
                <span ref='alert' class='alert'></span>
            </label>
        </template>
        `
};