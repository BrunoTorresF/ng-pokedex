import { Injectable } from "@angular/core";
import localforage from "localforage";
import { from, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PokecacheService {
  constructor() {
    localforage.config({
      name: "Poke Storage",
    });
  }

  getCacheEntry(key: string) {
    return from(localforage.getItem(key)).pipe(
      map((data: string) => JSON.parse(data))
    );
  }

  setCacheEntry(key: string, value) {
    return of(localforage.setItem(key, JSON.stringify(value))).pipe(
      map(() => value)
    );
  }

  clear() {
    return localforage.clear();
  }
}
