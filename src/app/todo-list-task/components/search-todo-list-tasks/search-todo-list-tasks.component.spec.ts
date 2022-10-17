import { Component,                            } from '@angular/core';
import { fakeAsync, inject, TestBed, tick,     } from '@angular/core/testing';
import { By,                                   } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule,         } from '@angular/router';

import { of, Subscription, throwError,         } from 'rxjs';

import { TodoListLinks, TodoListTaskLinks,     } from 'src/app/core';
import { SearchTodoListDayTaskResponseDto,     } from 'src/app/todo-list-task/api';
import { SearchTodoListTasksComponent,         } from './search-todo-list-tasks.component';
import { SearchTodoListTasksViewModel,         } from './search-todo-list-tasks.view-model';

const PARAM_MAP_TOKEN = 'ParamMap';

@Component({
  selector: 'app-toasts',
})
class ToastsComponentMock {
  public info(message: string): void {}

  public error(message: string): void {}
}

@Component({
  selector: 'app-modal',
})
class ModalComponentMock {
  public show(): void {}
}

describe('SearchTodoListTasksComponent', () => {
  beforeEach(() => {
    const paramMapSpy = jasmine.createSpyObj(
      PARAM_MAP_TOKEN, [ 'get', ]);

    TestBed.configureTestingModule({
      declarations: [
        SearchTodoListTasksComponent,
        ToastsComponentMock,
        ModalComponentMock, ],
      imports: [ RouterModule.forRoot([]), ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(paramMapSpy), },
        },
        {
          provide: PARAM_MAP_TOKEN,
          useValue: paramMapSpy,
        },
        {
          provide: TodoListLinks,
          useValue: jasmine.createSpyObj(TodoListLinks, [ 'searchTodoListsLink', ]),
        },
        {
          provide: TodoListTaskLinks,
          useValue: jasmine.createSpyObj(TodoListTaskLinks, [ 'addTodoListTaskLink', ]),
        },
      ]
    });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(Subscription, [ 'add', 'unsubscribe', ]),
      });

    TestBed.overrideProvider(
      SearchTodoListTasksViewModel,
      {
        useValue: jasmine.createSpyObj(
          'SearchTodoListTasksViewModel',
           [ 'search', 'complete', 'uncomplete', 'delete', ],
           [ 'todoListId', 'selected', ]),
      });
  });

  it('ngOnInit should populate error', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      pmSpy.get.and.returnValue(null);

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');

      fixture.detectChanges();

      tick();

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.search.calls.count())
        .withContext('search should not be called')
        .toBe(0);

      expect(errorSpy.calls.count())
        .withContext('error should be called once')
        .toBe(1);

      expect(errorSpy.calls.first().args[0])
        .withContext('error should be called with error message')
        .toBe('An error occured.');
  })));

  it('ngOnInit should initialize vm', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      const todoListId = 'test id';

      pmSpy.get.and.returnValue(todoListId);

      const descs = Object.getOwnPropertyDescriptors(vmSpy);
      const todoListIdSpy = descs.todoListId.set! as jasmine.Spy<(value: number | string) => void>;

      vmSpy.search.and.returnValue(of(void 0));

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');

      fixture.detectChanges();

      tick();

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.search.calls.count())
        .withContext('search should be called once')
        .toBe(1);

      expect(todoListIdSpy.calls.count())
        .withContext('todoListId should be called once')
        .toBe(1);

      expect(errorSpy.calls.count())
        .withContext('error should not be called')
        .toBe(0);
  })));

  it('onCompletedChanged should call complete', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      const todoListId = 'test id';

      pmSpy.get.and.returnValue(todoListId);

      vmSpy.search.and.returnValue(of(void 0));

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');
      const infoSpy = spyOn(toastsComponent, 'info');

      fixture.detectChanges();

      tick();

      subSpy.add.calls.reset();
      errorSpy.calls.reset();
      infoSpy.calls.reset();

      const recordDto = new SearchTodoListDayTaskResponseDto(
        'test todo list task id',
        false,
        'test todo list task title',
        'test todo list task description',
        637975872000000000);

      const descs = Object.getOwnPropertyDescriptors(vmSpy);
      const setSelectedSpy = descs.selected.set! as jasmine.Spy<(value: SearchTodoListDayTaskResponseDto) => void>;
      const getSelectedSpy = descs.selected.get! as jasmine.Spy<() => SearchTodoListDayTaskResponseDto>;

      getSelectedSpy.and.returnValue(recordDto);

      vmSpy.complete.and.returnValue(of(void 0));

      fixture.componentInstance.onCompletedChanged(recordDto);

      tick();

      expect(setSelectedSpy.calls.count())
        .withContext('selected should be called once')
        .toBe(1);

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.complete.calls.count())
        .withContext('complete should be called')
        .toBe(1);

      expect(vmSpy.uncomplete.calls.count())
        .withContext('uncomplete should not be called')
        .toBe(0);

      expect(infoSpy.calls.count())
        .withContext('info should be called once')
        .toBe(1);

      expect(infoSpy.calls.first().args[0])
        .withContext('info should be called with message')
        .toContain(' complete');

      expect(infoSpy.calls.first().args[0])
        .withContext('info should be called with message')
        .toContain(recordDto.title);

      expect(errorSpy.calls.count())
        .withContext('error should not be called once')
        .toBe(0);

      subSpy.add.calls.reset();
      vmSpy.complete.calls.reset();
      setSelectedSpy.calls.reset();
      errorSpy.calls.reset();
      infoSpy.calls.reset();

      vmSpy.complete.and.returnValue(throwError(() => 'error'));

      fixture.componentInstance.onCompletedChanged(recordDto);

      tick();

      expect(setSelectedSpy.calls.count())
        .withContext('selected should be called once')
        .toBe(1);

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.complete.calls.count())
        .withContext('complete should be called')
        .toBe(1);

      expect(vmSpy.uncomplete.calls.count())
        .withContext('uncomplete should not be called')
        .toBe(0);

      expect(infoSpy.calls.count())
        .withContext('info should not be called once')
        .toBe(0);

      expect(errorSpy.calls.count())
        .withContext('error should be called once')
        .toBe(1);

      expect(errorSpy.calls.first().args[0])
        .withContext('error should be called with message')
        .toBe('An error occured.');
  })));

  it('onCompletedChanged should call uncomplete', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      const todoListId = 'test id';

      pmSpy.get.and.returnValue(todoListId);

      vmSpy.search.and.returnValue(of(void 0));

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');
      const infoSpy = spyOn(toastsComponent, 'info');

      fixture.detectChanges();

      tick();

      subSpy.add.calls.reset();
      errorSpy.calls.reset();
      infoSpy.calls.reset();

      const recordDto = new SearchTodoListDayTaskResponseDto(
        'test todo list task id',
        true,
        'test todo list task title',
        'test todo list task description',
        637975872000000000);

      const descs = Object.getOwnPropertyDescriptors(vmSpy);
      const setSelectedSpy = descs.selected.set! as jasmine.Spy<(value: SearchTodoListDayTaskResponseDto) => void>;
      const getSelectedSpy = descs.selected.get! as jasmine.Spy<() => SearchTodoListDayTaskResponseDto>;

      getSelectedSpy.and.returnValue(recordDto);

      vmSpy.uncomplete.and.returnValue(of(void 0));

      fixture.componentInstance.onCompletedChanged(recordDto);

      tick();

      expect(setSelectedSpy.calls.count())
        .withContext('selected should be called once')
        .toBe(1);

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.complete.calls.count())
        .withContext('complete should not be called')
        .toBe(0);

      expect(vmSpy.uncomplete.calls.count())
        .withContext('uncomplete should be called once')
        .toBe(1);

      expect(infoSpy.calls.count())
        .withContext('info should be called once')
        .toBe(1);

      expect(infoSpy.calls.first().args[0])
        .withContext('info should be called with message')
        .toContain('uncomplete');

      expect(infoSpy.calls.first().args[0])
        .withContext('info should be called with message')
        .toContain(recordDto.title);

      expect(errorSpy.calls.count())
        .withContext('error should not be called once')
        .toBe(0);

      subSpy.add.calls.reset();
      vmSpy.uncomplete.calls.reset();
      setSelectedSpy.calls.reset();
      errorSpy.calls.reset();
      infoSpy.calls.reset();

      vmSpy.uncomplete.and.returnValue(throwError(() => 'error'));

      fixture.componentInstance.onCompletedChanged(recordDto);

      tick();

      expect(setSelectedSpy.calls.count())
        .withContext('selected should be called once')
        .toBe(1);

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.complete.calls.count())
        .withContext('complete should not be called once')
        .toBe(0);

      expect(vmSpy.uncomplete.calls.count())
        .withContext('uncomplete should be called once')
        .toBe(1);

      expect(infoSpy.calls.count())
        .withContext('info should not be called')
        .toBe(0);

       expect(errorSpy.calls.count())
        .withContext('error should be called once')
        .toBe(1);

       expect(errorSpy.calls.first().args[0])
        .withContext('error should be called with message')
        .toBe('An error occured.');
  })));

  it('onDeletePressed should show modal', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      const todoListId = 'test id';

      pmSpy.get.and.returnValue(todoListId);

      vmSpy.search.and.returnValue(of(void 0));

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const modalComponent = fixture.debugElement.query(By.directive(ModalComponentMock)).componentInstance;
      const showSpy = spyOn(modalComponent, 'show');

      fixture.detectChanges();

      tick();

      const recordDto = new SearchTodoListDayTaskResponseDto(
        'test todo list task id',
        true,
        'test todo list task title',
        'test todo list task description',
        637975872000000000);

      const descs = Object.getOwnPropertyDescriptors(vmSpy);
      const setSelectedSpy = descs.selected.set! as jasmine.Spy<(value: SearchTodoListDayTaskResponseDto) => void>;

      fixture.componentInstance.onDeletePressed(recordDto);

      tick();

      expect(setSelectedSpy.calls.count())
        .withContext('selected should be called once')
        .toBe(1);

      expect(showSpy.calls.count())
        .withContext('show should be called once')
        .toBe(1);
  })));

  it('onDeleteOkPressed should call delete', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      const todoListId = 'test id';

      pmSpy.get.and.returnValue(todoListId);

      vmSpy.search.and.returnValue(of(void 0));

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');
      const infoSpy = spyOn(toastsComponent, 'info');

      fixture.detectChanges();

      tick();

      subSpy.add.calls.reset();
      errorSpy.calls.reset();
      infoSpy.calls.reset();

      const recordDto = new SearchTodoListDayTaskResponseDto(
        'test todo list task id',
        true,
        'test todo list task title',
        'test todo list task description',
        637975872000000000);

      const descs = Object.getOwnPropertyDescriptors(vmSpy);
      const getSelectedSpy = descs.selected.get! as jasmine.Spy<() => SearchTodoListDayTaskResponseDto>;

      getSelectedSpy.and.returnValue(recordDto);

      vmSpy.delete.and.returnValue(of(void 0));

      fixture.componentInstance.onDeleteOkPressed();

      tick();

      expect(getSelectedSpy.calls.count())
        .withContext('selected should be called once')
        .toBe(1);

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.delete.calls.count())
        .withContext('delete should be called once')
        .toBe(1);

      expect(infoSpy.calls.count())
        .withContext('info should be called once')
        .toBe(1);

      expect(infoSpy.calls.first().args[0])
        .withContext('info should be called with message')
        .toContain('delete');

      expect(infoSpy.calls.first().args[0])
        .withContext('info should be called with message')
        .toContain(recordDto.title);

      expect(errorSpy.calls.count())
        .withContext('error should not be called once')
        .toBe(0);

      getSelectedSpy.calls.reset();
      subSpy.add.calls.reset();
      vmSpy.delete.calls.reset();
      errorSpy.calls.reset();
      infoSpy.calls.reset();

      vmSpy.delete.and.returnValue(throwError(() => 'error'));

      fixture.componentInstance.onDeleteOkPressed();

      tick();

      expect(getSelectedSpy.calls.count())
        .withContext('selected should be called once')
        .toBe(1);

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.delete.calls.count())
        .withContext('delete should be called once')
        .toBe(1);

      expect(infoSpy.calls.count())
        .withContext('info should not be called')
        .toBe(0);

      expect(errorSpy.calls.count())
        .withContext('error should be called once')
        .toBe(1);

      expect(errorSpy.calls.first().args[0])
        .withContext('info should be called with message')
        .toBe('An error occured.');
  })));
});
