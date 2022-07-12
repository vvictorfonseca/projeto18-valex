import * as cardRepository from "../../repositories/cardRepository.js"
import * as businessesRepository from "../../repositories/businessRepository.js"

async function cardAndInfoType(cardId: number, businessId: number) {
    
    const business = await businessesRepository.findById(businessId)
    const card = await cardRepository.findById(cardId);

    if (card.type != business.type) {
        throw { type: "bad_Request", message: "different establishments" };
    }

    return
}

export default cardAndInfoType;
