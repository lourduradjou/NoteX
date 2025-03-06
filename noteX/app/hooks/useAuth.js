import { auth } from '../services/firebase'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from 'firebase/auth'

export const login = async (email, password) => {
	return await signInWithEmailAndPassword(auth, email, password)
}

export const register = async (email, password) => {
	return await createUserWithEmailAndPassword(auth, email, password)
}
