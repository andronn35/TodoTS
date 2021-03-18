export type ListType = {
  id: number,
  title: string,
  todos: Array<TodosType>
}

export type TodosType = {
  id: number,
  name: string,
  completed: boolean
}