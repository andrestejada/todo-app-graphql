import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hellow',
    description: 'this query say hellow wordl',
  })
  helloWord () {
    return 'Hola Mundo'
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber () {
    return Math.random() * 100
  }

  @Query(() => Int, { name: 'randomFromZero' })
  randomFromZero (
    @Args('to',{
      type: () => Int,
      defaultValue: '10',
      nullable: true,
      description: 'should be a integer',
    })
    to: number = 10,
  ) {
    return Math.floor(Math.random() * to + 1)
  }
}
