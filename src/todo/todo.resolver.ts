import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Todo } from './entity/todo.entity'
import { TodoService } from './todo.service'
import { CreateTodo } from './dto/input/create-todo.input'

@Resolver()
export class TodoResolver {
  constructor (private todoService: TodoService) {}

  @Query(() => [Todo], {
    name: 'todos',
    description: 'return a list of all todos',
  })
  findAll (): Todo[] {
    return this.todoService.findAll()
  }

  @Query(() => Todo, { name: 'todo' })
  findOne (@Args({ name: 'id', type: () => Int }) id: number) {
    return this.todoService.findOne(id)
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo (@Args({ name: 'createTodoInput' }) createTodoInput: CreateTodo) {
    return this.todoService.createTodo(createTodoInput)
  }
}
