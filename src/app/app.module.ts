import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PokedexComponent } from "./components/pokedex/pokedex.component";
import { PokemoncardComponent } from "./components/pokemoncard/pokemoncard.component";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { PokeCacheInterceptor } from "./interceptors/poke-cache.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokemoncardComponent,
    SearchbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PokeCacheInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
