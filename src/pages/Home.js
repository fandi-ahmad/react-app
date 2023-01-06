import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((resp) => resp.json())
        .then((data) => {
            setUsers(data)
        }).catch((err) => {
            console.log(err)
        });
    }, []);

    const goToDetail = (id) => {
        navigate(`/detail/${id}`)
    }

    return (
        <div>
            <h1>home</h1>
            <ul>
                {users.map(user => {
                    return (
                        <li key={user.id}>
                            {user.name} | <button onClick={() => goToDetail(user.id)}>cek</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home