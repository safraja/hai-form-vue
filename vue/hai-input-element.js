import {HaiInput, HaiInputText, HaiInputNumber, HaiInputUrl, HaiInputSwitch} from "../classes/hai-input-classes.js";

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
            'type': [String, Array, Object],
            'default': () => []
        },
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
    mounted()
    {
        this.innerType = this.type;
        this.AssignObject();  // Assign a HaiInput object tu the element.

        this.haiInput.rawValue = this.haiInput.extractRawValue(this.value);
        this.haiInput.value = this.haiInput.formatValue(this.value);

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
            console.log(this.inputmode);
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
        AssignObject()
        {
            switch (this.innerType)
            {
                case 'text':
                    this.haiInput = new HaiInputText();
                    break;

                case 'number':
                    this.haiInput = new HaiInputNumber();
                    if(this.max !== undefined)
                    {
                        this.haiInput.max = this.max;
                    }
                    if(this.min !== undefined)
                    {
                        this.haiInput.min = this.min;
                    }
                    break;

                case "url":
                    this.haiInput = new HaiInputUrl();
                    break;

                case "switch":
                    this.haiInput = new HaiInputSwitch();
                    break;
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
                this.$refs.wrapper.setAttribute('data-state', this.haiInput.rawValue);
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
            <div ref='wrapper' class='switch-wrapper' data-state='on'>
                <div class='option-group' v-on:click='handleInput($event)'>
                    <span ref='toggle' class='toggle'></span>
                    <label v-for='item in this.innerOptions' class='option'>
                        <input type='radio' v-bind:VALUE='item.value'>
                        <span></span>
                    </label>
                </div>
            </div>
        </template>
        <template v-else>
            <label>
                <div class='label-text'>{{ label }}</div>
                <input ref='input' type='text' :id='id' :name='name' :value='value' :inputmode='inputmode'
                            :placeholder='placeholder'
                            v-on:input='handleInput($event)' v-on:focusout='handleFocusOut($event)'
                            v-on:keydown='handleKeyAction($event)' v-on:wheel='handleWheel($event)'>
                <span ref='alert' class='alert'></span>
            </label>
        </template>
        `
};