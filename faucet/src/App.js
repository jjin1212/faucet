import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'


function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null
  })

  const [account, setAccount] = useState(null)

  useEffect(() => {
    const loadProvider = async () => {
      // with metamask we have an access to window.ethereum & to window.web3
      // metamask injects a global API into website
      // this API allows websites to request users, accounts, read data to blockchain
      // sign messages and txns
      const provider = await detectEthereumProvider();
      if (provider) {
        console.log('Ethereum successfully detected!')
        // provider.request({method: 'eth_requestAccounts'})
        setWeb3Api({
          web3: new Web3(provider),
          provider: provider
        })
      } else {
        console.error('Please install Metamask!')
      }
    }

    loadProvider()
  }, [])

  console.log(web3Api.web3);
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccounts()
  }, [web3Api.web3])

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <span>
              <strong className="mr-2">Account: </strong>
            </span>
              { account ? 
                account : 
                <button
                  className="button is-small"
                  onClick={() => 
                    web3Api.provider.request({method: 'eth_requestAccounts'}
                  )}
                >
                  Connect Wallet
                </button> 
              }
          </div>
          <div className="balance-view is-size-2 my-4">
            Current Balance: <strong>10</strong> ETH
          </div>
          <button className="button is-link mr-2">Donate</button>
          <button className="button is-primary">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
