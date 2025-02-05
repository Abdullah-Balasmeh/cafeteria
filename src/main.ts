import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [provideHttpClient(), provideRouter(routes)],
  }).catch((err) => {
    console.error('Error during app bootstrap:', err);
  });