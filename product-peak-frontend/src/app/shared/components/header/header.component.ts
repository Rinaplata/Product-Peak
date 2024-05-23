import { Component, ViewChild, input } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from '../../../auth/login/login.component';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('loginComponent') loginComponent!: LoginComponent;
  visibleLogin: boolean = false;

  loginSelected: any = {};

  onCloseModalLogin(){
    this.visibleLogin = false;
  }

  openModalLogin(loginSelected: any){
    this.loginSelected = loginSelected;
    this.visibleLogin = true;
  }
}
