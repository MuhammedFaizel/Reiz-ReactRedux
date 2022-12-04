import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(base_URL);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createUser = createAsyncThunk(
  `user/createUser`,
  async (initialUser, thunkAPI) => {
    try {
      const response = await axios.post(`${base_URL}`, initialUser);
      console.log("fake res", response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const deleteUsers = createAsyncThunk(
  'user/deleteUsers',
  async (initialUser, thunkAPI) => {
    const { id } = initialUser;
    try {
      const response = await axios.delete(`${base_URL}/${id}`);
      if (response?.status === 200) return initialUser;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUsers = createAsyncThunk(
  'user/updatePost',
  async (initialPost, thunkAPI) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${base_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.users = state?.users.concat(payload);
    });
    builder.addCase(fetchUsers.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
    });
    builder.addCase(deleteUsers.fulfilled, (state, { payload }) => {
      if (!payload?.id) {
        console.warn('Delete could not complete');
        console.warn(payload);
        return;
      }
      const { id } = payload;
      const users = state.users.filter((user) => user.id !== id);
      state.users = users;
    });
    builder.addCase(updateUsers.fulfilled, (state, { payload }) => {
      if (!payload?.id) {
        console.warn('Update could not complete');
        console.warn(payload);
        return;
      }
      const { id } = payload;
      state.users = state.users.map((value) => {
        if(value?.id === id) {
          return {
            id,
            name: payload?.name,
            address: {
              street: payload?.address?.street,
              city: payload?.address?.city,
              zipcode: payload?.address?.zipcode,
            }
          }
        }
        return value;
      })
    });
    builder.addCase(createUser.fulfilled, ( state, { payload } ) => {
      if (!payload) {
        console.warn('Create could not complete');
        console.warn(payload);
        return;
      }
      state.users.push(payload)
    })
  },
});

export const selectAllUsers = (state) => state.userDetails.users;
export const getUsersStatus = (state) => state.userDetails.status;
export const getUsersError = (state) => state.userDetails.error;

export default userSlice.reducer;
