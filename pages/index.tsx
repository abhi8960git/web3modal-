
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'
import React, { useEffect } from "react";
import Web3Wallet from "@/context/Web3Modal";
import abi from '../services/abi.json'
import { Container } from 'postcss';
const address:string ='0x4dA194bC069bDf5a5ee580632dAF0b986b45287f';
export default function RootLayout() {

  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  async function getBalance(){
    if(!isConnected) {
      alert("Please connect Metamask")
    }
    const ethersProvider =  new ethers.providers.Web3Provider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const contract = new ethers.Contract(address, abi, signer)
   return contract;
  }



  useEffect(()=>{
   getBalance();
  },[])

  return (
  
     <div>
     <Web3Wallet/>

     </div>
 
  );
}