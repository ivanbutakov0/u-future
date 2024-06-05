import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Badge, BadgeProps, IconButton, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux/store'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
		right: -3,
		top: 0,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: '0 4px',
	},
}))

const Cart = () => {
	const navigate = useNavigate()
	const cart = useSelector((state: RootState) => state.cart.items)

	const handleClick = () => {
		navigate('/cart')
	}

	return (
		<IconButton aria-label='cart' onClick={handleClick}>
			<StyledBadge badgeContent={cart.length} color='primary'>
				<ShoppingCartIcon />
			</StyledBadge>
		</IconButton>
	)
}
export default Cart
