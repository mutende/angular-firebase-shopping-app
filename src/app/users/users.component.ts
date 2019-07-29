import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  authError: any;  
  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {

    this.auth.eventAuthError$.subscribe(data =>{
      this.authError = data;
    })
  }
  
}
