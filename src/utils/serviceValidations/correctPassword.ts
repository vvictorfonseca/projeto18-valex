import bcrypt from "bcrypt";

import * as cardRepository from "../../repositories/cardRepository.js";

async function correctPassword(cardId: number, password: string) {
    const card = await cardRepository.findById(cardId);

    const isCorrectPassword = bcrypt.compareSync(password, card.password);

    if (!isCorrectPassword) {
        throw { type: "not_found", message: "invalid password" }
    }

    return
}

export default correctPassword;