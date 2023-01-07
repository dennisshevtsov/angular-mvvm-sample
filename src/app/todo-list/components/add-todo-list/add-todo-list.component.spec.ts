import { ComponentFixture } from '@angular/core/testing';
import { TestBed          } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

import { of         } from 'rxjs';
import { throwError } from 'rxjs';

import { CoreModule        } from 'src/app/core';
import { TodoListLinks     } from 'src/app/core';
import { TodoListNavigator } from 'src/app/core';

import { TodoListComponent    } from '../todo-list/todo-list.component';
import { AddTodoListComponent } from './add-todo-list.component';
import { AddTodoListViewModel } from './add-todo-list.view-model';

describe('AddTodoListComponent', () => {
  let addTodoListFixture: ComponentFixture<AddTodoListComponent>;
  let addTodoListComponent: AddTodoListComponent;

  let vm       : jasmine.SpyObj<AddTodoListViewModel>;
  let links    : jasmine.SpyObj<TodoListLinks>;
  let navigator: jasmine.SpyObj<TodoListNavigator>;

  beforeEach(() => {
    vm = jasmine.createSpyObj(
      'AddTodoListViewModel',
      {
        'todoListId': undefined,
        'todoList': undefined,
        'add': undefined,
      });

    vm.todoList.title = '';
    vm.todoList.description = '';

    TestBed.overrideProvider(
      AddTodoListViewModel,
      {
        useValue: vm,
      });

    links = jasmine.createSpyObj(
      'TodoListLinks',
      {
        'addTodoListLink': undefined,
        'updateTodoListLink': undefined,
        'searchTodoListsLink': undefined,
      });

    navigator = jasmine.createSpyObj(
      'TodoListNavigator',
      {
        'navigateToUpdateTodoList': undefined,
      });

    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        AddTodoListComponent,
      ],
      imports: [
        CoreModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: TodoListLinks,
          useValue: links,
        },
        {
          provide: TodoListNavigator,
          useValue: navigator,
        },
      ],
    });

    addTodoListFixture = TestBed.createComponent(AddTodoListComponent);
    addTodoListComponent = addTodoListFixture.componentInstance;

    addTodoListFixture.detectChanges();
  });

  it('should not call add method', () => {
    addTodoListFixture.debugElement.query(By.css('#txtTitle')).nativeElement.value = '';
    addTodoListFixture.debugElement.query(By.css('#txtDescription')).nativeElement.value = '';

    addTodoListFixture.detectChanges();

    addTodoListComponent.onOkPressed();

    expect(vm.add.calls.count())
      .withContext('should not call add method')
      .toBe(0);
  });

  it('should call add method with success', () => {
    const titleControl =
      addTodoListFixture.debugElement.query(By.css('#txtTitle')).nativeElement;

    titleControl.value = 'test';
    titleControl.dispatchEvent(new Event('input'));

    addTodoListFixture.detectChanges();

    vm.add.and.returnValue(of(void 0));

    addTodoListComponent.onOkPressed();

    expect(vm.add.calls.count())
      .withContext('should not call add method')
      .toBe(1);

    expect(navigator.navigateToUpdateTodoList.calls.count())
      .withContext('should call redirect method')
      .toBe(1);
  });

  it('should call add method with error', () => {
    const titleControl =
      addTodoListFixture.debugElement.query(By.css('#txtTitle')).nativeElement;

    titleControl.value = 'test';
    titleControl.dispatchEvent(new Event('input'));

    addTodoListFixture.detectChanges();

    vm.add.and.returnValue(throwError(() => ''));

    addTodoListComponent.onOkPressed();

    expect(vm.add.calls.count())
      .withContext('should call add operation')
      .toBe(1);

    expect(navigator.navigateToUpdateTodoList.calls.count())
      .withContext('should redirect to update screen')
      .toBe(0);
  });
});
