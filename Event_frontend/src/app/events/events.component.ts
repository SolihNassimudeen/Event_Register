import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  eventArray: any = []
  delete_event_name: any
  delete_event_date: any
  ucode: any
  id:any
  constructor(private route: Router, private service: ServiceService) {
    var ucode = JSON.parse(localStorage.getItem('ucode') || '')
    this.service.eventlist(ucode)
      .subscribe((result: any) => {
        if (result) {
          this.eventArray = result.events
        }
      })

  }

  events() {
    this.route.navigateByUrl('events')
  }

  home() {
    this.route.navigateByUrl('homepage')
  }

  history() {
    this.route.navigateByUrl('history')
  }

  deleteRow(id: any) {
    this.service.deleteOne(id)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          window.location.reload();
        }
      }, (result) => {
        alert(result.error.message)
      })
  }

  addHistory(id: any) {
    this.service.history(id)
      .subscribe((result: any) => {
        this.deleteRow(id)
      })
  }

  delete(id: any) {
    this.service.deletePopup(id)
      .subscribe((result: any) => {
        if (result) {
          this.delete_event_name = result.name
          this.delete_event_date = result.date
          this.ucode = result.ucode
          this.id=result.id
        }
      })
  }

  cancel() {

    this.delete_event_name = ''
    this.delete_event_date = ''
    this.ucode = ''
    this.id=''
  }
}
