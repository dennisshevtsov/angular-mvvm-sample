import { inject, TestBed, } from '@angular/core/testing';
import { ActivatedRoute, RouterModule,  } from '@angular/router';

import { of, Subscription, } from 'rxjs';

import { AddTodoListTaskComponent, } from './add-todo-list-task.component';
import { AddTodoListTaskViewModel, } from './add-todo-list-task.view-model';

describe('AddTodoListTaskComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoListTaskComponent, ],
      imports: [ RouterModule.forRoot([]), ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({ get: (key: string) => 'test', }),
        },
      }],
    });

    TestBed.overrideProvider(
      AddTodoListTaskViewModel,
      {
        useValue: jasmine.createSpyObj(
          AddTodoListTaskViewModel,
          [ 'add', ]),
      });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(
          Subscription,
          [ 'add', 'unsubscribe', ]),
      });
  });

  it('ngOnDestroy should call unsubscribe', inject([ Subscription, ], (sub: jasmine.SpyObj<Subscription>) => {
    const fixture = TestBed.createComponent(AddTodoListTaskComponent);
    fixture.detectChanges();

    fixture.componentInstance.ngOnDestroy();

    expect(sub.unsubscribe.calls.count())
      .withContext('unsubscribe should be called once')
      .toBe(1);
  }));
});
