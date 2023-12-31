import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { UsuariosSesiones } from './usuariossesiones.entity'
import { UsuariosParametrosValores } from './usuariosparametrosvalores.entity'

@ObjectType()
export class Usuarios {

    @Field(() => Number)
    usuario_id: number

    @Field(() => String)
    @IsNotEmpty()
    nombre_usuario: string

    @Field(() => String)
    @IsNotEmpty()
    contrasena: string

    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    correo: string

    @Field(() => String)
    salt: string

    @Field(() => Boolean)
    sol_cambio_contrasena?: boolean

    @Field(() => String)
    fecha_vigencia_contrasena?: string

    @Field(() => String)
    fecha_creacion?: string

    @Field(() => String)
    fecha_actualizacion?: string

    @Field(() => Number)
    cant_intentos: number

    @Field(() => UsuariosSesiones)
    UsuariosSesionesSec: UsuariosSesiones

    @Field(() => [UsuariosParametrosValores])
    UsuariosParametrosValores: UsuariosParametrosValores[]
}
