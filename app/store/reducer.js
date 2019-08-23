import {chatSelect,selectNavigator} from './actionTypes'
const defaultState = {
  backgroundColor:'rgb(251, 251, 251)',
  navigationColor:'rgb(208, 208, 208)'
}
export default function (state = defaultState, action) {
  if (action.type === chatSelect) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.chatName = action.value.chatName
    newState.id = action.value.id
    newState.memberCount = action.value.memberCount
    newState.isGroup = action.value.isGroup
    return newState
  }
  if (action.type === selectNavigator) {
    const newState = JSON.parse(JSON.stringify(state))
    return newState
  }
  return state
}
