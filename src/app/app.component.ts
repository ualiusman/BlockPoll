import { Component } from '@angular/core';
import { Poll } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm =false;
  polls:Poll[] =
  [
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

  ];
  activePoll:Poll | null  = null;
  isActvie:boolean = false;




  setActivePoll(poll:any){
    this.activePoll = null;

    setTimeout(() => {
      this.activePoll = poll;
    }, 100);


  }
}
