import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import massageSlice from './redux/slices/massage.slice.ts'
import { Provider } from 'react-redux'
import userSlice from './redux/slices/user.slice.ts'

const myStore = configureStore({ reducer: combineSlices(massageSlice, userSlice) })

createRoot(document.getElementById('root')!).render(
  <Provider store={myStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
