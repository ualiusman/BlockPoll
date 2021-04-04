import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

declare var window: any;
const contractApi = require("./contractApi.json");
@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: Web3 | undefined;
  private contract: Contract | undefined;
  private contractAddress = "0xF9Cd29980DB344Dd348fd29f8B2A219d05E4C3eD";

  constructor() {

    if(window.web3){
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractApi,
        this.contractAddress
      );

      window.ethereum.enable().catch((err: any) => {
        console.log(err);
      });
    }else{
      console.log("Meta mask not found");
    }
  }
}
