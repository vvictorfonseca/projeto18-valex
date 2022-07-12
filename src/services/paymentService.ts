import * as paymentRepository from "../repositories/paymentRepository.js";

import cardExist from "../utils/serviceValidations/cardExist.js";
import cardExpiration from "../utils/serviceValidations/cardDateExpiration.js";
import { cardIsActive } from "../utils/serviceValidations/cardActivation.js";
import correctPassword from "../utils/serviceValidations/correctPassword.js";
import { cardIsNotBlocked } from "../utils/serviceValidations/cardBlock.js";
import calculateBalance from "../utils/calculateBalance.js";
import amountBiggerThanZero from "../utils/serviceValidations/amountBiggerThanZero.js";
import balanceBiggerThanAmount from "../utils/serviceValidations/balanceBiggerThanAmount.js";
import businessExist from "../utils/serviceValidations/businessExist.js";
import cardAndInfoType from "../utils/serviceValidations/cardAndBusinessType.js"

async function payment(cardId: number, businessId: number, amount: number, password: string) {

    await amountBiggerThanZero(amount)

    const cardEmplyeeInfo = await cardExist(cardId)
    await cardIsActive(cardEmplyeeInfo)
    await cardExpiration(cardId)
    await cardIsNotBlocked(cardId)
    await correctPassword(cardId, password)
    await businessExist(businessId)
    await cardAndInfoType(cardId, businessId)

    const res = await calculateBalance(cardId)
    const resultAmount = res.resultAmount
    await balanceBiggerThanAmount(resultAmount, amount)

    const paymentObj = { cardId, businessId, amount}
    await paymentRepository.insert(paymentObj)
}

const paymentService = {
    payment
}

export default paymentService