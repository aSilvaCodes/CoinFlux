import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange";
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const configs = {
    headers: {
        "X-API-Token": apiKey,
        "X-API-Secret": apiSecret
    }
};
const tokenList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getTickers() {
    try{
        const response = await axios.get(API_URL + "/tickers", configs);
        //tokenList = response.data;
        return response.data;
    } catch(error){
        console.error("Error fetching tickers:", error);
        return [];
    }
}

function getIconUrl(symbol){
    const baseSymbol = symbol.split('-')[0].toLowerCase();
    const symbolMap = {
        tfuel: 'theta-fuel',
        xlm: 'stellar',
        algo: 'algorand',
        efi: 'efinity-token',
        xtz: 'tezos',
        usdc: 'usd-coin',
        ogn: 'origin-protocol',
        clout: 'clout',
        stx: 'stacks',
        ceur: 'celo-euro',
        eos: 'eos',
        pax: 'pax-dollar',
        bch: 'bitcoin-cash',
        dai: 'dai',
        usdt: 'tether',
        crv: 'curve-dao-token',
        link: 'chainlink',
        chz: 'chiliz',
        ape: 'apecoin',
        matic: 'polygon',
        wdgld: 'wrapped-digital-gold',
        eth: 'ethereum',
        snx: 'synthetix',
        lend: 'aave',
        xrp: 'xrp',
        bat: 'basic-attention-token',
        dgld: 'digital-gold',
        btc: 'bitcoin',
        wluna: 'wrapped-luna',
        theta: 'theta-network',
        gala: 'gala',
        cusd: 'celo-dollar',
        doge: 'dogecoin',
        grt: 'the-graph',
        yfi: 'yearn-finance',
        uma: 'uma',
        wbtc: 'wrapped-bitcoin',
        mkr: 'maker',
        near: 'near-protocol',
        trx: 'tron',
        uni: 'uniswap',
        dot: 'polkadot',
        celo: 'celo',
        ltc: 'litecoin',
        comp: 'compound',
        sol: 'solana',
        eur: 'euro',
        rare: 'superrare',
        zrx: '0x',
        ada: 'cardano',
        aave: 'aave',
        sushi: 'sushi',
        enj: 'enjin-coin'
    };
    const fullName = symbolMap[baseSymbol] || baseSymbol;
    return `https://cryptologos.cc/logos/${fullName}-${baseSymbol}-logo.svg?v=040`
}

app.get("/", async (req,res) => {
    try{
        const tickers = await getTickers();
        const cryptoData = tickers.map(ticker => ({
            symbol: ticker.symbol.split("-")[0],
            price24h: ticker.price_24h,
            volume24h: ticker.volume_24h,
            lastTradePrice: ticker.last_trade_price,
            logo: getIconUrl(ticker.symbol),
            defaultLogo: "https://cryptologos.cc/logos/dogebonk-dobo-logo.svg?v=040",
        }));
        res.render("index.ejs", { cryptos: cryptoData });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/summary/:symbol", async (req, res) => {
    const tokenSymbol = req.params.symbol;
    const tokenList = await getTickers();
    const token = tokenList.find(t => t.symbol.split('-')[0] === tokenSymbol);
    if (token === -1) {
        return res.status(404).send('Token not found');  
    }
    console.log(token);
    res.render("summary.ejs", {
        token: token,
        logo: getIconUrl(token.symbol)
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
