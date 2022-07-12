import express, {json} from "express";
import "express-async-errors";
import cors from "cors";

import "./config/setup.js"

import cardRouter from "./routers/cardRouter.js";
import rechargeRouter from "./routers/rechargeRouter.js";
import paymentRouter from "./routers/paymentRouter.js";
import handleErrors from "./middlewares/handleErrorMiddleware.js";

const app = express();
app.use(cors());
app.use(json());

app.use(cardRouter);
app.use(rechargeRouter);
app.use(paymentRouter);
app.use(handleErrors);

const port: number = +process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});

export default app;