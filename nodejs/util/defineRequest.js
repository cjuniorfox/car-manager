const defineRequest = (method, route, _id) => {
    return {
        method: method,
        url: 'http://localhost:3000/api/' + route + '/' + _id
    };
};

module.exports = defineRequest;