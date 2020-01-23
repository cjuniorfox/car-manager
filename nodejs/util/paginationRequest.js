const defineRequest = require('./defineRequest');
const paginationRequest = (data, count, getQuery, routerName) => {
    return {
        message: 'Sua busca retornou ' + count + ' resultados.',
        count: count,
        skip: getQuery.skip,
        pageSize: getQuery.pageSize ? getQuery.pageSize : count,
        data: data
            .map(c => Object.assign(
                { request: defineRequest('GET', routerName, c._id) }
                , c._doc))
    };
}
module.exports = paginationRequest;