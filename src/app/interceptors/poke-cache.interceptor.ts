import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, switchMap } from "rxjs/operators";
import { PokecacheService } from "../services/pokecache.service";

@Injectable()
export class PokeCacheInterceptor implements HttpInterceptor {
  constructor(private pokecache: PokecacheService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.method !== "GET") {
      return next.handle(request);
    }

    return this.pokecache.getCacheEntry(request.url).pipe(
      switchMap((cache: HttpResponse<any>) => {
        if (cache) {
          return of(new HttpResponse<any>(cache));
        } else {
          return next.handle(request).pipe(
            tap((event) => {
              if (event instanceof HttpResponse) {
                this.pokecache.setCacheEntry(request.url, event);
              }
            })
          );
        }
      })
    );
  }
}
