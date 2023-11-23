import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
})
export class UiButtonComponent {
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'button';
  @Input() backgroundColor: string = '#AA336A';
  @Input() color = '#fff';
  @Input() fontSizeRem = 1.3;
  @Input() widthRem = 12;
  @Output() onClick = new EventEmitter();
}
