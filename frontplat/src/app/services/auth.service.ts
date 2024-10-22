import { Router } from "@angular/router";
import { User } from "../model/user.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [
    { username: "admin", password: "123", roles: ['ADMIN'] },
    { username: "ahmed", password: "123", roles: ['USER'] }
  ];

  public loggedUser!: string;
  public isloggedIn: boolean = false;
  public roles!: string[];

  constructor(private router: Router) {
    this.loadUserState(); // Load user state when the service is instantiated
  }

  SignIn(user: User): boolean {
    let validUser: boolean = false;
    this.users.forEach((curUser) => {
      if (user.username === curUser.username && user.password === curUser.password) {
        validUser = true;
        this.setLoggedUser(curUser);
      }
    });
    return validUser;
  }

  private setLoggedUser(curUser: User) {
    this.loggedUser = curUser.username;
    this.isloggedIn = true;
    this.roles = curUser.roles;
    this.saveUserState(); // Save user state to localStorage
  }

  private loadUserState() {
    if (this.isBrowser()) {
      const user = localStorage.getItem('loggedUser');
      const loggedInStatus = localStorage.getItem('isloggedIn');
      const roles = localStorage.getItem('userRoles');

      if (user && loggedInStatus === 'true') {
        this.loggedUser = user;
        this.isloggedIn = true;
        this.roles = roles ? JSON.parse(roles) : []; // Ensure roles are loaded
      } else {
        this.isloggedIn = false;
      }
    }
  }

  private saveUserState() {
    if (this.isBrowser()) {
      localStorage.setItem('loggedUser', this.loggedUser);
      localStorage.setItem('isloggedIn', String(this.isloggedIn));
      localStorage.setItem('userRoles', JSON.stringify(this.roles)); // Store roles as well
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  isAdmin(): boolean {
    return this.roles ? this.roles.indexOf('ADMIN') > -1 : false;
  }

  logout() {
    this.isloggedIn = false;
    this.loggedUser = '';
    this.roles = [];
    this.clearUserState(); // Clear user state from localStorage
    this.router.navigate(['/login']);
  }

  private clearUserState() {
    if (this.isBrowser()) {
      localStorage.removeItem('loggedUser');
      localStorage.removeItem('isloggedIn');
      localStorage.removeItem('userRoles'); // Remove roles on logout
    }
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username === username) {
        this.roles = curUser.roles;
      }
    });
  }
}
