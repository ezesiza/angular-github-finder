import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { GraphQLModule } from './graphql.module';
import { Apollo } from 'apollo-angular';

describe('AppComponent', () => {
  let controller: ApolloTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Apollo,
        GraphQLModule,
        ApolloTestingModule,
        ApolloTestingController,
      ],
      imports: [RouterTestingModule],
      declarations: [AppComponent, LandingComponent],
    });
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});


