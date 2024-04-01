import { promisifyRoutine } from 'redux-saga-routines';

export default function createRoutineAsync(routine) {
  return (payload) => (dispatch) => {
    return promisifyRoutine(routine)(payload, dispatch);
  };
}
