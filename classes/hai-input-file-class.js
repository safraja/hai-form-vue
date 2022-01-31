import {HaiInput} from './hai-input-class.js';

class HaiInputFile extends HaiInput
{
    files = new Map();
    multiple = false;
    filesContainer = null;
    messageContainer = null;

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
        this.value = this.element.value;
        this.rawValue = this.value;

        let twin = document.createElement('input');
        twin.name = name;
        twin.type = 'file';
        twin.hidden = true;
        twin.classList.add('hidden');

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
        fileUploadText.textContent = 'Drag and drop a file here';
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
        this.element = wrapper;

        this.element.haiInput = this;

        wrapper.addEventListener('dragover', (event) =>
        {
            event.preventDefault();
            wrapper.classList.add('aktivni_pretahovani');
        });

        wrapper.addEventListener('dragleave', (event) =>
        {
            wrapper.classList.remove('aktivni_pretahovani');
        });

        wrapper.addEventListener('drop', (event) =>
        {
            event.preventDefault();
            wrapper.classList.remove('aktivni_pretahovani');

            for(let file of event.dataTransfer.files)
            {
                this.addFile(file);
            }
        });


    }

    addFile(file)
    {
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
        this.saveValueToTwin();

        this.messageContainer.classList.remove('active');

        let fileItem = document.createElement('li');
        fileItem.classList.add('file');
        fileItem.setAttribute('data-key', key);

        let filePreview = document.createElement('figure');
        filePreview.classList.add('file-preview');

        let img = document.createElement('img');
        img.src = 'file.svg';
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

    processParameters()
    {
        super.processParameters();

        if(this.parameters.multiple !== undefined)
        {
            this.multiple = Boolean(this.parameters.multiple);
        }
    }

    handleInput(event)
    {

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