// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const IPLTicketNFT = await ethers.getContractFactory("IPLTicketNFT");
    const nft = await IPLTicketNFT.deploy();
  
    console.log("Contract deployed to address:", nft.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  