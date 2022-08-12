import {HaiInput} from './hai-input-class.js';

/**
 *  Class representing a file input.
 * @extends HaiInput
 */
class HaiInputTextarea extends HaiInput
{
    /** @type {string} - Text content (stripped HTML) of the element (editor). */
    textContent = '';
    /** @type {string|null} - Maximum textContent length of text in the editor.*/
    maxLength = null;
    /** @type {string|null} - Minimum textContent length of text in the editor.*/
    minLength = null;
    /** @type {string|null} - Maximum innerHTML length of text in the editor.*/
    maxHtmlLength = null;
    /** @type {string|null} - The text of the placeholder for the editor.*/
    placeholder = null;
    /** @type {boolean} - Specifies whether to use the default button settings (if set to false, only those specified by property 'useDefaultButtonsSetting' will be added). */
    useDefaultButtonsSetting = true;
    /** @type {object} - Menu button settings. */
    buttonsSetting = {}
    /** @type {array<string>} - Allowed elements that can be used in the editor. */
    allowedHtmlElements = []

    /** @type {HTMLElement|null} -  Generated editor element. */
    editor = null;
    /** @type {HTMLElement|null} -  Generated toolbar element. */
    toolbar = null;
    /** @type {HTMLElement|null} - Generated message element. */
    messageContainer = null;


    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'textarea';
    }

    /** @override */
    async transformElementToHaiInput()
    {
        let name = this.element.name;
        this.value = this.element.value.replace(new RegExp('&nbsp;', 'g'), ' ');
        this.rawValue = this.element.value;

        let twin = document.createElement('input');
        twin.name = name;
        twin.type = 'text';
        twin.value = this.value;
        twin.hidden = true;
        twin.classList.add('hidden');

        await this.processAttributes();
        await this.processParameters();

        if (name !== undefined)
        {
            this.element.removeAttribute('name');
            twin.name = name;
        }

        if(this.disabled)
        {
            twin.disabled = true;
        }

        let textareaWrapper = document.createElement('div');
        textareaWrapper.classList.add('hai-input-element');
        textareaWrapper.classList.add('textarea');

        let labelDiv = document.createElement('div');
        labelDiv.classList.add('label-text');

        let warningDiv = document.createElement('div');
        warningDiv.classList.add('alert');

        let wrapper = document.createElement('div');
        wrapper.classList.add('textarea-zone-wrapper');
        wrapper.tabIndex = -1;


        let message = document.createElement('div');
        message.classList.add('message');
        message.classList.add('active');
        this.messageContainer = message;

        let toolbar = document.createElement('div');
        toolbar.classList.add('toolbar')
        wrapper.appendChild(toolbar);

        this.toolbar = toolbar;
        this.addToolbarButtons();

        let editorContainer = document.createElement('div');
        editorContainer.classList.add('editor');
        let editor = document.createElement('div');
        editor.classList.add('editor-content');
        editor.contentEditable = 'true';
        if(this.placeholder !== null)
        {
            editor.setAttribute('data-placeholder', this.placeholder);
        }
        if(this.value !== '')
        {
            editor.innerHTML = this.value;
            this.textContent = editor.textContent;
        }
        editor.addEventListener('focusout', (event) =>
        {
            this.handleFocusOut(event);
        });
        editorContainer.appendChild(editor);
        wrapper.appendChild(editorContainer);

        editor.addEventListener('input', (event) =>
        {
            this.handleInput(event);
        })

        editor.addEventListener('paste', (event) =>
        {
            event.preventDefault();

            if(this.readonly || this.disabled)
            {
                return;
            }

            let paste = (event.clipboardData || window.clipboardData).getData('text/html');


            paste = this.stripTags(paste, []);

            const selection = window.getSelection();
            if (!selection.rangeCount)
            {
                return;
            }
            selection.deleteFromDocument();
            const range = selection.getRangeAt(0);
            range.collapse(false);

            let div = document.createElement("div");
            div.innerHTML = paste;
            let frag = document.createDocumentFragment();
            let node;
            let lastNode;
            while (node = div.firstChild)
            {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            this.value = this.editor.innerHTML.replace(new RegExp('&nbsp;', 'g'), ' ');
            this.rawValue = this.editor.innerHTML;
            this.textContent = this.editor.textContent;
            this.saveValueToTwin();
        });

        textareaWrapper.append(labelDiv, wrapper, warningDiv, twin);
        this.element.after(textareaWrapper);
        this.element.remove();
        this.twin = twin;
        this.editor = editor;
        this.element = wrapper;
        this.labelElement = labelDiv;
        this.warningElement = warningDiv;

        if (this.label !== undefined)
        {
            labelDiv.textContent = this.label;
        }
        this.element.haiInput = this;

        let form = twin.form;
        if(form !== null)
        {
            form.addEventListener('submit', (event) =>
            {
                let validity = this.checkValidity();
                if(validity.success === false)
                {
                    event.preventDefault();
                    this.updateValidity(validity, this.element);
                    return false;
                }
                return true;
            });
        }
    }

    /** @override */
    checkValidity()
    {
        let superValidity = super.checkValidity();

        if(superValidity.success === false)
        {
            return superValidity;
        }

        if(this.maxLength !== null && this.textContent.length > this.maxLength)
        {
            return {success: false, message: HaiInput.dictionary['max-length-exceeded']
                    .replace('{{maxLength}}', this.maxLength)};
        }

        if(this.maxHtmlLength !== null && this.value.length > this.maxHtmlLength)
        {
            return {success: false, message: HaiInput.dictionary['max-formatted-length']
                    .replace('{{maxHtmlLength}}', this.maxHtmlLength)};
        }

        if(this.minLength !== null && this.textContent.length < this.minLength)
        {
            return {success: false, message: HaiInput.dictionary['min-length-exceeded']
                    .replace('{{minLength}}', this.minLength)};
        }

        return {success: true};
    }

    /**
     * Formats text based on a given command.
     *
     * @param command {string} - Command to be executed.
     * @param argument {string} - Command parameters.
     */
    formatText(command, argument = '')
    {
        document.execCommand(command, false, argument);
        this.editor.focus();
    }

    /** @override */
    handleFocusOut(event)
    {
        if(this.editor.innerHTML.trim() === '<br>' || this.value.trim() === '<br>')
        {
            this.editor.innerHTML = '';
            this.value = '';
            this.rawValue = '';
            this.textContent = '';
        }

        let validity = this.checkValidity();
        this.updateValidity(validity, event.target);
    }

    /**
     * Adds buttons to the editor toolbar.
     */
    addToolbarButtons()
    {
        let buttonsSetting = this.getButtonsSetting();

        for (const [key, buttonSetting] of Object.entries(buttonsSetting))
        {
            if(buttonSetting.use)
            {
                this.addToolbarButton(buttonSetting)
            }
        }
    }

    /**
     * Adds specific buttons to the editor toolbar based on the specified settings.
     *
     * @param buttonSetting {object} - Settings of the added button.
     */
    addToolbarButton(buttonSetting)
    {
        if(typeof buttonSetting.formatCommand === 'string')
        {
            if((typeof document.queryCommandSupported === 'function'
                && document.queryCommandSupported(buttonSetting.formatCommand) === false))
            {   // If execCommand function (or its command) is not supported, skip button.
                console.warn(`HaiForm: Command "${buttonSetting.formatCommand}" is not supported, button not added.`)
                return;
            }
            else if(typeof document.execCommand !== 'function')
            {   // If execCommand function (or its command) is not supported, skip button.
                console.warn(`HaiForm: execCommand function is not supported, button not added..`)
                return;
            }
        }

        let newButton = document.createElement('button');
        newButton.innerHTML = buttonSetting.icon;
        newButton.title = buttonSetting.title;
        newButton.type = 'button';

        newButton.addEventListener('click', (event) =>
        {
            this.formatText(buttonSetting.formatCommand);
            this.handleInput(event);
        });
        this.toolbar.appendChild(newButton);
    }


    /** @override */
    processParameters(parameters = null)
    {
        if(parameters === null)
        {
            parameters = this.parameters;
        }

        super.processParameters(parameters);

        if (parameters.placeholder !== undefined)
        {
            if(typeof parameters.placeholder !== 'string')
            {
                console.warn(`HaiForm: Parameter "placeholder" must be a string.`);
            }
            else
            {
                this.placeholder = parameters.placeholder;
            }
        }

        if(parameters.maxLength !== undefined)
        {
            if(isNaN(parameters.maxLength) === true)
            {
                console.warn(`HaiForm: Parameter "maxLength" must be a number, reverting back to null.`);
            }
            else
            {
                this.maxLength = parameters.maxLength;
            }
        }

        if(parameters.maxHtmlLength !== undefined)
        {
            if(isNaN(parameters.maxHtmlLength) === true)
            {
                console.warn(`HaiForm: Parameter "maxHtmlLength" must be a number, reverting back to null.`);
            }
            else
            {
                this.maxHtmlLength = parameters.maxHtmlLength;
            }
        }

        if(parameters.minLength !== undefined)
        {
            if(isNaN(parameters.minLength) === true)
            {
                console.warn(`HaiForm: Parameter "minLength" must be a number, reverting back to null.`);
            }
            else
            {
                this.minLength = parameters.minLength;
            }
        }

        if (parameters.placeholder !== undefined)
        {
            if(typeof parameters.placeholder !== 'string')
            {
                console.warn(`HaiForm: Parameter "placeholder" must be a string.`);
            }
            else
            {
                this.placeholder = parameters.placeholder;
            }
        }

        if (parameters.useDefaultButtonsSetting !== undefined)
        {
            this.useDefaultButtonsSetting = Boolean(parameters.useDefaultButtonsSetting);
        }

        if (parameters.buttonsSetting !== undefined)
        {
            if(typeof parameters.buttonsSetting !== 'object')
            {
                console.warn('HaiForm: Parameter "buttonsSetting" must by an object.');
            }
            else
            {
                this.buttonsSetting = parameters.buttonsSetting;
            }
        }

        if (parameters.allowedHtmlElements !== undefined)
        {
            if(Array.isArray(parameters.allowedHtmlElements) === false)
            {
                console.warn('HaiForm: Parameter "allowedHtmlElements" must be an array of strings.');
            }
            else
            {
                for (let element of parameters.allowedHtmlElements)
                {
                    if(typeof element === 'string')
                    {
                        this.allowedHtmlElements.push(element);
                    }
                    else
                    {
                        console.warn(`HaiForm: Items of  parameter "allowedHtmlElements" must be a string, ${typeof element} given, skipping.`);
                    }
                }
            }
        }

    }

    /** @override */
    handleInput(event)
    {
        if(this.readonly || this.disabled)
        {
            this.editor.innerHTML = this.value.replace(new RegExp(' ', 'g'), '&nbsp;');
            return {success: false};
        }

        this.value = this.editor.innerHTML.replace(new RegExp('&nbsp;', 'g'), ' ');
        this.rawValue = this.editor.innerHTML;
        this.textContent = this.editor.textContent;
        this.saveValueToTwin();
        return {success: true};
    }

    getButtonsSetting()
    {
        let defaultButtonsSetting =
            {
                undo: {use: true, title: 'Undo', formatCommand: 'undo', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"/></svg>'},
                redo: {use: true, title: 'Redo', formatCommand: 'redo', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.115 3.515c4.617-4.618 12.056-4.676 16.756-.195l2.129-2.258v7.938h-7.484l2.066-2.191c-2.82-2.706-7.297-2.676-10.073.1-4.341 4.341-1.737 12.291 5.491 12.291v4.8c-3.708 0-6.614-1.244-8.885-3.515-4.686-4.686-4.686-12.284 0-16.97z"/></svg>'},
                bold: {use: true, title: 'Bold', formatCommand: 'bold', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.287 11.121c1.588-1.121 2.713-3.018 2.713-5.093 0-2.946-1.918-5.951-7.093-6.028h-11.907v2.042c1.996 0 3 .751 3 2.683v14.667c0 1.689-.558 2.608-3 2.608v2h11.123c6.334 0 8.877-3.599 8.877-7.038 0-2.538-1.417-4.67-3.713-5.841zm-8.287-8.121h2.094c2.357 0 4.126 1.063 4.126 3.375 0 2.035-1.452 3.625-3.513 3.625h-2.707v-7zm2.701 18h-2.701v-8h2.781c2.26.024 3.927 1.636 3.927 3.667 0 2.008-1.226 4.333-4.007 4.333z"/></svg>'},
                italic: {use: true, title: 'Italic', formatCommand: 'italic', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.565 20.827c-.361.732-.068 1.173.655 1.173h1.78v2h-9v-2h.897c1.356 0 1.673-.916 2.157-1.773l8.349-16.89c.403-.852-.149-1.337-.855-1.337h-1.548v-2h9v2h-.84c-1.169 0-1.596.646-2.06 1.516l-8.535 17.311z"/></svg>'},
                underline: {use: true, title: 'Underline', formatCommand: 'underline', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 24h-16v-2h16v2zm-5-24v1.973c1.619 0 2 .926 2 1.497v9.056c0 2.822-2.161 4.507-5 4.507s-5-1.685-5-4.507v-9.056c0-.571.381-1.497 2-1.497v-1.973h-7v1.973c1.66 0 2 .575 2 1.497v8.828c0 5.175 3.096 7.702 8 7.702 4.899 0 8-2.527 8-7.702v-8.828c0-.922.34-1.497 2-1.497v-1.973h-7z"/></svg>'},
                strikeThrough: {use: true, title: 'Strike', formatCommand: 'strikethrough', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.271 14.521c.358.74.728 1.803.728 2.818 0 4.658-4 6.661-8.498 6.661-2.183 0-4.483-.472-6.5-1.341v-4.659h2c.227 1.809 1.875 3 4.444 3 2.503 0 4.415-1.046 4.63-3.28.127-1.321-.65-2.451-1.653-3.199h4.849zm-4.583-3.521c-3.124-1.398-6.281-2.75-5.639-5.669.714-3.244 7.265-3.206 7.951.669h1.979v-5.109c-2.028-.604-3.936-.891-5.649-.891-4.927 0-8.252 2.375-8.252 6.454 0 1.899.862 3.554 2.113 4.546h-7.191v2h24v-2h-9.312z"/></svg>'},
                justifyLeft: {use: true, title: 'Left align', formatCommand: 'justifyleft', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3h-24v-2h24v2zm-12 3h-12v2h12v-2zm12 5h-24v2h24v-2zm-12 5h-12v2h12v-2zm12 5h-24v2h24v-2z"/></svg>'},
                justifyCenter: {use: true, title: 'Center align', formatCommand: 'justifycenter', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3h-24v-2h24v2zm-6 3h-12v2h12v-2zm6 5h-24v2h24v-2zm-6 5h-12v2h12v-2zm6 5h-24v2h24v-2z"/></svg>'},
                justifyRight: {use: true, title: 'Right align', formatCommand: 'justifyright', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1h24v2h-24v-2zm12 7h12v-2h-12v2zm-12 5h24v-2h-24v2zm12 5h12v-2h-12v2zm-12 5h24v-2h-24v2z"/></svg>'},
                justifyFull: {use: true, title: 'Justify', formatCommand: 'justifyfull', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1h24v2h-24v-2zm0 7h24v-2h-24v2zm0 5h24v-2h-24v2zm0 5h24v-2h-24v2zm0 5h24v-2h-24v2z"/></svg>'},
                orderedList: {use: true, title: 'Ordered list', formatCommand: 'insertorderedlist', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 1h17v2h-17v-2zm0 7h17v-2h-17v2zm0 5h17v-2h-17v2zm0 5h17v-2h-17v2zm0 5h17v-2h-17v2zm-5.511-16h1.353v-6h-1.14c0 .91-.809 1.07-1.702 1.111v1h1.489v3.889zm2.433 6.667h-1.827c.823-.74 1.722-1.627 1.722-2.782 0-1.145-.762-1.885-1.941-1.885-.642 0-1.288.204-1.833.656l.423 1.148c.352-.279.715-.524 1.167-.524.486 0 .754.255.754.717-.008.774-.858 1.527-2.387 3.018v.958h3.922v-1.306zm-.87 6.124c.499-.266.771-.715.771-1.288 0-.748-.568-1.503-1.836-1.503-.571 0-1.241.142-1.74.482l.307 1.161c.432-.284.831-.394 1.15-.394.428 0 .674.174.674.478 0 .425-.52.538-.827.538h-.577v1.154h.601c.438 0 .949.183.949.701 0 .39-.329.633-.86.633-.451 0-.887-.163-1.282-.397l-.304 1.2c.5.322 1.11.444 1.675.444 1.344 0 2.247-.728 2.247-1.812 0-.646-.371-1.178-.948-1.397z"/></svg>'},
                unorderedList: {use: true, title: 'Dotted list', formatCommand: 'insertunorderedlist', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 1h17v2h-17v-2zm0 7h17v-2h-17v2zm0 5h17v-2h-17v2zm0 5h17v-2h-17v2zm0 5h17v-2h-17v2zm-5-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 9c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm0 9c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"/></svg>'},
                subscript: {use: true, title: 'Subscript', formatCommand: 'subscript', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 22.469h-2.311c1.041-.867 2.178-1.907 2.178-3.26 0-1.342-.963-2.209-2.453-2.209-.813 0-1.631.238-2.318.769l.535 1.345c.445-.327.905-.614 1.477-.614.615 0 .954.299.954.84-.012.907-1.129 1.79-3.062 3.536v1.124h5v-1.531zm-7-6.469v2h-4.778l-3.751-5.938-3.521 5.938h-4.95v-2h1.08c.654 0 1.259-.358 1.594-.914l3.634-6.091-3.73-6.144c-.341-.531-.932-.853-1.568-.853h-1.01v-1.998h4.611l3.86 5.964 4.09-5.964h4.439v1.998h-.838c-.637 0-1.228.322-1.568.853l-3.96 6.144 3.864 6.091c.334.556.94.914 1.594.914h.908z"/></svg>'},
                superscript: {use: true, title: 'Superscript', formatCommand: 'superscript', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 5.469h-2.31c1.041-.867 2.178-1.907 2.178-3.26 0-1.342-.964-2.209-2.454-2.209-.813 0-1.63.238-2.317.769l.535 1.345c.444-.327.904-.614 1.475-.614.616 0 .955.299.955.84-.012.907-1.129 1.79-3.062 3.536v1.124h5v-1.531zm-7 16.531v2h-4.778l-3.751-5.938-3.521 5.938h-4.95v-2h1.08c.654 0 1.259-.358 1.594-.914l3.634-6.091-3.73-6.144c-.341-.531-.932-.853-1.568-.853h-1.01v-1.998h4.611l3.86 5.964 4.09-5.964h4.439v1.998h-.838c-.636 0-1.227.322-1.567.853l-3.96 6.144 3.864 6.091c.334.556.939.914 1.593.914h.908z"/></svg>'},
            };

        if (this.useDefaultButtonsSetting === false)
        {
            defaultButtonsSetting = {};
        }

        let buttonsSetting =
        {
            ...defaultButtonsSetting,
            ...this.buttonsSetting
        }

        return buttonsSetting;
    }

    /**
     * Removes disallowed elements from the text.
     * (This is a slightly modified function from the Locutus library - https://locutus.io/)
     *
     * @param input {string} - Text to be cleaned.
     * @param allowed {array<string>} - Allowed elements.
     * @returns {string} - Cleaned text.
     */
    stripTags(input, allowed)
    {
        const tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
        const commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

        let after = input;
        // removes tha '<' char at the end of the string to replicate PHP's behaviour
        after = (after.substring(after.length - 1) === '<') ? after.substring(0, after.length - 1) : after;

        // recursively remove tags to ensure that the returned string doesn't contain forbidden tags after previous passes (e.g. '<<bait/>switch/>')
        while (true)
        {
            const before = after;
            after = before.replace(commentsAndPhpTags, '')
                .replace(tags, function ($0, $1)
                {
                    return allowed.indexOf($1.toLowerCase()) > -1 ? $0 : '';
                })

            // return once no more tags are removed
            if (before === after)
            {
                return after;
            }
        }
    }

}

export {HaiInputTextarea};