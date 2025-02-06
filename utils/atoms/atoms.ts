// atoms.ts
import { atom } from 'jotai'

// Atom to manage the mounted state
export const mountedAtom = atom<boolean>(false)
export const hasValidEnvAtom = atom<boolean>(false)
export const profileAtom = atom(null)
