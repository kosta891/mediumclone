import { TestBed } from '@angular/core/testing';

import { UpdateArticleService } from './update-article.service';

describe('CreateArticleService', () => {
  let service: UpdateArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
