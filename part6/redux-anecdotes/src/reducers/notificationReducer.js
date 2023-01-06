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

export const setAndUnsetNotification = (content, time) => {
  return async (dispatch) => {
    console.log(content);
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, time * 1000);
  };
};
