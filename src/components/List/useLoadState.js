import React from 'react';

import { LOAD_STATE } from './constants';

export default function useLoadState() {
  const [loadState, setLoadState] = React.useState(LOAD_STATE.NONE);

  const isLoadmore = React.useMemo(() => {
    return loadState === LOAD_STATE.LOAD_MORE;
  }, [loadState]);

  const firstLoad = React.useCallback(() => {
    setLoadState(LOAD_STATE.FIRST_LOAD);
  }, []);

  const idleLoad = React.useCallback(() => {
    setLoadState(LOAD_STATE.IDLE);
  }, []);

  const fullLoad = React.useCallback(() => {
    setLoadState(LOAD_STATE.FULL_LOAD);
  }, []);

  const refreshLoad = React.useCallback(() => {
    setLoadState(LOAD_STATE.REFRESH);
  }, []);

  const moreLoad = React.useCallback(() => {
    setLoadState(LOAD_STATE.LOAD_MORE);
  }, []);

  const scrollEnabled = React.useMemo(() => {
    return loadState !== LOAD_STATE.FIRST_LOAD;
  }, [loadState]);

  return {
    current: loadState,
    firstLoad,
    idleLoad,
    fullLoad,
    refreshLoad,
    moreLoad,
    isLoadmore,
    scrollEnabled,
  };
}
