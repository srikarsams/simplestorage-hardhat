const { ethers } = require("hardhat");

// By default, hardhat uses hardhat network
// it automatically comes with rpc url and private key
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    // to check whether the contract has been successfully deployed
    await simpleStorage.deployed();
    console.log("deployed the contract..", simpleStorage.address);

    const currentFavouriteNumber = await simpleStorage.retrieve();
    console.log({ currentFavouriteNumber });

    const transactionResponse = await simpleStorage.store(223);
    transactionResponse.wait(5);

    const updatedFavouriteNumber = await simpleStorage.retrieve();
    console.log({ updatedFavouriteNumber });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
