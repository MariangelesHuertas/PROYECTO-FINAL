import { IsNumber, IsString } from "class-validator"


export class MessageValidationEmail {

    @IsString()
    asunto?:string

    @IsString()
    email?:string

    @IsString()
    mensaje?:string

    @IsNumber()
    codigo_verificacin?:Number

    @IsString()
    nombre_usuario?:string
}