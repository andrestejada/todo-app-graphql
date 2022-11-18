import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateTodo {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string
}
