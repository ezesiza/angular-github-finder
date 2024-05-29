import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { LandingComponent } from './components/landing/landing.component';
import { RepoDetailsComponent } from './components/repodetails/repodetails.component';
import { SearchComponent } from './components/search/search.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: "", redirectTo: "", component: LandingComponent, pathMatch: 'full', data: {title: "Landing Page"} },
  { path: "search", component: SearchComponent, pathMatch: 'full' , data: {title: "Search Repos Page"}},
  { path: "user-details/:username", component: UsersComponent, pathMatch: 'full' , data: {title: "Users Repo Detail Page"}},
  { path: 'repositories', component: RepositoriesComponent, pathMatch: 'full' , data: {title: "Repositories Page"}},
  { path: "repositories/:username/:reponame",  component: RepoDetailsComponent, pathMatch: 'full' , data: {title: "Github Issue Explorer"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
