import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'repo-details',
  templateUrl: './repodetails.component.html',
  styleUrls: ['./repodetails.component.css'],
})
export class RepoDetailsComponent implements OnInit {
  username: string = '';
  reponame: string = '';
  repoDetailsError: string = '';
  hasError: boolean = false;
  detailsUrl: string = '';
  repoDetails: any = {};
  repoDetailsLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((item) => {
      this.reponame = item['reponame'];
      this.username = item['username'];
      this.detailsUrl = `https://api.github.com/repos/${this.username}/${this.reponame}`;
      this.getRepoDetails();
    });
  }

  getRepoDetails() {
    this.service
      .getRepoDetailsQuery(this.detailsUrl)
      .valueChanges.subscribe((response: any) => {
        if (response.errors && response.netWorkStatus === 8) {
          this.hasError = true;
          this.handleErrors();
          return;
        }
        this.repoDetailsLoading = true;
        this.repoDetails = response.data.getRepoDetails;
      });
  }

  getUserDetails(url: string) {
    const repoInfo = new URL(url).pathname.split('/').filter(Boolean);
    this.router.navigateByUrl(`user-details/${repoInfo[1]}`);
  }

  backToHome() {
    this.router.navigateByUrl(`/repositories`);
  }
  
  backToPrevious(){
    this.location.back();
  }


  handleErrors() {
    this.repoDetailsError = `Something went wrong :)`;
  }
}
