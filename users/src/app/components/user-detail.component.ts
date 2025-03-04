import { DatePipe, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsersActions } from '../store/user.actions';
import { selectSelectedUser } from '../store/user.feature';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, MatButtonModule, DatePipe, SlicePipe],
  selector: 'app-user-detail',
  template: `
    <div class="flex flex-col gap-4 items-center p-4">
      <div class="flex flex-row gap-4">
        <a mat-icon-button routerLink="../">
          <mat-icon>arrow_back</mat-icon>
        </a>
        <h1>User Detail</h1>
      </div>
      <div class="flex flex-col gap-4">
        @if(user(); as user){
        <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
          <img
            [src]="user.image"
            alt="{{ user.firstName }}'s profile picture"
            class="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h2 class="text-2xl font-semibold text-center mb-4">
            {{ user.firstName }} {{ user.lastName }}
          </h2>
          <p class="text-gray-700">
            <strong>Username:</strong> {{ user.username }}
          </p>
          <p class="text-gray-700"><strong>Email:</strong> {{ user.email }}</p>
          <p class="text-gray-700"><strong>Phone:</strong> {{ user.phone }}</p>
          <p class="text-gray-700">
            <strong>Gender:</strong> {{ user.gender }}
          </p>
          <p class="text-gray-700"><strong>Age:</strong> {{ user.age }}</p>
          <p class="text-gray-700">
            <strong>Birth Date:</strong> {{ user.birthDate | date }}
          </p>
          <p class="text-gray-700">
            <strong>Blood Group:</strong> {{ user.bloodGroup }}
          </p>
          <p class="text-gray-700">
            <strong>Height:</strong> {{ user.height }} cm
          </p>
          <p class="text-gray-700">
            <strong>Weight:</strong> {{ user.weight }} kg
          </p>
          <p class="text-gray-700">
            <strong>Eye Color:</strong> {{ user.eyeColor }}
          </p>
          <p class="text-gray-700">
            <strong>Hair:</strong> {{ user.hair.color }} - {{ user.hair.type }}
          </p>

          <h3 class="text-xl font-semibold mt-6 mb-2">Address</h3>
          <p class="text-gray-700">{{ user.address.address }}</p>
          <p class="text-gray-700">
            {{ user.address.city }}, {{ user.address.state }}
            {{ user.address.postalCode }}
          </p>
          <p class="text-gray-700">
            <strong>Country:</strong> {{ user.address.country }}
          </p>

          <h3 class="text-xl font-semibold mt-6 mb-2">Company</h3>
          <p class="text-gray-700">
            <strong>Company Name:</strong> {{ user.company.name }}
          </p>
          <p class="text-gray-700">
            <strong>Department:</strong> {{ user.company.department }}
          </p>
          <p class="text-gray-700">
            <strong>Title:</strong> {{ user.company.title }}
          </p>

          <h3 class="text-xl font-semibold mt-6 mb-2">Bank Details</h3>
          <p class="text-gray-700">
            <strong>Card Type:</strong> {{ user.bank.cardType }}
          </p>
          <p class="text-gray-700">
            <strong>Card Number:</strong> **** **** ****
            {{ user.bank.cardNumber | slice : -4 }}
          </p>
          <p class="text-gray-700">
            <strong>Card Expiry:</strong> {{ user.bank.cardExpire }}
          </p>
          <p class="text-gray-700">
            <strong>Currency:</strong> {{ user.bank.currency }}
          </p>

          <h3 class="text-xl font-semibold mt-6 mb-2">Crypto Wallet</h3>
          <p class="text-gray-700">
            <strong>Coin:</strong> {{ user.crypto.coin }}
          </p>
          <p class="text-gray-700">
            <strong>Wallet Address:</strong> {{ user.crypto.wallet }}
          </p>
          <p class="text-gray-700">
            <strong>Network:</strong> {{ user.crypto.network }}
          </p>

          <h3 class="text-xl font-semibold mt-6 mb-2">
            Additional Information
          </h3>
          <p class="text-gray-700">
            <strong>University:</strong> {{ user.university }}
          </p>
          <p class="text-gray-700"><strong>Role:</strong> {{ user.role }}</p>
        </div>
        }
      </div>
    </div>
  `,
})
export class UserDetailComponent {
  id = input.required<string>();
  #store = inject(Store);
  user = this.#store.selectSignal(selectSelectedUser);

  ngOnInit() {
    this.#store.dispatch(UsersActions.loadUser({ id: this.id() }));
  }
}
