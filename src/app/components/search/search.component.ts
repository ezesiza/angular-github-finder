import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApolloErrorResponse } from 'src/app/models/model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  inputValue = new FormControl('');
  errors: ApolloErrorResponse | undefined;
  hasError: boolean = false;
  repositoryList: any[] = [];
  nextBatch: number = 100;
  repoListLoading: boolean = false;
  currentPage: number = 1;
  currentSearch: string = ''

  constructor(private router: Router, public service: RequestService) { }

  ngOnInit(): void {
    const search = localStorage.getItem('currentSearch');
    this.currentSearch = String(search)
    this.getUsers(JSON.stringify(search))
  }

  applyFilter(event: any) {

  }

  onSearchSubmit() {
    localStorage.setItem('currentSearch', this.inputValue.value as string)
    this.service.getUsers(this.currentSearch).valueChanges.subscribe((response: any) => {
      this.displayResponse(response);
    })
  }

  displayResponse(response: any) {
    if (response.errors && response.netWorkStatus === 8) {
      this.hasError = true;
      return;
    }

    const updatedRepoList = this.sortResponse(response.data.searchUsers);
    this.repositoryList = updatedRepoList;
  }

  sortResponse(response: any) {
    return response.slice().sort(
      (a: any, b: any) => (parseInt(b.stargazers_count) - parseInt(a.stargazers_count))
    );
  }

  getUserDetails(url: string) {
    const repoInfo = new URL(url).pathname.split('/').filter(Boolean);
    this.router.navigateByUrl(`user-details/${repoInfo[1]}`);
  }

  getUsers(url:string) {
    this.service
      .getUsers(url)
      .valueChanges.subscribe((response: any) => {
        this.repoListLoading = true;
        this.displayResponse(response);
      });
      this.repoListLoading = false;
  }

  getNextBatch() {
    this.service
      .getUsers(this.currentSearch)
      .valueChanges.subscribe((response: any) => {
        this.repoListLoading = true;
        this.displayResponse(response);
      });
  }

  handleError(error: any) {
    console.log(error);
  }

  backToHome() {
    this.router.navigateByUrl('/repositories');
  }
}
