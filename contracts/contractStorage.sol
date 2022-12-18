//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract contractStorage{
    
    mapping(address => string[]) insuranceMap;

    function addInsurance(string memory insurance) public{
        insuranceMap[msg.sender].push(insurance);
    }

    function getInsurances() public view returns(string [] memory){
        return insuranceMap[msg.sender];
    }

    string public greet = "anirudh";

}