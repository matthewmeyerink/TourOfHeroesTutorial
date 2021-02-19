import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
    this.heroes$ = of([]);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300 ms after keystroke to consider the term
      debounceTime(300),

      // Ignore new term if same as previous term
      distinctUntilChanged(),

      // Switch to new search observable whenever the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  /* Add a search term to the observable stream to push ro search */
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
