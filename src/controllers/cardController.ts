import { Request, Response } from "express";

import cardService from "../services/cardService.js";
import * as cardRepository from "../repositories/cardRepository.js"

async function createNewCard(req: Request, res: Response) {
    const { employee } = res.locals
    const { type } : { type: cardRepository.TransactionTypes } = req.body;

    await cardService.createCard(employee, type);

    return res.sendStatus(201);
}

async function activateCard(req: Request, res: Response) {
    const { cardId, securityCode, password }: { cardId: number, securityCode: string, password: string } = req.body;

    await cardService.activateCard(cardId, securityCode, password);

    return res.sendStatus(201);
}

async function getBallance(req: Request, res: Response) {
    const {cardId}: { cardId: number} = req.body

    const result = await cardService.getBalance(cardId);

    res.send(result);
}

async function blockCard(req: Request, res: Response) {
    const { cardId, password }: { cardId: number, password: string } = req.body;

    await cardService.blockCard(cardId, password);

    return res.sendStatus(200);
}

async function unlockCard(req: Request, res: Response) {
    const { cardId, password }: { cardId: number, password: string } = req.body;

    await cardService.unlockCard(cardId, password);

    return res.sendStatus(200);
}

export { createNewCard, activateCard, getBallance, blockCard, unlockCard };