import * as rechargeRepository from "../repositories/rechargeRepository.js"

import cardExist from "../utils/serviceValidations/cardExist.js";
import cardExpiration from "../utils/serviceValidations/cardDateExpiration.js";
import { cardIsActive } from "../utils/serviceValidations/cardActivation.js";
import amountBiggerThanZero from "../utils/serviceValidations/amountBiggerThanZero.js";

async function rechargeEmplyeeCard(cardId: number, amount: number){

    await amountBiggerThanZero(amount)
    const cardEmplyeeInfo = await cardExist(cardId);
    await cardIsActive(cardEmplyeeInfo);
    await cardExpiration(cardId)

    const rechargeObject = { cardId, amount }
    await rechargeRepository.insert(rechargeObject)
}

const rechargeService = {
    rechargeEmplyeeCard
}

export default rechargeService