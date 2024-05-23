import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Quité ReactiveFormsModule ya que no es necesario importarlo aquí
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ButtonModule, DividerModule, DialogModule, FormsModule, ReactiveFormsModule],
  providers: [MessageService, DialogService]
})
export class LoginComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() login: any;
  @Output() closeEmit = new EventEmitter<void>();
  loginForm: FormGroup = this.fb.group({});
  isVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Lógica para manejar el envío del formulario de inicio de sesión
    }
  }

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.closeEmit.emit();
  }
}
