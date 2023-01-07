import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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

    console.log(users)

    return (
        <div>
            <Navbar />
            <h1>home</h1>
            <ul>
                {users.map(user => {
                    return (
                        <li key={user.id}>
                            <span>
                                {user.name}
                            </span>
                            <button onClick={() => goToDetail(user.id)}>cek</button>
                            <div>{user.username}</div>
                            <div>{user.phone}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Home