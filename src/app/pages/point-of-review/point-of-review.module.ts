import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbIconModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { PointOfReviewRoutingModule } from './point-of-review-routing.module';
import { PointOfReviewComponent } from './point-of-review.component';
import { FeedComponent } from './feed/feed.component';
import { CodeSnippetPostComponent } from './feed/code-snippet-post/code-snippet-post.component';
import { NewsPostPlaceholderComponent } from './feed/code-snippet-post-placeholder/code-snippet-post-placeholder.component';
import { NewsService } from './news.service';
import { CodeSnippetViewComponent } from './code-snippet-view/code-snippet-view.component';
import { CodeReviewComponent } from './code-review/code-review.component';
import { CommentComponent } from './comment/comment.component';
import { ScoreComponent } from './score/score.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { TagsComponent } from './tags/tags.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    MonacoEditorModule,
    PointOfReviewRoutingModule,
  ],
  declarations: [
    PointOfReviewComponent,
    NewsPostPlaceholderComponent,
    FeedComponent,
    CodeSnippetPostComponent,
    CodeSnippetViewComponent,
    CodeReviewComponent,
    CommentComponent,
    ScoreComponent,
    CodeEditorComponent,
    TagsComponent,
  ],
  providers: [
    NewsService,
  ],
})
export class PointOfReviewModule { }