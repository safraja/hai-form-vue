import {
    HaiInput,
    HaiInputText,
    HaiInputNumber,
    HaiInputUrl,
    HaiInputSwitch,
    HaiInputFile
} from "../classes/hai-input-classes.js";

export default {
    name: 'hai-input',
    props: {
        // General attributes.
        'label': {
            'type': String
        },
        'input-id': {
            'type': String
        },
        'value': {
            'type': String,
            'default': ''
        },
        'mask': {
            'type': String
        },
        'placeholder': {
            'type': String
        },
        'type': {
            'type': String,
            'default': 'text'
        },
        'name': {
            'type': String
        },
        // Number type attributes.
        'min': {
            'type': Number,
        },
        'max': {
            'type': Number,
        }
        ,'allow-e-notation': {
            'type': Boolean,
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
        }
    },
    styles: ["@import './vue/styles.css'"],
    data()
    {
        return {
            id: '',
            innerType: '',
            innerOptions: '',
            inputmode: ''
        }
    },
    created()
    {
        this.innerType = this.type;
        this.assignObject();  // Assign a HaiInput object tu the element.
        this.haiInput.processParameters();

        if(this.type === 'switch')
        {
            this.haiInput.rawValue = this.haiInput.extractRawValue(this.value);
            this.haiInput.value = this.haiInput.formatValue(this.value);

            this.haiInput.convertOptionsToObjectArray();

            if(this.haiInput.variant === 'on/off')
            {
                if (this.haiInput.optionOnValue === null)
                {
                    this.haiInput.optionOnValue = this.haiInput.options[this.haiInput.options.length - 1].value;
                }
                else if (this.haiInput.options[0].value === this.haiInput.optionOnValue)
                {
                    this.haiInput.options = this.haiInput.options.reverse();
                }
            }
        }

    },
    mounted()
    {
        if(this.type === 'switch')
        {
            this.haiInput.element = this.$refs.wrapper;
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

        if(this.inputId !== undefined)
        {
            twin = document.querySelector("input#" + this.inputId);
            if (!twin)
            {
                twin = container.ownerDocument.createElement("input");
                twin.type = "hidden";
                //twin.classList.add("hidden-input");
                this.$el.parentNode.host.parentElement.appendChild(twin);
            }
        }
        else
        {
            twin = container.ownerDocument.createElement("input");
            twin.type = "hidden";
            this.$el.parentNode.host.parentElement.appendChild(twin);
        }

        if(this.name !== undefined)
        {
            twin.name = this.name;
        }
        if(this.inputId !== undefined)
        {
            twin.id = this.inputId;
        }
        else
        {
            let min = 1;
            let max = 100000000;
            let id = Math.floor(Math.random() * (max - min) + min);
            twin.id = `input-${id}`;
        }
        twin.value = this.value;
        this.haiInput.twin = twin;

        //TODO
        //test
        if(this.innerType === 'number')
        {
            this.inputmode = 'numeric';
            //console.log(this.inputmode);
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
                    parameters.push('mask');
                    break;

                case 'number':
                    this.haiInput = new HaiInputNumber();
                    parameters.push('mask', 'max', 'min', 'step', 'allowENotation', 'stripLeadingZeroes',
                        'decimalSeparator', 'delimiter', 'thousandsGroupStyle', 'enableValueFormation');
                    break;

                case "url":
                    this.haiInput = new HaiInputUrl();
                    parameters.push('mask', 'allowedSchemes', 'defaultScheme', 'requireHost', 'allowPart', 'stripPart');
                    break;

                case "switch":
                    this.haiInput = new HaiInputSwitch();
                    parameters.push('options', 'variant', 'optionOnValue', 'list');
                    break;

                case "file":
                    this.haiInput = new HaiInputFile();
                    parameters.push('multiple', 'maxFilesCount', 'maxFileSize', 'maxTotalSize', 'allowedFileTypes');
                    break;
            }

            for(let parameter of parameters)
            {
                if(this[parameter] !== undefined)
                {
                    this.haiInput.parameters[parameter] = this[parameter];
                }
            }

        },
        handleInput(event)
        {
            let result = this.haiInput.handleInput(event);

            if(this.innerType !== 'switch')
            {
                if(result.success === true)
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
        handleFocusOut(event)
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
                this.haiInput.twin.type = 'text';
                this.haiInput.twin.setCustomValidity(validity.message);
                this.haiInput.twin.addEventListener('invalid', fn);
            }
            else
            {
                this.$refs.alert.textContent = '';
                this.haiInput.twin.type = 'hidden';
                this.haiInput.twin.setCustomValidity('');
                this.haiInput.twin.removeEventListener('invalid', fn);
            }
        },
        handleKeyAction(event)
        {
            this.haiInput.handleKeyAction(event);
        },
        handleWheel(event)
        {
            this.haiInput.handleWheel(event);
        }
    },
    template: `
        <template v-if='this.type === "switch"'>
            <div class='label-text'>{{ label }}</div>
            <div ref='wrapper' class='switch-wrapper' v-bind:data-variant='this.haiInput.variant' 
                v-bind:data-state='(this.haiInput.optionOnValue === this.value) ? "on" : "off"'>
                <div class='option-group' v-on:click='handleInput($event)'>
                    <span v-if='this.haiInput.variant === "on/off"' ref='toggle' class='toggle'></span>
                    <label v-for='item in this.haiInput.options' class='option'>
                        <input type='radio' v-bind:VALUE='item.value'>
                        <span>{{ (this.haiInput.variant === 'multiple') ? item.label : '' }}</span>
                    </label>
                </div>
            </div>
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