import { GeneralError } from "../utils/errors.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: "Error",
            statusCode: err.getCode(),
            message: err.message,
            details: err.details || null
        });
    }

    console.log(err);
    return res.status(500).json({
        status: "Error",
        statusCode: 500,
        message: "Internal Server Error"
    });
};
