/*** Convert received time data ***/
export const getTime = (secondsValue) => {
  let time = new Date();

  if (secondsValue) {
    time = new Date(secondsValue * 1000);
  }

  return time.toLocaleTimeString().slice(0, -3);
};
