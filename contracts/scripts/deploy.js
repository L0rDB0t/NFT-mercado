const hre = require("hardhat");

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.waitForDeployment();

  console.log("Contract deployed to:", await nftMarket.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});