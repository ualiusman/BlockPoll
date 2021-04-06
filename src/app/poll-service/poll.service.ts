import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Poll, PollForm } from '../types';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
import { ASTWithName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private web3: Web3Service) { }


  async getPolls(): Promise<Poll[]>{
    const polls:Poll[] = [];
    const  totalPolls  = await this.web3.call('getTotalPolls');
    const acc = await this.web3.getAccount();
    const voter  = await this.web3.call('getVoter',acc);
    const voterNormlize = this.normalizeVoter(voter);

    for(let i =0; i< totalPolls; i++){
      const pollRaw  = await this.web3.call("getPoll", i);
      const pollNormlise = this.normalizePoll(pollRaw,voterNormlize);
      polls.push(pollNormlise);
    }

    return polls;
  }

  vote(pollId:number, voteNumber:number){
    this.web3.executeTransaction("vote", pollId,voteNumber);
    console.log(pollId,voteNumber);
  }

  createPoll(pollForm:PollForm){
    this.web3.executeTransaction("createPoll",
     pollForm.question,
     pollForm.thumnail || "",
     pollForm.options
     );
    console.log(pollForm);
  }


  private normalizeVoter(voter:any){
    return {
      id:voter[0],
      votedIds: voter[1].map( (vote: string) => parseInt(vote))
    };
  }

  private normalizePoll(pollRaw: any, voter: any): any{
    return {
      id:pollRaw[0],
      question:pollRaw[1],
      thumnail:pollRaw[2],
      results:pollRaw[3].map( (vote: string) => parseInt(vote)),
      options:pollRaw[4],
    };
  }
}

