import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloErrorResponse } from 'src/app/models/model';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'repository',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css'],
})
export class RepositoriesComponent implements OnInit {
  errors: ApolloErrorResponse | undefined;
  hasError: boolean = false;
  repositoryList: any[] = [];
  nextBatch: number = 100;
  repoListLoading: boolean = false;
  currentPage: number = 1;

  constructor(private router: Router, public service: RequestService) { }

  ngOnInit(): void {
    this.getPublicRepos(this.nextBatch);
  }


  displayResponse(response: any) {
    if (response.errors && response.netWorkStatus === 8) {
      this.hasError = true;
      return;
    }
    const updatedRepoList = this.sortResponse(response.data.getAllRepos)
    this.repositoryList = updatedRepoList;
  }

  sortResponse(response: any) {
    return response.slice().sort(
      (a: any, b: any) => (parseInt(b.stargazers_count) - parseInt(a.stargazers_count))
    );
  }

  getPublicRepos(nextBatch: number) {
    this.service
      .getAllReposQuery(nextBatch)
      .valueChanges.subscribe((response: any) => {
        if (response.data.getAllRepos == null && response.netWorkStatus === 8) {
          this.hasError = true;
          this.errors = response.errors?.[0];
          return;
        }
        this.repoListLoading = true;
        this.displayResponse(response);
      });
  }

  getNextBatch(event: number) {
    this.service
      .getAllReposQuery(event)
      .valueChanges.subscribe((response: any) => {
        this.repoListLoading = true;
        this.displayResponse(response);
      });
  }

  getIssuesRepo(url: string) {
    const repoInfo = new URL(url).pathname.split('/').filter(Boolean);
    this.router.navigateByUrl(`repositories/${repoInfo[1]}/${repoInfo[2]}`);
  }

  handleError(error: any) {
    console.log(error);
  }

  backToHome() {
    this.router.navigateByUrl('/');
  }
  searchUsers() {
    this.router.navigateByUrl('/search')
  }
}
