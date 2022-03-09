import {HaiInputText} from './hai-input-text-class.js';

class HaiInputUrl extends HaiInputText
{
    allowedSchemes = ["http", "https"];
    /** @type {string|null} - Default scheme, which will by appended, when there is none present. */
    defaultScheme = "http";
    requireHost = true;
    allowPart = {
        userInfo: false,
        port: false,
        path: true,
        query: true,
        fragment: false
    };
    stripPart = {
        query: false,
        fragment: true
    };

    constructor(element = null, parameters = {})
    {
        super(element, parameters);
        this.type = 'url';
    }

    processParameters(parameters = null)
    {
        if(parameters === null)
        {
            parameters = this.parameters;
        }
        super.processParameters(parameters);

        if (parameters.allowedSchemes !== undefined)
        {
            if(Array.isArray(parameters.allowedSchemes) !== true)
            {
                console.warn('HaiForm: Parameter "allowedSchemes" must by an array.');
            }
            else
            {
                let valid = true;
                for(let scheme of parameters.allowedSchemes)
                {
                    if(typeof scheme !== 'string')
                    {
                        valid = false;
                        break;
                    }
                }
                if(valid === false)
                {
                    console.warn('HaiForm: Parameter "allowedSchemes" must by an array of strings, item of another type found.');
                }
                else
                {
                    this.allowedSchemes = parameters.allowedSchemes;
                }
            }
        }

        if (parameters.defaultScheme !== undefined)
        {
            if(typeof parameters.defaultScheme !== 'string' && parameters.defaultScheme !== null)
            {
                console.warn('HaiForm: Parameter "defaultScheme" must by a string or null.');
            }
            else
            {
                this.defaultScheme = parameters.defaultScheme;
            }
        }

        if (parameters.requireHost !== undefined)
        {
            this.requireHost = Boolean(parameters.requireHost);
        }

        if (parameters.allowPart !== undefined)
        {
            if(typeof parameters.allowPart !== 'object')
            {
                console.warn('HaiForm: Parameter "allowPart" must by an object.');
            }
            else
            {
                if (parameters.allowPart.userInfo !== undefined)
                {
                    this.allowPart.userInfo = Boolean(parameters.allowPart.userInfo);
                }

                if (parameters.allowPart.port !== undefined)
                {
                    this.allowPart.port = Boolean(parameters.allowPart.port);
                }

                if (parameters.allowPart.path !== undefined)
                {
                    this.allowPart.path = Boolean(parameters.allowPart.path);
                }

                if (parameters.allowPart.query !== undefined)
                {
                    this.allowPart.query = Boolean(parameters.allowPart.query);
                }

                if (parameters.allowPart.fragment !== undefined)
                {
                    this.allowPart.fragment = Boolean(parameters.allowPart.fragment);
                }
            }
        }

        if (parameters.stripPart !== undefined)
        {
            if(typeof parameters.stripPart !== 'object')
            {
                console.warn('HaiForm: Parameter "stripPart" must by an object.');
            }
            else
            {
                if (parameters.stripPart.query !== undefined)
                {
                    this.stripPart.query = Boolean(parameters.stripPart.query);
                }

                if (parameters.stripPart.fragment !== undefined)
                {
                    this.stripPart.fragment = Boolean(parameters.stripPart.fragment);
                }
            }
        }
    }

    handleInput(event)
    {
        let value = event.target.value;

        /*let formatedValue = this.formatValue(value);

        this.value = formatedValue;
        this.rawValue = formatedValue;
        event.target.value = formatedValue;*/

        this.value = value;
        this.rawValue = value;
        this.saveValueToTwin();
        return {success: true};
    }

