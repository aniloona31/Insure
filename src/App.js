import React, { useState } from "react";
import { ethers } from "ethers";
import ContractStorage from './artifacts/contracts/contractStorage.sol/contractStorage.json'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import uuid from "react-uuid";

import './App.css'

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

    if (storageContract === "") {
      return
    }
    console.log("i am here")
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
      setStorageContract("");
    }
  }

  async function requestAccount() {
    await window.ethereum.request(({ method: 'eth_requestAccounts' }))
  }

  const addInsuranceToIPFS = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    console.log(file)

    console.log(client)
    // try {
    //   const add = await client.add(file)
    //   addInsuranceToBlockChain(add)
    // } catch (err) {
    //   console.log(err)
    // }

    setStorageContract(file.name);

  }

  return (
    <div className="App">
      {/* <input type='file' accept="application/pdf" placeholder='upload pdf' onChange={addInsuranceToIPFS} />
      <button onClick={addInsuranceToBlockChain}/> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Insure</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="card">
          <h3>Upload Files</h3>
          <div className="drop_box">
            {storageContract==="" ? <><header>
              <h4>Select File here</h4>
            </header>
            <p>Files Supported: PDF</p>
            <form action="\">
              <label class="custom-file-upload">
                <input onChange={addInsuranceToIPFS} accept="application/pdf" type="file" />
                Custom Upload 
              </label> 
              <br />
              <button onClick={addInsuranceToBlockChain} className="btn">Submit</button>
            </form> </>: <>
            {storageContract}
            <button onClick={addInsuranceToBlockChain} className="btn">Submit</button>
            </>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
