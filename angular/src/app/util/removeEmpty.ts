export function removeEmpty(obj: object): object {
    Object.keys(obj).forEach(key => {
        console.log(key, typeof (obj[key]))
        if (obj[key] === null || obj[key] === '')
            delete obj[key];
        if (typeof (obj[key]) === 'object')
            obj[key] = removeEmpty(obj[key]);
    });
    return obj;
}