    formatValue(rawValue = null)
    {
        let result = '';

        if(rawValue === null)
        {
            rawValue = this.rawValue;
        }

        rawValue = String(rawValue);
        rawValue = rawValue.trim();
        if(rawValue === '')
        {   // Do not format empty value.
            return rawValue;
        }

        if(this.defaultScheme !== '' && this.defaultScheme !== null)
        {
            rawValue = this.appendDefaultScheme(rawValue);
        }

        if(this.stripPart.fragment === true)
        {
            rawValue = rawValue.replace(/#.*/i, '')
        }

        if(this.stripPart.query === true)
        {
            rawValue = rawValue.replace(/\?[^#]*/i, '')
        }

        return rawValue;
    }

    appendDefaultScheme(rawValue)
    {
        let hasSchemeWithSlashes = /^[a-zA-z0-9.+-]+:\/\//i.test(rawValue);

        if (hasSchemeWithSlashes)
        {   // If there is a scheme, no action is necessary.
            return rawValue;
        }

        if (rawValue.startsWith('://'))
        {
            return this.defaultScheme + String(rawValue);
        }

        if (rawValue.startsWith('//'))
        {
            return this.defaultScheme + ":" + String(rawValue);
        }

        if (rawValue.includes(':') === false)
        {
            return this.defaultScheme + "://" + String(rawValue);
        }

        let colonOccurrences = (rawValue.match(/:/g) || []).length;

        if(colonOccurrences === 1)
        {
            let containsPort = /[^:]+?:((\d)+$|(\d+\/.*))/ig.test(rawValue);

            if (containsPort === true)
            {   // String contains port, but does not contain scheme.
                return this.defaultScheme + "://" + String(rawValue);
            }
            else
            {   // Otherwise, there is a scheme in string, or it is absolute nonformateabble garbage.
                return rawValue;
            }
        }

        // rawValue contains undiscovered scheme or formation failed.
        return rawValue;
    }

    checkValidity()
    {
        let superValidity = super.checkValidity();

        if(superValidity.success === false)
        {
            return superValidity;
        }

        if(String(this.rawValue) === '')
        {
            return {success: true};
        }

        let allowedScheme = false;

        for(let scheme of this.allowedSchemes)
        {
            if(this.rawValue.startsWith(String(scheme) + ":"))
            {
                allowedScheme = true;
                break;
            }
        }

        if(allowedScheme === false)
        {
            return {success: false, message: 'URL does not starts with allowed scheme.'};
        }

        let valueAfterScheme = this.rawValue.replace(/.*?:/i, '');
        let valueAfterSlashes = valueAfterScheme.replace(/.*?(\/\/)/i, '');
        let valueAfterAuthority;
        let authorityPart;
        let userInfoPart;
        let hostPart;
        let portPart;
        let pathPart;
        let queryPart;
        let fragmentPart;

        if(valueAfterScheme.startsWith('//') === false)
        {   // This means, that right after scheme starts path
            valueAfterAuthority = valueAfterScheme;
            authorityPart = '';
        }
        else
        {
            authorityPart = valueAfterSlashes.replace(/\/.*/i, '');
            valueAfterAuthority = valueAfterSlashes.replace(/.*?\//i, '');
        }

        if(authorityPart !== '')
        {
            if(authorityPart.includes('@') === false)
            {
                userInfoPart = '';
            }
            else
            {
                userInfoPart = authorityPart.replace(/@.*/i, '');
            }

            if(authorityPart.includes(':') === false)
            {
                portPart = '';
            }
            else
            {
                portPart = authorityPart.replace(/.*?:/i, '');
            }

            hostPart = authorityPart.replace(userInfoPart + '@', '');
            hostPart = hostPart.replace(':' + portPart, '');
        }

        if(valueAfterAuthority.includes('#') === true)
        {
            fragmentPart = valueAfterAuthority.replace(/.*?#/i, '');
        }
        else
        {
            fragmentPart = '';
        }

        if(valueAfterAuthority.includes('?') === true)
        {
            queryPart = valueAfterAuthority.replace(/#.*/i, '')
            queryPart = queryPart.replace(/.*?\?/i, '')
        }
        else
        {
            queryPart = '';
        }

        pathPart = valueAfterAuthority.replace(/#.*/i, '');
        pathPart = pathPart.replace(/\?.*/i, '');

        if(this.requireHost && hostPart === '')
        {
            return {success: false, message: 'URL does not contain host address.'};
        }
        if(this.allowPart.userInfo === false && userInfoPart !== '')
        {
            return {success: false, message: 'URL must not include userinfo.'};
        }
        if(this.allowPart.port === false && portPart !== '')
        {
            return {success: false, message: 'URL must not specify port.'};
        }
        if(this.allowPart.path === false && pathPart !== '')
        {
            return {success: false, message: 'URL must not contain path.'};
        }
        if(this.allowPart.query === false && queryPart !== '')
        {
            return {success: false, message: 'URL must not contain query.'};
        }
        if(this.allowPart.fragment === false && fragmentPart !== '')
        {
            return {success: false, message: 'URL must not contain fragment.'};
        }

        return {success: true};
    }

    handleFocusOut(event)
    {
        let formatedValue = this.formatValue(this.rawValue);

        this.value = formatedValue;
        this.rawValue = formatedValue;
        event.target.value = formatedValue;
        this.saveValueToTwin();

        let validity = this.checkValidity();
        if(validity.success === false)
        {
            event.target.classList.add('invalid');
            event.target.setCustomValidity(validity.message);
            if(this.displayValidityWarnings === true && this.warningElement !== undefined)
            {
                this.warningElement.textContent = validity.message;
            }
        }
        else
        {
            event.target.classList.remove('invalid');
            event.target.setCustomValidity('');
            if(this.warningElement !== undefined)
            {
                this.warningElement.textContent = '';
            }
        }
    }
}

export {HaiInputUrl};