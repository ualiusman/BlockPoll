import { Component } from '@angular/core';
import { PollService } from './poll-service/poll.service';
import { Poll, PollForm, PollVote } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm =false;
  polls = this.pollService.getPolls();

  activePoll:Poll | null  = null;
  isActvie:boolean = false;

  constructor(private pollService:PollService){

  }


  handlePollCreated(poll:PollForm){
    this.pollService.createPoll(poll);
  }

  handlePollVote(pollVote:PollVote){
    this.pollService.vote(pollVote.id,pollVote.vote);
  }



  setActivePoll(poll:any){
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100);


  }
}
