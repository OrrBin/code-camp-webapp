import { Component, AfterViewChecked } from '@angular/core';
import { CodeSnippetsData } from '../../../@core/data/code-snippets';
import { StateService } from '../../../@core/utils';
import { CodeSnippet } from '../../../@core/lib/objects/code-snippet';
import { Router } from '@angular/router';
import { User } from '../../../@core/lib/objects/user';
import { AuthorizedComponentComponent } from '../authorized-component/authorized-component.component';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Code} from '../../../@core/lib/objects/code';
import {Score} from '../../../@core/lib/objects/score';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {AuthService} from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-infinite-list',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.scss'],
})
export class FeedComponent extends AuthorizedComponentComponent {
  snippetsCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;
  dropdownList = [];
  selectedTags: any[] = [];
  dropdownSettings = {};

  snippets: CodeSnippet[] = [];
  // user: User;

  selectedItem: string = 'Recommended';

  constructor(auth: AuthService, private codeSnippetsService: CodeSnippetsData, state: StateService, router: Router, private toastrService: NbToastrService) {
    super(auth, state, router);
    this.codeSnippetsService.getRecommendedSnippets(this.user.username)
      .subscribe(snippets => {
        this.snippets = snippets;
      });
  }

  matchPosts(item: any) {
    if (item === 'Recommended') {
      console.log(`viewing recommended snippets for ${this.user.username}`);
      this.codeSnippetsService.getRecommendedSnippets(this.user.username)
        .subscribe(snippets => {
          this.snippets = snippets;
        });
    }

    if (item === 'Popular') {
      console.log('viewing popular snippets')
      this.codeSnippetsService.getPopularSnippets()
        .subscribe(snippets => {
          this.snippets = snippets;
        });
    }

    if (item === 'Recent') {
      console.log('viewing recent snippets')
      this.codeSnippetsService.getRecentSnippets()
        .subscribe(snippets => {
          this.snippets = snippets;
        });
    }
  }

  loadNext(cardData) {
    if (cardData.loading) {
      return;
    }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.codeSnippetsService.getRecentSnippets()
      .subscribe(nextSnippet => {
        cardData.placeholders = [];
        cardData.news.push(...nextSnippet);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }

  ngOnInit(): void {
    this.codeSnippetsService.getFeedTags().subscribe(tags => {
      const dropdownList: any[] = []
      for (let i = 0; i < tags.length; i++) {
        dropdownList[i] = {};
        dropdownList[i].item_id = i + 1;
        dropdownList[i].item_text = tags[i].name;
        dropdownList[i].item_text = dropdownList[i].item_text.charAt(0).toUpperCase() + dropdownList[i].item_text.slice(1);
      }
      this.dropdownList = dropdownList;
    });

    this.selectedTags = [];

    this.state.selectedTag.subscribe((selectedTag) => {
      if (selectedTag != null) {
        this.codeSnippetsService.getCodeSnippetsByTag(selectedTag)
          .subscribe(snippets => {
            this.snippets = snippets;
          });
        this.searchToast(selectedTag);
        this.state.selectedTag.next(null);
      }
    });


    this.dropdownSettings = <IDropdownSettings>{
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true,
      enableCheckAll: false,
      limitSelection: 4,
    };
  }

  searchTags() {
    // console.log(this.selectedTags);
    const tagNames: string[] = this.createTagListFromSelectedTags();
    // console.log(tagNames);
    if (tagNames.length === 0) {
      this.codeSnippetsService.getRecentSnippets()
        .subscribe(snippets => {
          this.snippets = snippets;
        });

    } else {
      this.codeSnippetsService.getCodeSnippetsByTags(tagNames)
        .subscribe(nextSnippet => {
          // console.log(nextSnippet);
          this.snippets = nextSnippet;
        });
    }
  }

  createTagListFromSelectedTags() {
    console.log('selected tags: ' + this.selectedTags);
    const tagNames: string[] = [];
    for (let i = 0; i <  this.selectedTags.length; i++) {
      tagNames[i] = this.selectedTags[i].item_text.toLowerCase();
    }
    return tagNames;
  }


  searchToast(tagName: string) {
    let status: NbComponentStatus = 'primary';
    this.showToast(status, `Displaying search results for "${tagName}"`, '');
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }
}




