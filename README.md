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

I chose to work with JavaScript because it's a technology that I really enjoy working with and is also my technology of choice for my internship. I felt that React/Redux suited the brief, given it is based around building a UI. 

### Choices

#### Redux and state

I've found Redux to be the most challenging aspect of the course, but this has made it the most rewarding tech to work with. Complimented with Immutable, I built a Redux state which consisted of 2 key parts, a list of the individual players and a team list, consisting of 2 teams.

You will note that I did not initially include a players list in the planning documentation, as I intended to add each player to a team directly when player details were submitted. This worked initially, using concat on the teams list alongside a sorting function to fake the order of the list of players. However, when approaching the advanced features, I decided it would be easier to have a separate players list to map over when generating teams. This made the reducer easier to understand and to me is more logical.

#### Random assignment of players and team balancing

Two key functions are involved in generating two teams of equal length, using random assignment with team balancing.

The idea is to use a functional approach, where helper functions are pure and return values for the reducer functions to operate with.

##### assignTeamID

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

##### generateTeams

This is a function that recursively calls itself until the difference between the two team's ratings satisfies a defined tolerance.

Team rating balancing is attempted 10 times before gracefully falling back to balancing by team size, if generateTeams is unable to produce teams of equal ratings.

The tolerance varies (from 0 - 3) depending on conditions using these stats from generateTeams:

```
  totalRating = teamOneRating + teamTwoRating,
  avgRating = totalRating / players.size,
  isAllSameRating = players.every(player => player.get('rating') === avgRating),
  isTotalRatingEven = !(totalRating % 2),
  isOddNumPlayers = !!(players.size % 2),
```

Helper functions are created to allocate players to a team by teamID and to subsequently calculate that team's rating.

```
let balanceAttempts = 0;

const generateTeams = (players) => {

  const playersWithTeamID = assignTeamID(players),

  //Allocate players to team based on assigned teamID
  teamOnePlayers = allocatePlayers(playersWithTeamID, 1),
  teamTwoPlayers = allocatePlayers(playersWithTeamID, 2),

  //Get total team ratings
  teamOneRating = calcTeamRating(teamOnePlayers),
  teamTwoRating = calcTeamRating(teamTwoPlayers),

  // Stats/booleans used to prevent infinite loops / unbalanced teams
  totalRating = teamOneRating + teamTwoRating,
  avgRating = totalRating / players.size,
  isAllSameRating = players.every(player => player.get('rating') === avgRating),
  isTotalRatingEven = !(totalRating % 2),
  isOddNumPlayers = !!(players.size % 2),

  ratingDifference = Math.abs(teamOneRating - teamTwoRating); 

  let tolerance = isTotalRatingEven && isOddNumPlayers ? 2 : (teamOneRating + teamTwoRating) % 2;

  //Overwrite tolerance
  if(isAllSameRating && isOddNumPlayers) {
    //IF - all players have the same rating and total players size off
    // Tolerance should be set to the avgRating if all players share the same rating
    tolerance = avgRating;
  } else if(!isAllSameRating && isOddNumPlayers && isTotalRatingEven && avgRating <= 2) {
    //ELSE IF - players do not share the same rating, there is odd total players, the total rating is even and the avgRating <= 2

    // We can perfectly balance the teams
    tolerance = 0;
  } 

  //recursive call until tolerance satisfied
  //balanceAttempts forces fall back to team size balancing if tolerance cannot be satisfied
  if(ratingDifference > tolerance && balanceAttempts < 10) {
    balanceAttempts += 1;
    return generateTeams(players);
  }

  return List([
    teamOnePlayers,
    teamTwoPlayers,
  ]);

}
```

###### Testing generateTeams

Testing was conducted by firing the setTeams action in Redux dev tools, comparing the tolerance variable value to the desired/expected tolerance.

I tested this function 121 times with unique tests which consisted of all possible variations of player skill across a total of 3-4 players. At least 10 tests were carried out per variation. Testing was also carried out across player number of 5-10, but not up to all possible variations.

I separated any fails into major and minor fails:

* Major fail - causes a fatal error, app crashes
* Minor fail - no fatal errors but team balancing isn't perfect

**Stats**
Total tests: 121 (* 10)
Major fails: 0 - There were 2 major fails, fallback to balance on team size only prevents this
Minor fails: 8 - includes the 2 fallback fixes

The major fails led to the implementation of the balanceAttempts variable. generateTeams will attempt skill balancing 10 times before falling back to team size balancing, preventing any fatal errors occuring.

I would like to refactor and remove these fails but did not want to risk breaking the app completely on it's due date. This has helped me see the need for testing throughout development, rather than leaving it until the end.

The full test results can be found [here](https://www.dropbox.com/s/1mbxu2snzvy2mc9/balance-tests.numbers?dl=0). 

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

### Testing/Validation/Process
* CSS validator/autoprefixer
* BrowserStack/Quirk Tools and family/friend devices for responsive/device testing
* Google PageSpeed/Lighthouse and DevTools for performance and accessbiility testing
* Gulp tasks set up to watch process Sass, convert to CSS and minify
* Images sized appropriately and compressed

This led to a lot of optimisation, refactoring and bug fixing.