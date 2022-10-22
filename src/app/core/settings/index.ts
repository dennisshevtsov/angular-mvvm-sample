import { InjectionToken, } from '@angular/core';

import { AppSettings,    } from './settings';

export * from './settings';

export const APP_SETTINGS = new InjectionToken<AppSettings>('APP_SETTINGS');
