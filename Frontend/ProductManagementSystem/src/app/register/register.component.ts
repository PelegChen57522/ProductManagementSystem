import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      address: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Simulate registration process
      this.router.navigate(['/login']);
    }
  }
}

















// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { User } from '../interfaces/user.interface';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   registerForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.registerForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       phone: ['', Validators.required],
//       password: ['', Validators.required],
//       address: ['']
//     });
//   }

//   onSubmit(): void {
//     if (this.registerForm.valid) {
//       const user: User = {
//         ...this.registerForm.value,
//         uid: '', // This will be set by the backend
//         createDate: new Date(),
//         lastConnection: new Date()
//       };
//       this.authService.register(user).subscribe(
//         () => this.router.navigate(['/login']),
//         error => console.error('Registration failed', error)
//       );
//     }
//   }
// }
