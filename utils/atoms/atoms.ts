// atoms.ts
import { atom } from 'jotai'
import { Tables } from '../database.types'

// Atom to manage the mounted state
export const mountedAtom = atom<boolean>(false)
export const hasValidEnvAtom = atom<boolean>(false)
export const profileAtom = atom<Tables<'profiles'> | null>(null)
