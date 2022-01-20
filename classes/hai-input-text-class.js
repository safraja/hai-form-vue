import {HaiInput} from './hai-input-class.js';

class HaiInputText extends HaiInput
{
    mask;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'text';
    }

    processParameters()
    {
        if (this.parameters.mask !== undefined)
        {
            if(typeof this.parameters.mask !== 'string')
            {
                console.warn(`HaiForm: Parameter "mask" must be a string.`);
            }
            else
            {
                this.mask = this.parameters.mask;
            }
        }
    }

    handleInput(event)
    {
        let value = event.target.value;

        if(this.mask != null)
        {
            value = this.formatValueByMask(value);
        }

        this.value = value;
        event.target.value = value;
        this.saveValueToTwin();
        return {success: true};
    }

    formatValueByMask(value = null, mask = null)
    {
        if(value === null)
        {
            value = this.value;
        }

        if(mask === null)
        {
            mask = this.mask;
        }

        let tokens =
        {
            '0': {pattern: /\d/},
            'A': {pattern: /[a-zA-Z0-9]/},
            'S': {pattern: /[a-zA-Z]/},
            '!': {escape: true},
            // 'X': {pattern: /[a-zA-Z0-9]/, transform: (char) => char.toUpperCase()}, // Example of transform function.
        };

        let valuePosition = 0;
        let maskPosition = 0;
        let valid = true;
        let stringToPrepend = '';
        let escapeMaskChar = false;
        let formattedValue = '';

        while(valuePosition < value.length && maskPosition < mask.length)
        {
            let char = value[valuePosition];
            let maskChar = mask[maskPosition];

            let token = tokens[maskChar];

            if(token === undefined || escapeMaskChar === true)
            {   // Did the user tried to write fixed character?
                escapeMaskChar = false;
                if(String(maskChar) === char)
                {   // If yes, add this character like normal.
                    formattedValue += stringToPrepend;
                    stringToPrepend = '';
                    formattedValue += char;
                    maskPosition++;
                    valuePosition++;
                    continue;
                }

                // Else, test if he did not try to write the next character.
                //token = tokens[mask[maskPosition + 1]]
                stringToPrepend += maskChar;
                maskPosition++;
                continue;
            }
            else
            {
                if(token.escape === true)
                {
                    escapeMaskChar = true;
                    maskPosition++;
                    continue;
                }

                let validityResult = token.pattern.test(char)

                if(validityResult === false)
                {
                    valid = false;
                    break;
                }

                formattedValue += stringToPrepend;
                stringToPrepend = '';

                if(token.transform !== undefined)
                {
                    char = token.transform(char);
                }
                formattedValue += char;
            }

            maskPosition++;
            valuePosition++;
        }

        return formattedValue;
    }
}

export {HaiInputText};