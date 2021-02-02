import axios from 'axios'

export const initList = async () => {
    const result = await axios.get('/api/todolist')
    const temp = JSON.parse(JSON.stringify(result))
    return temp.data.data
}
