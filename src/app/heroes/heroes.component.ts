import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];

  constructor(private heroService: HeroService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  /* Add a hero to the db */
  add(name: string): void {
    // Remove whitespace and ensure there was a name input
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes?.push(hero);
      });
  }

  /* Delete a hero from the db */
  delete(hero: Hero): void {
    // Removes the hero from the local list of heroes immediatly
    this.heroes = this.heroes?.filter(h => h !== hero);

    // Calls to delete hero from the server as well
    this.heroService.deleteHero(hero).subscribe();
  }
}
