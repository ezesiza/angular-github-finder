import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  public inputValue = new FormControl('');
  validationError: string = '';
  hasUser: boolean = true;

  constructor(public router: Router, private service: RequestService) { }

  onTokenSubmit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.service
      .getCurrentUser(String(this.inputValue.value))
      .valueChanges.subscribe((response: any) => {
        if (response.data.getCurrentUser == null) {
          this.hasUser = false;
          this.handleErrors();
          return;
        } else {
          this.hasUser = true;
          this.router.navigateByUrl(`/repositories`);
        }
      });
  }

  handleErrors() {
    this.validationError = `<p>The Token you provided is invalid.
    Please follow the instructions to generate a new Token: Link to Github documentation
    <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token">
    link to docs</a></p>`;
  }
}
