import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeedController } from './seeder.controller';
import { SeedService } from './seeder.service';

@Module({
    imports:[PrismaModule],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeederModule {}
