import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';

import {  Apollo, ApolloModule } from 'apollo-angular';
import { GraphQLModule } from '../graphql.module';
import { RepositoriesComponent } from '../components/repositories/repositories.component';
import { getAllRepos } from '../queries/queries';
import { RequestService } from './request.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LandingComponent } from '../components/landing/landing.component';
import { FormsModule } from '@angular/forms';

describe('RequestService', () => {
  let repoComponent: RepositoriesComponent;
  let landingComponent: LandingComponent;
  let repositoryFixture: ComponentFixture<RepositoriesComponent>;
  let landingFixture: ComponentFixture<LandingComponent>;
  let controller: ApolloTestingController;
  let service: RequestService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Apollo,
        RequestService,
        HttpClient,       
        ApolloTestingController,
      ],
      imports: [RouterTestingModule,FormsModule, GraphQLModule,HttpClientModule, ApolloModule],
      declarations: [RepositoriesComponent, LandingComponent],
    }).compileComponents();
    controller = TestBed.inject(ApolloTestingController);
  });

  beforeEach(() => {
    repositoryFixture = TestBed.createComponent(RepositoriesComponent);
    repoComponent = repositoryFixture.componentInstance;
    repositoryFixture.detectChanges();
  });
  beforeEach(() => {
    landingFixture = TestBed.createComponent(LandingComponent);
    landingComponent = landingFixture.componentInstance;
    landingFixture.detectChanges();
  });

  it('should call getCurrentUser', () => {
    
    landingComponent.getCurrentUser();
  });
});
