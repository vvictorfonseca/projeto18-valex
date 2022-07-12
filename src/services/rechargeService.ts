import dayjs from "dayjs";

import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"

async function rechargeEmplyeeCard(cardId: number, amount: number){

    const cardEmplyeeInfo = await cardRepository.findById(cardId);

    if (!cardEmplyeeInfo) {
        throw { type: "not_found", message: "Card doesn't exist" }
    }

    if (cardEmplyeeInfo.password == null) {
        throw { type: "bad_request", message: "Card is not activated" }
    }

    if (dayjs(cardEmplyeeInfo.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))) {
        throw { type: "bad_Request", message: "Card expired!" };
    }

    if (amount <= 0) {
        throw { type: "bad_Request", message: "amount must be bigger than 0" };
    }

    const rechargeObject = { cardId, amount }
    await rechargeRepository.insert(rechargeObject)
}

const rechargeService = {
    rechargeEmplyeeCard
}

export default rechargeService