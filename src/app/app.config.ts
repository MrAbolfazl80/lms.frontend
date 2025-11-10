import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { fa_IR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fa from '@angular/common/locales/fa';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors  } from '@angular/common/http';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { authInterceptorFn } from './interceptors/auth-http.interceptor';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

registerLocaleData(fa);
ModuleRegistry.registerModules([AllCommunityModule]);
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideRouter(routes),
    importProvidersFrom(NzPaginationModule, NzButtonModule),
    provideZonelessChangeDetection(),

    provideNzI18n(fa_IR),
    provideAnimationsAsync(),

  ]
};
