import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class SignUpUserInput {

    @Field(() => String)
    @IsNotEmpty()
    nombre_usuario: string

    @Field(() => String)
    @IsNotEmpty()
    correo: string

    @Field(() => Number)
    @IsNotEmpty()
    estado_usuario_id: number

    @Field(() => Number)
    @IsNotEmpty()
    tipo_usuario_id: number

    @Field(() => Number, { nullable: true })
    metodo_autenticacion_id?: number
}

@InputType()
export class SignInUserInput {
    @Field(() => String)
    @IsNotEmpty()
    nombre_usuario: string

    @Field(() => String)
    @IsNotEmpty()
    contrasena: string
}




