import Web3 from 'web3';

export default function connectWallet() {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed.');
    }

    // Request account access and connect wallet
    window.ethereum.request({ method: 'eth_requestAccounts' });

    // Get the list of Ethereum accounts
    window.ethereum.request({ method: 'eth_accounts' })
      .then((accounts) => {
        if (accounts.length > 0) {
          // Set the selected account
          const selectedAccount = accounts[0];
          // Update the account list
          const accountList = document.getElementById('accountList');
          accountList.innerHTML = '';
          accounts.forEach((account) => {
            const accountOption = document.createElement('option');
            accountOption.textContent = account;
            accountOption.value = account;
            accountList.appendChild(accountOption);
          });
        }
      })
      .catch((error) => {
        console.error('Error connecting MetaMask:', error);
        alert(`Error connecting MetaMask: ${error.message}`);
      });
  } catch (error) {
    console.error('Error connecting MetaMask:', error);
    alert(`Error connecting MetaMask: ${error.message}`);
  }
}