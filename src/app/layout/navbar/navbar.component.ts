import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthorService } from 'src/app/core/services/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService:AuthService){}
  logOut():void{
    // Swal.fire({
    //   position: "center",
    //   icon: "success",
    //   title: "Successfully Logout",
    //   showConfirmButton: false,
    //   timer: 1500
    // });
    return this.authService.logout();
  }
}
