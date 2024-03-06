/*
* dev: Sazumi Viki
* ig: @moe.sazumiviki
* gh: github.com/sazumivicky
* site: sazumi.moe
*/

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let database = {};

const databasePath = path.join(__dirname, 'database.json');
if (fs.existsSync(databasePath)) {
    const data = fs.readFileSync(databasePath);
    database = JSON.parse(data);
}

app.post('/shorten', (req, res) => {
    const longUrl = req.body.longUrl;
    if (!longUrl) {
        res.status(400).send('Please Input Link');
        return;
    }
    const shortId = generateShortId(6);
    database[shortId] = longUrl;
    fs.writeFileSync(databasePath, JSON.stringify(database));

    const shortUrl = `http://lnk.sazumi.moe/${shortId}`;
    res.send(shortUrl);
});

app.get('/:shortId', (req, res) => {
    const shortId = req.params.shortId;
    const longUrl = database[shortId];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

function generateShortId(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
