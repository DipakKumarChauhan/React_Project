import React from 'react'
import { Container, Logo, LogoutBtn   } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Header = () => {

  const authStatus = useSelector ((state) => {state.auth.status})
  const navigate = useNavigate()

  // When we use useNavigate or make navigation barr like this we make an array-og-objects and store the values in it and then we loop through it to make the navigation bar. This is a good practice because if we want to add or remove any item from the navigation bar we just have to change the array and not the whole code.
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (

    <header className='py-3 shadow bg-gray-400'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to= "/"> 
            <Logo width = '70px' />
            
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {
              navItems.map((item) => 
              item.active ? (
                <li key = {item.name}>
                  <button 
                     onClick = {() => navigate(item.slug)}
                     className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>

                </li>
              ) : null
              )
            }
            {/* Below syntax ka matlab hai agar authStatus true hai to hi () ke andar ka component render hoga */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          
        </nav>
      </Container>
    </header>
  )
}

export default Header