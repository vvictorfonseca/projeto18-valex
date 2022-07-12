import * as cardRepository from "../../repositories/cardRepository.js"

async function cardExist(cardId: number) {
    
    const cardExist = await cardRepository.findById(cardId);

    if (!cardExist) {
        throw { type: "not_found", message: "Card doesn't exist" }
    }

    return cardExist;
}

export default cardExist;