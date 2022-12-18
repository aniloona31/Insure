import React, { useState } from "react";
import { ethers } from "ethers";
import ContractStorage from './artifacts/contracts/contractStorage.sol/contractStorage.json'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import uuid from "react-uuid";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

function App() {

  const [storageContract, setStorageContract] = useState("")

  async function fetchContract() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, ContractStorage.abi, provider)

      try {
        const data = await contract.greet();
        setStorageContract(data)
        console.log(data);
      } catch (err) {
        console.log(err);
      }

    }
  }

  const addInsuranceToBlockChain = async () => {
    if(storageContract === ""){
      return
    }
    // const file = event.target.files[0];
    // if(!file)return
    // let selectedFile = event.target.files;
    // let file = null;
    // let fileName = "";
    // //Check File is not Empty
    // if (selectedFile.length > 0) {
    //     // Select the very first file from list
    //     let fileToLoad = selectedFile[0];
    //     fileName = fileToLoad.name;
    //     // FileReader function for read the file.
    //     let fileReader = new FileReader();
    //     // Onload of file read the file content
    //     fileReader.onload = function(fileLoadedEvent) {
    //         file = fileLoadedEvent.target.result;
    //         // Print data in console
    //         // console.log(file);
    //     };
    //     // Convert data to base64
    //     fileReader.readAsDataURL(fileToLoad);
    // }
    
    if (!typeof window.ethereum !== 'undefined') {
      console.log('i am here.')
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, ContractStorage.abi, signer)
      
      const transaction = await contract.addInsurance(storageContract)
      await transaction.wait();
    }
  }

  async function requestAccount(){
    await window.ethereum.request(({method : 'eth_requestAccounts'}))
  }

  const addInsuranceToIPFS = async (e) => {
    const file = e.target.files[0]
    if(!file)return
    console.log(file)

    console.log(client)
    // try {
    //   const add = await client.add(file)
    //   addInsuranceToBlockChain(add)
    // } catch (err) {
    //   console.log(err)
    // }

    setStorageContract(uuid());

  }

  return (
    <div className="App">
      <input type='file' accept="application/pdf" placeholder='upload pdf' onChange={addInsuranceToIPFS} />
      <button onClick={addInsuranceToBlockChain}/>
    </div>
  );
}

export default App;
