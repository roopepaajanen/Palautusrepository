import { useField } from '../hooks/index';

const CreateNew = (props) => {
    const content = useField("text")
    const author = useField("text")
    const info = useField("text")
    
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }
  
    const resetFields = (e) => {
      e.preventDefault();
      content.reset();
      author.reset();
      info.reset();
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' {...content.getInputProps()} />
          </div>
          <div>
            author
            <input name='author' {...author.getInputProps()} />
          </div>
          <div>
            url for more info
            <input name='info' {...info.getInputProps()} />
          </div>
          <button>create</button>
          <button onClick={resetFields}>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew;
