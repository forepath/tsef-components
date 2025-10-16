import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { EssentialCommandsComponent } from './essential-commands/essential-commands.component';
import { HeroComponent } from './hero/hero.component';
import { NextStepsComponent } from './next-steps/next-steps.component';
import { PrerequisitesComponent } from './prerequisites/prerequisites.component';
import { WorkspaceTourComponent } from './workspace-tour/workspace-tour.component';

@Component({
  selector: 'landingpage-frontend-feature-getting-started',
  imports: [
    HeroComponent,
    PrerequisitesComponent,
    WorkspaceTourComponent,
    EssentialCommandsComponent,
    NextStepsComponent,
  ],
  templateUrl: './getting-started.component.html',
})
export class GettingStartedComponent {
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
