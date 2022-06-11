import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Add new students</Link>
            <br />
            <Link to="/admin">View all users</Link>
            <br />
            <Link to="/students">View all records</Link>
            <br />
            <Link to="/search">Search existing records</Link>
            <br />
            <Link to="/update">Update existing records</Link>
            <br />
            <Link to="/delete">Delete existing records</Link>
            <br/>
            <Link to="/linkpage">View all links</Link>
            
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
