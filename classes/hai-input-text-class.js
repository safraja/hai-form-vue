import {HaiInput} from './hai-input-class.js';

class HaiInputText extends HaiInput
{
    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'text';
    }

    handleInput(event)
    {
        let value = event.target.value;

        if(event.target.mask != null)
        {
            let value = event.target.value;

            let new_value = '';
        }

        this.value = value;
        this.saveValueToTwin();
        return {success: true};
    }
}

export {HaiInputText};