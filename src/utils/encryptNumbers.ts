import Cryptr from "cryptr";
import bcrypt from "bcrypt";

export function encryptCVV(cardCvv: string) {
    const cryptr = new Cryptr("myTotallySecretKey");
    const cardCvvEncrypt = cryptr.encrypt(cardCvv);

    return cardCvvEncrypt;
}

export function decryptCVV(cardCvv: string) {
    const cryptr = new Cryptr("myTotallySecretKey");
    const decryptCardCvv = cryptr.decrypt(cardCvv);

    return decryptCardCvv;
}

export function encryptedPassword(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const cardData = { password: encryptedPassword };

    return cardData;
}