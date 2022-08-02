import 'reflect-metadata'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { UsuariosSesiones } from './usuariossesiones.entity'

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

    @Field(() => Number)
    rol_id: number

    @Field(() => Number)
    metodo_autenticacion_id: number

    @Field(() => Number)
    tipo_usuario_id: number

    @Field(() => Number)
    estado_usuario_id: number

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
}
