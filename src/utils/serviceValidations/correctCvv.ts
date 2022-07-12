async function correctCvv(securityCode: string, decryptCardCvv: string) {
    
    if (securityCode != decryptCardCvv) {
        throw { type: "bad_request", message: "Wrong cvv number" }
    }

    return;
}

export default correctCvv;