require('dotenv').config();
const { MNEMONIC, ALCHEMY_API_KEY } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Ethereum Mainnet using Alchemy
    mainnet: {
      provider: () => new HDWalletProvider(
        MNEMONIC, // Your wallet's mnemonic
        `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}` // Your Alchemy API URL
      ),
      network_id: 1,       // Mainnet's network id
      gas: 5500000,         // Gas limit for transactions
      gasPrice: 20000000000,  // Gas price (20 gwei) in wei
      confirmations: 2,     // Number of confirmations to wait before considering the transaction final
      timeoutBlocks: 200,   // Timeout in blocks before a deployment times out
      skipDryRun: true,     // Skip dry run before deployment
    },
    
    // Example for Goerli Testnet using Alchemy
    goerli: {
      provider: () => new HDWalletProvider(
        MNEMONIC,
        `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}` // Your Goerli API URL
      ),
      network_id: 5,       // Goerli's network id
      gas: 5500000,
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    // Optional: for local testing with Ganache (development)
    development: {
      host: "127.0.0.1",   // Localhost (default: none)
      port: 7545,          // Standard Ethereum port (default: none)
      network_id: "5777",  // Ganache's network ID (default: none)
    }
  },

  mocha: {
    timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.21",    // Exact version from solc-bin
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  },

  db: {
    enabled: false
  }
};
