# Hai Form
Javascript library for custom inputs and selects with additional features.

## [Demo](https://haikner.cz/hai-form/)

## Supported field types
| Field type     | Main feature |
| ------------   | ------------ |
| Text input     | Text masking |
| Password input | Password strength check |
| Number input   | Numeral formatting |
| URL input      | Validation by URL parts |
| File input     | Drag and Drop support |
| Select         | Tagging and search support |
| Switch         | 2 variants (on/off and multiple) |
| Textarea       | Basic WYSIWYG editor |

## Who is the Hai Form library for?
The purpose of the Hai Form library is to provide a basic solution for the most common form field needs. The intention is to cover as many fields as possible so that web developers do not have to use a large number of external libraries when creating forms.

At the same time however, it is not planned to address any field type very deeply. There is a huge number of specialized libraries that focus specifically on particular field types, and the Hai Form library does not aim to try to outdo these libraries.

So if you are happy with a somewhat more basic solution (such as text masks) and don't need any more complex functionality for your forms, the Hai Form library may be ideal for you, otherwise I recommend taking a look at many great libraries listed below that served as inspiration for the Hai Form library.

## Instalation
Download the library files from the 'dist' directory. You can choose between a basic version ('basic' directory) or a version with included external libraries ('with-dependencies').

## Usage
After downloading the library, import it and insert its CSS styles.
```html
<script type='module'>
   import { HaiInput } from "/your-path/hai-input-class.esm.min.js";
</script>

<link rel='stylesheet' href='/your-path/hai-input.css'>

<!-- If you want, you can also use styles with a dark theme (but the basic hai-input.css is always necessary) -->
<link rel='stylesheet' href='/your-path/hai-input-dark.css' media='(prefers-color-scheme: dark)'>
```

You can then set the language of the alerts and user error messages.
```html
<!-- Either you can specify the language code corresponding to one of the supported languages (the files are located in the /src/classes/languages directory): -->
<script>
   HaiInput.changeLanguage({
       newLangCode: 'cs'
   });
</script>
  
<!-- Or you can provide the URL to your own dictionary: -->
<script>
   HaiInput.changeLanguage({
       filePath: '/path/to/your/dictionary.js'
   });
</script>
  
<!-- Or you can directly use a translation object: -->
<script>
   HaiInput.changeLanguage({
       dictionary: {
          'port-forbidden': `We do not allow this port.`,
          'path-forbidden': `This part of the url is not allowed.`,
       }
   });
</script>  
```

You can then start using the library via the HaiInput.create() function. The first parameter specifies the type of form field you want to use, the second is the element to be transformed, and the third contains the specific settings for that field.
```html
<script async>
  let field = document.getElementById('name');
  let parameters = {mask: '000 - AAA', label: 'Code', placeholder: '000 - AAA'};
  await HaiInput.create('text', field, parameters);
</script>
```

## Dependencies
The [Fuse.js](https://github.com/krisk/fuse) library is used for searching (filtering) options in selects.

## Inspiration and alternatives
This library was created as part of a thesis, inspiration for its creation was taken from the projects below.

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

### File uploads
- [https://github.com/dropzone/dropzone](https://github.com/dropzone/dropzone)
- [https://github.com/pqina/filepond](https://github.com/pqina/filepond)
- [https://github.com/ProgerXP/FileDrop](https://github.com/ProgerXP/FileDrop)
- [https://github.com/transloadit/uppy](https://github.com/transloadit/uppy)

### WYSIWYG
- [https://github.com/ckeditor/ckeditor5](https://github.com/ckeditor/ckeditor5)
- [https://github.com/quilljs/quill](https://github.com/quilljs/quill)
- [https://github.com/codex-team/editor.js](https://github.com/codex-team/editor.js)
- [https://github.com/nhn/tui.editor](https://github.com/nhn/tui.editor)


## License
MIT Licence