// var scriptlocation = location.href.replace(document.location.pathname, '');
// console.log("XXX file location:", scriptlocation);

teams = [];

function CopyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function CreateArray(dimargs) {
  var arr = new Array(dimargs || 0),
      i = dimargs;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--)
      arr[i] = CreateArray.apply(this, args);
  }        
  return arr;
}

function DumpPools(pools) {
  for (var poolNum = 0; poolNum < pools.length; poolNum++) {
    console.log("\n   " + pools[poolNum].name);
    console.log("   " + pools[poolNum].location);
    console.log("   " + pools[poolNum].time);
    console.log("----------------------");
    for (var seedNum = 0; seedNum < pools[poolNum].length; seedNum++) {
      var teamInfo = pools[poolNum][seedNum];
      if (teamInfo) {
        console.log(`${teamInfo.friendlyName} (${teamInfo.code})`);
      }
    }
  }
}

function SeedToPoolSpot(options, overallSeedMinus1) {
//console.log(`SeedToPoolSpot(, ${overallSeedMinus1}) entry.`);
//if (overallSeedMinus1 < 0)
//  throw new Error();
  var poolSpot = {};
  var powerPoolTeams = options.powerPools * options.teamsPerPowerPool;
  if (overallSeedMinus1 < powerPoolTeams) {
    var powerPoolOptions = {
      totalPools: options.powerPools,
      powerPools: 0,
      teamsPerPowerPool: 3,
      teamsPerPool: options.teamsPerPowerPool,
    };
    poolSpot = SeedToPoolSpot(powerPoolOptions, overallSeedMinus1);
  } else {
    var actualSeedMinus1 = overallSeedMinus1 - powerPoolTeams;
    var nonPowerTeamPools = options.totalPools - options.powerPools;
    var poolSeedMinus1 = Math.floor(actualSeedMinus1 / nonPowerTeamPools);
    var poolMinus1 = Math.abs((actualSeedMinus1 % nonPowerTeamPools) -
                    ((poolSeedMinus1 % 2) * (nonPowerTeamPools - 1)));
    poolSpot = { poolNum: poolMinus1 + options.powerPools, seed: poolSeedMinus1 };
  }
//console.log(`SeedToPoolSpot() exit = { poolNum: ${poolSpot.poolNum}, seed: ${poolSpot.seed}}`);
  return poolSpot;
}

function PoolSpotToSeed(options, poolSpot) {
  if (options.powerPools) {
    if (poolSpot.poolNum < options.powerPools) {
      var powerPoolOptions = {
        totalPools: options.powerPools,
        powerPools: 0,
        teamsPerPool: options.teamsPerPowerPool,
      };
      return PoolSpotToSeed(powerPoolOptions, poolSpot);
    }
  }
  var seed = poolSpot.seed * options.totalPools;
  if (poolSpot.seed % 2)
    seed += options.totalPools + options.powerPools - 1 - poolSpot.poolNum;
  else
    seed += poolSpot.poolNum + options.powerPools;
  return seed;
}

function SameClubInPool(pool, team) {
//console.log("SameClubInPool(, ) entry.");
//console.log(pool);
//console.log(team);
  var checkSeed = 0;
  while (checkSeed < pool.length) {
    var checkTeam = pool[checkSeed];
    if (!checkTeam)
      break;
    // NOTE WELL: Avoid comparing to itself
    if ((team !== checkTeam) && (checkTeam.club === team.club))
      return true;
    checkSeed++;
  }
  return false;
}

function FindSwapSpot(pool, seedIdx, numSeeds, team, pools, options) {
//console.log(`FindSwapSpot(, ${seedIdx}, ${numSeeds}, , , ) entry.`);
  var jumpDistance = 1;
  var reachedStart = false;
  var reachedEnd = false;
  while (!reachedStart && !reachedEnd) {
    var checkIdx = seedIdx + jumpDistance;
    if (checkIdx < 0) {
      reachedStart = true;
      jumpDistance = 1 - jumpDistance;
      continue;
    } else if (checkIdx >= numSeeds) {
      reachedEnd = true;
      jumpDistance = -jumpDistance;
      continue;
    }
    var checkSpot = SeedToPoolSpot(options, checkIdx);
    if (!SameClubInPool(pools[checkSpot.poolNum], team) &&
        !SameClubInPool(pool, pools[checkSpot.poolNum][checkSpot.seed])) {
      return checkSpot;
    }
    if (jumpDistance > 0)
      jumpDistance = -jumpDistance;
    else
      jumpDistance = 1 - jumpDistance;
  }
  return null;
}
  
