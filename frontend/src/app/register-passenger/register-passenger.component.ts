import { Component, OnInit } from '@angular/core';
import { IPassenger, PassengerService } from '../passenger.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-passenger',
  template: `
    <h1 class="text-lg font-bold">Register new passenger</h1>

    <form [formGroup]="form">
      <div class="grid grid-cols-1 gap-4 w-[700px] p-3">
        <div class="flex flex-row gap-5 justify-between">
          <input
            class="p-5 border-2 w-full"
            type="text"
            placeholder="Type your first name"
            formControlName="firstName"
          />
          <input
            class="p-5 border-2 w-full"
            type="text"
            placeholder="Type your last name"
            formControlName="lastName"
          />
        </div>

        <input
          class="p-5 border-2"
          type="email"
          placeholder="Email"
          formControlName="email"
        />

        <div class="">
          <label for="female" class="mr-5">Female</label>
          <input
            type="radio"
            [value]="true"
            id="female"
            class="mr-5"
            formControlName="isFemale"
          />

          <label for="male" class="mr-5">Male</label>
          <input
            type="radio"
            formControlName="isFemale"
            [value]="false"
            id="male"
          />
        </div>

        <button
          (click)="createPassenger()"
          class="p-3 bg-blue-600 text-white rounded-lg"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class RegisterPassengerComponent implements OnInit {
  // private passengerService = Inject(PassengerService);

  constructor(
    private passengerService: PassengerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  form = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    isFemale: [false],
  });

  // convert form input to IPassenger type
  formToPassenger(): IPassenger {
    return {
      firstName: this.form.value.firstName ?? '',
      lastName: this.form.value.lastName ?? '',
      email: this.form.value.email ?? '',
      isFemale: this.form.value.isFemale ?? false,
    };
  }

  // Create a new passenger
  createPassenger() {
    this.passengerService.createPassenger(this.formToPassenger()).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
    console.log(this.form.value);
  }
}
