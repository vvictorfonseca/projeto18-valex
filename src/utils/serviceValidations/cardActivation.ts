import * as cardRepository from "../../repositories/cardRepository.js";

async function cardIsActive(cardEmplyeeInfo: cardRepository.Card) {

    if (cardEmplyeeInfo.password == null) {
        throw { type: "bad_request", message: "Card is not activated" }
    }

    return;
}

async function cardIsNotActive(cardEmplyeeInfo: cardRepository.Card){

    if (cardEmplyeeInfo.password != null) {
        throw { type: "bad_request", message: "Card is already activated" }
    }

    return;
}

export { cardIsActive, cardIsNotActive };