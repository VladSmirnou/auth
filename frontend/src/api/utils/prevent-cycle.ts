const preventCycleWrapper = (observedStatus: number) => {
  let previousStatus = undefined as undefined | number;

  return (currentStatus: number) => {
    if (previousStatus === observedStatus && currentStatus === observedStatus) {
      previousStatus = undefined;
      return true;
    }
    previousStatus = currentStatus;
    return false;
  };
};
