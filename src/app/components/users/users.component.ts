import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
    selector: 'repo-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    @Input() username: string = '';
    @Input() reponame: string = '';
    repoIssueError: string = '';
    usersUrl: string = '';
    hasError: boolean = false;
    userDetails: any = {};
    userRepos: any[] = [];
    currentPage: number = 1;
    userDetailsLoading: boolean = false;
    constructor(private service: RequestService, private router: Router, private location: Location, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe((item: any) => {
            this.username = item['username'];
            const usersUrl = `https://api.github.com/users/${this.username}`;
            this.getUserDetails(usersUrl);
        });
    }

    getUserDetails(url: any) {
        this.service.getUserDetails(url)
            .valueChanges.subscribe((response: any) => {
                this.userDetailsLoading = true;
                this.userDetails = response.data.getUserDetails.user;
                this.userRepos = response.data.getUserDetails.repos;
                if (response.errors && response.netWorkStatus === 8) {
                    this.hasError = true;
                    this.handleErrors();
                }
            });
    }

    navigageUserDetails(url: string) {
        const repoInfo = new URL(url).pathname.split('/').filter(Boolean);
        console.log(repoInfo);
        this.router.navigateByUrl(`repositories/${repoInfo[0]}/${repoInfo[1]}`);
    }

    getNextBatch(event: number) {
        this.service
          .getAllReposQuery(event)
          .valueChanges.subscribe((response: any) => {
            this.userDetailsLoading = true;
            this.userRepos = response.data.getUserDetails.repos;
          });
      }

    backToHome() {
        this.router.navigateByUrl('/search');
    }

    backToPrevious() {
        this.location.back();
    }

    handleErrors() {
        this.repoIssueError = `Something went wrong :)`;
    }
}
