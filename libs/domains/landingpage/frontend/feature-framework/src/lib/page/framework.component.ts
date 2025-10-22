import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeroComponent } from './hero/hero.component';
import { RulesComponent } from './rules/rules.component';

@Component({
  selector: 'landingpage-frontend-feature-framework',
  imports: [HeroComponent, RulesComponent],
  templateUrl: './framework.component.html',
})
export class FrameworkComponent {
  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    this.titleService.setTitle('Framework Rules & Guidelines | TSEF');
    this.metaService.addTags([
      {
        name: 'description',
        content: $localize`:@@rulesMetaDescription:Comprehensive framework rules and guidelines for TSEF. Learn about agent guidelines, application structure, domain organization, testing strategies, security practices, and development principles.`,
      },
      {
        name: 'keywords',
        content: $localize`:@@rulesMetaKeywords:TSEF rules, framework guidelines, development standards, coding practices, testing guidelines, security rules, domain architecture, application structure, best practices`,
      },
    ]);
  }
}
