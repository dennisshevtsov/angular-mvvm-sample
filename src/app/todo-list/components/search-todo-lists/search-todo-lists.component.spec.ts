import { Component,                 } from '@angular/core';
import { ComponentFixture,
         fakeAsync, TestBed, tick,  } from '@angular/core/testing';
import { By,                        } from '@angular/platform-browser';
import { RouterModule,              } from '@angular/router';

import { of, Subscription, throwError, } from 'rxjs';

import { CoreModule, PageComponent,
         TodoListLinks, TodoListTaskLinks, } from 'src/app/core';
import { SearchTodoListsRecordResponseDto  } from 'src/app/todo-list/api';
import { SearchTodoListsComponent,         } from './search-todo-lists.component';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

@Component({
  selector: 'app-modal',
})
class ModalComponentMock {
  public show(): void {}
}

@Component({
  selector: 'app-toasts',
})
class ToastsComponentMock {
  public info(message: string): void {}

  public error(message: string): void {}
}

describe('SearchTodoListsComponent', () => {
  let vm   : jasmine.SpyObj<SearchTodoListsViewModel>;
  let tll  : jasmine.SpyObj<TodoListLinks>;
  let tltl : jasmine.SpyObj<TodoListTaskLinks>;
  let unsub: jasmine.Spy<() => void>;
  let add  : jasmine.Spy<(sub: Subscription) => void>;

  let fixture: ComponentFixture<SearchTodoListsComponent>;

  const recordDto = new SearchTodoListsRecordResponseDto(
    1,
    'test todo list title 0',
    'test todo list description 0',
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchTodoListsComponent,
      ],
      imports: [
        CoreModule,
        RouterModule.forRoot([]),
      ],
    });

    TestBed.overrideModule(
      CoreModule,
      {
        set: {
          declarations: [
            PageComponent,
            ModalComponentMock,
            ToastsComponentMock,
          ],
          exports: [
            PageComponent,
            ModalComponentMock,
            ToastsComponentMock,
          ],
        }
      }
    );

    const sub = new Subscription();

    unsub = spyOn(sub, 'unsubscribe');
    add   = spyOn(sub, 'add');

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: sub,
      },
    );

    vm = jasmine.createSpyObj(
      'SearchTodoListsViewModel',
      [
        'search',
        'delete',
      ],
      [
        'todoLists',
        'selected',
      ]);

    vm.search.and.returnValue(of(void 0));

    TestBed.overrideProvider(
      SearchTodoListsViewModel,
      {
        useValue: vm,
      });

    tll = jasmine.createSpyObj(
      'TodoListLinks',
      [
        'addTodoListLink',
        'updateTodoListLink',
        'searchTodoListsLink',
      ]);

    tll.searchTodoListsLink.and.returnValue([]);

    const todoListsPropertyDescriptor = Object.getOwnPropertyDescriptor(vm, 'todoLists')!;
    const todoListsSpy = todoListsPropertyDescriptor.get as jasmine.Spy<() => SearchTodoListsRecordResponseDto[]>;

    const redordDtos = [
      recordDto,
      new SearchTodoListsRecordResponseDto(
        2,
        'test todo list title 1',
        'test todo list description 1',
      ),
      new SearchTodoListsRecordResponseDto(
        3,
        'test todo list title 2',
        'test todo list description 2',
      ),
    ];

    todoListsSpy.and.returnValue(redordDtos);

    TestBed.overrideProvider(
      TodoListLinks,
      {
        useValue: tll,
      });

    tltl = jasmine.createSpyObj(
      TodoListTaskLinks,
      [
        'searchTodoListTasksLink',
      ]);

    TestBed.overrideProvider(
      TodoListTaskLinks,
      {
        useValue: tltl,
      });

    fixture = TestBed.createComponent(SearchTodoListsComponent);
  });

  it('ngOnInit should call search', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    expect(vm.search.calls.count())
      .withContext('search should be called once')
      .toBe(1);

    expect(add.calls.count())
      .withContext('add should be called once')
      .toBe(1);
  }));

  it('ngOnDestroy should call unsubscribe', () => {
    fixture.componentInstance.ngOnDestroy();

    expect(unsub.calls.count())
      .withContext('unsubscribe should be called once')
      .toBe(1);
  });

  it('onDeleteOkPressed should be called on delete button click', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    vm.delete.and.returnValue(of(void 0));

    const selectedPropertyDescriptor = Object.getOwnPropertyDescriptor(vm, 'selected')!;
    const selectedSpy = selectedPropertyDescriptor.set as jasmine.Spy<(record: SearchTodoListsRecordResponseDto) => void>;

    const modalComponent = fixture.debugElement.query(By.css('app-modal')).componentInstance;
    const showSpy = spyOn(modalComponent, 'show');

    fixture.debugElement.query(By.css('#btnDelete-1')).nativeElement.dispatchEvent(new Event('click'));

    expect(selectedSpy.calls.count())
      .withContext('selected should be called once')
      .toBe(1);

    expect(selectedSpy.calls.first().args[0])
      .withContext('selected should be called once')
      .toEqual(recordDto);

    expect(showSpy.calls.count())
      .withContext('show should be called once')
      .toBe(1);
  }));

  it('onDeleteOkPressed should call delete', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    const selectedPropertyDescriptor = Object.getOwnPropertyDescriptor(vm, 'selected')!;
    const selectedSpy = selectedPropertyDescriptor.get as jasmine.Spy<() => SearchTodoListsRecordResponseDto>;

    selectedSpy.and.returnValue(recordDto);

    const toastsComponent = fixture.debugElement.query(By.css('app-toasts')).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    vm.delete.and.returnValue(of(void 0));

    fixture.componentInstance.onDeleteOkPressed();

    tick();

    expect(vm.delete.calls.count())
      .withContext('delete should be called once')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('info should be called once')
      .toBe(1);

    expect(errorSpy.calls.count())
      .withContext('error should not be called')
      .toBe(0);
  }));

  it('onDeleteOkPressed should trigger info', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    const selectedPropertyDescriptor = Object.getOwnPropertyDescriptor(vm, 'selected')!;
    const selectedSpy = selectedPropertyDescriptor.get as jasmine.Spy<() => SearchTodoListsRecordResponseDto>;

    selectedSpy.and.returnValue(recordDto);

    const toastsComponent = fixture.debugElement.query(By.css('app-toasts')).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    vm.delete.and.returnValue(of(void 0));

    fixture.componentInstance.onDeleteOkPressed();

    tick();

    expect(infoSpy.calls.count())
      .withContext('info should be called once')
      .toBe(1);

    expect(errorSpy.calls.count())
      .withContext('error should not be called')
      .toBe(0);
  }));

  it('onDeleteOkPressed should trigger error', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    const selectedPropertyDescriptor = Object.getOwnPropertyDescriptor(vm, 'selected')!;
    const selectedSpy = selectedPropertyDescriptor.get as jasmine.Spy<() => SearchTodoListsRecordResponseDto>;

    selectedSpy.and.returnValue(recordDto);

    const toastsComponent = fixture.debugElement.query(By.css('app-toasts')).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    vm.delete.and.returnValue(throwError(() => 'error'));

    fixture.componentInstance.onDeleteOkPressed();

    tick();

    expect(infoSpy.calls.count())
      .withContext('info should not be called')
      .toBe(0);

    expect(errorSpy.calls.count())
      .withContext('error should be called once')
      .toBe(1);
  }));
});
