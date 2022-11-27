import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  register(fname: any, sname: any, email: any, dob: any, mno: any, pswd: any) {
    const data = {
      "fname": fname,
      "sname": sname,
      "email": email,
      "dob": dob,
      "mno": mno,
      "pswd": pswd
    }
    return this.http.post('http://localhost:3001/register', data)
  }

  login(email: any, pswd: any) {
    const data = {
      "email": email,
      "pswd": pswd
    }
    return this.http.post('http://localhost:3001/login', data)
  }

  eventregister(ucode: any, eventname: any, eventdate: any) {
    const data = {
      "ucode": ucode,
      "eventname": eventname,
      "eventdate": eventdate
    }
    return this.http.post('http://localhost:3001/eventregister', data)
  }

  eventlist(ucode: any) {
    return this.http.post('http://localhost:3001/eventlist', ({ "ucode": ucode }))
  }

  deleteOne(id: any) {
    return this.http.delete(`http://localhost:3001/deleteOne/${id}`)
  }

  history(id:any){
    return this.http.post('http://localhost:3001/history', ({ id }))
  }

  historylist(ucode:any){
    return this.http.post('http://localhost:3001/historylist', ({ "ucode": ucode })) 
  }

  deletePopup(id:any){
    return this.http.post('http://localhost:3001/deletePopup',({"id":id}))
  }

}
