// front end
// spreadsheet pasted info

// both
// list of teams
// pool options
// pools

// CLASS (front end) - crtsvArray: carriage return & tab separated values
function TeamList(crtsvArray) {
  this.isTeamCode = function (String val) {
    return val.matches("^[A-Za-z0-9]{11}$");
  }
  var rows = crtsvArray.split('\n');
  // analyze data to determine format of input data
  // looking for club, friendlyName, code, points
  var clubCol = -1,
      friendlyNameCol = -1,
      codeCol = -1,
      pointsCol = -1;
  // ignore first 2 rows during analysis as headers
  var testrowcols = rows[2].split('\t');

  // look for column with only numbers
  // @@@ TODO: Handle array with index in first column
  for (i = 0; i < rows[2].length; i++) {
    if (!isNaN(testrowcols[i])) {
      // @@@ TODO: See if all values in this column are numbers (in an efficient way)
      pointsCol = i;
    }
  }

  // look for column with likely code
  // @@@ TODO: Ignore points column
  for (i = 0; i < rows[2].length; i++) {
    if (!isTeamCode(testrowcols[i])) {
      codeCol = i;
    }
  }
}

// CLASS
function MatchRendezvous(venue, court, date, time) {
  this.venue = venue;
  this.court = court;
  this.date = date;
  this.time = time;
}

// CLASS
function PoolOptions(options) {
  this.name = options.name | '';
  this.date = options.date | '';
  this.rendezvous = [];
  this.numPools = 0;            // 0=default (num teams / teamsPerPool)
  this.teamsPerPool = 4;
  this.numPowerPools = 0;       // 0=default (see rules)
  this.teamsPerPowerPool = 0;   // 0=default (see rules)
  this.numGoldTeamsPerPool = 0; // 0=default (2 w/o power pools, 1 with)
  this.numSilverTeamsPerPool = 1;
  this.numBronzeTeamsPerPool = 1;
  this.numFlightTeamsPerPool = 0;
  this.avoidClubCollision = false;
}