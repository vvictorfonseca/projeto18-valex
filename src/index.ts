import express, {json} from "express";
import cors from "cors";

import "./config/setup.js"

import cardRouter from "./routers/cardRouter.js";

const app = express();
app.use(cors());
app.use(json());

app.use(cardRouter);

const port: number = +process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});

export default app;