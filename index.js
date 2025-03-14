import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { config } from "dotenv";
import fetch from 'node-fetch';

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
