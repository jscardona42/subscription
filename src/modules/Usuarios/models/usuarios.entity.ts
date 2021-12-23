import 'reflect-metadata'
import { ObjectType, Field, ID} from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'

@ObjectType()
export class Usuarios {
    @Field((type) => ID)
    usuario_id: number

    @Field()
    @IsNotEmpty()
    nombre: string

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Field((type) => Boolean, { nullable: true })
    activo?: boolean | null

    @Field((type) => Number, { nullable: true })
    empresa_id?: number | null

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

}
