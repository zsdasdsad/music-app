import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> | boolean {
        return super.canActivate(context);
    }
}