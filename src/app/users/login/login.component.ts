import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }
  authError: any;
  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
    this.resetForm();
  }

  loginTemplate = new FormGroup({    
    email : new FormControl(''),
    password : new FormControl(''),
  });

  resetForm(){
    this.loginTemplate.reset();
    this.loginTemplate.setValue({
      email : '',
      password : ''
    });
  }
  
  login(form){
    this.auth.login(form.email, form.password);
  }
  
}
