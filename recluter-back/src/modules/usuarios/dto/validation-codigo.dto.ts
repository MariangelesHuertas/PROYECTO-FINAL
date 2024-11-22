import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty } from "class-validator"

export class ValidationCode{

   /*  @IsInt()
    @IsNotEmpty()
    id:number
 */

    @ApiProperty({
        description:"codigo enviado por email",
        example:123456
    })
    @IsInt()
    @IsNotEmpty()
    codigo_verificacion:number
}