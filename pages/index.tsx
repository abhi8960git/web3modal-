import { Inter } from 'next/font/google'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { useState } from 'react';

const providerOptions = {}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');

  async function connectWallet() {
    try {
      let web3modal = new Web3Modal({
        cacheProvider: false,
        providerOptions
      });
      const web3ModalInstance = await web3modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      const signer = web3ModalProvider.getSigner();
      const address = await signer.getAddress();
      console.log(web3ModalInstance, web3ModalProvider, address);
      setWalletAddress(address);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>hello</p>
        <button onClick={connectWallet}>Connect Wallet</button>
        {walletAddress && <p>Wallet address: {walletAddress}</p>}
      </div>
    </main>
  )
}
