export function handleRepeatCodeFn(state, callback) {
    const newState = JSON.parse(JSON.stringify(state))
    callback && callback(newState)
    return newState
}
