import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export function useAppConfig() {
  return useContext(AppContext)
}
