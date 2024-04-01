import { createRoutines } from 'extend-saga-routines';

import createRoutineAsync from './createRoutineAsync';

export default function createRoutinesAsync(scheme, defaultRoutines) {
  const routines = createRoutines(scheme, defaultRoutines);
  const promisifyRoutines = {};
  for (const [namespace, routine] of Object.entries(routines)) {
    promisifyRoutines[namespace] = createRoutineAsync(routine);
    for (const reference in routine) {
      promisifyRoutines[namespace][reference] = routine[reference];
    }
  }
  return promisifyRoutines;
}
