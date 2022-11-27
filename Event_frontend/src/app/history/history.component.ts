import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  historyArray:any=[]

  constructor(private route:Router,private service:ServiceService){
    var ucode=JSON.parse(localStorage.getItem('ucode')||'')
    this.service.historylist(ucode)
    .subscribe((result:any)=>{
      if(result){
        this.historyArray=result.events
      }
    })
  }

  home(){
    this.route.navigateByUrl('homepage')
  }
  events(){
    this.route.navigateByUrl('events')
  }
  history(){
    this.route.navigateByUrl('history')
  }

}
