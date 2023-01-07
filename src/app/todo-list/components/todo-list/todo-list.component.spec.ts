import { ComponentFixture } from '@angular/core/testing';
import { TestBed          } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { Validators          } from '@angular/forms';

import { AddTodoListRequestDto } from 'src/app/todo-list/api';
import { TodoListComponent     } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture  : ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
      ],
      imports: [
        ReactiveFormsModule,
      ],
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should contain initialized form', () => {
    const todoList = new AddTodoListRequestDto(
      'test title', 'test description');

    component.todoList = todoList;
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
    expect(component.form).not.toBeNull();

    const titleControl = component.form.get('title');

    expect(titleControl).not.toBeNull();
    expect(titleControl!.hasValidator(Validators.required)).toBeTrue();
    expect(titleControl!.value).toBe(todoList.title);

    const descriptionControl = component.form.get('description');

    expect(descriptionControl).not.toBeNull();
    expect(descriptionControl!.validator).toBeNull();
    expect(descriptionControl!.value).toBe(todoList.description);
  });

  it('should validate form', () => {
    component.todoList = new AddTodoListRequestDto();
    component.ngOnInit();

    const titleControl = component.form.get('title')!;
    const descriptionControl = component.form.get('description')!;

    titleControl.setValue('');
    descriptionControl.setValue('');

    component.validateForm();

    expect(component.form.valid)
      .withContext('form shoul be invalid')
      .toBeFalse();

    expect(titleControl.valid)
      .withContext('description should not be valid')
      .toBeFalse();
    expect(titleControl.errors)
      .withContext('title errors should not be empty')
      .not.toBeNull();

    const titleErrorKeys = Object.keys(titleControl.errors!);

    expect(titleErrorKeys.length)
      .withContext('title errors should contains only one error')
      .toBe(1);
    expect(titleErrorKeys[0])
      .withContext('title errors should contains only required error')
      .toBe('required');

    expect(descriptionControl.valid)
      .withContext('description should be valid')
      .toBeTrue();

    titleControl.setValue('test title');

    component.validateForm();

    expect(component.form.valid)
      .withContext('form should be valid')
      .toBeTrue();
    expect(titleControl.valid)
      .withContext('title should be valid')
      .toBeTrue();
    expect(descriptionControl.valid)
      .withContext('description should be valid')
      .toBeTrue();
  });
});
