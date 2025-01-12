const GameContract = artifacts.require("GameContract");

module.exports = function (deployer) {
  const initialFee = web3.utils.toWei('0.01', 'ether'); // Set initial fee
  deployer.deploy(GameContract, initialFee);
};
