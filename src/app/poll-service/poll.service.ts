import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Poll, PollForm } from '../types';
import { delay } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';
@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private web3: Web3Service) { }


  getPolls(): Observable<Poll[]>{
    return of([
      {
        id:1,
        question: 'Do you like cats or dogs?',
        thumnail:'https://www.islamabad.net/public/gallery_pictures/day-view-of-faisal-mosque-.jpg',
        results:[0,5,9],
        options:["cats",'Dogs'],
        voted:true,
      },
      {
        id:2,
        question: 'Best month of holiydays?',
        thumnail:'https://www.islamabad.net/public/gallery_pictures/day-view-of-faisal-mosque-.jpg',
        results:[0,5,2],
        options:["Jan","Fab"],
        voted:false,
      }

    ]).pipe(delay(2000));
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
}

