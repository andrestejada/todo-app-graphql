import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
    private todos:Todo[] = [
        {id:1,description:'lavar',done:false},
        {id:2,description:'cocinar',done:false},
        {id:3,description:'comer',done:false},
    ]

    findAll(){
        return this.todos
    }

    findOne(id:number){
        const todo = this.todos.find((todo)=>todo.id === id);
        if(!todo){
            throw new NotFoundException(`the id with that id does not exist`)
        }
        return todo
    }
}
