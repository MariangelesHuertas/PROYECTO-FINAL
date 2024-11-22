export class CreatePaiseDto {
  pais: string;
  ciudades: CreateCiudadDto[];
}

export class CreateCiudadDto {
  ciudad: string;
  capital: boolean;
}