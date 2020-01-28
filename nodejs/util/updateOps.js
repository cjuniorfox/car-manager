updateOps = (update) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    return updateOps;
}

module.exports = updateOps;