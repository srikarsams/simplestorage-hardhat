const { ethers } = require("hardhat");
const { assert } = require("chai");

describe("SimpleStorage", () => {
    let simpleStorageFactory;
    let simpleStorage;
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should initialize with a favorite number 0", async () => {
        const favoriteNumber = await simpleStorage.retrieve();
        const expectedNumber = "0";
        assert.equal(favoriteNumber.toString(), expectedNumber);
    });

    it("Should update when we call store", async () => {
        const expectedNumber = "7";

        const response = await simpleStorage.store(expectedNumber);
        await response.wait(1);

        const currentNumber = await simpleStorage.retrieve();
        assert.equal(currentNumber.toString(), expectedNumber);
    });

    it("Should update when we call addPerson", async () => {
        const expectedNumber = "7";

        const response = await simpleStorage.addPerson("srikar", "7");
        await response.wait(1);

        const currentNumber = await simpleStorage.getFavoriteNumberofPerson(
            "srikar"
        );
        assert.equal(currentNumber.toString(), expectedNumber);
    });
});
