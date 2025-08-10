import "@typespec/http";
import "./errors.tsp";

using Http;

namespace SDDService;

model SDDServiceBadRequestResponse {
    ...BadRequestResponse;
    ...Body<BadRequestError>;
}

model SDDServiceNotFoundResponse {
    ...NotFoundResponse;
    ...Body<NotFoundError>;
}

model SDDServiceValidationErrorResponse {
    @statusCode statusCode: 422;
    ...Body<ValidationError>;
}

model SDDServiceInternalServerErrorResponse {
    @statusCode statusCode: 500;
    ...Body<InternalServerError>;
}
