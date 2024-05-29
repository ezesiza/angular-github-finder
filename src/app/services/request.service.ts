import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {
  getAllRepos,
  getCurrentUser,
  getRepoDetails,
  getRepoIssues,
  getUserDetails,
  getUsers,
} from '../queries/queries';

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private apollo: Apollo) {}

  getCurrentUser(inputValue: string) {
    return this.apollo.watchQuery({
      query: getCurrentUser,
      variables: { token: inputValue },
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    });
  }

  getAllReposQuery(nextBatch: number) {
    return this.apollo.watchQuery({
      query: getAllRepos,
      variables: { number: nextBatch },
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    });
  }

  getUsers(query: string) {
    return this.apollo.watchQuery({
      query: getUsers,
      variables: { query },
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    });
  }

  getUserDetails(url: string) {
    return this.apollo.watchQuery({
      query: getUserDetails,
      variables: { url},
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    });
  }

  getRepoIssuesQuery(url: string) {
    return this.apollo.watchQuery({
      query: getRepoIssues,
      variables: { url },
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    });
  }

  getRepoDetailsQuery(url: string) {
    return this.apollo.watchQuery({
      query: getRepoDetails,
      variables: { url },
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    });
  }
}
