import { Component, Input, OnInit } from '@angular/core';
import { PassengerService } from '../api/services/passenger.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { FlightService } from '../api/services/flight.service';
import { Router } from '@angular/router';
import { IPassenger } from '../api/models/IPassenger';

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
          (blur)="checkPassenger()"
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

  @Input() flightId = '';

  constructor(
    private passengerService: PassengerService,
    private flightService: FlightService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.flightId);
  }

  form = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    isFemale: [false],
  });

  checkPassenger(): void {
    const params = { email: this.formToPassenger().email };

    this.passengerService.getPassenger(params.email).subscribe(
      (response) => console.log('Passenger exists'),
      (err) => console.log(err)
    );
  }

  // convert form input to IPassenger type
  formToPassenger(): IPassenger {
    return {
      firstName: this.form.get('firstName')?.value ?? '',
      lastName: this.form.get('lastName')?.value ?? '',
      email: this.form.get('email')?.value ?? '',
      isFemale: this.form.get('isFemale')?.value ?? false,
    };
  }

  // Register a new passenger
  createPassenger() {
    this.passengerService.createPassenger(this.formToPassenger()).subscribe(
      (response) => {
        this.authService.loginUser({ email: this.formToPassenger().email });
        this.router.navigate(['/']);
      },
      (err) => console.log(err)
    );
  }
}
