import 'reflect-metadata'
import { Field, ObjectType } from "@nestjs/graphql"
import { Usuarios } from './usuarios.entity'

@ObjectType()
export class UsuariosSesiones {

    @Field(() => Number)
    usuario_sesion_id: number 

    @Field(() => Number)
    usuario_id: number

    @Field(() => String)
    token: string

    @Field(() => Date)
    fecha_ultimo_login: Date

    @Field(() => Usuarios)
    Usuarios: Usuarios
}