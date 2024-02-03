const errorMiddleware = (error, _, res, __) => {
    const statusCode = error.statusCode || 500;
    const message = error.statusCode ? error.message : "Internal Server Error";
    return res.status(statusCode).json({ message });
};

export default errorMiddleware;
