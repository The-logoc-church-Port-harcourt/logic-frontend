export const getCookie = (name, defaultValue = '') => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const found = parts.pop().split(';').shift();
        return found ?? defaultValue;
    }
    return defaultValue;
};

export const setCookie = (key, value, options = {}) => {
    let cookieString = `${key}=${value}; Path=/`;

    if (options.expires) {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; Expires=${date.toUTCString()}`;
    }

    const isHttps = typeof window !== 'undefined' && window.location?.protocol === 'https:';
    if (options.secure || isHttps) {
        cookieString += '; Secure';
    }

    if (options.sameSite) {
        cookieString += `; SameSite=${options.sameSite}`;
    }

    document.cookie = cookieString;
};

export const removeCookie = (name) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
