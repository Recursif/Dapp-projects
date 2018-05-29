
var CMCOracle = artifact.require("./CMCOracle.sol");

module.exports = function(deployer) {
  deployer.deploy(CMCOracle);
}