import { defineCustomElement } from 'https://cdn.jsdelivr.net/npm/vue@3.2.19/dist/vue.esm-browser.js'

import HaiInputElement from './vue/hai-input-element.js'

const HaiText = defineCustomElement(HaiInputElement);


function register()
{
    customElements.define('hai-input', HaiText)
}

export {HaiText, register}
