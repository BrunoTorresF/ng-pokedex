import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokecacheService {
  constructor() {}

  getCacheEntry(key) {
    console.log(key);
    return "";
  }

  setCacheEntry(key, value) {
    console.log(key, value);
    return "";
  }
}
