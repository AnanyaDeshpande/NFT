const { ethers } = require("ethers");

async function transferETH() {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");
    const senderPrivateKey = "0xe5ff053f7d949f7aa129a21f385226901b1f2f514fc7704d31bf2ca665b49e7d";
  const senderWallet = new ethers.Wallet(senderPrivateKey, provider);
  const receiverAddress = "0xb73F8270acE340C320c279cF15630C911aF2c93d";
  const tx = {
    to: receiverAddress,
    value: ethers.utils.parseEther("1.0") // 1 ETH
  };
  const transactionResponse = await senderWallet.sendTransaction(tx);
  console.log("Transaction Hash:", transactionResponse.hash);
  const receipt = await transactionResponse.wait();
  console.log("Transaction was mined in block:", receipt.blockNumber);
}
transferETH().catch(console.error);
