import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { UsuariosSesiones } from './usuariossesiones.entity'

@ObjectType()
export class Usuarios {
    @Field(() => ID)
    usuario_id: number

    @Field()
    @IsNotEmpty()
    nombre: string

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Field(() => String)
    estado: string

    @Field(() => String)
    metodo_autenticacion: string

    @Field(() => Boolean, { nullable: true })
    conexion_externa?: boolean | null

    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    username?: string | null

    @Field(() => String, { nullable: true })
    @IsNotEmpty()
    password?: string | null

    @Field(() => String, { nullable: true })
    salt?: string | null

    @Field(() => Number, { nullable: true })
    rol_id?: number | null

    @Field(() => UsuariosSesiones, { nullable: true })
    UsuariosSesionesSec?: UsuariosSesiones
}
