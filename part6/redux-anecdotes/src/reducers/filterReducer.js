import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      const newFilter = action.payload;
      return (state = newFilter);
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