function SeparateClubTeams(options, numTeams, pools) {
//console.log(`SeparateClubTeams(, ${numTeams}, ) entry.`);
  for (var seed = numTeams - 1; seed >= 0; -- seed) {
    var poolSpot = SeedToPoolSpot(options, seed);
    var team = pools[poolSpot.poolNum][poolSpot.seed];
    if (SameClubInPool(pools[poolSpot.poolNum], team)) {
//console.log(`SeparateClubTeams(): In pool ${poolSpot.poolNum}, seed ${poolSpot.seed} is repeated club (${team.club})`);
      var swapSpot = FindSwapSpot(pools[poolSpot.poolNum], seed, numTeams, team, pools, options);
      if (swapSpot) {
        var swapTeam = pools[swapSpot.poolNum][swapSpot.seed];
        pools[swapSpot.poolNum][swapSpot.seed] = pools[poolSpot.poolNum][poolSpot.seed];
        pools[poolSpot.poolNum][poolSpot.seed] = swapTeam;
//console.log("\nSWAPPED");
//DumpPools(pools);
      }
    }
  }
}

function TeamListToPools(teamList, options) {
  var pools = CreateArray(options.totalPools,
                          Math.max(options.teamsPerPool, options.teamsPerPowerPool));
  var lat = 0;
  // Set up pool names, times, and locations
  for (var poolNum = 0; poolNum < pools.length; poolNum++) {
    if (poolNum < options.powerPools)
      pools[poolNum].name = `Power Pool ${String.fromCharCode('A'.charCodeAt(0) + poolNum)}`;
    else
      pools[poolNum].name = `Pool ${poolNum + 1 - options.powerPools}`;
    var locationAndTime = options.locationsAndTimes[lat++];
    pools[poolNum].location = locationAndTime.location;
    pools[poolNum].time = locationAndTime.time;
  }
  // Seed teams into pools
  for (var teamIdx = 0; teamIdx < teamList.length; teamIdx++) {
    var poolSpot = SeedToPoolSpot(options, teamIdx);
    pools[poolSpot.poolNum][poolSpot.seed] = teamList[teamIdx];
  }
  if (options.avoidSameClub)
    SeparateClubTeams(options, teamList.length, pools);
  return pools;
}

defaultOptions = {
  name: 'UNKNOWN',
  date: 'UNKNOWN',
  locationsAndTimes: [],
  totalPools: Math.floor((teams.length + 3) / 4),
  powerPools: 0,
  teamsPerPowerPool: 4,
  teamsPerPool: 4,
  goldTeamsPerPool: 2,
  silverTeamsPerPool: 1,
  bronzeTeamsPerPool: 1,
  avoidSameClub: false,
};

// Test SeedToPoolSpot() vs PoolSpottoSeed()
/*
var testOptions = CopyObj(defaultOptions);
testOptions.totalPools = 12;
testOptions.teams = testOptions.totalPools * testOptions.teamsPerPool;
for (var seed = 0; seed < testOptions.teams; seed++) {
  var poolSpot = SeedToPoolSpot(testOptions, seed);
  var testSeed = PoolSpotToSeed(testOptions, poolSpot);
  if (testSeed !== seed)
    throw new Error(`seed: ${seed}, poolSpot: { poolNum: ${poolSpot.poolNum}, seed: ${poolSpot.seed}} testSeed: ${testSeed}`);
}
*/

// TODO: If powerPools = "default" or true, replace with number based on NTR rules (URL?)

// Make copy of defaultOptions as options
options = CopyObj(defaultOptions);

// Override from tournament
// options.groupName = "NTR Bid Regional 14 Open";
// options.date = "May 5, 2018";
// options.locationsAndTimes = [
//   { location: "Courtside Court 1", time: "9:00 AM" },
//   { location: "Courtside Court 1", time: "2:00 AM" },
//   { location: "Courtside Court 2", time: "9:00 AM" },
//   { location: "Courtside Court 2", time: "2:00 AM" },
//   { location: "Courtside Court 3", time: "9:00 AM" },
//   { location: "Courtside Court 3", time: "2:00 AM" },
//   { location: "Courtside Court 4", time: "9:00 AM" },
//   { location: "Courtside Court 4", time: "2:00 AM" },
//   { location: "Courtside Court 5", time: "9:00 AM" },
//   { location: "Courtside Court 5", time: "2:00 AM" },
//   { location: "Courtside Court 6", time: "9:00 AM" },
//   { location: "Courtside Court 6", time: "2:00 AM" },
// ];
// options.totalPools = 12;
// options.powerPools = 2;
// options.avoidSameClub = true;

function PageHeader(res) {
  res.write("<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'>\n");
  res.write("<html lang='en'>\n");
  res.write("<meta http-equiv='Content-Language' content='en'></meta>\n");
  res.write("<head>\n");
  res.write("<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>\n");
  res.write("<link rel='stylesheet' type='text/css' href='sched-classic.css'>\n");
  res.write("</head>\n");
}

