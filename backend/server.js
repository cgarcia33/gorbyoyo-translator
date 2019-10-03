const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const datastore = require("nedb");
const PORT = 4000;
const translationEndpoint = "https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/translateEnglishToAlien";
const confirmationEndpoint = "https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/confirmtranslation";

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});

const database = new datastore("database.db");
database.loadDatabase();

// translate english text to dorbdorb and then to gorbyoyo. finally, verify the translation and return it.
app.post("/translate", async (req, res) => {
    try {
        let dorbdorb = await axios.post(translationEndpoint, { textToTranslate: req.body.text });
        let gorbyoyo = await translateToGorbyoyo(dorbdorb.data);
        let translationString = gorbyoyo.join('');
        let confirmation = await axios.post(confirmationEndpoint, { textToVerify: translationString });
        if (confirmation.data == "Success") {
            database.insert({ latestTranslation: translationString });
            res.send(translationString);
        }
        else {
            res.send("Error");
        }
    }
    catch (e) {
        res.send("Error");
    }
});

// get latest translation if it exists
app.get("/latestTranslation", (req, res) => {
    database.find({}, (err, docs) => {
        if (err) res.send("error retrieving latest translation");
        if (docs.length > 0) {
            res.send(docs[docs.length - 1].latestTranslation);
        }
        else {
            res.send("none");
        }
    });
});

// clear database
app.post("/clearDatabase", (req, res) => {
    database.remove({}, { multi: true }, (err, numRemoved) => {
        database.loadDatabase(err => {
            res.sendStatus(200);
        });
    });
});

// check if a character is a letter
const isLetter = char => {
    return char.toLowerCase() != char.toUpperCase();
};

// translate a dorbdob array to a gorbyoyo array
const translateToGorbyoyo = dorbdorb => {
    const translations = dorbdorb.map(str => {
        let i = 0;

        // find the position of the letter in the dorbdorb string
        while (i < str.length && !isLetter(str[i])) {
            i++;
        }

        const firstNumber = str.slice(0, i)
        const secondNumber = str.slice(i + 1)
        const sum = Number(firstNumber) + Number(secondNumber)
        const letter = str[i]

        return `${letter}yo${sum}`;

    });

    return translations;
};

module.exports = { server: app, translateToGorbyoyo: translateToGorbyoyo };