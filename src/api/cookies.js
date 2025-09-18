export const getCookie = (name, defaultValue = '') => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift() || defaultValue;
};

export const setCookie = (key, value, options = {}) => {
    let cookieString = `${key}=${value}; path=/`;
    
    if (options.expires) {
        const date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${date.toUTCString()}`;
    }
    
    if (options.secure) {
        cookieString += '; secure';
    }
    
    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }
    
    document.cookie = cookieString;
};

export const removeCookie = (name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
