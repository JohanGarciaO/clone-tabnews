import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

function onNoMatchHandler(request, response) {
  const errorObject = new MethodNotAllowedError();
  response.status(errorObject.statusCode).json(errorObject);
}

function onErrorHandler(error, request, response) {
  const errorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });
  console.error(errorObject);
  response.status(errorObject.statusCode).json(errorObject);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
