import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroModel } from '../../models/hero.model';
import {Location, NgIf, UpperCasePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from "../../services/hero.service";
import {OnInit} from "@angular/core";


@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location:Location
  ) { }
  @Input() hero?: HeroModel;

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
