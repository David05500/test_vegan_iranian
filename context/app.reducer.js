const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_VALUE": {
            return {
                ...state,
                [action.key]: action.value
            }
        }
       default:
           return state
        
    }
}

export default reducer