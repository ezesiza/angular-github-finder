import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { LandingComponent } from './components/landing/landing.component';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { RepoDetailsComponent } from './components/repodetails/repodetails.component';
import { RepoIssuesComponent } from './components/repoissues/repoissues.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardComponent } from './utils/card/card.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UsersComponent,
    LandingComponent,
    RepoDetailsComponent,
    RepositoriesComponent,
    RepoIssuesComponent,
    PaginationComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
