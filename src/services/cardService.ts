import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js";

import formatName from "../utils/formatName.js";
import formatDate from "../utils/formatDate.js";
import { encryptCVV, decryptCVV, encryptedPassword} from "../utils/encryptNumbers.js";
import cardExist from "../utils/serviceValidations/cardExist.js";
import cardExpiration from "../utils/serviceValidations/cardDateExpiration.js";
import { cardIsNotActive } from "../utils/serviceValidations/cardActivation.js";
import correctCvv from "../utils/serviceValidations/correctCvv.js";
import correctPassword from "../utils/serviceValidations/correctPassword.js";
import { cardIsBlocked, cardIsNotBlocked } from "../utils/serviceValidations/cardBlock.js";
import calculateBalance from "../utils/calculateBalance.js";

async function createCard(employee: { id: number; fullName: string }, cardType: cardRepository.TransactionTypes) {
    
    const cardNumber = faker.finance.creditCardNumber();
    const fullNameFormat = formatName(employee.fullName);
    const cardExpiration = formatDate();
    const cardCvv = faker.finance.creditCardCVV();
    console.log("cardCvv", cardCvv)
    const cardCvvEncrypt = encryptCVV(cardCvv)

    const cardData = {
        employeeId: employee.id,
        number: cardNumber,
        cardholderName: fullNameFormat,
        securityCode: cardCvvEncrypt,
        expirationDate: cardExpiration,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type: cardType,
    }

    const createNewCard = await cardRepository.insert(cardData)
    return createNewCard
}

async function activateCard(cardId: number, securityCode: string, password: string) {

    const cardEmplyeeInfo = await cardExist(cardId)
    const cardCvv = cardEmplyeeInfo.securityCode;
    const decryptCardCvv = decryptCVV(cardCvv)

    await cardExpiration(cardId)
    await cardIsNotActive(cardEmplyeeInfo)
    await correctCvv(securityCode, decryptCardCvv)

    if (password.length > 4) {
        throw { type: "bad_request", message: "Password must have 4 characters" }
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const updateCard = {
        employeeId: cardEmplyeeInfo.employeeId,
        number: cardEmplyeeInfo.number,
        cardholderName: cardEmplyeeInfo.cardholderName,
        securityCode: cardEmplyeeInfo.securityCode,
        expirationDate: cardEmplyeeInfo.expirationDate,
        password: encryptedPassword,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type: cardEmplyeeInfo.type,
    }

    await cardRepository.update(cardId, updateCard);
}

async function getBalance(cardId: number) {
    await cardExist(cardId)
    const res = await calculateBalance(cardId)

    const result =  {
        "balance": res.resultAmount,
        "transactions": [...res.payments],
        "recharges": [...res.recharges]
    }

    return result
}

async function blockCard(cardId: number, password: string) {

    const cardEmplyeeInfo = await cardExist(cardId)

    await cardIsNotBlocked(cardId)
    await cardExpiration(cardId)
    await correctPassword(cardId, password)

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const updateCard = {
        employeeId: cardEmplyeeInfo.employeeId,
        number: cardEmplyeeInfo.number,
        cardholderName: cardEmplyeeInfo.cardholderName,
        securityCode: cardEmplyeeInfo.securityCode,
        expirationDate: cardEmplyeeInfo.expirationDate,
        password: encryptedPassword,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: cardEmplyeeInfo.type,
    }

    await cardRepository.update(cardId, updateCard);
}

async function unlockCard(cardId: number, password: string) {

    const cardEmplyeeInfo = await cardExist(cardId)

    await cardIsBlocked(cardId)
    await cardExpiration(cardId)
    await correctPassword(cardId, password)

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const updateCard = {
        employeeId: cardEmplyeeInfo.employeeId,
        number: cardEmplyeeInfo.number,
        cardholderName: cardEmplyeeInfo.cardholderName,
        securityCode: cardEmplyeeInfo.securityCode,
        expirationDate: cardEmplyeeInfo.expirationDate,
        password: encryptedPassword,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type: cardEmplyeeInfo.type,
    }

    await cardRepository.update(cardId, updateCard);
}

const cardService = {
    createCard,
    activateCard,
    getBalance,
    blockCard,
    unlockCard
}

export default cardService