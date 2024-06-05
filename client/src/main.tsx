import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChapterPage from './components/Course/ChapterPage'
import CourseHome from './components/Course/CourseHome'
import Layout from './components/Layout'
import './index.scss'
import CoursePageLayout from './pages/CoursePage'
import CreateCourse from './pages/CreateCourse'
import EditChapter from './pages/EditChapter'
import EditCourse from './pages/EditCourse'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login'
import MyCourses from './pages/MyCourses'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import SignUp from './pages/SignUp'
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
				path: '/profile',
				element: <ProfilePage />,
			},
			{
				path: '/courses',
				children: [
					{
						path: '/courses',
						element: <SearchPage />,
					},
					{
						path: '/courses/:id',
						element: <CoursePageLayout />,
						children: [
							{
								path: '/courses/:id/home',
								element: <CourseHome />,
							},
							{
								path: '/courses/:id/:chapterId',
								element: <ChapterPage />,
							},
						],
					},
				],
			},
			{
				path: '/teachers',
				children: [
					{
						path: '/teachers/create',
						element: <CreateCourse />,
					},
					{
						path: '/teachers/courses',
						element: <MyCourses />,
					},
					{
						path: '/teachers/edit/:id',
						element: <EditCourse />,
					},
					{
						path: '/teachers/edit/:courseId/chapters/:chapterId',
						element: <EditChapter />,
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
