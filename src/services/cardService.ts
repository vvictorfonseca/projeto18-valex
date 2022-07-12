import { faker } from '@faker-js/faker';
import dayjs from 'dayjs'
import Cryptr from 'cryptr'
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js"

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
        throw { type: "not_found", message: "Card doesn't exist" }
    }

    if (dayjs(cardEmplyeeInfo.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))) {
        throw { type: "bad_Request", message: "Card expired!" };
    }

    if (cardEmplyeeInfo.password != null){
        throw { type: "bad_request", message: "Password already registered" }
    }

    const cardCvv = cardEmplyeeInfo.securityCode;
    const cryptr = new Cryptr('SENHASECRETAKEY');
    const decryptCardCvv = cryptr.decrypt(cardCvv);

    if (securityCode != decryptCardCvv) {
        throw { type: "bad_request", message: "Wrong cvv number" }
    }

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

    await cardRepository.update(cardEmplyeeInfo.id, updateCard);
}

async function getBalance(id: number) {
    const payments = await paymentRepository.findByCardId(id)
    const recharges = await rechargeRepository.findByCardId(id)

    let paymentsAmount = 0;
    let rechargesAmount = 0;

    payments.forEach(
        (info) => paymentsAmount += info.amount
    )

    recharges.forEach(
        (info) => rechargesAmount += info.amount
    )

    let resultAmount = rechargesAmount - paymentsAmount;

    const result =  {
        "balance": resultAmount,
        "transactions": [...payments],
        "recharges": [...recharges]
    }

    return result
}

async function blockCard(id: number, password: string) {

    const cardEmplyeeInfo = await cardRepository.findById(id);

    if (!cardEmplyeeInfo) {
        throw { type: "not_found", message: "Card doesn't exist" }
    }

    if (cardEmplyeeInfo.isBlocked === true) {
        throw { type: "bad_request", message: "card already disblockes" }
    }

    const isCorrectPassword = bcrypt.compareSync(password, cardEmplyeeInfo.password);

    if (!isCorrectPassword) {
        throw { type: "not_found", message: "invalid password" }
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
        isBlocked: true,
        type: cardEmplyeeInfo.type,
    }

    await cardRepository.update(cardEmplyeeInfo.id, updateCard);
}

async function unlockCard(id: number, password: string) {

    const cardEmplyeeInfo = await cardRepository.findById(id);

    if (!cardEmplyeeInfo) {
        throw { type: "not_found", message: "Card doesn't exist" }
    }

    if (cardEmplyeeInfo.isBlocked === false) {
        throw { type: "bad_request", message: "card already blocked" }
    }

    const isCorrectPassword = bcrypt.compareSync(password, cardEmplyeeInfo.password);

    if (!isCorrectPassword) {
        throw { type: "not_found", message: "invalid password" }
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
    activateCard,
    getBalance,
    blockCard,
    unlockCard
}

export default cardService