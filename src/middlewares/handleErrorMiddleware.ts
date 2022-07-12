import { Request, Response, NextFunction } from "express";

function handleErrors(error, req: Request, res: Response, next: NextFunction ) {

    if (error.type === "not_found") {
        res.sendStatus(404)
    }

    if (error.type === "unprocessable_entity") {
        res.sendStatus(422)
    }

    if (error.type === "not_allowed") {
        res.sendStatus(401)
    }

    if (error.type === "conflict") {
        res.sendStatus(409)
    }

    if (error.type === "bad_request") {
        res.sendStatus(400)
    }
}

export default handleErrors;