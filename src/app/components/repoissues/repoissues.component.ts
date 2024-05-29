import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'repo-issues',
  templateUrl: './repoissues.component.html',
  styleUrls: ['./repoissues.component.css'],
})
export class RepoIssuesComponent implements OnInit {
  @Input() username: string = '';
  @Input() reponame: string = '';
  repoIssueError: string = '';
  issuesUrl: string = '';
  hasError: boolean = false;
  repoIssuesList: any[] = [];
  currentPage: number = 1;
  repoIssuesListLoading: boolean = false;
  constructor(private service: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.issuesUrl = `https://api.github.com/repos/${this.username}/${this.reponame}/issues`;
    this.getRepoIssues();
  }

  getRepoIssues() {
    this.service.getRepoIssuesQuery(this.issuesUrl)
      .valueChanges.subscribe((response: any) => {
        this.repoIssuesListLoading = true;
        this.repoIssuesList = response.data.getRepoIssues.slice().sort(
          (a: any, b: any) => b.created_at.localeCompare(a.created_at)
        );
        if (response.errors && response.netWorkStatus === 8) {
          this.hasError = true;
          this.handleErrors();
        }
      });
  }

  getUserDetails(url: string) {
    const repoInfo = new URL(url).pathname.split('/').filter(Boolean);
    this.router.navigateByUrl(`user-details/${repoInfo[1]}`);
  }

  handleErrors() {
    this.repoIssueError = `Something went wrong :)`;
  }
}
