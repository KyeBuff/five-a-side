# Five-a-side React app

Technical challenge set as part of the Coding Fellowship internship recruitment process.

Can be viewed online [here](http://kyebuffery.co.uk/five-a-side).

## Setup

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have NPM installed in order to set the application up.

### Installing

A step by step series of examples that tell you how to install the app for testing purposes.

Clone the git repository and run NPM install.

```
git clone git@github.com:KyeBuff/five-a-side.git
```

```
npm install
```

When all the packages are installed, run the app:

```
npm start
```

## The brief

The exercise is to create a tool which randomly picks 5-a-side football teams from a list of 10 names.

Advanced features might include:
* support for n-a-side, where a list of any length can be split into two teams
* support for balancing of the teams, where some measure of each player's strength is used to allocate teams fairly

## Planning

A features list, wireframes and other supporting documentation were created before developing the app. You can download the files [here](https://www.dropbox.com/s/tbc6b7htveciwr5/planning.zip?dl=0). Please excuse the handwriting.

## How the app was made

I chose to work with JavaScript because it's a technology I really enjoy working with and is also my technology of choice for my internship. I felt that React/Redux suited the brief, given it is based around building a UI. 

### Choices

#### Redux and state

I've found Redux to be the most challenging aspect of the course, but this has made it the most rewarding tech to work with. Complimented with Immutable, I built a Redux state which consisted of 2 key parts, a list of the individual players and a team list, consisting of 2 teams.

You will note that I did not initially include a players list in the planning documentation, as I intended to add each player to a team directly when player details were submitted. This worked initially, using concat on the teams list alongside a sorting function to fake the order of the list of players. However, when approaching the advanced features, I decided it would be easier to have a separate players list to map over when generating teams. This made the reducer easier to understand and to me is more logical.

#### Random assignment of players and team balancing

Two key functions are involved in generating two teams of equal length, using random assignment with team balancing.

The idea is to use a functional approach, where helper functions are pure and return values for the reducer functions to operate with.

**assignTeamID**

This function holds the logic for random assignment of players up to a specified maximum team size (length of players array / 2).

Where possible rng is used to randomly assign a player to a team, but where a team is full, players will be assigned to the opposite team up to the max team size.

```
const assignTeamID = (players) => {

  // Track team size
  let teamOneSize = 0,
  teamTwoSize = 0;

  const maxTeamSize = players.size / 2;

  return players.map(player => {
    const rng = Math.floor(Math.random() * 2) + 1;

    //Random assignment when both teams have < the max team size, else is dependant on team size
    if(teamOneSize < maxTeamSize && teamTwoSize < maxTeamSize) {
      rng === 1 ? teamOneSize += 1 : teamTwoSize += 1;
      return player.set("teamID", rng);
    }

    if(teamOneSize >= maxTeamSize ) {
      teamTwoSize += 1;
      return player.set("teamID", 2);
    } 

    if(teamTwoSize >= maxTeamSize) {
      teamOneSize += 1;
      return player.set("teamID", 1);
    } 

    return player;

  });
}
```

assignTeamID is a helper function to generateTeams.

**generateTeams** 

This is a function that recursively calls itself until the difference between the two team's ratings satisfies a defined tolerance.

The tolerance varies (from 1 - 3) depending on:

* number of players (odd/even)
* total team ratings (odd/even)
* if the rating difference is greater than 2

Helper functions are created to allocate players to a team by teamID and to subsequently calculate that team's rating.

```
const generateTeams = (players) => {

  const playersWithTeamID = assignTeamID(players),

  //Allocate players to team based on assigned teamID
  teamOnePlayers = allocatePlayers(playersWithTeamID, 1),
  teamTwoPlayers = allocatePlayers(playersWithTeamID, 2),

  //Get total team ratings
  teamOneRating = calcTeamRating(teamOnePlayers),
  teamTwoRating = calcTeamRating(teamTwoPlayers),

  // Booleans used to prevent infinite loop on even total rating but odd number of players
  totalRating = teamOneRating + teamTwoRating,
  isTotalRatingEven = !(totalRating % 2),
  isOddNumPlayers = !!(players.size % 2),

  ratingDifference = Math.abs(teamOneRating - teamTwoRating);

  // Tolerance set to 1 if total team ratings are odd and 0 for even to prevent infinite loop 
  // If players are odd and numbers are odd - tolerance should be as high as 3
  //1 Exception is when even total team ratings and odd num players where rating difference will be 2
  let tolerance = 0;

  //if total rating / num players === 3 and players is odd then tol should be 3 
  if(ratingDifference > 2 && isOddNumPlayers) {
    tolerance = 3;
  } else {
    tolerance = isTotalRatingEven && isOddNumPlayers ? 2 : (teamOneRating + teamTwoRating);
  }

  //recursive call until tolerance satisfied
  if(ratingDifference > tolerance) {
    return generateTeams(players);
  }

  return List([
    teamOnePlayers,
    teamTwoPlayers,
  ]);

}
```

generateTeams is a helper function to the reducer setTeams.

#### Git workflow

As the sole contributor to the app, I decided to work directly on the master branch. Whilst I understand the approach of using a development branch and feature branches, I felt that it would be unneccesary in this instance.

Throughout the app's build I used TODO commenting to highlight issues, and again as the only developer, this helped maintain an efficient workflow. In a development team, I would understand the need for issues to be raised and pull requests made.

#### UI choices

##### Modal window

I hadn't created my own modal before, so I decided to create a reusable modal component. This component is something I'm particularly happy with given it's reusability and functionality.

The modal takes 3 require props, onCancel, onProceed and a message.

Action is an optional prop which can be passed into Modal and its functionality invoked. modal.prop - refers to the modal object's properties held in local state.

```
<Modal 
  onCancel={this.hideModal} 
  onProceed={modal.proceedTo}
  message={modal.message}
  action={modal.action}
/>
```

showModal class method accepts parameters to update state and pass to showModal.

In this instance, we are clearing the players list in state when the user goes back to the home page from the team-two route.
```
showModal(proceedTo, message, action) {
  // Action defines a function to pass down to Modal if something shoukd occur when proceeding
  this.setState({
    modal: {
      showModal: true, 
      proceedTo,
      message,
      action
    }
  });
}

this.showModal("/", "You will lose your player data if you return to home. Do you wish to continue?", clearPlayers)
```

##### Player editing

In the wireframe, the intention was to be able to edit player data in the players list. I did not proceed with this approach, as I believe the UI to be simple enough to remove a player and add a new one, given the small number of fields.

##### Team lists - mobile

The wireframe intended to have teams listed again but I felt this was unneccesary and replaced the list with formation layout of players (much like the summary page intended to be).

#### Sass over CSS 

I chose to use the CSS pre-processor Sass as it makes writing CSS a lot more enjoyable for me, and it suits my logical approach.

Where possible I've made my code modular, used variables and tried to follow the DRY principle using placeholders and mixins. 

#### BEM

The majority of the app's class naming is based on BEM, for me this makes the structure of the site's HTML/CSS more clear. I understand that BEM is really useful for large-scale projects, and despite the app not being large, this demonstrates an understanding of these types of methodologies.

### What I would like to change

#### Persisting data

The intention was and still is (when I come back to this app), to persist data so that generated teams could be saved and viewed again if the user wishes. This is why you may see references to persisted data in the planning, or UI components such as the team colour slider which is data I would intend to persist.

#### Footer

The app has a very presentation logic heavy footer navigation, especially in the Team component. My intention would be to make a reusable footer component, accepting props to use with the conditionals.

#### Jest/Unit testing

I would have liked to carry out unit tests on the app prior to the deadline. I am going study unit testing, whilst taking a look at Jest and Jest snapshots for React and UI testing. 

### Testing/Validation
* CSS validator/autoprefixer
* BrowserStack/Quirk Tools and family/friend devices for responsive/device testing
* Google PageSpeed/Lighthouse and DevTools for performance and accessbiility testing

This led to a lot of optimisation, refactoring and bug fixing.