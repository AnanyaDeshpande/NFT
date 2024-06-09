require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x6a71e19665ef3d218a29cd7b703f948bc6abd0deb2243bb742cde1a1d19001c0"] 
    }
  }
};
