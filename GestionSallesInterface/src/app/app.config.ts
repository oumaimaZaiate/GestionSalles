import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { registerI18n, setCurrentI18n } from 'igniteui-angular';
import { IgxResourceStringsFR } from 'igniteui-angular-i18n';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerI18n(IgxResourceStringsFR, 'fr');
setCurrentI18n('fr');
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'fr' }
  ]
};



