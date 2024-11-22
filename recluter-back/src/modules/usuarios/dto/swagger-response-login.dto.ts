import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ example: 157 })
  id: number;

  @ApiProperty({ example: 'cesar123' })
  usuario: string;

  @ApiProperty({ example: 158 })
  persona_id: number;

  @ApiProperty({ example: 105 })
  tipo_usuario_id: number;

  @ApiProperty({ example: '2024-07-08T18:22:53.056Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-07-08T18:22:53.056Z' })
  updatedAt: string;
}


export class SwaggerLoginResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU3LCJpYXQi',
  })
  token: string;
}