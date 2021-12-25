import {HaiInput} from './hai-input-class.js';

class HaiInputText extends HaiInput
{
    constructor(type = 'text', element = null)
    {
        super(type, element);
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