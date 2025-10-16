import { CommonModule } from '@angular/common';
import { Component, inject, LOCALE_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'landingpage-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  locale = inject(LOCALE_ID);

  get isEn(): boolean {
    return (this.locale || '').toLowerCase().startsWith('en');
  }

  get isDe(): boolean {
    return (this.locale || '').toLowerCase().startsWith('de');
  }
}
