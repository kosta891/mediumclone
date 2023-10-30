import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './store/action';

@Component({
  selector: 'mc-add-to-favorites',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add-to-favorites.component.html',
})
export class AddToFavoritesComponent {
  @Input() isFavorited = false;
  @Input() articleSlug = '';
  @Input() favoritesCount = 0;

  constructor(private store: Store) {}

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );

    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }

    this.isFavorited = !this.isFavorited;
  }
}
