import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CostSharingGroupsModule } from './pages/cost-sharing-groups/cost-sharing-groups.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export const STORAGE = new InjectionToken<Storage>('storage');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    CostSharingGroupsModule
  ],
  providers: [{ provide: STORAGE, useValue: sessionStorage }],
  bootstrap: [AppComponent]
})
export class AppModule { }
