module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // custom application error
            console.log("1")
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'UnauthorizedError':
            // jwt authentication error
            console.log("2")
            return res.status(401).json({ message: 'Unauthorized' });
        default:
            console.log("3")
            return res.status(500).json({ message: err.message });
    }
}