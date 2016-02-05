function streamToPromise(stream) {
    return new Promise(function(fulfil, reject) {
        stream
            .on('end', fulfil)
            .on('error', reject);
    });
}

module.exports = {
    streamToPromise: streamToPromise
};
