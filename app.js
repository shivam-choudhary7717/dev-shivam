const path = require('path');
const puppeteer = require('puppeteer');
const {extractItems , scrapeItems , goto_links } = require("./main");
const JsonTo_excel = require('./excel');

const express = require('express');

const app = express();

const port  = 4000;

const staticPath = path.join(__dirname + '/frontend');

app.use(express.static(staticPath));
app.use(express.json());

app.get('/' , (req, res)=> {
    res.send("Hello world");
})

app.post('/' , (req,res)=> {
    let data = req.body;
    let result;
    // console.log(data.Item , data.Count);
    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const [page] = await browser.pages();
        await page.setViewport({ width: 1280, height: 926 });
        await page.goto(
            `https://www.google.com/maps/search/${data.Item } + ${data.Pincode}`
        );
        const items = await scrapeItems(page, extractItems, data.Count);
        result = await goto_links(page, items);
        JsonTo_excel(result);
        await browser.close();
    })();
    console.log('successfully completed');
    res.end();
})

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})