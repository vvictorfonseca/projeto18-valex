import { Request, Response, NextFunction } from "express";

import * as cardRepository from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js"

async function validateApiKey(req: Request, res: Response, next: NextFunction) {

    const key: string = req.headers["x-api-key"].toString();

    const company = await findByApiKey(key);
    delete company.apiKey
    console.log("company", company)

    if (!company) {
        throw { type: "not_allowed", message: "Wrong API key" }
    }

    res.locals.company = company

    next()
}

async function employeeExist(req: Request, res: Response, next: NextFunction) {
    const { employeeId }: { employeeId: number } = req.body;

    const employee = await findById(employeeId)
    console.log("employeeId", employee)

    if (!employee) {
        throw { type: "not_found", message: "Employee doesn't exist" }
    }

    res.locals.employee = employee

    next()
}

async function validateCardType(req: Request, res: Response, next: NextFunction) {
    const { type } : { type: cardRepository.TransactionTypes } = req.body;
    const { employeeId } : { employeeId: number } = req.body;

    const cardType =  await cardRepository.findByTypeAndEmployeeId(type, employeeId)

    if (cardType) {
        throw { type: "conflict", message: "This emplyee already has a card with this type" }
    }

    next()
}

export { validateApiKey, employeeExist, validateCardType };