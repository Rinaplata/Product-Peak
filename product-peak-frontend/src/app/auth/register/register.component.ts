import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Quité ReactiveFormsModule ya que no es necesario importarlo aquí
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ButtonModule, DividerModule, DialogModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[MessageService, DialogService]
})
export class RegisterComponent {
  @Input() visibleRegister: boolean = false;
  @Input() register: any;
  @Output() closeEmit = new EventEmitter<void>();
  @Output() openLoginModal = new EventEmitter<void>();
  registerForm: FormGroup = this.fb.group({});
  isVisibleRegister: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {

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
