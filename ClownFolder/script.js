var gameData = {
  version:"0.2",
	
  //Cash/player related variables
  //Array    : Cash, ATC, Perform, Fear, Contempt, Contempt Limit, Current Clowns, Clown Limit
  gameStats: [0.0, 0.0, 1.0, 0.0, 0.0, 100.0, 0, 0],
  
  //Clown Purchase Variables
  //Array:    Cost, Owned, Multiplier, State
  clownComedy: [20, 0, 1, "unlocked"],
  clownJuggling: [300, 0, 1, "locked"],
  clownBalancing: [5000, 0, 1, "locked"],
  clownAnimal: [25000, 0, 1, "locked"],
  clownStunt: [500000, 0, 1, "locked"],
  clownPretzel: [1000000, 0, 1, "locked"],
  clownDangerous: [25000000, 0, 1, "locked"],
  clownDisgusting: [1000000000, 0, 1, "locked"],
  //BuildArray: Cost, Owned, State, (town mult/hiveLimit)
  buildTent: [10, 0, "unlocked"],
  buildVan: [750, 0, "locked"],
  buildMotel: [2750, 0, "locked"],
  buildClowndo: [10000, 0 ,"locked"],
  buildHotel: [50000,0,"locked"],
  buildMansion: [2500000,0,"locked"],
  buildTown: [100000000,0,"locked", 1],
  buildCountry: [1000000000,0,"locked"],
  buildSpire: [5000000000000,0,"locked"],
  buildHive: [666666666666666666, 0, "locked", 1]
}
//This should load the game properly now
var savegame = JSON.parse(localStorage.getItem("ClownCircus"))
if (savegame !== null) {
	if (savegame.version !== gameData.version) {
		console.log("Version mismatch! Updating...");
		/*if statements to update missing variables
		USE THIS template for new variables
		if (typeof savegame.VARIABLENAME !== "undefined") gameData.VARIABLENAME = savegame.VARIABLENAME
		*/
		if (typeof savegame.gameStats !== "undefined") gameData.gameStats = savegame.gameStats;
		if (typeof savegame.clownComedy !== "undefined") gameData.clownComedy = savegame.clownComedy;
		if (typeof savegame.clownJuggling !== "undefined") gameData.clownJuggling = savegame.clownJuggling;
		if (typeof savegame.clownBalancing !== "undefined") gameData.clownBalancing = savegame.clownBalancing
		if (typeof savegame.clownAnimal !== "undefined") gameData.clownAnimal = savegame.clownAnimal
		if (typeof savegame.clownStunt !== "undefined") gameData.clownStunt = savegame.clownStunt
		if (typeof savegame.clownPretzel !== "undefined") gameData.clownPretzel = savegame.clownPretzel
		if (typeof savegame.clownDangerous !== "undefined") gameData.clownDangerous = savegame.clownDangerous
		if (typeof savegame.clownDisgusting !== "undefined") gameData.clownDisgusting = savegame.clownDisgusting
		if (typeof savegame.buildTent !== "undefined") gameData.buildTent = savegame.buildTent
		if (typeof savegame.buildVan !== "undefined") gameData.buildVan = savegame.buildVan
		if (typeof savegame.buildMotel !== "undefined") gameData.buildMotel = savegame.buildMotel
		if (typeof savegame.buildClowndo !== "undefined") gameData.buildClowndo = savegame.buildClowndo
		if (typeof savegame.buildHotel !== "undefined") gameData.buildHotel = savegame.buildHotel
		if (typeof savegame.buildMansion !== "undefined") gameData.buildMansion = savegame.buildMansion
		if (typeof savegame.buildTown !== "undefined") gameData.buildTown = savegame.buildTown
		if (typeof savegame.buildCountry !== "undefined") gameData.buildCountry = savegame.buildCountry
		if (typeof savegame.buildSpire !== "undefined") gameData.buildSpire = savegame.buildSpire
		if (typeof savegame.buildHive !== "undefined") gameData.buildHive = savegame.buildHive
		
		
	}
	else if (savegame.version == gameData.version) {
		gameData = savegame;
		console.log("Save loaded successfully!");
	}
	else {
		console.log("No save found! Did you delete localStorage recently?")
	}
}

function swapStore(tab, tab2) {
	document.getElementById(tab).style.display = 'block'
	document.getElementById(tab2).style.display = 'none'	
}

