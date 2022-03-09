import {HaiInput} from './hai-input-class.js';

class HaiInputFile extends HaiInput
{
    files = new Map();
    multiple = false;
    maxFilesCount = null;
    maxFileSize = null;
    maxTotalSize = null;
    allowedFileTypes = null;
    filesContainer = null;
    messageContainer = null;
    innerFileInput = null;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'file';
    }

    saveValueToTwin()
    {
        let dataTransfer = new DataTransfer()
        for(let [key, file] of this.files)
        {
            dataTransfer.items.add(file);
        }
        this.twin.files = dataTransfer.files;
    }

    transformElementToHaiInput()
    {
        let name = this.element.name;
        this.value = '';
        this.rawValue = '';

        let twin = document.createElement('input');
        twin.name = name;
        twin.type = 'file';
        twin.hidden = true;
        twin.classList.add('hidden');

        this.processAttributes();
        this.processParameters();

        if (name !== undefined)
        {
            this.element.removeAttribute('name');
            twin.name = name;
        }

        let fileWrapper = document.createElement('div');
        fileWrapper.classList.add('hai-input-element');
        fileWrapper.classList.add('file');

        let labelDiv = document.createElement('div');
        labelDiv.classList.add('label-text');

        let warningDiv = document.createElement('div');
        warningDiv.classList.add('alert');

        let wrapper = document.createElement('div');
        wrapper.classList.add('file-zone-wrapper');
        wrapper.tabIndex = -1;
        if(this.multiple === true)
        {
            wrapper.classList.add('multiple');
            twin.multiple = true;
            this.element.multiple = true;
        }
        else
        {
            wrapper.classList.add('single');
            twin.multiple = false;
            this.element.multiple = false;
        }

        let message = document.createElement('div');
        message.classList.add('message');
        message.classList.add('active');
        this.messageContainer = message;

        let fileUploadText = document.createElement('strong');
        fileUploadText.textContent = 'Drag & drop a file here';
        message.appendChild(fileUploadText);
        wrapper.appendChild(message);

        let filesContainer = document.createElement('ul');
        filesContainer.classList.add('files');
        this.filesContainer = filesContainer;
        wrapper.appendChild(filesContainer);

        fileWrapper.append(labelDiv, wrapper, warningDiv, twin);
        this.element.after(fileWrapper);
        wrapper.appendChild(this.element);
        this.twin = twin;
        this.innerFileInput = this.element;
        this.element = wrapper;
        this.labelElement = labelDiv;
        this.warningElement = warningDiv;

        if(this.label !== undefined)
        {
            labelDiv.textContent = this.label;
        }
        this.element.haiInput = this;

        wrapper.addEventListener('dragover', (event) =>
        {
            event.preventDefault();
            this.warningElement.textContent = '';
            wrapper.classList.add('active-dragover');
        });

        wrapper.addEventListener('dragleave', (event) =>
        {
            wrapper.classList.remove('active-dragover');
        });

        wrapper.addEventListener('drop', (event) =>
        {
            event.preventDefault();
            wrapper.classList.remove('active-dragover');

            for(let file of event.dataTransfer.files)
            {
                this.addFile(file);
            }
        });

        wrapper.addEventListener('click', (event) =>
        {
            this.handleInput(event);
        });

        this.innerFileInput.addEventListener('change', (event) =>
        {
            for(let file of this.innerFileInput.files)
            {
                this.addFile(file);
            }

            let dataTransfer = new DataTransfer();
            this.innerFileInput.files = dataTransfer.files; // Empty the file input.
        });
    }

    checkValidity(file)
    {
        let superValidity = super.checkValidity();

        if(superValidity.success === false)
        {
            return superValidity;
        }

        if(this.maxFilesCount !== null && this.maxFilesCount < this.files.size + 1)
        {
            return {success: false, message: `The file could not be selected, only ${this.maxFilesCount} files can by selected.`};
        }

        if(this.maxFileSize !== null && this.maxFileSize < file.size)
        {
            console.log(file.size, this.maxFileSize, this.formatBytes(file.size), this.formatBytes(this.maxFileSize))
            return {success: false, message: `The file could not be selected because it exceeds 
                the maximum allowed size of ${this.formatBytes(this.maxFileSize)}.`};
        }

        let totalFilesSize = file.size;
        for(const [key, file] of this.files)
        {
            totalFilesSize += file.size;
        }

        if(this.maxTotalSize !== null && this.maxTotalSize < totalFilesSize)
        {
            return {success: false, message: `The file could not be selected because the total maximum file
                size of ${this.formatBytes(this.maxTotalSize)} was exceeded.`};
        }

        if(this.allowedFileTypes !== null)
        {
            let isAllowed = false;

            for (const type of this.allowedFileTypes)
            {
                if (
                    (/.*?\/\*/.test(type) === true && file.type.startsWith(type.slice(0, type.length - 2))) || // image/*, text/* etc.
                    (/.*?\/.*/.test(type) && type === file.type) ||     // image/jpg, image/png, text/plain etc.
                    (/^\..*/.test(type) && file.name.endsWith(type))    // .jpg, .txt etc.
                )
                {
                    isAllowed = true;
                    break;
                }
            }

            if (isAllowed === false)
            {
                return {success: false, message: `The file could not be selected because its type is not allowed.`};
            }
        }

        return {success: true};
    }

    addFile(file)
    {
        let validity = this.checkValidity(file);
        if(validity.success === false)
        {
            this.warningElement.textContent = validity.message;
            return;
        }

        let key = file.name;

        if(this.files.has(key) === true)
        {
            let i = 1;
            while (this.files.has(`${file.name} (${i})`) === true)
            {
                i++;
            }
            key = `${file.name} (${i})`;
        }

        this.files.set(key, file);
        this.rawValue = Array.from(this.files.keys()).join(',');
        this.value = this.rawValue;
        this.saveValueToTwin();

        this.messageContainer.classList.remove('active');

        let fileItem = document.createElement('li');
        fileItem.classList.add('file');
        fileItem.setAttribute('data-key', key);

        let filePreview = document.createElement('figure');
        filePreview.classList.add('file-preview');

        let img = document.createElement('img');
        img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYgMGgtMTR2MjRoMjB2LTE4bC02LTZ6bTAgM2wzIDNoLTN2LTN6bS0xMiAxOXYtMjBoMTB2Nmg2djE0aC0xNnoiLz48L3N2Zz4=';
        filePreview.appendChild(img);

        if(file.type.startsWith('image/') === true)
        {
            this.loadImageToElement(file, img);
        }

        let fileName = document.createElement('figcaption');

        let nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = file.name;
        fileName.appendChild(nameElement);

        let sizeElement = document.createElement('div');
        sizeElement.classList.add('size');
        sizeElement.textContent = this.formatBytes(file.size);
        fileName.appendChild(sizeElement);

        filePreview.appendChild(fileName);
        fileItem.appendChild(filePreview);

        let close = document.createElement('div');
        close.classList.add('close');
        close.textContent = '🗙';
        close.title = 'Remove file';
        fileItem.appendChild(close);
        this.filesContainer.appendChild(fileItem);

        close.addEventListener('click', (event) =>
        {
            this.removeFile(key);
        });
    }

    removeFile(key)
    {
        this.files.delete(key);
        this.rawValue = Array.from(this.files.keys()).join(',');
        this.value = this.rawValue;
        this.saveValueToTwin();

        let element = this.element.querySelector(`.file[data-key='${key}']`);
        element.remove();

        if(this.files.size === 0)
        {
            this.messageContainer.classList.add('active');
        }
    }

    loadImageToElement(file, imgElement)
    {
        let reader = new FileReader();

        reader.addEventListener('load', (event) =>
        {
            //console.log(event.target.result)
            imgElement.setAttribute('src', event.target.result);
        });

        reader.addEventListener('progress', (event) =>
        {
            if (event.loaded && event.total)
            {
                let percent = (event.loaded / event.total) * 100;
                //console.log(`Progress: ${Math.round(percent)}`); TODO
            }
        });

        reader.readAsDataURL(file);
    }

    processParameters(parameters = null)
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

        if(parameters.maxFilesCount !== undefined)
        {
            if(isNaN(parameters.maxFilesCount) === true)
            {
                console.warn(`HaiForm: Parameter "maxFilesCount" must be a number.`);
            }
            else
            {
                this.maxFilesCount = parameters.maxFilesCount;
            }
        }

        if(parameters.maxFileSize !== undefined)
        {
            if(isNaN(parameters.maxFileSize) === true)
            {
                console.warn(`HaiForm: Parameter "maxFileSize" must be a number.`);
            }
            else
            {
                this.maxFileSize = parameters.maxFileSize;
            }
        }

        if(parameters.maxTotalSize !== undefined)
        {
            if(isNaN(parameters.maxTotalSize) === true)
            {
                console.warn(`HaiForm: Parameter "maxTotalSize" must be a number.`);
            }
            else
            {
                this.maxTotalSize = parameters.maxTotalSize;
            }
        }

        if(parameters.allowedFileTypes !== undefined)
        {
            if(typeof parameters.allowedFileTypes === 'string')
            {
                parameters.allowedFileTypes = parameters.allowedFileTypes.split(',');
            }

            if(Array.isArray(parameters.allowedFileTypes))
            {
                this.allowedFileTypes = parameters.allowedFileTypes;
            }
            else
            {
                console.warn(`HaiForm: Parameter "allowedFileTypes" must be an array or a string.`);
            }
        }
    }

    handleInput(event)
    {
        this.warningElement.textContent = '';

        if(event.target === this.innerFileInput)
        {
            return;
        }

        let fileItem = event.target.closest('.file');
        if(fileItem !== null)
        {
            if(fileItem.parentElement === null)
            {   // Detect deleted element.
                return;
            }
            if(fileItem.parentElement.closest('.hai-input-element') !== null)
            {   // If user clicked on file item, do nothing.
                return;
            }
        }

        this.innerFileInput.click();
    }

    formatBytes(bytes, decimals = 2)
    {
        if (bytes === 0)
        {
            return '0 Bytes';
        }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}

export {HaiInputFile};