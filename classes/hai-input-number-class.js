import {HaiInputText} from './hai-input-text-class.js';

class HaiInputNumber extends HaiInputText
{
    min;
    max;
    step = 1;
    allowENotation = false;
    stripLeadingZeroes = true;
    decimalSeparator = ',';
    delimiter = ' ';
    thousandsGroupStyle = 'thousand';
    enableValueFormation = true;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'number';
    }

    processParameters()
    {
        if (this.parameters.min !== undefined)
        {
            if(isNaN(this.parameters.min) === true)
            {
                console.warn(`HaiForm: Parameter "min" must be a number.`);
            }
            else
            {
                this.min = this.parameters.min;
            }
        }

        if(this.parameters.max !== undefined)
        {
            if(isNaN(this.parameters.max) === true)
            {
                console.warn(`HaiForm: Parameter "max" must be a number.`);
            }
            else
            {
                this.max = this.parameters.max;
            }
        }

        if(this.parameters.step !== undefined)
        {
            if(isNaN(this.parameters.step) === true)
            {
                console.warn(`HaiForm: Parameter "step" must be a number, reverting back to "1".`);
            }
            else
            {
                this.max = this.parameters.step;
            }
        }

        if(this.parameters.stripLeadingZeroes !== undefined)
        {
            this.stripLeadingZeroes = this.parameters.stripLeadingZeroes == true;
        }

        if(this.parameters.decimalSeparator !== undefined)
        {
            this.decimalSeparator = this.parameters.decimalSeparator;
        }

        if(this.parameters.delimiter !== undefined)
        {
            this.delimiter = this.parameters.delimiter;
        }

        if(this.parameters.thousandsGroupStyle !== undefined)
        {
            let supportedStyles = ['thousand', 'lakh','wan'];
            if(supportedStyles.includes(this.parameters.thousandsGroupStyle) === false)
            {
                console.warn('HaiForm: Given thousands group style is not supported, reverting back to "thousand". ' +
                    'Supported types are:', supportedStyles);
            }
            else
            {
                this.thousandsGroupStyle = this.parameters.thousandsGroupStyle;
            }
        }

        if(this.parameters.enableValueFormation !== undefined)
        {
            this.enableValueFormation = this.parameters.enableValueFormation == true;
        }
    }

    handleInput(event)
    {
        let value = event.target.value;
        let oldValue = this.value;
        let cursorPosition = event.target.selectionEnd;

        let rawValue = this.extractRawValue(value);
        this.rawValue = rawValue;
        let formattedValue = this.formatValue(rawValue);
        this.value = formattedValue;
        event.target.value = formattedValue;

        this.saveValueToTwin();

        let newCursorPosition = this.getNextCursorPosition(cursorPosition,oldValue,
            formattedValue, event);
        event.target.setSelectionRange(newCursorPosition, newCursorPosition);

        return {success: true};
    }

    extractRawValue(formattedValue = null)
    {
        let result = '';

        if(formattedValue === null)
        {
            formattedValue = this.value;
        }

            // Strip alphabet letters.
        result = formattedValue.replace(/[A-Za-z]/g, '')
            // Replace the first decimal marks (dots, commas and arabic decimal separator) with reserved placeholder.
            .replace(/[.,٫]/, 'M')

            // Strip non numeric letters except minus and "M".
            // This is to ensure prefix has been stripped.
            .replace(/[^\dM-]/g, '')

            // Replace the leading minus with reserved placeholder.
            .replace(/^\-/, 'N')

            // Strip the other minus sign (if present).
            .replace(/\-/g, '')

            // Replace the minus sign (if present).
            .replace('N', '-')

            // Replace decimal mark.
            .replace('M', '.');

        return result;
    }

    formatValue(rawValue = null)
    {
        let result = '';

        if(rawValue === null)
        {
            rawValue = this.rawValue;
        }

        rawValue = String(rawValue);

        if(rawValue === '' || rawValue === '-' || rawValue === '+')
        {   // Do not format empty value or unfinished number.
            return rawValue;
        }

        if(this.enableValueFormation)
        {
            let sign;

            if(rawValue.slice(0, 1) === '-' || rawValue.slice(0, 1) === '+')
            {
                sign = rawValue.slice(0, 1);
            }

            rawValue = rawValue.replace(/[+-]/, '');
            let numberParts = rawValue.split('.');
            let decimalPart = null;
            let integerPart = numberParts[0];

            if(this.stripLeadingZeroes)
            {
                integerPart = integerPart.replace(/^0+/g, '');
            }

            if(integerPart === '')
            {
                integerPart = '0';
            }

            if(numberParts[1] != null && numberParts[1] !== '')
            {
                decimalPart = numberParts[1];
            }

            integerPart = this.applyGroupStyle(integerPart);

            if(sign === '-')
            {
                result += sign;
            }
            result += integerPart;

            if(numberParts[1] != null)
            {
                result += this.decimalSeparator;
            }

            if(decimalPart !== null)
            {
                result += decimalPart;
            }
        }
        else
        {
            result = rawValue;
        }
        return result;
    }

    checkValidity()
    {
        if((isNaN(this.rawValue) === true)
            || (this.allowENotation === false && this.rawValue.toLowerCase().includes('e')))
        {
            return {success: false, message: 'Please input valid number'};
        }

        if(Number(this.rawValue) > this.max)
        {
            return {success: false, message: `Number must be lower or same as ${this.max}`};
        }

        if(Number(this.rawValue) < this.min)
        {
            return {success: false, message: `Number must be higher or same as ${this.min}`};
        }

        return {success: true};
    }

    handleFocusOut(event)
    {
        let validity = this.checkValidity();
        if(validity.success === false)
        {
            event.target.classList.add('invalid');
            event.target.setCustomValidity(validity.message);
            //TODO - vyřeš problém u custom elementů.
            /*
            this.twin.style.display = 'none';
            this.twin.type = 'text';
            this.twin.setCustomValidity(validity.message);

             */
        }
        else
        {
            event.target.classList.remove('invalid');
            event.target.setCustomValidity('');
        }
    }

    applyGroupStyle(numberString)
    {
        switch (this.thousandsGroupStyle)
        {
            case 'thousand':
                numberString = numberString.replace(/(\d)(?=(\d{3})+$)/g, '$1' + this.delimiter);
                break;

            case 'lakh':
                numberString = numberString.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + this.delimiter);
                break;

            case 'wan':
                numberString = numberString.replace(/(\d)(?=(\d{4})+$)/g, '$1' + this.delimiter);
                break;
        }
        return numberString;
    }

    getNextCursorPosition(prevPosition, oldValue, newValue, event)
    {
        if (oldValue.length === prevPosition - 1)
        {
            return newValue.length;
        }
        let oldRawValue = this.extractRawValue(oldValue);
        let newRawValue = this.extractRawValue(newValue);

        if(event.inputType === 'deleteContentForward' &&
            oldRawValue === newRawValue)
        {   // If user tried to delete delimiter, move the cursor position.
            return prevPosition + 1;
        }

        return prevPosition + this.getPositionOffset(prevPosition, oldValue, newValue);
    }

    getPositionOffset (prevPosition, oldValue, newValue)
    {
        let oldRawValue, newRawValue, lengthOffset;

        oldRawValue = this.extractRawValue(oldValue.slice(0, prevPosition));
        newRawValue = this.extractRawValue(newValue.slice(0, prevPosition));
        lengthOffset = oldRawValue.length - newRawValue.length;

        return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
    }

    changeNumberValue(change)
    {
        let rawValue = Number(this.rawValue);
        if(isNaN(rawValue))
        {
            rawValue = 0;
        }

        let newRawValue = rawValue + Number(change);
        if((change > 0 && newRawValue > this.max) || (change < 0 && newRawValue < this.min))
        {   // Dont increase over max or decrease below min limits.
            return;
        }
        if((change < 0 && newRawValue > this.max))
        {   // If decreasing when over max, set max.
            newRawValue = this.max;
        }
        if((change > 0 && newRawValue < this.min))
        {   // If increasing when below min, set min.
            newRawValue = this.min;
        }

        this.rawValue = String(newRawValue);
        let formattedValue = this.formatValue(this.rawValue);
        this.value = String(formattedValue);
        this.saveValueToTwin();
    }

    handleKeyAction(event)
    {
        let submit = this.verifyEnterKey(event);

        if(submit === false)
        {
            switch (event.code)
            {
                case 'ArrowUp':
                    event.preventDefault();
                    this.changeNumberValue(Number(this.step));
                    event.target.value = this.value;
                    break;

                case 'ArrowDown':
                    event.preventDefault();
                    this.changeNumberValue(Number(this.step) * -1);
                    event.target.value = this.value;
                    break;
            }
        }
    }

    handleWheel(event)
    {
        event.preventDefault();
        if(event.deltaY < 0)
        {
            this.changeNumberValue(Number(this.step));
        }
        else
        {
            this.changeNumberValue(Number(this.step) * -1);
        }
        event.target.value = this.value;
    }
}

export {HaiInputNumber};