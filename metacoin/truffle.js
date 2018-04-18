module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x447ffffa654cded3f222b49b923d7655ffb0a445", // Default address to use for any transaction
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  }
};
