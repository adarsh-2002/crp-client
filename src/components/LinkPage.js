import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/editor">Add Student Record</Link>
            <Link to="/students">View all student records</Link>
            <Link to="/search">Search records</Link>
            <Link to="/update">Update records</Link>
            <Link to="/delete">Delete records</Link>
            <Link to="/admin">View users (Admin only)</Link>
        </section>
    )
}

export default LinkPage
