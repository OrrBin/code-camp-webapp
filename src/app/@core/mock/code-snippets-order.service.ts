import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { CodeSnippetsData } from '../data/code-snippets';
import { CodeSnippet } from '../lib/objects/code-snippet';
import { CodeReview } from '../lib/objects/code-review';
import { Code } from '../lib/objects/code';
import { Score } from '../lib/objects/score';

@Injectable()
export class CodeSnippetsService extends CodeSnippetsData {

  private snippets = [
    new CodeSnippet('testId1', 'Orr', 'Help me get this code better', new Code("test code 1;", 'javascript'), [], new Score(85, 15, 2, 0)),
    new CodeSnippet('testId2', 'Oz', 'is this code good ?', new Code("test code 2;", 'javascript'), [], new Score(90, 15, 2, 0)),
    new CodeSnippet('testId3', 'Allen', 'Like this code ??', new Code("test code code coed 3;", 'javascript'), [], new Score(85, 20, 0, 0)),
    new CodeSnippet('testId4', 'Yahav', 'HELP !', new Code("test code asd \nasidjasd jasd2a;", 'javascript'), [], new Score(30, 0, 5, 2)),
  ]

  getCodeSnippets(): Observable<CodeSnippet[]> {
    return observableOf(this.snippets);
  }

  postSnippet(snippet: CodeSnippet): Observable<CodeSnippet> {
    this.snippets.push(snippet);
    return observableOf(snippet);
  }

  postReview(review: CodeReview) {
    for (let index = 0; index < this.snippets.length; index++) {
      const snippet = this.snippets[index];
      if (snippet.id == review.codeSnippetId)
        snippet.reviews.push(review);
    }

    return observableOf(review);
  }
}
