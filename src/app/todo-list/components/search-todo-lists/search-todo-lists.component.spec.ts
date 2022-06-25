import { Component,                 } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { By,                        } from '@angular/platform-browser';
import { RouterModule,              } from '@angular/router';

import { of, } from 'rxjs';

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
class ToastsComponentMock {}

describe('SearchTodoListsComponent', () => {
  let vm               : jasmine.SpyObj<SearchTodoListsViewModel>;
  let todoListLinks    : jasmine.SpyObj<TodoListLinks>;
  let todoListTaskLinks: jasmine.SpyObj<TodoListTaskLinks>;

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
    )

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

    todoListLinks = jasmine.createSpyObj(
      'TodoListLinks',
      [
        'addTodoListLink',
        'updateTodoListLink',
        'searchTodoListsLink',
      ]);

    todoListLinks.searchTodoListsLink.and.returnValue([]);

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
        useValue: todoListLinks,
      });

    todoListTaskLinks = jasmine.createSpyObj(
      TodoListTaskLinks,
      [
        'searchTodoListTasksLink',
      ]);

    TestBed.overrideProvider(
      TodoListTaskLinks,
      {
        useValue: todoListTaskLinks,
      });

    fixture = TestBed.createComponent(SearchTodoListsComponent);
    fixture.detectChanges();
  });

  it('onDeleteOkPressed should be called on delete button click', () => {
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
  })
});
