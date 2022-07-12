import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

async function calculateBalance(cardId: number) {

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

    const res = { resultAmount, payments, recharges };

    return res;
}

export default calculateBalance;
