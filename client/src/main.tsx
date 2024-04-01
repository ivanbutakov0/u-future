import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import './index.scss'
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
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
