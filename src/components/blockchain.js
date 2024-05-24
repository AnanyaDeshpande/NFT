const Web3 = require('web3');
const TicketNFTABI = [/* ABI from the compiled TicketNFT contract */];
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

const web3 = new Web3('http://localhost:8545'); // or your Infura endpoint
const contract = new web3.eth.Contract(TicketNFTABI, contractAddress);

async function mintTicket(toAddress, metadataURI) {
    const accounts = await web3.eth.getAccounts();
    const adminAccount = accounts[0];
    await contract.methods.mint(toAddress, metadataURI).send({ from: adminAccount });
}

module.exports = {
    mintTicket
};
