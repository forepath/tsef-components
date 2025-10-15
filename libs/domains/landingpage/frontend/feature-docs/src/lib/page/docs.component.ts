import { Component, inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'landingpage-docs-feature-docs',
  imports: [MarkdownModule],
  providers: [provideMarkdown()],
  templateUrl: './docs.component.html',
  standalone: true,
})
export class DocsComponent implements OnInit, OnDestroy {
  titleService = inject(Title);
  metaService = inject(Meta);
  route = inject(ActivatedRoute);
  locale = inject(LOCALE_ID);

  destroy$ = new Subject<void>();

  defaultDocLocale = 'en';
  docUrl = '';

  constructor() {
    this.titleService.setTitle('Documentation | TSEF');
    this.metaService.addTags([
      {
        name: 'description',
        content: $localize`:@@docsMetaDescription:Documentation for the AI-ready TypeScript Enterprise Framework.`,
      },
      {
        name: 'keywords',
        content: $localize`:@@docsMetaKeywords:TSEF, TypeScript, Enterprise Framework, AI-ready, Angular, web development, scalable, application framework, cloud, modern apps, enterprise solutions, software tools, best practices, documentation`,
      },
    ]);
  }

  ngOnInit() {
    this.initializeDocs();

    this.route.url.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initializeDocs();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeDocs() {
    if (this.locale !== this.defaultDocLocale) {
      if (this.route.snapshot.url.length > 0) {
        window.location.href = '/' + this.defaultDocLocale + '/' + this.route.snapshot.url.join('/');
      } else {
        window.location.href = '/' + this.defaultDocLocale + '/docs';
      }
    }

    if (this.route.snapshot.url.length > 0) {
      this.docUrl = '/docs/' + this.route.snapshot.url.join('/') + '.md';
    } else {
      this.docUrl = '/docs/README.md';
    }
  }
}
