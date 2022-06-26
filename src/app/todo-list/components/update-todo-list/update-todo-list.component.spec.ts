import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { RouterModule,              } from '@angular/router';

import { Subscription, } from 'rxjs';

import { UpdateTodoListComponent,   } from './update-todo-list.component';

describe('UpdateTodoListComponent', () => {
  let fixture: ComponentFixture<UpdateTodoListComponent>;

  let unsub: jasmine.Spy<() => void>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UpdateTodoListComponent,
      ],
      imports: [
        RouterModule.forRoot([]),
      ],
    });

    const sub = new Subscription();

    unsub = spyOn(sub, 'unsubscribe');

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: sub,
      },
    );

    fixture = TestBed.createComponent(UpdateTodoListComponent);
    fixture.detectChanges();
  });

  it('ngOnDestroy should unsubscribe', () => {
    fixture.componentInstance.ngOnDestroy();

    expect(unsub.calls.count())
      .withContext('unsubscribe should be called once')
      .toBe(1);
  });
});
