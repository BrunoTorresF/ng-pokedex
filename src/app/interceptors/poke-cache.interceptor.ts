import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { PokecacheService } from "../services/pokecache.service";

@Injectable()
export class PokeCacheInterceptor implements HttpInterceptor {
  constructor(private pokecache: PokecacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const cachedResponse = this.pokecache.getCacheEntry(request.url);
    return cachedResponse
      ? of(cachedResponse)
      : next.handle(request).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              this.pokecache.setCacheEntry(request.url, event);
            }
          })
        );
    return next.handle(request);
  }
}
