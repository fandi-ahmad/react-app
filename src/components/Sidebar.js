import { React, useEffect }from 'react'
import { Link } from 'react-router-dom'

const Sidebar = (props) => {

    useEffect(() => {
        const sideBarId = document.getElementById('sidebar')
        const closeMenuId = document.getElementById('closeMenu')

        closeMenuId.addEventListener('click', function() {
            sideBarId.classList.toggle('active-nav')
        })
    }, [])

    return (
        <div>
            <nav id='sidebar' className="navbar navbar-expand d-flex flex-column align-item-start bg-primary py-4">
                <div className="d-flex justify-content-start align-items-center">
                    <button className="btn btn-light btn-sm">
                        <i className="fa-solid fa-house"></i>
                    </button>
                    <span className="h6 ms-2 my-0 text-white">Fandi Ahmad</span>
                    <button className="btn none text-light" id="closeMenu"><i className="fa-solid fa-xmark"></i></button>
                </div>

                <div className="mt-5 w-100 mx-2 mb-5">
                    <ul className="list-group list-group-flush base-link-sidebar">
                        <Link to={"/"} className="text-decoration-none rounded-2">
                            <li className="list-group-item bg-transparent border-0 text-light">
                                <span><i className="fa-solid fa-house"></i><span>Status</span></span>
                            </li>
                        </Link>
                        <li className="list-group-item bg-transparent border-0 text-light pointer" data-bs-toggle="collapse" data-bs-target="#collapseExample">
                            <span><i className="fa-solid fa-gear"></i><span>Setting</span></span>
                        </li>
                        <div className="collapse show" id="collapseExample">
                            <ul className="list-group list-group-flush base-link-sidebar ms-4" id="stopRefresh">
                                <Link to={"/gate"} className="text-decoration-none rounded-2">
                                    <li className="list-group-item bg-transparent border-0 text-light">
                                        <span><i className="fa-solid fa-torii-gate"></i><span>Gate</span></span>
                                    </li>
                                </Link>
                                <Link to={"/event"} className="text-decoration-none rounded-2">
                                    <li className="list-group-item bg-transparent border-0 text-light">
                                        <span><i className="fa-solid fa-calendar-check"></i><span>Event</span></span>
                                    </li>
                                </Link>
                                <Link to={"/setup-event-gate"} className="text-decoration-none rounded-2">
                                    <li className="list-group-item bg-transparent border-0 text-light fs-14">
                                        <span><i className="fa-solid fa-calendar-days"></i><span>Setup Event Gate</span></span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                        <div  className="text-decoration-none rounded-2" id="stopRefresh2">
                            <li className="list-group-item bg-transparent border-0 text-light">
                                <span><i className="fa-solid fa-cart-shopping"></i><span>Order</span></span>
                            </li>
                        </div>
                        <div className="text-decoration-none rounded-2" id="stopRefresh3">
                            <li className="list-group-item bg-transparent border-0 text-light">
                                <span><i className="fa-solid fa-user"></i><span>Event Pegawai</span></span>
                            </li>
                        </div>
                    </ul>
                </div>

                <div className="h-100 d-flex align-items-end justify-content-center">
                    <div >
                    <button className="btn text-light">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <span className="ms-2">Logout</span>
                    </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar