import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Quité ReactiveFormsModule ya que no es necesario importarlo aquí
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UsersService } from '../../core/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ButtonModule, DividerModule, DialogModule, FormsModule, ReactiveFormsModule, InputTextModule, MessagesModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[MessageService, DialogService]
})
export class RegisterComponent {

  usersService = inject(UsersService);
  registerForm: FormGroup;

  @Input() visibleRegister: boolean = false;
  @Input() register: any;
  @Output() closeEmit = new EventEmitter<void>();
  @Output() openLoginModal = new EventEmitter<void>();
  isVisibleRegister: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.registerForm.valid) {
      try{
        const response = await this.usersService.register(this.registerForm.value)
        if(response.success)
          this.messageService.add({ severity: 'success', summary: 'Successful registration', detail: 'You already have your account' });
          this.registerForm.reset()
      }catch(error){
        if (error instanceof HttpErrorResponse) {
          console.log(error.error)
          this.messageService.add({ severity: 'warn', summary: 'Warning ', detail: error.error.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "Unknown error" });
        }
        
      }

    }
  }

  openModal() {
    this.isVisibleRegister = true;
  }

  closeModal() {
    this.isVisibleRegister = false;
    this.closeEmit.emit();
  }

  openLogin() {
    this.openLoginModal.emit();
    this.closeModalLogin();
  }

  closeModalLogin() {
    this.closeEmit.emit();
  }
}
