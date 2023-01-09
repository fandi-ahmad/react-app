import { React, useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import MenuBtn from '../../function/MenuBtn'
import Resize from '../../function/Resize'
import { Button, Modal, Form } from 'react-bootstrap'
import BaseButton from '../../components/input/BaseButton'
import { GetEvent } from '../../api/ApiEvent'

const Event = () => {
    const [eventLists, setEventLists] = useState([])
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [pageOf, setPageOf] = useState();

    // next btn
    const handleNextPage = () => {
        setPage(page + 1);
    }
    
    // prev btn
    const handlePrevPage = () => {
        setPage(page - 1);
    }

    // get all data in table
    const getAllData = () => {
        GetEvent(limit, page, '')
        .then(data => {
            setEventLists(data.data)
            setTotal(data.meta.total)
            setPageOf(Math.ceil(total / limit));
        });
    }

    useEffect(() => {
        getAllData()

    }, [page, pageOf])

    return (
        <div>
            <Sidebar />
            <section className='p-4 my-container h-100vh' id='section'>
                <BaseButton id='menuBtn' name={<i className="fa-solid fa-bars"></i>} />
                <div className='container-fluid h-100 p-0'>
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <h2>Event</h2>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{width: '40px'}}>No</th>
                                <th scope="col">Code</th>
                                <th scope="col" style={{width: '350px'}}>Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End date</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventLists.map((eventList, index) => {
                                return (
                                    <tr key={eventList.id}>
                                        <td>{index + 1}</td>
                                        <td>{eventList.code}</td>
                                        <td>{eventList.name}</td>
                                        <td>
                                            <small>{eventList.address}</small>
                                        </td>
                                        <td>
                                            <small>{eventList.start_date}</small>
                                        </td>
                                        <td>
                                            <small>{eventList.end_date}</small>
                                        </td>
                                        <td>{eventList.status}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div className='d-flex justify-content-end align-items-center gap-3 pb-4'>
                        <Button variant='secondary' onClick={handlePrevPage} disabled={page === 1}>
                            <i className="fa-solid fa-chevron-left"></i> Previous
                        </Button>
                        <span>Page {page} of {pageOf}</span>
                        <Button variant='secondary' onClick={handleNextPage} disabled={page === pageOf}>
                            Next <i className="fa-solid fa-chevron-right"></i>
                        </Button>
                    </div>
                </div>
            </section>
            <MenuBtn/>
            <Resize/>
        </div>
    )
}

export default Event