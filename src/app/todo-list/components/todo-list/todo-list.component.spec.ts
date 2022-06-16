import { ComponentFixture, TestBed,       } from '@angular/core/testing';
import { ReactiveFormsModule, Validators, } from '@angular/forms';

import { AddTodoListRequestDto } from 'src/app/todo-list/api';
import { TodoListComponent,    } from './todo-list.component';

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

it('should contain form', () => {
  component.todoList = new AddTodoListRequestDto(
    'test title', 'test description');

  component.ngOnInit();

  expect(component.form).not.toBeUndefined();
  expect(component.form).not.toBeNull();

  expect(component.form.get('title')).not.toBeNull();
  expect(component.form.get('title')!.hasValidator(Validators.required)).toBeTrue();

  expect(component.form.get('description')).not.toBeNull();
  expect(component.form.get('description')!.validator).toBeNull();
});
