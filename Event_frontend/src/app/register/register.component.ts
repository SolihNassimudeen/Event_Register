import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  statusClass:any
  ucode:any
  popup:boolean=false
  registerArray=this.validation.group({
    fname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    sname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required]],
    dob:['',[Validators.required]],
    mno:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10)]],
    pswd:['',[Validators.required]]
  })

  constructor(private validation:FormBuilder,private route:Router,private service:ServiceService){

  }

  ngOnInit(){

  }

  register(){
    var fname=this.registerArray.value.fname
    var sname=this.registerArray.value.sname
    var email=this.registerArray.value.email
    var dob=this.registerArray.value.dob
    var mno=this.registerArray.value.mno
    var pswd=this.registerArray.value.pswd

    if(this.registerArray.valid){
      this.service.register(fname,sname,email,dob,mno,pswd)
      .subscribe((result:any)=>{
        if(result){
          
          this.popup=true
          this.statusClass='deactive'
          this.ucode=result.ucode
        }
      },(result)=>{
        alert(result.error.message)
      })

    }else{
      alert('Your data not in a valid formate !')
    }
  }

  ok(){
    this.popup=false
    this.route.navigateByUrl('')
  }

}
