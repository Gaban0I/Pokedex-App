import { configureStore } from '@reduxjs/toolkit'
import pokeSlice from './reducers/pokeSlice'

const store = configureStore({
  reducer: pokeSlice,
})

export default store