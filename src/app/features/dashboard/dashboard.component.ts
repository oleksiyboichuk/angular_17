import { Component, OnInit } from '@angular/core';
import { HeroModel } from "../hero/models/hero.model";
import { HeroService} from "../hero/services/hero.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HeroSearchComponent} from "../hero/components/hero-search/hero-search.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    HeroSearchComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: HeroModel[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
