require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // Usa la URL de Alchemy
      accounts: [process.env.PRIVATE_KEY], // Tu private key
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Para verificar el contrato
  },
};