import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Todo } from './entity/todo.entity'
import { TodoService } from './todo.service'

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
}
