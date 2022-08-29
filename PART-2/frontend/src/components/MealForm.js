import { useState } from 'react'
import { useMealsContext } from '../hooks/useMealsContext'

const MealForm = () => {
  const { dispatch } = useMealsContext()

  const [food, setFood] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const meal = {food, description, price}
    
    const response = await fetch('/api/meals', {
      method: 'POST',
      body: JSON.stringify(meal),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setFood('')
      setDescription('')
      setPrice('')
      dispatch({type: 'CREATE_MEAL', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Meal</h3>

      <label>Food:</label>
      <input 
        type="text" 
        onChange={(e) => setFood(e.target.value)} 
        value={food}
        className={emptyFields.includes('food') ? 'error' : ''}
      />

      <label>Food description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>Price (₦):</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />

      <button>Add Meal</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default MealForm