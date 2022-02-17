import { Component,              } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';

import { FormComponentBase, } from 'src/app/core';

@Component({
  templateUrl: './update-todo-list-task.component.html',
  styleUrls: [
    './update-todo-list-task.component.scss',
  ],
})
export class UpdateTodoListTaskComponent extends  FormComponentBase {
  public constructor(
    private readonly fb: FormBuilder,
  ) {
    super();
  }

  public get backLink(): string {
    return '';
  }

  public onOkPressed(): void {}

  protected buildForm(): FormGroup {
    return this.fb.group({});
  }
}
