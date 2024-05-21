const logRequest = (req, res, next) => {
    const { hostname, method, path, ip, protocol } = req
    console.log(`ACCESS: ${method} ${protocol}://${hostname}${path}`);
    next();
}

export default logRequest;