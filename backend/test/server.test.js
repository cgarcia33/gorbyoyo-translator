const request = require("supertest");
const assert = require("assert");
const server = require("../server").server;
const translateToGorbyoyo = require("../server").translateToGorbyoyo;

describe("translation route", () => {
    it("returns correct translation to gorbyoyo", done => {
        request(server).post("/translate")
            .send({ text: "i am not selling knives" })
            .expect("myo214eyo198qyo222ryo224syo226xyo236wyo234iyo206pyo220pyo220myo214ryo224kyo210oyo218ryo224myo214ayo240iyo206wyo234", done)
    });

    it("returns error when translation is not confirmed", done => {
        request(server).post("/translate")
            .send({ text: "i come in peace" })
            .expect("Error", done)
    });
});

describe("latest translation route", () => {
    it("returns latest translation", done => {
        request(server).post("/translate")
            .send({ text: "i am not selling knives" })
            .expect("myo214eyo198qyo222ryo224syo226xyo236wyo234iyo206pyo220pyo220myo214ryo224kyo210oyo218ryo224myo214ayo240iyo206wyo234", () => {
                request(server).get("/latestTranslation")
                    .expect("myo214eyo198qyo222ryo224syo226xyo236wyo234iyo206pyo220pyo220myo214ryo224kyo210oyo218ryo224myo214ayo240iyo206wyo234", done);
            });
    });

    it("returns none when there are no translations", done => {
        request(server).post("/clearDatabase")
            .expect(200, () => {
                request(server).get("/latestTranslation")
                    .expect("none", done);
            });
    });
});

describe("translating function", () => {
    it("translates dorbdorb to gorbyoyo correctly", () => {
        const dorbdorb = ["105m109", "97e101", "109q113", "110r114", "111s115"];
        const gorbyoyo = ["myo214", "eyo198", "qyo222", "ryo224", "syo226"];
        assert.deepEqual(translateToGorbyoyo(dorbdorb), gorbyoyo);
    });
});