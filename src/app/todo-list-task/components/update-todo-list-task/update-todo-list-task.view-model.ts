export class UpdateTodoListTaskViewModel {
  private todoListIdValue: number | string | undefined;

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
  }
}
