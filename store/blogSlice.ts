// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   blogs: [],
//   loading: false,
//   error: null,
// };

// export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
//   const response = await fetch('https://a2sv-backend.onrender.com/api/blogs');
//   return await response.json();
// });

// const blogSlice = createSlice({
//   name: 'blogs',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBlogs.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchBlogs.fulfilled, (state, action) => {
//         state.loading = false;
//         state.blogs = action.payload;
//       })
//       .addCase(fetchBlogs.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default blogSlice.reducer;
