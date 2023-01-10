import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Configuring notification',
  reducers: {
    setNotification(state, action) {
      const content = action.payload;
      return (state = content);
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

// Id for cleaning the time of notifications
let timeOutID;
export const setAndUnsetNotification = (content, time) => {
  return async (dispatch) => {
    // Clear the time of timer
    if (timeOutID) clearTimeout(timeOutID);
    dispatch(setNotification(content));
    timeOutID = setTimeout(() => {
      dispatch(setNotification(''));
    }, time * 1000);
  };
};
