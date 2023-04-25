import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchDance = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  let dance = [];
  for (let i=0; i < data.length; i++) {
    if (data[i].tags[0] === 'Танцы (все виды)') {
      dance.push(data[i])
    }
  }
  return dance;
});

export const fetchVoice = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  let voice = [];
  for (let i=0; i < data.length; i++) {
    if (data[i].tags[0] === 'Вокал (эстрада+классика)') {
      voice.push(data[i])
    }
  }
  return voice;
});

export const fetchGroup = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  let group = [];
  for (let i=0; i < data.length; i++) {
    if (data[i].tags[0] === 'Групповое выступление') {
      group.push(data[i])
    }
  }
  return group;
});

export const fetchInstrument = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  let instrument = [];
  for (let i=0; i < data.length; i++) {
    if (data[i].tags[0] === 'Инструментальное выступление (все виды инструменталки)') {
      instrument.push(data[i])
    }
  }
  return instrument;
});

export const fetchNational = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  let national = [];
  for (let i=0; i < data.length; i++) {
    if (data[i].tags[0] === 'Народное пение') {
      national.push(data[i])
    }
  }
  return national;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) =>
  axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение статей танцы
    [fetchDance.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchDance.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchDance.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение статей Вокал
    [fetchVoice.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchVoice.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchVoice.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение статей Групповое выступление
    [fetchGroup.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchGroup.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchGroup.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение статей Инструментальное выступление
    [fetchInstrument.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchInstrument.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchInstrument.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение статей Народное пение
    [fetchNational.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchNational.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchNational.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    // Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    // Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const postsReducer = postsSlice.reducer;
