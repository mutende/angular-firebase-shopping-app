import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authError: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    })
  }

  signupTemplate = new FormGroup({    

    lastname : new FormControl(''),
    firstname : new FormControl(''),
    address : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl('')
  });

  resetForm(){
    this.signupTemplate.reset();
    this.signupTemplate.setValue({
     
      lastname : '',
      firstname : '',
      address : '',
      email : '',
      password : ''
      
    });
  }

  createUser(form){
     this.auth.createUser(form);
  }
}
