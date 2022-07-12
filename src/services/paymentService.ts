import dayjs from "dayjs";
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js"
import * as businessesRepository from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js"

async function payment(cardId: number, businessId: number, amount: number, password: string) {

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

    if (cardEmplyeeInfo.isBlocked === true) {
        throw { type: "bad_request", message: "Card is not blocked" }
    }

    const isCorrectPassword = bcrypt.compareSync(password, cardEmplyeeInfo.password);

    if (!isCorrectPassword) {
        throw { type: "not_found", message: "invalid password" }
    }

    const businessExist = await businessesRepository.findById(businessId)

    if (!businessExist) {
        throw { type: "not_found", message: "Business doesn't exist" }
    }

    if (amount <= 0) {
        throw { type: "bad_Request", message: "amount must be bigger than 0" };
    }

    if (cardEmplyeeInfo.type != businessExist.type) {
        throw { type: "bad_Request", message: "different establishments" };
    }

    const payments = await paymentRepository.findByCardId(cardId)
    const recharges = await rechargeRepository.findByCardId(cardId)

    let paymentsAmount = 0;
    let rechargesAmount = 0;

    payments.forEach(
        (info) => paymentsAmount += info.amount
    )

    recharges.forEach(
        (info) => rechargesAmount += info.amount
    )

    let resultAmount = rechargesAmount - paymentsAmount;

    if (resultAmount < amount) {
        throw { type: "bad_Request", message: "insufficient funds" };
    }

    const paymentObj = { cardId, businessId, amount}
    await paymentRepository.insert(paymentObj)
}

const paymentService = {
    payment
}

export default paymentService