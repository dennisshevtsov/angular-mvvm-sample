import { Component, OnDestroy,
         OnInit, ViewChild,        } from '@angular/core';
import { FormBuilder, FormGroup,
         Validators,               } from '@angular/forms';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { mergeMap, Subscription, throwError, } from 'rxjs';

import { FormComponentBase,
         PageComponent,
         TodoListLinks,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListViewModel,      } from './update-todo-list.view-model';

@Component({
  templateUrl: './update-todo-list.component.html',
  styleUrls: [
    './update-todo-list.component.scss',
  ],
  providers: [
    UpdateTodoListViewModel,
  ],
})
export class UpdateTodoListComponent
  extends FormComponentBase
  implements OnInit, OnDestroy {
  @ViewChild('page')
  private page!: PageComponent;

  private readonly subscription: Subscription;

  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly fb   : FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly links: TodoListLinks,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public ngOnInit(): void {
    const project = (params: ParamMap) => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoList.todoListId = todoListId;

        return this.vm.initialize();
      }

      return throwError(() => new Error(''));
    };

    const observer = {
      next: () => {
        this.subscription.add(
          this.vm.initialize()
                 .subscribe(() => {
                   this.form.setValue({
                     'title': this.vm.todoList.title,
                     'description': this.vm.todoList.description,
                   });
                 }));
      },
      error: () => this.page.showError('An error occured.'),
    };

    this.subscription.add(
      this.route.paramMap.pipe(mergeMap(project))
                         .subscribe(observer));

    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.vm.todoList.title = value.title;
        this.vm.todoList.description = value.description;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    this.validateForm();

    if (this.form.valid) {
      const observer = {
        complete: () => this.page.showMessage('The TODO list was updated.'),
        error: () => this.page.showError('An error occured.'),
      };

      this.subscription.add(this.vm.update().subscribe(observer));
    }
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': this.fb.control('', Validators.required),
      'description': ''
    });
  }
}
