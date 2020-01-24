import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule, routerComponents} from './app.routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {JwtModule} from '@auth0/angular-jwt';
import {GlobalErrorHandler} from './errors/global-error-handler';
import {environment} from '../environments/environment';

export function getToken() {
  let jwtToken = '';
  if (sessionStorage.getItem('jwt-token')) {
    jwtToken = sessionStorage.getItem('jwt-token');
  }
  return jwtToken;
}

@NgModule({
  declarations: [
    AppComponent,
    routerComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: environment.whitelistedDomains,
        blacklistedRoutes: [''],
        skipWhenExpired: true
      }
    })
  ],
  providers: [
    {provide: 'BASE_API_URL', useValue: environment.apiUrl},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
