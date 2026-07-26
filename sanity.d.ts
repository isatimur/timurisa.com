import {ComponentType} from 'react'

declare module '@sanity/types' {
  interface InputProps {
    inputComponent?: ComponentType<any>
  }
}
