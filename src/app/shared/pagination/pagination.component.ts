import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { UtilsService } from '../services/utils.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-pagination',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() total = 0;
  @Input() limit = 20;
  @Input() url = '';
  @Input() currentPage = 1;

  pagesCount = 1;
  pages: number[] = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }
}
