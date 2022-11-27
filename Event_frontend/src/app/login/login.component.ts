import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginArray = this.validation.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    pswd: ['', [Validators.required, Validators.minLength(4)]]
  })

  constructor(private route: Router, private service: ServiceService, private validation: FormBuilder) { }

  ngOnInit(): void { }

  login() {
    var email = this.loginArray.value.email
    var pswd = this.loginArray.value.pswd

    if (this.loginArray.valid) {
      this.service.login(email, pswd)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem('ucode',JSON.stringify(result.ucode))
            alert(result.message)
            this.route.navigateByUrl('homepage')
          }
        }, (result) => {
          alert(result.error.message)
        })
    } else {
      alert('Your entered data not in a valid form')
    }
  }

}
