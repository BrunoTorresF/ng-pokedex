import { Component, OnInit, OnDestroy } from "@angular/core";
import { PokedexService } from "../../services/pokedex.service";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from "rxjs/operators";

@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.sass"],
})
export class PokedexComponent implements OnInit, OnDestroy {
  pokemonList = [];
  next = undefined;
  prev = undefined;
  count = 0;
  private searchTerm = new Subject<string>();
  private loadMore = new Subject<string>();
  private destroyed = new Subject<void>();

  constructor(private pokedex: PokedexService) {}

  ngOnInit() {
    this.pokedex.getPokemon().subscribe((pokemon) => {
      this.count = pokemon.count;
      this.pokemonList = pokemon.results;
      this.next = pokemon.next;
      // this.prev = pokemon.previous;
    });

    this.searchTerm
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.pokedex.searchPokemon(term)),
        takeUntil(this.destroyed)
      )
      .subscribe((pokemon) => {
        console.log(pokemon);
        this.pokemonList = pokemon.results ? pokemon.results : [pokemon];
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  loadPokemon() {
    this.loadMore
      .pipe(
        distinctUntilChanged(),
        switchMap((nextUrl: string) => this.pokedex.getPokemon(nextUrl)),
        takeUntil(this.destroyed)
      )
      .subscribe((pokemon) => {
        this.count = pokemon.count;
        this.pokemonList = pokemon.results;
        this.next = pokemon.next;
        this.prev = pokemon.previous;
      });
  }

  onSearch(term) {
    console.log(term);
    this.searchTerm.next(term);
  }

  onNavigate(goBack: boolean) {
    goBack ? this.loadMore.next(this.prev) : this.loadMore.next(this.next);
  }
}
