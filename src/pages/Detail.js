import { React, useState, useEffect} from 'react'
import { useParams, Outlet, Link } from 'react-router-dom'

const Detail = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            setUser(data)
        }).catch((err) => {
            console.log(err)
        });
    }, [id])

    return (
        <div>
            <h2>detail page</h2>
            <p>detai id: {id}</p>
            <pre>{JSON.stringify(user, null, 4)}</pre>
            <hr/>
            <nav>
                <Link to="post">Post</Link> | 
                <Link to="product">Product</Link>
            </nav>
                <Outlet />
        </div>
    )
}

export default Detail