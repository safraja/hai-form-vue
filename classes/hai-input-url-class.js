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

    constructor(element = null)
    {
        super('url', element);
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
        }
        else
        {
            event.target.classList.remove('invalid');
            event.target.setCustomValidity('');
        }
    }
}

export {HaiInputUrl};