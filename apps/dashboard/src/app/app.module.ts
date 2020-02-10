import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from '@mdv13/ui';
import { AppRoutingModule } from './app-routing.module';
import { CoreStateModule } from '@mdv13/core-state';
import { CoreDataModule } from '@mdv13/core-data';
import { MaterialModule } from '@mdv13/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CoreStateModule,
    CoreDataModule,
    MaterialModule,
    UiModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
