import { useEffect } from 'react';
import Contacts from './components/contacts/Contacts';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import RequireAuth from './components/Authentication/RequireAuth';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { fetchContacts } from './store/reducers/ActionCreators';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';

function App() {
  const dispatch = useAppDispatch();
  const { contacts, isLoading, error } = useAppSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <Router>
      <div className='App'>
        <Layout>
          {/* {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && JSON.stringify(contacts, null, 2)} */}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path='/contacts' element={<Contacts />} />
            </Route>
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
