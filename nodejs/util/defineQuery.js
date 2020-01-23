const defineQuery = (query) => {
    const pageSize = query.size ? Number(query.size) : null;
    return {
        search: new RegExp('\\b' + query.search ? query.search : '' + '\\b', 'i'),
        pageSize: pageSize,
        skip: query.index ? Number(query.index) * pageSize : 0
    }
}
module.exports = defineQuery;