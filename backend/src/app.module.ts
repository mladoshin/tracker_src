import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PackageModule } from './package/package.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [UserModule, AuthModule, PackageModule, RouteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
