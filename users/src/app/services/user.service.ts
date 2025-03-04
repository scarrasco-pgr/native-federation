import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../models/user';

type UserResponse = {
  users: User[];
};
@Injectable({ providedIn: 'root' })
export class UserService {
  #httpClient = inject(HttpClient);

  getUsers() {
    return this.#httpClient
      .get<UserResponse>('https://dummyjson.com/users?limit=0')
      .pipe(map((response) => response.users));
  }

  filterUsers(filter: string) {
    return this.#httpClient
      .get<UserResponse>(
        `https://dummyjson.com/users/search?limit=0&q=${filter}`
      )
      .pipe(map((response) => response.users));
  }

  getUser(id: string) {
    return this.#httpClient
      .get<User>(`https://dummyjson.com/users/${id}`)
  }
}