//This is for updating the player's stats - UPDATE PLAYER STATS
function updateHTML() {
  document.getElementById("currentCash").innerHTML = "$" + shortenVal(gameData.gameStats[0])
  
  
  //handling contempt is fun. I think paired with the contempt it should decrease income by a fraction according to which rung you're in?
  document.getElementById("currentContempt").innerHTML = shortenVal(gameData.gameStats[4]) + "/" + shortenVal(gameData.gameStats[5])
  if (gameData.gameStats[4] >= 0) {
    document.getElementById("currentContempt").style.color = "black";
    if (gameData.gameStats[4] >= (gameData.gameStats[5] * 0.75)) {
      document.getElementById("currentContempt").style.color = "#bf0d00"
      if (gameData.gameStats[4] >= (gameData.gameStats[5] * 0.9)) {
        document.getElementById("currentContempt").style.color = "#e60f00"
        if (gameData.gameStats[4] >= (gameData.gameStats[5] * 0.95)) {
          document.getElementById("currentContempt").style.color = "#ff1100"
        }
      }
    }
  }
  document.getElementById("currentFear").innerHTML = shortenVal(gameData.gameStats[3])
  
  document.getElementById("currentClimit").innerHTML = (gameData.gameStats[6]) + "/" + (gameData.gameStats[7]) 
  if (gameData.gameStats[6] < gameData.gameStats[7]) {
    document.getElementById("currentClimit").style.color = "black"
  }
  if (gameData.gameStats[6] == gameData.gameStats[7]) {
    document.getElementById("currentClimit").style.color = "red"
  }
  
  document.getElementById('cashPerSecond').innerHTML = shortenVal(calcPerSecond())
  
}
//This is for updating the costs of buildings and clowns - UPDATE CLOWNS AND BUILDINGS
function updateCosts() {
  document.getElementById("comedyCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownComedy[0])
  document.getElementById("comedyOwned").innerHTML = "Owned: " + shortenVal(gameData.clownComedy[1])
  document.getElementById("jugglingCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownJuggling[0])
  document.getElementById("jugglingOwned").innerHTML = "Owned: " + shortenVal(gameData.clownJuggling[1])
  document.getElementById("balancingCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownBalancing[0])
  document.getElementById("balancingOwned").innerHTML = "Owned: " + shortenVal(gameData.clownBalancing[1])
  document.getElementById("animalCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownAnimal[0])
  document.getElementById("animalOwned").innerHTML = "Owned: " + shortenVal(gameData.clownAnimal[1])
  document.getElementById("stuntCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownStunt[0])
  document.getElementById("stuntOwned").innerHTML = "Owned: " + shortenVal(gameData.clownStunt[1])
  document.getElementById("pretzelCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownPretzel[0])
  document.getElementById("pretzelOwned").innerHTML = "Owned: " + shortenVal(gameData.clownPretzel[1])
  document.getElementById("dangerousCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownDangerous[0])
  document.getElementById("dangerousOwned").innerHTML = "Owned: " + shortenVal(gameData.clownDangerous[1])
  document.getElementById("disgustingCost").innerHTML = "Current cost is: $" + shortenVal(gameData.clownDisgusting[0])
  document.getElementById("disgustingOwned").innerHTML = "Owned: " + shortenVal(gameData.clownDisgusting[1])
  
  document.getElementById("tentCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildTent[0])
  document.getElementById("tentOwned").innerHTML = "Owned: " + shortenVal(gameData.buildTent[1])
  document.getElementById("vanCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildVan[0])
  document.getElementById("vanOwned").innerHTML = "Owned: " + shortenVal(gameData.buildVan[1])
  document.getElementById("motelCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildMotel[0])
  document.getElementById("motelOwned").innerHTML = "Owned: " + shortenVal(gameData.buildMotel[1])
  document.getElementById("clowndoCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildClowndo[0])
  document.getElementById("clowndoOwned").innerHTML = "Owned: " + shortenVal(gameData.buildClowndo[1])
  document.getElementById("hotelCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildHotel[0])
  document.getElementById("hotelOwned").innerHTML = "Owned: " + shortenVal(gameData.buildHotel[1])
  document.getElementById("mansionCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildMansion[0])
  document.getElementById("mansionOwned").innerHTML = "Owned: " + shortenVal(gameData.buildMansion[1])
  document.getElementById("townCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildTown[0])
  document.getElementById("townOwned").innerHTML = "Owned: " + shortenVal(gameData.buildTown[1])
  document.getElementById("countryCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildCountry[0])
  document.getElementById("countryOwned").innerHTML = "Owned: " + shortenVal(gameData.buildCountry[1])
  document.getElementById("spireCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildSpire[0])
  document.getElementById("spireOwned").innerHTML = "Owned: " + shortenVal(gameData.buildSpire[1])
  document.getElementById("hiveCost").innerHTML = "Current cost is: $" + shortenVal(gameData.buildHive[0])
  document.getElementById("hiveOwned").innerHTML = "Owned: " + shortenVal(gameData.buildHive[1])
}

//Onload function to properly load all elements - ONLOAD FUNCTION
function loadGame() {
  updateHTML()
  updateCosts()
}

function saveGame() {
  localStorage.setItem("ClownCircus", JSON.stringify(gameData))
}

/*Function for rounding values to K, M, B, ETC
Shamelessly stolen from stackoverflow threads
Shamelessly IMPROVED from those stackoverflow threads
*/
function shortenVal(val) {
	if (val >= 0) {
		valReturn = val.toFixed(1)
	}	
	if (val >= 1000) {
		valReturn = ((val / 1000).toFixed(3)) + "k"
	}
	if (val >= 1000000) {
		valReturn = ((val / 1000000).toFixed(3)) + "m"
	}
	if ((val >= 1000000000) && (val < 1000000000000)) {
		valReturn = ((val / 1000000000).toFixed(3)) + "b"
	}
	if (val >= 1000000000000) {
    valReturn = ((val / 1000000000000).toFixed(3)) + "t"
	}
	if (val >= 1000000000000000) {
		valReturn = ((val / 1000000000000000).toFixed(3)) + "q"
	}
	if (val >= 1000000000000000000) {
		valReturn=((val / 1000000000000000000).toFixed(3)) + "Q"
	}
	if (val >= 1000000000000000000000) {
		valReturn=((val / 1000000000000000000000).toFixed(3)) + "s"
	}
	if (val >= 1000000000000000000000000) {
		valReturn=((val / 1000000000000000000000).toFixed(3)) + "S"
	}
  return valReturn
}

function showDelete() {
  document.getElementById("showDelete").style.visibility = 'visible'
  document.getElementById("showDeleteNevermind").style.visibility = 'visible'
}
function closeDelete() {
  document.getElementById("showDelete").style.visibility = 'hidden'
  document.getElementById("showDeleteNevermind").style.visibility = 'hidden'
}
function permDelete() {
  localStorage.clear("ClownCircus")
  document.getElementById("showDelete").style.visibility = 'hidden'
  document.getElementById("showDeleteNevermind").style.visibility = 'hidden'
  
  //This is to Reset the webpage when you delete your save to prevent confusion
  //Updating store costs
  updateHTML()
  updateCosts()
}
//Perform function for adding cash money baby
function perform() {
  gameData.gameStats[0] += gameData.gameStats[2]
  gameData.gameStats[1] += gameData.gameStats[2]
}



//Purchasing function, pass in clownType as selection via button click function storePurchase(var)
//Potential to make this do x10, x100 at later date? Pass in two variables - clownType and amount ???
function clownPurchase(clownType, amount) {
  if (gameData.gameStats[6] < gameData.gameStats[7]) {
    if (clownType == "comedy") {
      if (gameData.gameStats[0] >= gameData.clownComedy[0]) {
        gameData.gameStats[0] -= gameData.clownComedy[0]
        gameData.gameStats[2] += 0.25
        gameData.clownComedy[0] *= 1.4
        gameData.clownComedy[1] += 1
        gameData.gameStats[6] += 1
      }
    }
    if (clownType == "juggling") {
      if (gameData.gameStats[0] >= gameData.clownJuggling[0]) {
        gameData.gameStats[0] -= gameData.clownJuggling[0]
        gameData.clownJuggling[0] *= 1.5
        gameData.clownJuggling[1] += 1
        gameData.gameStats[6] += 1
      }
    }
    if (clownType == "balancing") {
      if (gameData.gameStats[0] >= gameData.clownBalancing[0]) {
        gameData.gameStats[0] -= gameData.clownBalancing[0]
        gameData.clownBalancing[0] *= 1.49
        gameData.clownBalancing[1] += 1
        gameData.gameStats[6] += 1
      }
    }
    if (clownType == "animal") {
      if (gameData.gameStats[0] >= gameData.clownAnimal[0]) {
        gameData.gameStats[0] -= gameData.clownAnimal[0]
        gameData.clownAnimal[0] *= 1.47
        gameData.clownAnimal[1] += 1
        gameData.gameStats[6] += 1
      }
    }
    if (clownType == "stunt") {
      if (gameData.gameStats[0] >= gameData.clownStunt[0]) {
        gameData.gameStats[0] -= gameData.clownStunt[0]
        gameData.clownStunt[0] *= 1.45
        gameData.clownStunt[1] += 1
        gameData.gameStats[6] += 1
      }
    }
    if (clownType == "pretzel") {
     if (gameData.gameStats[0] >= gameData.clownPretzel[0]) {
       gameData.gameStats[0] -= gameData.clownPretzel[0]
       gameData.clownPretzel[0] *= 1.43
       gameData.clownPretzel[1] += 1
       gameData.gameStats[6] += 1
     }
    }
    if (clownType == "dangerous") {
      if (gameData.gameStats[0] >= gameData.clownDangerous[0]) {
        gameData.gameStats[0] -= gameData.clownDangerous[0]
        gameData.clownDangerous[0] *= 1.41
        gameData.clownDangerous[1] += 1
        gameData.gameStats[6] += 1
      }
    }
    if (clownType == "disgusting") {
      if (gameData.gameStats[0] >= gameData.clownDisgusting[0]) {
        gameData.gameStats[0] -= gameData.clownDisgusting[0]
        gameData.clownDisgusting[0] *= 1.39
        gameData.clownDisgusting[1] += 1
        gameData.gameStats[6] += 1
      }
    }
    updateCosts()
  //MORE WILL FOLLOW i just got lazy and this is a prototype :)
  }
}

function upgradePurchase(upgradeType) {
}
  
function buildingPurchase(buildType) {
  if (buildType == "tent") {
    if (gameData.gameStats[0] >= gameData.buildTent[0]) {
      gameData.gameStats[0] -= gameData.buildTent[0]
      gameData.gameStats[7] += 1
      gameData.buildTent[0] *= 1.8
      gameData.buildTent[1] += 1
    }
  }
  
  if (buildType == "van") {
    if (gameData.gameStats[0] >= gameData.buildVan[0]) {
      gameData.gameStats[0] -= gameData.buildVan[0]
      gameData.gameStats[7] += 2
      gameData.buildVan[0] *= 1.75
      gameData.buildVan[1] += 1
    }
  }
  
  if (buildType == "motel") {
    if (gameData.gameStats[0] >= gameData.buildMotel[0]) {
      gameData.gameStats[0] -= gameData.buildMotel[0]
      gameData.gameStats[7] += 10
      gameData.buildMotel[0] *= 1.7
      gameData.buildMotel[1] += 1
    }
  }
  
  if (buildType == "clowndo") {
    if (gameData.gameStats[0] >= gameData.buildClowndo[0]) {
      gameData.gameStats[0] -= gameData.buildClowndo[0]
      gameData.gameStats[7] += 20
      gameData.buildClowndo[0] *= 1.65
      gameData.buildClowndo[1] += 1
    }
  }
  
  if (buildType == "hotel") {
    if (gameData.gameStats[0] >= gameData.buildHotel[0]) {
      gameData.gameStats[0] -= gameData.buildHotel[0]
      gameData.gameStats[7] += 50
      gameData.buildHotel[0] *= 1.65
      gameData.buildHotel[1] += 1
    }
  }
  
  if (buildType == "mansion") {
    if (gameData.gameStats[0] >= gameData.buildMansion[0]) {
      gameData.gameStats[0] -= gameData.buildMansion[0]
      gameData.gameStats[7] += 30
      gameData.gameStats[5] += 50
      gameData.buildMansion[0] *= 1.6
      gameData.buildMansion[1] += 1
    }
  }
  
  if (buildType =="town") {
    if (gameData.gameStats[0] >= gameData.buildTown[0]) {
      gameData.gameStats[0] -= gameData.buildTown[0]
      gameData.gameStats[7] += 100
      gameData.buildTown[0] *= 1.55
      gameData.buildTown[1] += 1
    }
  }
  
  if (buildType == "country") {
    if (gameData.gameStats[0] >= gameData.buildCountry[0]) {
      gameData.gameStats[0] -= gameData.buildCountry[0]
      gameData.gameStats[7] += 500
      gameData.buildCountry[0] *= 1.5
      gameData.buildCountry[1] += 1
    }
  }
  
  if (buildType == "spire") {
    if (gameData.gameStats[0] >= gameData.buildSpire[0]) {
      gameData.gameStats[0] -= gameData.buildSpire[0]
      gameData.gameStats[7] += 1000
      gameData.buildSpire[0] *= 1.45
      gameData.buildSpire[1] += 1
    }
  }
  
  if (buildType == "hive") {
    if (gameData.gameStats[0] >= gameData.buildHive[0]) {
      gameData.gameStats[0] -= gameData.buildHive[0]
      gameData.gameStats[7] += 1
      gameData.buildHive[0] *= 1.5
      gameData.buildHive[1] += 1
    }
  }
  updateCosts()
}

//Function to check if a store element should be available or not depending on ATC
function checkAvailable() {
  if (gameData.gameStats[0] >= (gameData.buildVan[0] * 0.75)) {
    document.getElementById("vanStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildMotel[0] * 0.75)) {
    document.getElementById("motelStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildClowndo[0] * 0.75)) {
    document.getElementById("clowndoStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildHotel[0] * 0.75)) {
    document.getElementById("hotelStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildMansion[0] * 0.75)) {
    document.getElementById("mansionStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildTown[0] * 0.75)) {
    document.getElementById("townStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildCountry[0] * 0.75)) {
    document.getElementById("countryStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildSpire[0] * 0.75)) {
    document.getElementById("spireStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.buildHive[0] * 0.75)) {
    document.getElementById("hiveStore").style.display = 'block'
  }
  
  if (gameData.gameStats[0] >= (gameData.clownJuggling[0] * 0.75)) {
    document.getElementById("jugglingStore").style.display = 'block'
  }
  if (gameData.gameStats[01] >= (gameData.clownBalancing[0] * 0.75)) {
    document.getElementById("balancingStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.clownAnimal[0] * 0.75)) {
    document.getElementById("animalStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.clownStunt[0] * 0.75)) {
    document.getElementById("stuntStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.clownPretzel[0] * 0.75)) {
    document.getElementById("pretzelStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.clownDangerous[0] * 0.75)) {
    document.getElementById("dangerousStore").style.display = 'block'
  }
  if (gameData.gameStats[0] >= (gameData.clownDisgusting[0] * 0.75)) {
    document.getElementById("disgustingStore").style.display = 'block'
  }
}

//Per second
var mainGameLoop = window.setInterval(function() {
  checkAvailable()
}, 1000)

//Per 15 seconds
var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("ClownCircus", JSON.stringify(gameData))
}, 15000)

//Per tick (12ms)
var updateLoop = window.setInterval(function() {
	gameData.gameStats[0] += calcPerSecond()
	gameData.gameStats[1] += calcPerSecond()
	updateHTML()
	
	
}, 12)

function calcPerSecond() {
	var perSecond = 0.0;
	perSecond += (((gameData.clownJuggling[1] * 1) * gameData.clownJuggling[2]) + ((gameData.clownBalancing[1] * 5) * gameData.clownBalancing[2]) + ((gameData.clownAnimal[1] * 20) * gameData.clownAnimal[2]) + ((gameData.clownStunt[1] * 100) * gameData.clownStunt[2]) + ((gameData.clownPretzel[1] * 200) * gameData.clownPretzel[2]) + ((gameData.clownDangerous[1] * 500) * gameData.clownDangerous[2]) + ((gameData.clownDisgusting[1] * 1000) * gameData.clownDisgusting[2]) + ((gameData.buildTown[1] * 20) * gameData.buildTown[3]))
	return perSecond
}

//Perform button js
var animateButton = function(e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');

  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};
var classname = document.getElementsByClassName("playerButtons");
for (var i = 0; i < classname.length; i++) {
  classname[i].addEventListener('click', animateButton, false);
}

//Debug commands go down below everything
function debugLodesMone(money) {
  gameData.gameStats[0] = money
  gameData.gameStats[1] = money
}
