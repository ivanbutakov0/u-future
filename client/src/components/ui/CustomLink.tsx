import { Link, SxProps, Theme } from '@mui/material'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'

type CustomLinkProps = {
	to: string
	navLink?: boolean
	children: React.ReactNode
	type?: 'default' | 'button'
	paddings?: 'disabled' | 'small' | 'large'
	styles?: SxProps<Theme>
}

const CustomLink = ({
	to,
	navLink = false,
	type = 'default',
	paddings = 'disabled',
	styles,
	children,
}: CustomLinkProps) => {
	let padding = '0'

	switch (paddings) {
		case 'disabled':
			padding = '0'
			break
		case 'small':
			padding = '6px 12px'
			break
		case 'large':
			padding = '10px 20px'
			break
		default:
			padding = '0'
	}

	const defaultStyles =
		type === 'default'
			? {
					transition: 'all 0.2s ease-in-out',
					':hover': {
						color: 'text.secondary',
					},
			  }
			: {
					transition: 'all 0.2s ease-in-out',
					backgroundColor: 'primary.main',
					':hover': {
						backgroundColor: 'accent.main',
					},
			  }

	return (
		<Link
			to={to}
			component={navLink ? RouterNavLink : RouterLink}
			underline='none'
			color='inherit'
			padding={'2px 12px'}
			borderRadius='5px'
			sx={{ padding, ...defaultStyles, ...styles }}
		>
			{children}
		</Link>
	)
}
export default CustomLink
