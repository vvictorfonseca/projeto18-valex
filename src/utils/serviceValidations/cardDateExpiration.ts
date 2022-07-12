import dayjs from "dayjs";
import * as cardRepository from "../../repositories/cardRepository.js";

async function cardExpiration(cardId: number) {
    const card = cardRepository.findById(cardId)

    const isExpirated = dayjs((await card).expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));

    if (isExpirated) {
        throw { type: "bad_Request", message: "This card is expirated" };
    }

    return
}

export default cardExpiration;