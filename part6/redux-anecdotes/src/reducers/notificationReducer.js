import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Configuring notification',
  reducers: {
    setNotification(state, action) {
      const content = action.payload;
      console.log(content);
      return (state = content);
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
