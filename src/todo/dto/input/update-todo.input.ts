import { Field, InputType, Int } from '@nestjs/graphql'
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString  } from 'class-validator'

@InputType()
export class updateTodo {
  @Field(()=> Int,{nullable:false})
  @IsInt()
  id:number  


  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean
}
