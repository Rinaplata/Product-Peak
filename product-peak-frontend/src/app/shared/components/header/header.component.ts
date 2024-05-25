import { Component, ViewChild } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from '../../../auth/login/login.component';
import { DialogModule } from 'primeng/dialog';
import { Dialog } from 'primeng/dialog';
import { RegisterComponent } from '../../../auth/register/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenubarModule, LoginComponent, DialogModule, RegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('loginComponent') loginComponent!: LoginComponent;
  @ViewChild('registerComponent') registerComponent!: RegisterComponent;
  visibleLogin: boolean = false;
  visibleSignUp: boolean = false;

  loginSelected: any = {};
  registerSelected: any = {}

  visible: boolean = false;
  visibleModal: boolean = false;

  showDialog() {
      this.visible = true;
  }

  showDialogRegister() {
    this.visibleModal = true;
  }

  onCloseModalLogin(){
    this.visibleLogin = false;
  }

  onCloseModalRegister(){
    this.visibleSignUp = false;
  }

  openModalLogin(loginSelected: any){
    this.loginSelected = loginSelected;
    this.visibleLogin = true;
  }

  openModalRegister(registerSelected: any){
    this.registerSelected = registerSelected;
    this.visibleSignUp = true;
  }

  handleRegisterSuccess() {
    this.visibleModal = false;
  }
}
