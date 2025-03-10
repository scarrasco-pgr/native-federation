import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  message = 'Hello from SharedService';
  log() {
    console.log(this.message);
  }
}
