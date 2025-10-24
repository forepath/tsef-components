import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeroComponent } from './hero/hero.component';
import { WorkflowOverviewComponent } from './workflow-overview/workflow-overview.component';

@Component({
  selector: 'landingpage-frontend-feature-workflow',
  imports: [HeroComponent, WorkflowOverviewComponent],
  templateUrl: './workflow.component.html',
})
export class WorkflowComponent {
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
