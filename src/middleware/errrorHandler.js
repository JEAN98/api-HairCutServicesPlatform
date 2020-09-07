const errorHandler = (err, req, res, next) => {
    return res.status(err.statusCode).json({
      status: 'error',
      details: err.message
    });
}

module.exports = errorHandler;