/**
 * @description 
 * Do factory and deploy of NFT.
 */
const main = async () => {
    /**
     * @description
     * This will actually compile our contract and generate the necessary files 
     * we need to work with our contract under the artifacts directory.
     */
    const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT');
    
    /**
     * @description
     * Hardhat will create a local Ethereum network for us, but just for this contract. 
     * Then, after the script completes it'll destroy that local network. 
     * So, every time you run the contract, it'll be a fresh blockchain.
     */
    const nftContract = await nftContractFactory.deploy();
    
    /**
     * @description
     * We'll wait until our contract is officially mined and deployed to our local blockchain! 
     * That's right, hardhat actually creates fake "miners" on your machine to try its best to imitate the actual blockchain.
     */
    await nftContract.deployed();

    /**
     * @description
     * once it's deployed `nftContract.address` will basically give us the address of the deployed contract. 
     * This address is how we can actually find our contract on the blockchain.
     */
    console.log('Contract deployed to:', nftContract.address);

    // Call the function.
    let txn = await nftContract.makeAnEpicNFT();
    // Wait for it to be mined.
    await txn.wait();
    console.log("Minted NFT #1")

    // Mint another NFT for fun.
    txn = await nftContract.makeAnEpicNFT();
    // Wait for it to be mined.
    await txn.wait();
    console.log("Minted NFT #2")
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();
