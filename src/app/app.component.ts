import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping-app';

  user: firebase.User;
  constructor(private auth: AuthService){}

  ngOnInit(){
    this.auth.getuserState().subscribe(user =>{
      this.user = user; 
         
    })
  }

  logout(){
    this.auth.logout();
  }
}
