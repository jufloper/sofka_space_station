import {SET_SPACESHIPS, SET_SPACESHIP_ID, SET_NEWSPACESHIP} from './actions';

const initialState = {
  spaceShips: [],
  spaceShipId: '',
  newSpaceShip: true,
};

function spaceShipReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPACESHIPS:
      return {...state, spaceShips: action.payload};
    case SET_SPACESHIP_ID:
      return {...state, spaceShipId: action.payload};
    case SET_NEWSPACESHIP:
      return {...state, newSpaceShip: action.payload};
    default:
      return state;
  }
}

export default spaceShipReducer;
