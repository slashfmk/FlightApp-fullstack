import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { HeaderComponent } from './header/header.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterPassengerComponent } from './register-passenger/register-passenger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    HeaderComponent,
    BookFlightComponent,
    NotfoundComponent,
    RegisterPassengerComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: SearchFlightsComponent, pathMatch: 'full' },
      { path: 'search-flights', component: SearchFlightsComponent },
      { path: 'book-flights/:flightId', component: BookFlightComponent },
      {path: 'register-passenger', component: RegisterPassengerComponent},
      {path: '**', component: NotfoundComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}