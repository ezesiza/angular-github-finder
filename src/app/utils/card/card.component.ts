import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-selector',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() cardTitle = '';
  @Input() cardsubTitle = '';
  @Input() cardContent = '';
}
