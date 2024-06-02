import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private auth: Auth, private router: Router) {}

  async register(email: string, password: string): Promise<void> {
    const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
    if (signInMethods.length > 0) {
      throw new Error('Email already in use');
    }
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem(this.tokenKey, token);
    this.router.navigate(['/main']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
