import { Injectable, NotFoundException } from '@nestjs/common'
import { Todo } from './entity/todo.entity'
import { CreateTodo } from './dto/input/create-todo.input'
import { updateTodo } from './dto/input/update-todo.input'
import { StatusArgs } from './dto/args/status.args'

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'lavar', done: false },
    { id: 2, description: 'cocinar', done: false },
    { id: 3, description: 'comer', done: false },
    { id: 4, description: 'Jugar', done: true },
  ]

  get totalTodos(){
    return this.todos.length
  }
  get pendingTodos(){
    return this.todos.filter(todo=>todo.done===false).length
  }
  get completedTodos(){
    return this.todos.filter(todo=>todo.done===true).length
  }

  findAll (statusArgs:StatusArgs) {
    const {status} = statusArgs
    if(status){
      return this.todos.filter((todo)=>todo.done === status)
    }
    return this.todos
  }

  findOne (id: number) {
    const todo = this.todos.find(todo => todo.id === id)
    if (!todo) {
      throw new NotFoundException(`the id with that id does not exist`)
    }
    return todo
  }

  createTodo (createTodoInput: CreateTodo) {
    const todo = new Todo()
    todo.description = createTodoInput.description
    todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1
    this.todos.push(todo)
    return todo
  }

  updateTodo (updateTodoInput: updateTodo) {
    const todoToUpdate = this.findOne(updateTodoInput.id)

    const todoUpdated = {
      ...todoToUpdate,
      ...updateTodoInput,
    }

    this.todos = this.todos.map(todo =>
      todo.id === updateTodoInput.id ? todoUpdated : todo,
    )
    return todoUpdated
  }

  deleteTodo (id: number) {
    const todo = this.findOne(id)
    this.todos = this.todos.filter(todo => todo.id !== id)
    return true
  }
}
