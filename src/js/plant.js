// import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';



const changeState = (prop) => {
  return (value) => {
    if (prop == "name") {
      return (state) => ({
        ...state,      
        [prop] : value
      });
    } else {
      return (state) => ({
        ...state,      
        [prop] : (state[prop] || 0) + value
      });
    }
  };
};

const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};


// const stateControl = storeState({id:plantId});

// const plant1 = storeState();
// const plant2 = storeState();
// const plant3 = storeState();

let plantArray = [];
let plantId = 0;


// const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

// const hydrate = changeState("water")(1);
// const superWater = changeState("water")(5);


// UI
$(document).ready(function() {

  $('#plant-form').submit(function(event) {
    event.preventDefault();
    const plantName = $("#nameInput").val();
    
    // const stateControl = storeState();
    
    
    const plant = storeState({name:plantName,id:plantId});
    plantArray.push(plant);
    
    const name = changeState("name")(plantName);
    const newState = plantArray[plantId](name);
    
    $('#plant-name').text(`Name: ${newState.name}`);
    displayPlantActions(newState);
    plantId += 1;
    // $("#plant-form").trigger('reset');
    console.log(plantArray);
  });

  $('#plants-added').on("click",".feed", function() {
    // console.log(this.id)
    // let name = this.name;
    // const plant = plantArray[this.id];
    const newState = plantArray[this.id](blueFood);
    console.log(newState.soil);
    const soilValueName = `#soil-value${this.id}`;
    console.log("FEED PLANT TEST "+soilValueName+" id: "+this.id);

    $(soilValueName).text(`Soil: ${newState.soil}`);
  });
  $('#plants-added').on("click",".show-state", function() {
    // let name = this.name;
    const currentState = plantArray[this.id]();
    const soilValueName = `#soil-value${this.id}`;
    console.log("SHOW STATE TEST"+soilValueName+"id: "+this.id);
    $(soilValueName).text(`Soil: ${currentState.soil}`);
  });


  // $(".feed").click(function() {
  //   console.log("FEED CLICK");
  //   let name = this.name;
  //   const newState = stateControl(blueFood);
  //   const soilValueName = `#soil-value${name}`;
  //   $(soilValueName).text(`Soil: ${newState.soil}`);
  // });

  // $('.show-state').click(function() {
  //   let name = this.name;
  //   const currentState = stateControl();
  //   const soilValueName = `#soil-value${name}`;
  //   $(soilValueName).text(`Soil: ${currentState.soil}`);
  // });

  // function displayPlantActions(newPlant){ // add values to button for name string
  //   $('#plants-added').append(`
  //   <br>
  //   <div class="grow-buttons">
  //       <button class="btn-success" id="feed${newPlant.name}">Add soil</button>
  //       <button class="btn-success" id="show-state${newPlant.name}">Current Stats</button>
  //     </div>
  //     <h1>Your Plant's Values</h1>
  //     <h3><div id="soil-value${newPlant.name}">Soil Value: 0</div></h3>
  //     <h3><div id="plant-name${newPlant.name}">Plant Name: ${newPlant.name}</div></h3> 
  //   </div>
  //   </br>`);
  // }
  // function displayPlantActions(newPlant){ // add values to button for name string
  //   $('#plants-added').append(`
  //   <br>
  //   <div class = "plant-values">
  //   <h1>Your Plant's Values</h1>
  //   <h3><div id="soil-value${newPlant.name}">Soil Value: 0</div></h3>
    
  //   <h3><div id="plant-name${newPlant.name}">Plant Name: ${newPlant.name}</div></h3> 
  //   </div>
  //   <div class="grow-buttons">
  //     <button class="btn-success feed" name="${newPlant.name}">Add soil</button>
  //     <button class="btn-success show-state" name="${newPlant.name}">Current Stats</button>
  //   </div>
  //   </br>`);
  // }
  function displayPlantActions(newPlant){ // add values to button for name string
    $('#plants-added').append(`
    <br>
    <div class = "plant-values">
    <h1>Your Plant's Values</h1>
    <h3><div id="soil-value${newPlant.id}">Soil Value: 0</div></h3>
    
    <h3><div id="plant-name${newPlant.id}">Plant Name: ${newPlant.name} Id: ${newPlant.id}</div></h3> 
    </div>
    <div class="grow-buttons">
      <button class="btn-success feed" id="${newPlant.id}">Add soil</button>
      <button class="btn-success show-state" id="${newPlant.id}">Current Stats</button>
    </div>
    </br>`);
  }
});