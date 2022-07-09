import { faker } from '@faker-js/faker';
import dayjs from 'dayjs'
import Cryptr from 'cryptr'
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js"
import formatName from "../utils/formatName.js";

async function createCard(employee: { id: number; fullName: string }, cardType: cardRepository.TransactionTypes) {
    
    const cardNumber = faker.finance.creditCardNumber();
    const fullNameFormat = formatName(employee.fullName);
    const cardExpiration = dayjs(Date.now()).add(5, "year").format("MM/YY");
    const cardCvv = faker.finance.creditCardCVV();
    console.log("cardCvv", cardCvv)
    const cryptr = new Cryptr('SENHASECRETAKEY');
    const cardCvvEncrypt = cryptr.encrypt(cardCvv);

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

    await cardRepository.insert(cardData)
}

async function activateCard(id: number, securityCode: string, password: string) {

    const cardEmplyeeInfo = await cardRepository.findById(id);

    if (!cardEmplyeeInfo) {
        throw { status: 404, message: "Card doesn't exist" }
    }

    // if (dayjs().isAfter(cardEmplyeeInfo.expirationDate)) {
    //     throw { status: 400, message: "Expired Card" }
    // }

    if (cardEmplyeeInfo.password != null){
        throw { status: 400, message: "Password already registered" }
    }

    const cardCvv = cardEmplyeeInfo.securityCode;
    const cryptr = new Cryptr('SENHASECRETAKEY');
    const decryptCardCvv = cryptr.decrypt(cardCvv);

    if (securityCode != decryptCardCvv) {
        throw { status: 400, message: "Wrong cvv number" }
    }

    if (password.length > 4) {
        throw { status: 400, message: "Wrong cvv number" }
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

    await cardRepository.update(cardEmplyeeInfo.id, updateCard);
}

const cardService = {
    createCard,
    activateCard
}

export default cardService