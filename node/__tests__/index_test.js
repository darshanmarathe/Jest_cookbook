const { Add } = require('../index');

describe("Main Index Module", () => {
    it("Add works", () => {

        expect(Add(1, 2)).toBe(3);
    })


    it("Add Nagative", () => {

        expect(Add(2 ,3)).not.toBe(3);
    })


});