function PageFooter(res) {
  res.end("</html>");
}

function PoolPage(res, pools) {

const name = options.groupName;
const date = options.date;

  PageHeader(res);
  res.write("<body>\n");

  res.write("<div class='tablecontainer'>\n");

  const columns = 3;
  res.write("  <table class='pooltable'><tbody>\n");
  res.write(`    <tr><td colspan='${columns}' class='name'>${name}</td></tr>\n`);
  res.write(`    <tr><td colspan='${columns}' class='date'>${date}</td></tr>\n`);

  for (var poolBase = 0; poolBase < pools.length; poolBase += columns) {
    res.write("    <tr>\n");
    for (var rowPool = 0; rowPool < columns; rowPool++) {
      res.write("      <td class='pool'>\n");
      var poolNum = poolBase + rowPool;
      if (poolNum < pools.length) {
        res.write(`    <div class='poolheading'>${pools[poolNum].name}</div>\n`);
        res.write(`    <div class='court'>${pools[poolNum].location}</div>\n`);
        res.write(`    <div class='time'>${pools[poolNum].time}</div>\n`);
        res.write("    <hr>\n");
        for (var seedNum = 0; seedNum < pools[poolNum].length; seedNum++) {
          var team = pools[poolNum][seedNum];
          if (team)
            res.write(`    <div>${team.friendlyName}</div>\n`);
          else
            res.write(`    <div>&nbsp;</div>\n`);
        }
      }
      res.write("      </td>\n");
    }
    res.write("    </tr>\n");
  }
  res.write("  </tbody></table>\n");

  res.write("</div>\n");

  res.end("</body>\n");
  PageFooter(res);
}

const http = require('http');
const fs = require('fs');

/* https://stackoverflow.com/a/28838314 */
var server = http.createServer(
  function (req, res) {
console.log(`req.url: ${req.url}\n`);
    if (req.method == 'POST') {
console.log("POST");
var body = '';
req.on('data', function (data) {
  body += data;
});
req.on('end', function (data) {
teams = JSON.parse(body).teams;
//for (var i = 0; i < teams.length; i++) {
//  console.log(`${teams[i].friendlyName}`);
//}

options.groupName = JSON.parse(body).name;

var language = JSON.parse(body).language;
var dateFormat = JSON.parse(body).dateFormat;
var rawdate = JSON.parse(body).date;
var dateparts = rawdate.split('-');
var dateobj = new Date(dateparts[0], dateparts[1] - 1, dateparts[2]);
options.date = dateobj.toLocaleDateString(language, dateFormat);
// console.log("*** language:", language);
// console.log("*** dateFormat:", dateFormat);
// console.log("*** rawdate:", rawdate);
// console.log("*** dateobj:", dateobj);
// console.log("*** options.date:", options.date);

options.teamsPerPool = JSON.parse(body).teamsPerPool * 1;

options.totalPools = (JSON.parse(body).numPools * 1) | Math.ceil(teams.length / options.teamsPerPool);

options.powerPools = (JSON.parse(body).numPowerPools * 1);

options.teamsPerPowerPool = (JSON.parse(body).teamsPerPowerPool * 1);

options.avoidSameClub = JSON.parse(body).avoidClub;

options.locationsAndTimes = JSON.parse(body).locationsAndTimes;

//console.log(JSON.parse(body));
pools = TeamListToPools(teams, options);
});
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('post received');
    } else {
console.log("GET");
      if (req.url === "/index.html") {
        pools = TeamListToPools(teams, options);

        //DumpPools(pools);
        //console.log(pools);
        
        PoolPage(res, pools);
      } else {
        fs.readFile('./' + req.url, function(err, data) {
          if (!err) {
            var dotoffset = req.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                          ? 'text/plain'
                          : {
                            '.html' : 'text/html',
                            '.ico' : 'image/x-icon',
                            '.jpg' : 'image/jpeg',
                            '.png' : 'image/png',
                            '.gif' : 'image/gif',
                            '.css' : 'text/css',
                            '.js' : 'text/javascript'
                          }[ req.url.substr(dotoffset) ];
            res.setHeader('Content-type' , mimetype);
            res.end(data);
//console.log( req.url, mimetype );
          } else {
            console.log ('file not found: ' + req.url);
            res.writeHead(404, "Not Found");
            res.end();
          }
        });
      }
    }
  });

/*
const server = http.createServer((req, res) => {
  PoolPage(res, pools);
});


const server = http.createServer((req, res) => {
  res.end('Hello World\n');
});
*/

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running (port: ${port})...`);
});
