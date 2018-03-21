const SDK = {
    serverURL: "http://localhost:3000",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach(function (h) {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method:options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "text",
            data: options.data,
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr:xhr, status: status, error: errorThrown});
            }
        });

    },
    //This class makes it possible to pass data to the server side

    Movie: {
        getAll: (cb) => {
            SDK.request({
                    url: "/getMovies"
                },
                (err, data) => {
                    if (err) return cb(err);
                    cb(null, data);
            });
        }
    }
};