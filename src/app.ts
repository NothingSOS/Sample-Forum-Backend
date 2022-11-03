import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
let myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes";

async function setup() {
  const app = express();
  const port = process.env.port ?? 3005;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(router);

  app.get("/", (req, res) => {
    res.send("Well done!");
  });

  app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
  });
}

setup();
