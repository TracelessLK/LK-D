import {chatSelect,selectNavigator} from './actionTypes'

export const getchatSelect = (value) => ({
  type:chatSelect,
  value
})

export const getselectNavigator = () => ({
  type:selectNavigator
})
