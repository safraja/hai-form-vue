# Hai Form
Javascript library for custom inputs and selects with additional features.

## [Demo](https://haikner.cz/hai-form/demo-vue.php)

## Supported field types
| Field type   | Main feature |
| ------------ | ------------ |
| Text input   | Text masking |
| Number input | Numeral formatting |
| URL input    | Validation by URL parts |
| File input   | Drag and Drop support |
| Select       | Tagging and search support |
| Switch       | 2 variants (on/off and multiple)|

## Who is the Hai Form library for?
The purpose of the Hai Form library is to provide a basic solution for the most common form field needs. The intention is to cover as many fields as possible so that web developers do not have to use a large number of external libraries when creating forms. 

At the same time however, it is not planned to address any field type very deeply. There is a huge number of specialized libraries that focus specifically on particular field types, and the Hai Form library does not aim to try to outdo these libraries. 

So if you are happy with a somewhat more basic solution (such as text masks) and don't need any more complex functionality for your forms, the Hai Form library may be ideal for you, otherwise I recommend taking a look at many great libraries listed below that served as inspiration for the Hai Form library.

## Installation
Download the library files from the 'dist' directory and place them in a directory on your website. After that, download file hai-input-vue.css and place it to your main directory.

## Usage
After downloading the library, you first need to import defineCustomElement function from Vue and HaiInputElement from downloaded library. After that, create HaiInput constant and define the new custom element.
```html
<script type='module'>
    import { defineCustomElement } from 'https://cdn.jsdelivr.net/npm/vue@3.2.19/dist/vue.esm-browser.js';
    import HaiInputElement from '/your-path/hai-input-element.js';
    
    const HaiInput = defineCustomElement(HaiInputElement);
    
    customElements.define('hai-input', HaiInput);
</script>
```

You can then simply start using the hai-input element instead of traditional inputs
```html
<hai-input
        label='Code'
        type='url'
        name='code'
        mask='000 - AAA'
        placeholder='000 - AAA'>
</hai-input>
```

## Dependencies
The [Fuse.js](https://github.com/krisk/fuse) library is used for searching (filtering) options in selects.

## Inspiration and alternatives
This library was created as part of a thesis, inspiration for its creation was taken from the projects below.

## Vanilla JS version
The primary version of the Hai Form library is developed for use with vanilla JS and is available here:
[https://github.com/safraja/hai-form](https://github.com/safraja/hai-form)

### Masking
- [https://github.com/nosir/cleave.js](https://github.com/nosir/cleave.js)
- [https://github.com/vuejs-tips/vue-the-mask](https://github.com/vuejs-tips/vue-the-mask)
- [https://github.com/uNmAnNeR/imaskjs](https://github.com/uNmAnNeR/imaskjs)
- [https://github.com/text-mask/text-mask](https://github.com/text-mask/text-mask)
- [https://github.com/igorescobar/jQuery-Mask-Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin)
- [https://github.com/estelle/input-masking](https://github.com/estelle/input-masking)
- [https://github.com/vanilla-masker/vanilla-masker](https://github.com/vanilla-masker/vanilla-masker)

### Selects
- [https://github.com/Choices-js/Choices](https://github.com/Choices-js/Choices)
- [https://github.com/select2/select2](https://github.com/select2/select2)
- [https://github.com/sergiodlopes/jquery-flexdatalist](https://github.com/sergiodlopes/jquery-flexdatalist)
- [https://github.com/yairEO/tagify](https://github.com/yairEO/tagify)

### FIle uploads
- [https://github.com/dropzone/dropzone](https://github.com/dropzone/dropzone)
- [https://github.com/pqina/filepond](https://github.com/pqina/filepond)
- [https://github.com/ProgerXP/FileDrop](https://github.com/ProgerXP/FileDrop)
- [https://github.com/transloadit/uppy](https://github.com/transloadit/uppy)


## License
MIT Licence
