import { IoCart, IoPersonCircleSharp } from 'react-icons/io5'
import { Link, Outlet } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'

const Navbar = () => {
  return (
    <>
        <nav>
            <ul className='flex justify-between'>
                <li>
                    <img className='h-14' src="/Delaware-logo.png" alt="Delaware logo" />
                </li>
                <ul className='flex'>
                    <li className='items-end'>
                        <Link to="/winkelmand">
                            <IconButton disableRipple={true}>
                                <IoCart className='text-red-600' size={38} />
                            </IconButton>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profiel">
                            <IconButton disableRipple={true}>
                                <IoPersonCircleSharp className='text-red-600' size={38} />
                            </IconButton>
                        </Link>
                    </li>
                </ul>
            </ul>
        </nav>

        <Outlet />
    </>
  )
}

export default Navbar