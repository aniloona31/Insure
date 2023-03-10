require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:'hardhat',
  paths:{
    artifacts : './src/artifacts',
  },
  networks:{
    hardhat:{
      chainId:1337
    },
  },
  solidity: "0.8.17",
};
