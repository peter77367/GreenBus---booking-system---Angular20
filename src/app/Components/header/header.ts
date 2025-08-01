import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IRegisterData } from '../../Models/iregister-data';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule , RouterLinkActive , RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit  , AfterViewInit {

    isLoggedIn: boolean = false;
  user: IRegisterData | null = null;

  isMenuOpen = false;

  constructor (private authService: AuthService , 
               private router: Router
             
  ) { }

    ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.user = this.authService.getCurrentUser();
    });
  }

  logout(): void {
    this.authService.logout();
  }


   toggleNavbar() {
    this.isMenuOpen = !this.isMenuOpen;
  }
   ngAfterViewInit(): void {
    // const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    // dropdownElementList.forEach(dropdownToggleEl => {
    //   // Access bootstrap from the global window object
    //   // @ts-ignore
    //   new (window as any).bootstrap.Dropdown(dropdownToggleEl);
    // });
  }
}


