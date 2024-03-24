import { useContext } from 'react'
import { ColorModeContext } from '../Layout/Layout'
import DarkModeSwitch from '../ui/DarkModeSwitch/DarkModeSwitch'

const Header = () => {
	const colorMode = useContext(ColorModeContext)

	return (
		<header>
			Header
			<DarkModeSwitch onClick={colorMode.toggleColorMode} />
		</header>
	)
}
export default Header
