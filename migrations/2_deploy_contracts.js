// migrations/2_deploy_contracts.js
const TicketContract = artifacts.require("TicketContract");

module.exports = function(deployer) {
    deployer.deploy(TicketContract);
};
