import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFormValues } from './types/article-form-values';
import { BackendErrorMessagesComponent } from '../backend-error-messages/backend-error-messages.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BackendErrors } from '../../types/backendErrors';

@Component({
  selector: 'mc-article-form',
  standalone: true,
  imports: [NgIf, BackendErrorMessagesComponent, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValues;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrors | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValues>();

  get form() {
    return {
      title: this.articleForm.get('email'),
      description: this.articleForm.get('password'),
      body: this.articleForm.get('body'),
      tagList: this.articleForm.get('tagList'),
    };
  }

  articleForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required],
    tagList: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }
    this.articleForm.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.articleForm.getRawValue();
    const articleFormValues: ArticleFormValues = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };

    this.articleSubmit.emit(articleFormValues);
  }
}
