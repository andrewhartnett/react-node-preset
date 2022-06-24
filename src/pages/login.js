import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useModel from '../hooks/useModel'

export default function Login () {
  const [emailModel] = useModel('')
  const [passwordModel] = useModel('')
  const navigate = useNavigate()

  const login = async () => {
    const res = await axios.post('/api/login', { email: emailModel.value, password: passwordModel.value })

    localStorage.setItem('token', res.data.token)
    navigate('/', { replace: true })
  }

  const register = async () => {
    const res = await axios.post('/api/register', { email: emailModel.value, password: passwordModel.value })
    localStorage.setItem('token', res.data.token)
    navigate('/', { replace: true })
  }

  return (
    <div>
      <div>
        <input {...emailModel} placeholder='Email'/>
      </div>
      <div>
        <input {...passwordModel} placeholder='Password' />
      </div>
      <div>
        <button onClick={login}>Login</button>
        <button onClick={register}>Register</button>
      </div>
    </div>
  )
}
