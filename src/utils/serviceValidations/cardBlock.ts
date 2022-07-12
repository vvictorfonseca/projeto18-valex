import * as cardRepository from "../../repositories/cardRepository.js"

async function cardIsBlocked(cardId: number) {
    const card = await cardRepository.findById(cardId)

    if (card.isBlocked == false ) {
        throw { type: "bad_Request", message: "This card is unblocked" };
    }

    return;
}

async function cardIsNotBlocked(cardId: number) {
    const card = await cardRepository.findById(cardId)

    if (card.isBlocked == true ) {
        throw { type: "bad_Request", message: "This card is blocked" };
    }

    return;
}

export { cardIsBlocked, cardIsNotBlocked };