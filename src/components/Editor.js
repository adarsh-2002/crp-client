import { Link } from "react-router-dom"
import { axiosPrivate } from "../api/axios"

const Editor = () => {
    return (
        <section>
            <h1>Add Students Page</h1>
            <br />
            <p>Add Students</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Editor
