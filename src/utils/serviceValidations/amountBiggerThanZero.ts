async function amountBiggerThanZero(amount: number) {
    
    if (amount <= 0) {
        throw { type: "bad_Request", message: "amount must be bigger than 0" };
    }

    return;
}

export default amountBiggerThanZero;