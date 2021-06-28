import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { Usuarios } from './usuarios.entity';

@ObjectType()
export class Login {
  @Field((type) => ID)
  login_id: number

  @Field()
  @IsNotEmpty()
  username: string

  @Field()
  @IsNotEmpty()
  password: string

  @Field((type) => String, { nullable: true })
  token?: string | null

  @Field((type) => String, { nullable: true })
  salt?: string | null

  @Field((type) => Number)
  rol_id?: number

  @Field((type) => Number, { nullable: true })
  tiene_doble_factor?: number | null

  @Field((type) => Number, { nullable: true })
  usuario_id?: number | null

  @Field((type) => Usuarios, { nullable: true })
  Usuarios?: Usuarios


}

@ObjectType()
export class LoginSubscription {
  @Field({ nullable: true })
  login_id?: number
  @Field((type) => String, { nullable: true })
  token?: string | null

}