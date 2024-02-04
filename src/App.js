import './App.css';
import Login from './pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './pages/Navbar';
import Signup from './pages/Signup';
import Home from './pages/Home'
import Search from './pages/Search';
import Profile from './pages/Profile';
import Main from './Layout/Main';
import Mentor from './pages/Mentor';
import Courses from './pages/Courses';
import { RequireAuth } from 'react-auth-kit'

function App() {
  const router = createBrowserRouter([
    {path:'/', element: <Main></Main>,
  children: [{path:'/Signup', element: <Signup></Signup>},
  {path:'/', element: <Home></Home>},
  {path:'/Login', element: <Login></Login>},
  {path:'/Home', element: <Home></Home>},
  {path:'/Search', element: <Search></Search>},
  {path:'/Profile', element: <Profile></Profile>},
  {path:'/Mentor/:id', element: <Mentor></Mentor>},
  {path: '/Mentor/:id/Courses', element: <RequireAuth loginPath='/Login'>
 <Courses></Courses>
  </RequireAuth>}
]},
  
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
