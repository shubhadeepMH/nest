import { configureStore } from '@reduxjs/toolkit'
import postSlice from './src/store/Slices/postSlice'

export const store = configureStore({
  reducer: {
    posts:postSlice
  },
})