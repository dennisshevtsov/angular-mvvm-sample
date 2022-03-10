import { NgModule,      } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';

import { AppRoutingModule,   } from './app-routing.module';
import { AppComponent,       } from './app.component';
import { ErrorComponent,     } from './components';
import { CoreModule,         } from './core';
import { TodoListTaskModule, } from './todo-list-task';
import { TodoListModule,     } from './todo-list';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    TodoListModule,
    TodoListTaskModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
