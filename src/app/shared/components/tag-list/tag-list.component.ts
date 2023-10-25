import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'mc-tag-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tag-list.component.html',
})
export class TagListComponent {
  @Input() tags: string[] | null = [];
}
