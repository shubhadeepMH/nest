import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  isLoaded:false,
  scrollPosition: 0,
}

export const counterSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.posts =action.payload //Adding the posts to the Redux store.
      state.isLoaded=true 
     
    },
    setScrollPosition: (state, action) => {
        console.log(action.payload)
        state.scrollPosition=action.payload

      },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addPosts, setScrollPosition, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer