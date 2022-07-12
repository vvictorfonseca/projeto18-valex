import { Request, Response } from "express";

import paymentService from "../services/paymentService.js";

async function payments(req: Request, res: Response){
    const { cardId, businessId, amount, password}: { cardId: number, businessId: number, amount: number, password: string} = req.body

    await paymentService.payment(cardId, businessId, amount, password)

    return res.sendStatus(201);
}

export default payments