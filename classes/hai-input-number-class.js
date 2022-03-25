import {HaiInputText} from './hai-input-text-class.js';

/**
 *  Class representing a number input.
 * @extends HaiInputText
 */
class HaiInputNumber extends HaiInputText
{
    /** @type {number|null} - The minimum value to accept for this input.*/
    min = null;
    /** @type {number|null} - The maximum value to accept for this input.*/
    max = null;
    /** @type {number} - The number value which should by added/subtract from current input value on scroll or arrow up/down.*/
    step = 1;
    /** @type {boolean} - If input should accept exponent, currently has no effect.*/
    allowENotation = false;
    /** @type {boolean} - If input should automatically strip leading zeros.*/
    stripLeadingZeros = true;
    /** @type {string} - Decimal separator.*/
    decimalSeparator = ',';
    /** @type {string} - Delimiter of thousands groups.*/
    delimiter = ' ';
    /** @type {string} - One of possible thousands groups style, can by "thousand", "lakh" or "wan".*/
    thousandsGroupStyle = 'thousand';
    /** @type {boolean} - If the number should be automatically formatted (masked).*/
    enableValueFormation = true;

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'number';
    }

    /** @override */
    processParameters(parameters = null)
    {
        if(parameters === null)
        {
            parameters = this.parameters;
        }
        super.processParameters(parameters);

        if (parameters.min !== undefined)
        {
            if(isNaN(parameters.min) === true)
            {
                console.warn(`HaiForm: Parameter "min" must be a number.`);
            }
            else
            {
                this.min = parameters.min;
            }
        }

        if(parameters.max !== undefined)
        {
            if(isNaN(parameters.max) === true)
            {
                console.warn(`HaiForm: Parameter "max" must be a number.`);
            }
            else
            {
                this.max = parameters.max;
            }
        }

        if(parameters.step !== undefined)
        {
            if(isNaN(parameters.step) === true)
            {
                console.warn(`HaiForm: Parameter "step" must be a number, reverting back to "1".`);
            }
            else
            {
                this.max = parameters.step;
            }
        }

        if(parameters.stripLeadingZeros !== undefined)
        {
            this.stripLeadingZeros = Boolean(parameters.stripLeadingZeros);
        }

        if(parameters.decimalSeparator !== undefined)
        {
            this.decimalSeparator = parameters.decimalSeparator;
        }

        if(parameters.delimiter !== undefined)
        {
            this.delimiter = parameters.delimiter;
        }

        if(parameters.thousandsGroupStyle !== undefined)
        {
            let supportedStyles = ['thousand', 'lakh','wan'];
            if(supportedStyles.includes(parameters.thousandsGroupStyle) === false)
            {
                console.warn('HaiForm: Given thousands group style is not supported, reverting back to "thousand". ' +
                    'Supported types are:', supportedStyles);
            }
            else
            {
                this.thousandsGroupStyle = parameters.thousandsGroupStyle;
            }
        }

        if(parameters.enableValueFormation !== undefined)
        {
            this.enableValueFormation = Boolean(parameters.enableValueFormation);
        }
    }

    /** @override */
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

    /** @override */
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

    /** @override */
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

            if(this.stripLeadingZeros)
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

    /** @override */
    checkValidity()
    {
        let superValidity = super.checkValidity();

        if(superValidity.success === false)
        {
            return superValidity;
        }

        if((isNaN(this.rawValue) === true)
            || (this.allowENotation === false && this.rawValue.toLowerCase().includes('e')))
        {
            return {success: false, message: 'Please input valid number'};
        }

        if(this.max !== null && Number(this.rawValue) > this.max)
        {
            return {success: false, message: `Number must be lower or same as ${this.max}`};
        }

        if(this.min !== null && Number(this.rawValue) < this.min)
        {
            return {success: false, message: `Number must be higher or same as ${this.min}`};
        }

        return {success: true};
    }

    /**
     * Formats a text string containing a number according to the selected style.
     *
     * @param {string} numberString - The number to be formatted.
     * @returns {string} - Formatted form of the number.
     */
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

    /**
     * Specifies (based on the previous state and the action performed) to which position (number of characters from
     * the start of the value text) in the form field text to move the cursor.
     *
     * @param {int} prevPosition - Previous cursor position.
     * @param {string} oldValue - Previous field value.
     * @param {string} newValue - New field value.
     * @param {InputEvent} event - The event that was executed.
     * @returns {int} - New cursor position.
     */
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

    /**
     * Calculates by how many places the cursor should move.
     *
     * @param {int} prevPosition - Previous cursor position.
     * @param {string} oldValue - Previous field value.
     * @param {string} newValue - New field value-
     * @returns {number} - The calculated number of positions to move the cursor.
     */
    getPositionOffset (prevPosition, oldValue, newValue)
    {
        let oldRawValue, newRawValue, lengthOffset;

        oldRawValue = this.extractRawValue(oldValue.slice(0, prevPosition));
        newRawValue = this.extractRawValue(newValue.slice(0, prevPosition));
        lengthOffset = oldRawValue.length - newRawValue.length;

        return (lengthOffset !== 0) ? (lengthOffset / Math.abs(lengthOffset)) : 0;
    }

    /**
     * Changes the current value of the field by a static number, unless this violates the maximum or
     * minimum specified value of the field. If so, the field value remains the same.
     *
     * @param {number} change - A number specifying by how much the field value should change.
     */
    changeNumberValue(change)
    {
        let rawValue = Number(this.rawValue);
        if(isNaN(rawValue))
        {
            rawValue = 0;
        }

        let newRawValue = rawValue + Number(change);
        if((change > 0 && this.max !== null && newRawValue > this.max)
            || (change < 0 && this.min !== null && newRawValue < this.min))
        {   // Dont increase over max or decrease below min limits.
            return;
        }
        if((change < 0 && this.max !== null && newRawValue > this.max))
        {   // If decreasing when over max, set max.
            newRawValue = this.max;
        }
        if((change > 0 && this.min !== null && newRawValue < this.min))
        {   // If increasing when below min, set min.
            newRawValue = this.min;
        }

        this.rawValue = String(newRawValue);
        let formattedValue = this.formatValue(this.rawValue);
        this.value = String(formattedValue);
        this.saveValueToTwin();
    }

    /** @override */
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

    /** @override */
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