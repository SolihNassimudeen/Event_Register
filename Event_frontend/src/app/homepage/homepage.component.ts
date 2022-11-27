import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  ucode:any
  addEventClick:any
  constructor(private route:Router){ 
    if(!(localStorage.getItem('ucode'))){
      alert('Please login again')
      this.route.navigateByUrl('')
    }
  }
  ngOnInit(){}

  home(){
    this.route.navigateByUrl('homepage')
  }
  events(){
    this.route.navigateByUrl('events')
  }

  history(){
    this.route.navigateByUrl('history')
  }

  logOut(){
    localStorage.removeItem('ucode')
    this.route.navigateByUrl('')
  }
  addEvent(){
    this.addEventClick='opacity-body-div'
    this.ucode=JSON.parse(localStorage.getItem('ucode')||'')
  }

  cancelEvent(){
    this.addEventClick=''
    this.ucode=''
  }
}
