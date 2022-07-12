import { Request, Response } from "express";

import  rechargeService  from "../services/rechargeService.js";

async function rechargeEmplyeeCard(req: Request, res: Response) {
    const { cardId, amount }: {cardId: number, amount: number} = req.body

    await rechargeService.rechargeEmplyeeCard(cardId, amount)

    return res.sendStatus(201);
}

export default rechargeEmplyeeCard