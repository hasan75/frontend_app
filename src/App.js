import appStyle from './App.module.css';
import './assets/css/main.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivateRoute from './protectedRoute/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PlaceOrder from './pages/PlaceOrder';
import Products from './components/Products';
import PageNotFound from './pages/PageNotFound';
import ContextProvider from './contexts/ContextProvider';
import About from './pages/About';
import SingleProduct from './pages/SingleProduct';
import { useEffect, useState } from 'react';
import TravelBlog from './components/TravelBlog/TravelBlog';

function App() {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className='App'>
      <ContextProvider>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route exact path='/home'>
              <Home></Home>
            </Route>
            <Route path='/about'>
              <About></About>
            </Route>
            <Route path='/blogs'>
              <TravelBlog></TravelBlog>
            </Route>
            <PrivateRoute path='/dashboard'>
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/register'>
              <Register></Register>
            </Route>
            <Route exact path='/products'>
              <Products></Products>
            </Route>
            <PrivateRoute path='/products/:id'>
              <SingleProduct></SingleProduct>
            </PrivateRoute>
            <PrivateRoute path='/placeorder/:id'>
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>
            <Route path='*'>
              <PageNotFound></PageNotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </BrowserRouter>
      </ContextProvider>
      {showBtn && (
        <button onClick={scrollToTop} className='backToTop'>
          {' '}
          <i class='fa-solid fa-arrow-up fa-2x'></i>
        </button>
      )}
    </div>
  );
}

export default App;

// To check the functionality logged in as default admin
// email:  admin@admin.com
// password: 123456
