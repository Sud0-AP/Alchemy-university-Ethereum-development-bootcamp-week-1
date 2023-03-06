import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {


  async function requestAccount() {
    console.log('Requesting account...');
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);

        const { data: { balance },} = await server.get(`balance/${address}`);
        setBalance(balance);
        

      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
      setBalance(0);
    }

    
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <button onClick={requestAccount}>
        Connect Metamask Wallet
      </button>

      <h4>Wallet Address: {address}</h4>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
