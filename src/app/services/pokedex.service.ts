import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class PokedexService {
  baseUrl = `https://pokeapi.co/api/v2/`;
  constructor(private http: HttpClient) {}

  getPokemon(url?: string): Observable<any> {
    const getUrl = url?.includes("pokeapi.co")
      ? url
      : `${this.baseUrl}pokemon/`;
    return this.http.get<any>(getUrl).pipe(
      catchError((err) => {
        throw "GET Pokemon Failed" + err;
      })
    );
  }

  searchPokemon(pokemon: string): Observable<any> {
    if (!pokemon.trim()) {
      return this.getPokemon();
    }
    return this.http.get(`${this.baseUrl}pokemon/${pokemon}`).pipe(
      catchError((err) => {
        throw "Search Pokemon Failed" + err;
      })
    );
  }
}
