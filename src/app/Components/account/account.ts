import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IRegisterData } from '../../Models/iregister-data';

@Component({
  selector: 'app-account',
  imports: [CommonModule , FormsModule ],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {

 activeTab: string = 'info'; 
  user : IRegisterData = { name: '', email: '', password: '' }


    // phone update
  currentPassword: string = '';
  newPhoneNumber: string = '';

  // password update
  currentPasswordForPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router ,
              private authservice: AuthService
  ) {
     const currentUser = this.authservice.getCurrentUser();
     if (currentUser) {
    this.user = currentUser;
  }
  }

  saveChanges() {
    console.log('Changes saved', this.user);
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

 updatePhone() {
  const currentUser = this.authservice.getCurrentUser();

  if (!this.currentPassword || !this.newPhoneNumber) {
    alert("Please fill all fields");
    return;
  }

  if (!currentUser || this.currentPassword !== currentUser.password) {
    alert("Incorrect password");
    return;
  }

  const updatedUser = {
    ...currentUser,
    phone: this.newPhoneNumber
  };

  this.authservice.updateUser(currentUser.id!, updatedUser).subscribe(() => {
    alert("Phone number updated successfully");
    this.authservice.setLoggedInUser(updatedUser);
    this.user = updatedUser; 
    this.currentPassword = '';
    this.newPhoneNumber = '';
  });
}


 updatePassword() {
  const currentUser = this.authservice.getCurrentUser();

  if (!this.currentPasswordForPassword || !this.newPassword || !this.confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (this.newPassword !== this.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!currentUser || this.currentPasswordForPassword !== currentUser.password) {
    alert("Incorrect current password");
    return;
  }

  const updatedUser = {
    ...currentUser,
    password: this.newPassword
  };

  this.authservice.updateUser(currentUser.id!, updatedUser).subscribe(() => {
    alert("Password updated successfully");
    this.authservice.setLoggedInUser(updatedUser); // تحديث localStorage
    this.user = updatedUser;
    this.currentPasswordForPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  });
}

}
