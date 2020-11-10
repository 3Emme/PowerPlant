// import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/styles.css';



const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
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

const stateControl = storeState({name : ""});



// const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

// const hydrate = changeState("water")(1);
// const superWater = changeState("water")(5);


// UI
$(document).ready(function() {

  $('#plant-form').submit(function(event) {
    event.preventDefault();

    let plantName = $("#nameInput").val();
    const name = changeState("name")(plantName);
    const newState = stateControl(name);
    $('#plant-name').text(`Name: ${newState.name}`);
    displayPlantActions(newState);
  });


  $(".feed").click(function() {
    let name = this.name;
    const newState = stateControl(blueFood);
    const soilValueName = `#soil-value${name}`;
    $(soilValueName).text(`Soil: ${newState.soil}`);
  });

  $('.show-state').click(function() {
    let name = this.name;
    const currentState = stateControl();
    const soilValueName = `#soil-value${name}`;
    $(soilValueName).text(`Soil: ${currentState.soil}`);
  });

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
  function displayPlantActions(newPlant){ // add values to button for name string
    $('#plants-added').append(`
    <br>
    <div class="grow-buttons">
        <button class="btn-success feed" name="${newPlant.name}">Add soil</button>
        <button class="btn-success show-state" name="${newPlant.name}>Current Stats</button>
      </div>
      <h1>Your Plant's Values</h1>
      <h3><div id="soil-value${newPlant.name}">Soil Value: 0</div></h3>
      <h3><div id="plant-name${newPlant.name}">Plant Name: ${newPlant.name}</div></h3> 
    </div>
    </br>`);
  }
});