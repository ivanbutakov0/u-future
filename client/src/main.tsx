import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/Layout'
import './index.scss'
import CreateCourse from './pages/CreateCourse'
import EditCourse from './pages/EditCourse'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UnderConstruction from './pages/UnderConstruction'
import { store } from './redux/store'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <h1>Home</h1>,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <SignUp />,
			},
			{
				path: '/courses',
				element: <UnderConstruction />,
			},
			{
				path: '/teachers',
				children: [
					{
						path: '/teachers/create',
						element: <CreateCourse />,
					},
					{
						path: '/teachers/edit/:id',
						element: <EditCourse />,
					},
				],
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
				<ToastContainer autoClose={3000} position='bottom-right' />
			</Provider>
		</React.StrictMode>
	</GoogleOAuthProvider>
)
