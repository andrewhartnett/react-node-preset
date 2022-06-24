import './App.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function App () {
  const navigate = useNavigate()

  const routes = [
    { name: 'Home', to: '/' },
    { name: 'Login', to: '/login', loggedIn: false },
    {
      name: 'Logout',
      loggedIn: true,
      callback: () => {
        localStorage.removeItem('token')
        navigate('/', { replace: true })
      }
    }
  ]

  return (
    <div>
      <nav className='flex justify-between'>
        <div>
          <Link to="/">Project Name</Link>
        </div>
        <div className='flex'>
          {routes.filter(route => {
            if (route.loggedIn !== undefined) {
              if (route.loggedIn) {
                return !!localStorage.getItem('token')
              }

              if (!route.loggedIn) {
                return !localStorage.getItem('token')
              }
            }
            return true
          }).map(route => {
            if (route.callback !== undefined) {
              return <button key={route.name} onClick={route.callback}>{route.name}</button>
            }

            return <Link key={route.name} className='mx-2' to={route.to}>{route.name}</Link>
          })}
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
