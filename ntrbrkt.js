teams = [
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
];

// TODO: Avoid same club in same pool.
//   * Add club entry to team above
//   * Add option to avoid same club in pool to options below
//   * Check for repeats in same pool
//   * Swap team up or down in seed/between pools
//   * Handle >2 teams from same club per pool
//   * Handle swapped teams that are same club
//   * Handle first & last pool swaps
//   * Handle swap into pool with same club

defaultOptions = {
  totalPools: Math.floor((teams.length + 3) / 4),
  powerPools: 2,
  teamsPerPool: 4,
  goldTeamsPerPool: 2,
  silverTeamsPerPool: 1,
  bronzeTeamsPerPool: 1,
};

function SeedToPool(options, overallSeedMinus1) {
  var poolInfo = {};
  var powerPoolTeams = options.powerPools * options.teamsPerPool;
  if (overallSeedMinus1 < powerPoolTeams) {
    var powerPoolOptions = {
      totalPools: options.powerPools,
      powerPools: 0,
      teamsPerPool: options.teamsPerPool,
    };
    poolInfo = SeedToPool(powerPoolOptions, overallSeedMinus1);
  } else {
    var actualSeedMinus1 = overallSeedMinus1 - powerPoolTeams;
    var nonPowerTeamPools = options.totalPools - options.powerPools;
    var poolSeedMinus1 = Math.floor(actualSeedMinus1 / nonPowerTeamPools);
    var poolMinus1 = Math.abs((actualSeedMinus1 % nonPowerTeamPools) -
                    ((poolSeedMinus1 % 2) * (nonPowerTeamPools - 1)));
    poolInfo = { pool: poolMinus1 + options.powerPools, seed: poolSeedMinus1 };
  }
  return poolInfo;
}

// TODO: If powerPools = "default" or true, replace with number based on NTR rules (URL?)

// Make copy of defaultOptions as options
options = JSON.parse(JSON.stringify(defaultOptions));

// Override from tournament
options.totalPools = 12;

totalPools = options.totalPools;
teamsperpool = options.teamsPerPool;
pools = new Array(totalPools);
for (var i = 0; i < pools.length; i++) {
  pools[i] = new Array(teamsperpool);
}

for (var team = 0; team < teams.length; team++) {
  var poolInfo = SeedToPool(options, team);
  pools[poolInfo.pool][poolInfo.seed] = teams[team];
}

console.log(pools);