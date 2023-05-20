import { useAuth0 } from '@auth0/auth0-react';
import './style.css';


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button className="logout" onClick={() => logout()}>
                Sign Out
            </button>
        )
    )
}

export default LogoutButton;