import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Todo } from './entity/todo.entity'
import { TodoService } from './todo.service'
import { CreateTodo } from './dto/input/create-todo.input'
import { updateTodo } from './dto/input/update-todo.input'
import { StatusArgs } from './dto/args/status.args'

@Resolver()
export class TodoResolver {
  constructor (private todoService: TodoService) {}

  @Query(() => [Todo], {
    name: 'todos',
    description: 'return a list of all todos',
  })
  findAll (
    @Args() statusArgs: StatusArgs,
  ): Todo[] {
    return this.todoService.findAll(statusArgs)
  }

  @Query(() => Todo, { name: 'todo' })
  findOne (@Args({ name: 'id', type: () => Int }) id: number) {
    return this.todoService.findOne(id)
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo (@Args({ name: 'createTodoInput' }) createTodoInput: CreateTodo) {
    return this.todoService.createTodo(createTodoInput)
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo (@Args('updateTodoInput') updateTodoInput: updateTodo) {
    return this.todoService.updateTodo(updateTodoInput)
  }

  @Mutation(() => Boolean, { name: 'removeTodo' })
  deleteTodo (@Args('id', { type: () => Int }) id: number) {
    return this.todoService.deleteTodo(id)
  }

  @Query(()=>Int,{name:'totalTodos'})
  totalTodos(){
    return this.todoService.totalTodos
  }
  @Query(()=>Int,{name:'pendingTodos'})
  pendingTodos(){
    return this.todoService.pendingTodos
  }
  @Query(()=>Int,{name:'completedTodos'})
  completedTodos(){
    return this.todoService.completedTodos
  }
}
