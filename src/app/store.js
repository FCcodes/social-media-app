//redux import to create store
import { configureStore } from '@reduxjs/toolkit'

//state slices
import authReducer from '../reducers/authReducer'

export default configureStore({
    reducer: {
        auth: authReducer
    },
})