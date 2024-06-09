async function main() {
    const IPLTicketNFT = await ethers.getContractFactory("IPLTicketNFT");
    const iplticketNFT = await IPLTicketNFT.deploy();
    await iplticketNFT.deployed();
    console.log("IPLTicketNFT deployed to:", iplticketNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
