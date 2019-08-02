import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore, 
    private router: Router
  ) { }

  getuserState(){
    return this.afAuth.authState;
  }


  //login user
  login(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.eventAuthError.next(error);
    })
    .then(userCredential => {
      if(userCredential){
        
        if (userCredential.user.uid == 'cbL18srurRZ4GVehBHyh3Pqe0Ng1'){
          //redirect to admin page
          this.router.navigate(['/admin']);
        }else{

          //redirect to other users
          this.router.navigate(['']);
        }
       
      }
    })
  }

  //create new user
  createUser(user){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(userCredential =>{
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.lastname+ ' '+ user.firstname
        });
        this.insertUserDate(userCredential)
        .then(() =>{

          //redirect after authentication
          this.router.navigate(['/shop']);
        });
    })
    .catch( error =>{
      this.eventAuthError.next(error);
    })
  }


  //save other credentials to firestor
  insertUserDate(userCredential: firebase.auth.UserCredential){
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstname,
      lastname: this.newUser.lastname,
      address: this.newUser.address,
      role: 'customer'
    })
  }

  //logout user
  logout(){
    return this.afAuth.auth.signOut()
    .then(() => {
      this.router.navigate(['/'])
    })
  }
}
