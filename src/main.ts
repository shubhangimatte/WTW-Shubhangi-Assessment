import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { PolicyListComponent } from './app/components/policy-list/policy-list.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { PolicyFormComponent } from './app/components/policy-form/policy-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PolicyDetailsComponent } from './app/policy-details/policy-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/policies', pathMatch: 'full' },
  { path: 'policies', component: PolicyListComponent },
  { path: 'policies/:id', component: PolicyDetailsComponent },
  { path: 'add-policy', component: PolicyFormComponent },
  { path: 'edit-policy/:id', component: PolicyFormComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient(), provideAnimationsAsync(),
  ]
}).catch(err => console.error(err));
