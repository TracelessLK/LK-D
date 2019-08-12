const defaultState = {
  backgroundColor:'rgb(251, 251, 251)'
}
export default function (state = defaultState, action) {
  //console.log(state, action)
  if (action.type === 'chatSelect') {
    const newState = JSON.parse(JSON.stringify(state))
    //newState.backgroundColor = action.value
    return newState
  }
  return state
}
