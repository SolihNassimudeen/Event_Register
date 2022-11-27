import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  @Input() item: any | undefined
  @Output() onCancel = new EventEmitter

  eventArray = this.validation.group({
    eventname: ['', [Validators.required]],
    eventdate: ['', [Validators.required]]
  })

  constructor(private service: ServiceService, private route: Router, private validation: FormBuilder) { }

  ngOnInit(): void {

  }

  close() {
    this.onCancel.emit()
  }

  register() {
    var ucode = this.item
    var eventname = this.eventArray.value.eventname
    var eventdate = this.eventArray.value.eventdate
    if (this.eventArray.valid) {
      this.service.eventregister(ucode, eventname, eventdate)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            this.route.navigateByUrl('events')
          }
        }, (result) => {
          alert(result.error.message)
        })
    }else{
      alert('The data you provided is not valid')
    }

  }


}
