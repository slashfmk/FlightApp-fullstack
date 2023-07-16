import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user
  currentUser?: User;
  constructor() {}

  loginUser(user: User) {
    console.log(`Log in user with email ${user.email}`);
    this.currentUser = user;
  }
}

export interface User {
  email: string;
}
