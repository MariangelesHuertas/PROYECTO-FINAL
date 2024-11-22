import { Controller, Get, } from '@nestjs/common';
import { SeedService } from './seeder.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Seeders - Faker")
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Se generara los datos de prueba para los 4 modulos' })
  @ApiResponse({ status: 200, description: 'Se inserto correctamente los datos de prueba' })
  executeSeed() {
    return this.seedService.runSeed()
  }

  @Get('delete')
  @ApiOperation({ summary: 'Se ELIMINA los datos de prueba en los 4 modulos' })
  @ApiResponse({ status: 200, description: 'Se elimino correctamente' })
  deleteExecuteSeed() {
    return this.seedService.deleteSeed()
  }
}