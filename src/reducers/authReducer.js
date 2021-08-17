//imports to create redux state
import { createSlice } from '@reduxjs/toolkit'

//create state slice
let auth = createSlice({
    name: 'auth State',
    initialState: {
        signedIn: false,
        userName: '',
        userEmail: '',
        userID: ''
    },

    reducers: {
        signIn: (state, action)=>{            
            return state = {
                signedIn: true,
                userName: action.payload.name,
                userEmail: action.payload.userEmail,
                userID: action.payload.userID
            }
        },

        signOut:(state, action)=>{
            return state = {
                signedIn: false,
                userName: '', 
                userEmail: '', 
                userID: ''              
            }
        }
    }
})

export const { signIn, signOut }  = auth.actions
export default auth.reducer