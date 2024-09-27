import logo from './logo.svg';
import './App.css';
import { RouterProvider , create, createHashRouter } from 'react-router-dom';
import MainLayout from './Layout/MainLayout.jsx';
import Home from './components/Home/Home.jsx';
import Category from './components/Category/Category.jsx';
import Product from './components/Product/Product.jsx';
import Signin from './components/Signin/Signin.jsx';
import AuthLayout from './Layout/AuthLayout.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import UpdateProduct from './components/UpdateProduct/UpdateProduct.jsx';

function App() {


  let routes = createHashRouter([
    {path:'/' , element:<MainLayout/>,children:[
      {index:true,element:<ProtectedRoutes> <Home/> </ProtectedRoutes> },
      {path:'home',element:<ProtectedRoutes> <Home/> </ProtectedRoutes> },
      {path:'category',element:<ProtectedRoutes> <Category/> </ProtectedRoutes> },
      {path:'product',element:<ProtectedRoutes> <Product/> </ProtectedRoutes> },
      {path:'updateProduct',element:<ProtectedRoutes> <UpdateProduct/> </ProtectedRoutes> },

    ] 
  },
  {path:'/' , element:<AuthLayout/>,children:[
    
    {path:'Signin',element:<Signin/>},

  ] 
}
  ])

  return (
   <>

<RouterProvider router={routes}/>
   </>
  );
}

export default App;
