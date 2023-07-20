
import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote =  (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(addAnecdote(content))
    }
    return (
    <><h2>create new</h2>
        <form onSubmit={addAnecdote}>
            input: <input input="anecdote" />
            <button type="submit">create</button>
        </form></>
    )
}

export default NewAnecdote