import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { config } from "dotenv";
import fetch from 'node-fetch';

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange";
//const apiKey = "d85753f6-1416-47fa-bf85-4b9a1e2828a5";
//const apiSecret = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkFQSSJ9.eyJpc3MiOiJibG9ja2NoYWluIiwiYXVkIjoibWVyY3VyeSIsImlhdCI6MTc0MTk4ODk5NiwianRpIjoiZDg1NzUzZjYtMTQxNi00N2ZhLWJmODUtNGI5YTFlMjgyOGE1IiwidWlkIjoiOGNiNDdiNTUtMDgwMS00ZWE1LWJhMDEtZmQ3NTAyMTc0MTczIiwic2VxIjo0NTk5OTQyLCJyZG8iOnRydWUsIndkbCI6ZmFsc2V9.H9llqaWHEDTPAwjG5F2LY+LaGdU5WEqZRPnzjOT8FI4Tdc5lLHFP6K02Gul1YVeT9nVf2Xf718wryHtC2ljR9Dc=";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});