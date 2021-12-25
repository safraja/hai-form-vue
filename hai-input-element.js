import {HaiInput, HaiInputText, HaiInputNumber, HaiInputUrl} from "./classes/hai-input-classes.js";

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
        }
    },
    styles: ["@import './styles.css'"],
    data()
    {
        return {
            innerType: '',
            inputmode: ''
        }
    },
    mounted()
    {
        this.innerType = this.type;
        this.AssignObject();  // Assign a HaiInput object tu the element.

        this.haiInput.rawValue = this.haiInput.extractRawValue(this.value);
        this.haiInput.value = this.haiInput.formatValue(this.value);

        let twin = document.querySelector("input#" + this.inputId);
        if (!twin)
        {
            twin = container.ownerDocument.createElement("input");
            twin.type = "hidden";
            //twin.classList.add("hidden-input");
            this.$el.parentNode.host.parentElement.appendChild(twin);
        }
        if(this.name !== undefined)
        {
            twin.name = this.name;
        }
        twin.id = this.inputId;
        twin.value = this.value;
        this.haiInput.twin = twin;

        //TODO
        //test
        if(this.innerType === 'number')
        {
            this.inputmode = 'numeric';
            console.log(this.inputmode);
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
                {
                    this.haiInput = new HaiInputUrl();
                }
            }
        },
        handleInput(event)
        {
            let result = this.haiInput.handleInput(event);
            if(result.success === true)
            {
                this.$refs.alert.textContent = '';
            }
            else
            {
                this.$refs.alert.textContent = result.message;
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
    template: `<label :for='inputId'>{{ label }}</label>
                    <input ref='input' type='text' :name='name' :id='inputId' :value='value' :inputmode='inputmode'
                        :placeholder='placeholder'
                        v-on:input='handleInput($event)' v-on:focusout='handleFocusOut($event)'
                        v-on:keydown='handleKeyAction($event)' v-on:wheel='handleWheel($event)'>
               <span ref='alert' class='alert'></span>`
};