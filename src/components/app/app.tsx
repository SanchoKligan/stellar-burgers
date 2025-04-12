import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed'>
        <Route index element={<Feed />} />
        <Route
          path=':number'
          element={
            <Modal title='Хы' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Хы' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile'>
        <Route index element={<Profile />} />
        <Route path='orders'>
          <Route index element={<ProfileOrders />} />
          <Route
            path=':number'
            element={
              <Modal title='Хы' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
      </Route>
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
