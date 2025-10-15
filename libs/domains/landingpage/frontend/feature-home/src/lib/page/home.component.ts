import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ComparisonComponent } from './comparison/comparison.component';
import { FaqComponent } from './faq/faq.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { HeroComponent } from './hero/hero.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ProofComponent } from './proof/proof.component';
import { TechnologyComponent } from './technology/technology.component';
import { WhatYouGetComponent } from './what-you-get/what-you-get.component';
import { WhoBenefitsComponent } from './who-benefits/who-benefits.component';
import { WhyTsefComponent } from './why-tsef/why-tsef.component';

@Component({
  selector: 'landingpage-frontend-feature-home',
  imports: [
    ComparisonComponent,
    HowItWorksComponent,
    ProofComponent,
    WhatYouGetComponent,
    WhoBenefitsComponent,
    WhyTsefComponent,
    HeroComponent,
    TechnologyComponent,
    FaqComponent,
    GetStartedComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  titleService = inject(Title);
  metaService = inject(Meta);

  constructor() {
    this.titleService.setTitle('The AI-ready TypeScript Enterprise Framework | TSEF');
    this.metaService.addTags([
      {
        name: 'description',
        content: $localize`:@@homeMetaDescription:TSEF is the AI-ready TypeScript Enterprise Framework. Easily build, deploy, and scale modern enterprise applications with best practices, advanced tooling, and AI capabilities out of the box.`,
      },
      {
        name: 'keywords',
        content: $localize`:@@homeMetaKeywords:TSEF, TypeScript, Enterprise Framework, AI-ready, Angular, web development, scalable, application framework, cloud, modern apps, enterprise solutions, software tools, best practices`,
      },
    ]);
  }
}
