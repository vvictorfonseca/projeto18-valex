async function balanceBiggerThanAmount(resultAmount: number, amount: number) {

    if (amount > resultAmount) {
        throw { type: "bad_Request", message: "insufficient funds" };
    }

    return;
}

export default balanceBiggerThanAmount;