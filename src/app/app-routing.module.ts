import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PokedexComponent } from "./components/pokedex/pokedex.component";

const routes: Routes = [
  {
    path: "pokemon",
    component: PokedexComponent,
  },
  {
    path: "",
    redirectTo: "/pokemon",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
