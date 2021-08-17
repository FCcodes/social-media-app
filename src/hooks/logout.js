// auth imports
import { auth } from "../firebase/firebase";

export function logout(){
    auth.signOut()
    console.log('logout')
}