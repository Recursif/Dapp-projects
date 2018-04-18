var HDWalletProvider = require("truffle-hdwallet-provider");


// Fill with your Infura API Key and mnemonic to deploy
var infura_apikey = "";
var mnemonic = "";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3
    }
  }
};
