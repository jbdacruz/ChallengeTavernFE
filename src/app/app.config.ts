import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideHttpClient, withInterceptors, withXsrfConfiguration} from '@angular/common/http'
import {routes} from './app.routes';
import {authRedirectInterceptor} from './interceptors/auth-redirect.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([ authRedirectInterceptor]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',   // cookie set by your server
        headerName: 'X-XSRF-TOKEN', // header your server expects
      })
    ),
  ]
};
