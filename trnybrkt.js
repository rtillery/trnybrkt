teams = [
/*
  { friendlyName: "EXCEL 14 National Red" },
  { friendlyName: "Skyline 14 Royal" },
  { friendlyName: "Arete 14 Navy Telos" },
  { friendlyName: "Arsenal 14 Gold" },
  { friendlyName: "Madfrog 14N Black" },
  { friendlyName: "Summit 14 Nike Blue" },
  { friendlyName: "Flyers 14 Rox-Shawn" },
  { friendlyName: "Instinct14Leopards WildG" },
  { friendlyName: "EXCEL 14 National White" },
  { friendlyName: "TAV 14 Blue" },
  { friendlyName: "360 FW 14 Kaos Black" },
  { friendlyName: "ACE 14 UA" },
  { friendlyName: "Image 14 Miz Gary" },
  { friendlyName: "TXP 14 Red" },
  { friendlyName: "Image 14Black" },
  { friendlyName: "Tejas 14 Adidas Blk" },
  { friendlyName: "Premier 14 Black" },
  { friendlyName: "Skyline 14 Black" },
  { friendlyName: "Extreme 14 Black" },
  { friendlyName: "Flyers 14 Rox-Amy" },
  { friendlyName: "Integrity 14 Intense" },
  { friendlyName: "Attack 14 Royal" },
  { friendlyName: "RISE HEAT 14 - Ignite" },
  { friendlyName: "ACE 14 National" },
  { friendlyName: "Tx Assault 14 Black" },
  { friendlyName: "No Limits 14.1" },
  { friendlyName: "Arete 14 Steel" },
  { friendlyName: "Knights 14 Adidas Maroon" },
  { friendlyName: "Arete 14 Navy" },
  { friendlyName: "Titans 14 Nat" },
  { friendlyName: "Blocksport 14 National" },
  { friendlyName: "Knights 14 Adidas Black" },
  { friendlyName: "VICTORY 14 Elite Green" },
  { friendlyName: "Tejas 14 Adidas Red" },
  { friendlyName: "Flyers 14 Rox-David" },
  { friendlyName: "Integrity 14 Select Blue" },
  { friendlyName: "AAA14 Lightning" },
  { friendlyName: "SVA 14.1 National" },
  { friendlyName: "EXCEL 14 National Blue" },
  { friendlyName: "SLAM 14 Purple Adidas" },
  { friendlyName: "Dallas Jrs 14 Black" },
  { friendlyName: "Attack 14 White" },
  { friendlyName: "Knights 14 Adidas White" },
*/

  { club: 'Texas Image', team: '14 Mizuno Zack', friendlyName: 'Image 14 Miz Zack', code: 'FJ4TXIMG1NT', points: 93.476 },
  { club: 'Excel Volleyball', team: '14 National Red', friendlyName: 'EXCEL 14 National Red', code: 'FJ4EXCEL1NT', points: 93.302 },
  { club: 'Dallas Arsenal VBC', team: '14 Gold', friendlyName: 'Arsenal 14 Gold', code: 'FJ4DAVBC1NT', points: 91.343 },
  { club: 'Summit Volleyball', team: '14 Nike Blue', friendlyName: 'Summit 14 Nike Blue', code: 'FJ4DSUMM1NT', points: 86.666 },
  { club: '360 Volleyball Club ', team: 'FW 14 Kaos Black', friendlyName: '360 FW 14 Kaos Black', code: 'FJ4SIXTY1NT', points: 85.889 },
  { club: 'Instinct VBC', team: '14 Leopards Wild Gold ', friendlyName: 'Instinct14Leopards WildG', code: 'FJ4INSTN1NT', points: 85.141 },
  { club: 'Texas Image', team: '14 Mizuno Gary', friendlyName: 'Image 14 Miz Gary', code: 'FJ4TXIMG2NT', points: 82.869 },
  { club: 'VICTORY VBC', team: '14 Elite Black', friendlyName: 'VICTORY 14 Elite Black', code: 'FJ4VCTRY1NT', points: 81.35 },
  { club: 'Texas Image', team: '14 Elite Black', friendlyName: 'Image 14Black', code: 'FJ4TXIMG4NT', points: 81.114 },
  { club: 'Texas Pistols ', team: '14 Red', friendlyName: 'TXP 14 Red', code: 'FJ4TXPST2NT', points: 80.41 },
  { club: 'Drive Nation Volleyball Club ', team: 'DNVBC 14 Red', friendlyName: 'Drive Nation VBC 14 Red', code: 'FJ4DRIVE1NT', points: 79.741 },
  { club: 'Frisco Flyers Volleyball Club', team: '14 Rox-Gi', friendlyName: 'Flyers 14 Rox-Gi', code: 'FJ4FRFLY2NT', points: 79.673 },
  { club: 'Skyline Juniors', team: '14 Black', friendlyName: 'Skyline 14 Black', code: 'FJ4SKYLN2NT', points: 78.931 },
  { club: 'Dallas Premier ', team: '14 Black', friendlyName: 'Premier 14 Black', code: 'FJ4PREMR1NT', points: 78.176 },
  { club: 'Integrity Volleyball Club', team: '14 Intense', friendlyName: 'Integrity 14 Intense', code: 'FJ4INTEG1NT', points: 77.737 },
  { club: 'Rise Heat Volleyball Club', team: '14 - Ignite', friendlyName: 'RISE HEAT 14 - Ignite', code: 'FJ4RISEH1NT', points: 76.75 },
  { club: 'Frisco Flyers Volleyball Club', team: '14 Rox-Amy', friendlyName: 'Flyers 14 Rox-Amy', code: 'FJ4FRFLY3NT', points: 75.374 },
  { club: 'Attack Volleyball Club', team: '14 Royal', friendlyName: 'Attack 14 Royal', code: 'FJ4ATTCK2NT', points: 75.091 },
  { club: 'Arete Athletics', team: 'Arete Athletics 14 Navy', friendlyName: 'Arete 14 Navy', code: 'FJ4ARETE2NT', points: 74.43 },
  { club: 'NW Extreme VBC', team: 'Extreme 14 Black ', friendlyName: 'Extreme 14 Black', code: 'FJ4NWEVB1NT', points: 74.384 },
  { club: 'Texas Assault', team: '14 Black', friendlyName: 'Tx Assault 14 Black', code: 'FJ4TXALT1NT', points: 70.736 },
  { club: 'ACE Volleyball ', team: 'ACE 14 National ', friendlyName: 'ACE 14 National', code: 'FJ4ACEVB2NT', points: 70.665 },
  { club: 'Texas Titans VBC', team: 'U14 National', friendlyName: 'Titans 14 Nat', code: 'FJ4TEXTI1NT', points: 70.526 },
  { club: 'Skyline Juniors', team: '14 Molten Royal', friendlyName: 'Skyline 14 Molten Royal', code: 'FJ4SKYLN3NT', points: 70.012 },
  { club: 'Arete Athletics', team: 'Arete Athletics 14 Steel', friendlyName: 'Arete 14 Steel', code: 'FJ4ARETE3NT', points: 69.51 },
  { club: 'Dallas Arsenal VBC', team: '14 Blue', friendlyName: 'Arsenal 14 Blue', code: 'FJ4DAVBC2NT', points: 68.781 },
  { club: 'No Limits VBC', team: '14.1', friendlyName: 'No Limits 14.1', code: 'FJ4NLVBC1NT', points: 68.198 },
  { club: 'Blocksport Volleyball Club', team: '14 National ', friendlyName: 'Blocksport 14 National', code: 'FJ4BLOCK1NT', points: 68.058 },
  { club: 'Knights Volleyball Academy', team: 'Knights 14 Adidas Black', friendlyName: 'Knights 14 Adidas Black', code: 'FJ4KNIVA1NT', points: 67.646 },
  { club: 'Skyline Juniors', team: '14 Molten Black', friendlyName: 'Skyline 14 Molten Black', code: 'FJ4SKYLN4NT', points: 66.416 },
  { club: 'CCSA/Elevate VBC', team: '14 National', friendlyName: 'Elevate 14 National', code: 'FJ4COTTN1NT', points: 66.057 },
  { club: 'Texas Image', team: '14 National', friendlyName: 'Image 14 Nat', code: 'FJ4TXIMG3NT', points: 65.937 },
  { club: 'Knights Volleyball Academy', team: 'Knights 14 Adidas Maroon', friendlyName: 'Knights 14 Adidas Maroon', code: 'FJ4KNIVA3NT', points: 65.828 },
  { club: 'Texas Advantage', team: '14 Molten', friendlyName: 'TAV 14 Molten', code: 'FJ4TXADV3NT', points: 64.793 },
  { club: 'Madfrog ', team: '14\'S ELITE GOLD', friendlyName: 'Madfrog 14E Gold', code: 'FJ4FROGS3NT', points: 64.461 },
  { club: '360 Volleyball Club ', team: 'FW 14.1', friendlyName: '360 FW 14.1', code: 'FJ4SIXTY3NT', points: 64.264 },
  { club: 'Zone-In Volleyball Academy', team: '14 National', friendlyName: 'ZIVA 14 National', code: 'FJ4ZIVAV1NT', points: 62.805 },
  { club: 'Frisco Flyers Volleyball Club', team: '14N-Sibrena', friendlyName: 'Flyers 14N-Sibrena', code: 'FJ4FRFLY5NT', points: 60.545 },
  { club: 'North Point VBC', team: '14 National', friendlyName: 'North Point 14 National', code: 'FJ4NORPT1NT', points: 59.879 },
  { club: 'CCSA/Elevate VBC', team: '14 American ', friendlyName: 'Elevate 14 American', code: 'FJ4COTTN2NT', points: 59.248 },
  { club: 'Arete Athletics', team: 'Arete Athletics 14 Jade', friendlyName: 'Arete 14 Jade', code: 'FJ4ARETE4NT', points: 58.258 },
  { club: 'AAA Volleyball Club', team: '14 Lightning', friendlyName: 'AAA14 Lightning', code: 'FJ4AAAVB1NT', points: 57.535 },
  { club: 'Summit Volleyball', team: '14 Nike Red', friendlyName: 'Summit 14 NIke Red', code: 'FJ4DSUMM2NT', points: 55.419 },
  { club: 'Madfrog ', team: '14\'S ELITE BLACK', friendlyName: 'Madfrog 14E Black', code: 'FJ4FROGS4NT', points: 54.548 },
  { club: 'Knights Volleyball Academy', team: 'Knights 14 Adidas White', friendlyName: 'Knights 14 Adidas White', code: 'FJ4KNIVA2NT', points: 53.228 },
  { club: 'LoneStar Volleyball Club', team: 'LoneStar 14 Gunter', friendlyName: 'LoneStar 14 Gunter', code: 'FJ4LSTAR5NT', points: 48.759 },
/*
  { club: 'A', team: '1', friendlyName: 'A1', code: 'FOOBARA1', points: 90.0 },
  { club: 'B', team: '1', friendlyName: 'B1', code: 'FOOBARB1', points: 85.0 },
  { club: 'A', team: '2', friendlyName: 'A2', code: 'FOOBARA2', points: 80.0 },
  { club: 'C', team: '1', friendlyName: 'C1', code: 'FOOBARC1', points: 75.0 },
  { club: 'A', team: '3', friendlyName: 'A3', code: 'FOOBARA3', points: 70.0 },
  { club: 'B', team: '2', friendlyName: 'B2', code: 'FOOBARB2', points: 65.0 },
  { club: 'D', team: '1', friendlyName: 'D1', code: 'FOOBARD1', points: 60.0 },
  { club: 'E', team: '1', friendlyName: 'E1', code: 'FOOBARE1', points: 55.0 },
  { club: 'A', team: '4', friendlyName: 'A4', code: 'FOOBARA4', points: 50.0 },
  { club: 'C', team: '2', friendlyName: 'C2', code: 'FOOBARC2', points: 45.0 },
  { club: 'B', team: '3', friendlyName: 'B3', code: 'FOOBARB3', points: 40.0 },
  { club: 'D', team: '2', friendlyName: 'D2', code: 'FOOBARD2', points: 35.0 },
  { club: 'E', team: '1', friendlyName: 'E1', code: 'FOOBARE1', points: 30.0 },
  { club: 'A', team: '5', friendlyName: 'A5', code: 'FOOBARA5', points: 25.0 },
  { club: 'B', team: '4', friendlyName: 'B4', code: 'FOOBARB4', points: 20.0 },
  { club: 'D', team: '3', friendlyName: 'D3', code: 'FOOBARD3', points: 15.0 },
*/
];

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
  var powerPoolTeams = options.powerPools * options.teamsPerPool;
  if (overallSeedMinus1 < powerPoolTeams) {
    var powerPoolOptions = {
      totalPools: options.powerPools,
      powerPools: 0,
      teamsPerPool: options.teamsPerPool,
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
        teamsPerPool: options.teamsPerPool,
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
  var pools = CreateArray(options.totalPools, options.teamsPerPool);
for (var poolNum = 0; poolNum < pools.length; poolNum++) {
  pools[poolNum].name = `Pool ${poolNum + 1}`;
  pools[poolNum].location = options.locations[Math.floor(poolNum / options.times.length) % options.locations.length];
  pools[poolNum].time = options.times[poolNum % options.times.length];
}
  for (var teamIdx = 0; teamIdx < teamList.length; teamIdx++) {
    var poolSpot = SeedToPoolSpot(options, teamIdx);
    pools[poolSpot.poolNum][poolSpot.seed] = teamList[teamIdx];
  }
  if (options.avoidSameClub)
    SeparateClubTeams(options, teamList.length, pools);
  return pools;
}

defaultOptions = {
  groupName: 'UNKNOWN',
  date: 'UNKNOWN',
  locations: [],
  times: [],
  totalPools: Math.floor((teams.length + 3) / 4),
  powerPools: 0,
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
options.groupName = "NTR Bid Regional 14 Open";
options.date = "May 5, 2018";
options.locations = [
  "Courtside Court 1",
  "Courtside Court 2",
  "Courtside Court 3",
  "Courtside Court 4",
  "Courtside Court 5",
  "Courtside Court 6",
];
options.times = [
  "8:00 AM",
  "3:00 PM",
];
//options.totalPools = 12;
//options.powerPools = 2;
//options.avoidSameClub = true;

pools = TeamListToPools(teams, options);

//DumpPools(pools);
//console.log(pools);

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
        res.write(`    <div class='poolheading'>Pool ${poolNum + 1}</div>\n`);
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
teams = JSON.parse(body);
//for (var i = 0; i < teams.length; i++) {
//  console.log(`${teams[i].friendlyName}`);
//}
pools = TeamListToPools(teams, options);
});
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('post received');
    } else {
console.log("GET");
      if (req.url === "/index.html")
        PoolPage(res, pools);
      else {
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

server.listen(4242, () => {
  console.log('Server is running...');
});
