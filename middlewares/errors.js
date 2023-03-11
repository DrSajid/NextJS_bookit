import ErrorHandler from "../utils/errorHandler";

const onError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  let error = { ...err };
  error.message = err.message;
  // console.log(err.name);

  // wrong mongoose id error
  if (err.name == "CastError") {
    const message = `Resource not found, Invalide ${err.path}`;
    error = new ErrorHandler(message, 400);
  }
  // handeling mongoose Validation error
  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  if (err.name == "Error") {
    const message = `Resource not found, Invalide ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};

export default onError;
