import { gql } from 'apollo-angular';
const getRepoList = gql`
  query getUserRepo($username: String!){
    getUserRepo(username: $username) {
      getRepoList {
        id
        node_id
        name
        url
        owner {
          login
        }
        stargazers_count
        created_at
        full_name
        closed_issues
        pulls_url
        open_issues_url
        description
      }
    }
  }
`;
const getAllRepos = gql`
  query getAllRepos( $number: Int!){
    getAllRepos( number: $number) {
        id
        node_id
        name
        url
        stargazers_count
        stargazers_url
        watchers_count
        open_issues_count
        forks_count
        owner {
          login
        }
        stargazers_count
        created_at
        full_name
        closed_issues
        pulls_url
        open_issues_url
        description
    }
  }
`;

const getUserDetails = gql   `
query getUserDetails($url:String!){
  getUserDetails(url:$url){
      user {
              id 
              node_id
              avatar_url 
              gravatar_id 
              url
              html_url 
              followers_url
              following_url
              gists_url 
              starred_url 
              subscriptions_url
              organizations_url 
              repos_url 
              events_url 
              received_events_url
              type
              site_admin
              name 
              company
              blog
              location 
              email 
              hireable 
              bio
              twitter_username
              public_repos
              public_gists
              followers
              following
              created_at
              updated_at 
        }
        repos {
          name
          id
          node_id
          full_name
          description
          html_url
          owner {
            login
            id
            avatar_url
          }
          size
          stargazers_count
          watchers_count
          language
          open_issues
          forks
          watchers
          topics
          visibility
          default_branch
        }
  }
}`

const getUsers = gql`
  query searchUsers( $query: String!){
    searchUsers( query: $query) {
      login
      id
      node_id
      avatar_url
      gravatar_id
      url
      html_url
      followers_url
      following_url
      gists_url
      starred_url
      subscriptions_url
      organizations_url
      repos_url
      events_url
      received_events_url,
      type
      site_admin
      score
    }
  }
`;

const getCurrentUser = gql`
  query getCurrentUser($token: String!) {
    getCurrentUser(token: $token) {
      login
      id
      node_id
      avatar_url
      gravatar_id
      url
      html_url
      followers_url
      following_url
      gists_url
      starred_url
      subscriptions_url
      organizations_url
      repos_url
      events_url
      received_events_url
      type
      site_admin
    }
  }
`;

const getRepoDetails = gql`
  query getRepoDetails($url: String!) {
    getRepoDetails(url: $url) {
      id
      name
      full_name
      private
      language
      html_url
      description
      fork
      url
      issue_events_url
      events_url
      statuses_url
      stargazers_url
      comments_url
      issue_comment_url
      issues_url
      pulls_url
      labels_url
      git_url
      homepage
      stargazers_count
      watchers_count
      has_issues
      forks_count
      mirror_url
      archived
      disabled
      open_issues_count
      license
      forks
      open_issues_url
      closed_issues
      watchers
    }
  }
`;

const getRepoIssues = gql`
  query getRepoIssues($url: String!) {
    getRepoIssues(url: $url) {
      url
      repository_url
      labels_url
      comments_url
      events_url
      html_url
      id
      node_id
      number
      title
      user {
        login
        id
        avatar_url
        url
      }
      labels
      state
      comments
      created_at
      pull_request {
        url
        html_url
        diff_url
      }
      body
    }
  }
`;

export { getRepoList, getCurrentUser, getRepoDetails, getRepoIssues, getAllRepos, getUsers, getUserDetails };
