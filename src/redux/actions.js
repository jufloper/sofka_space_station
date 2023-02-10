export const SET_SPACESHIPS = 'SET_SPACESHIPS';
export const SET_SPACESHIP_ID = 'SET_SPACESHIP_ID';
export const SET_NEWSPACESHIP = 'SET_NEWSPACESHIP';

export const setSpaceShip = spaceShips => dispatch => {
  dispatch({
    type: SET_SPACESHIPS,
    payload: spaceShips,
  });
};

export const setSpaceShipId = spaceShipId => dispatch => {
  dispatch({
    type: SET_SPACESHIP_ID,
    payload: spaceShipId,
  });
};

export const setNewSpaceShip = newSpaceShip => dispatch => {
  dispatch({
    type: SET_NEWSPACESHIP,
    payload: newSpaceShip,
  });
};
