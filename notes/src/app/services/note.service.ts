import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Note } from '../models/note';

type NoteResponse = {
  comments: Note[];
};
@Injectable({ providedIn: 'root' })
export class UserService {
  #httpClient = inject(HttpClient);

  getNotes() {
    return this.#httpClient
      .get<NoteResponse>('https://dummyjson.com/comments?limit=0')
      .pipe(map((response) => response.comments));
  }
}
