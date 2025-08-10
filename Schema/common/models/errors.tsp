namespace SDDService;

@error
model BadRequestError {
    code: "BAD_REQUEST";
    message: string;
}
@error
model NotFoundError {
    code: "NOT_FOUND";
    message: string;
}
@error
model ValidationError {
    code: "VALIDATION_ERROR";
    message: string;
    date: string[];
}

@error
model InternalServerError {
    code: "INTERNAL_SERVER_ERROR";
    message: string;
}
