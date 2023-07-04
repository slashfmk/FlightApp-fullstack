import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { HeaderComponent } from './header/header.component';
import { BookFlightComponent } from './book-flight/book-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    HeaderComponent,
    BookFlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: SearchFlightsComponent, pathMatch: 'full' },
      { path: 'search-flights', component: SearchFlightsComponent },
      { path: 'book-flights/:flightId', component: BookFlightComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
