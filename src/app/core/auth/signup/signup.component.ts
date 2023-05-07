import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signUpForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    }),
    gender: new FormControl(''),
    birthdate: new FormControl('')
  }) 


  constructor(private location: Location, private authService: AuthService, private userService: UserService, private afs: AngularFirestore){}

  ngOnInit(): void {
    
  }



  onSubmit() {
    console.log(this.signUpForm.value);
    const email = this.signUpForm.get('email')?.value || '';
    const password = this.signUpForm.get('password')?.value || '';
    this.authService.signup(email, password).then(cred => {
      console.log(cred);
      const user: User= {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('username')?.value as string,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string,
        },
        gender: this.signUpForm.get('gender')?.value as string,
       // birthdate: this.signUpForm.get('birthdate') 
      }
      this.userService.create(user).then(_ => {
        console.log('User added successfully.')
      }).catch(error => {
        console.error(error);
        
      })
    }).catch(error => {
      console.error(error);
    }) ;
  }

  goBack() {
    this.location.back();
  }
}
