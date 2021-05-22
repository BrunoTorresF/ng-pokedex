import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.sass"],
})
export class SearchbarComponent implements OnInit {
  @Output() searchTerm: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  search(term: string) {
    this.searchTerm.emit(term);
  }
}
