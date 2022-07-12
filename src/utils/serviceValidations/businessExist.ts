import * as businessesRepository from "../../repositories/businessRepository.js"

async function businessExist(businessId: number) {

    const businessExist = await businessesRepository.findById(businessId)

    if (!businessExist) {
        throw { type: "not_found", message: "Business doesn't exist" }
    }

    return businessExist;
}

export default businessExist;