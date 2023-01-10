import { React, useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import BaseButton from '../../components/input/BaseButton'
import Sidebar from '../../components/Sidebar'
import MenuBtn from '../../function/MenuBtn'
import Resize from '../../function/Resize'
import { GetEventGate, UpsertEventGate } from '../../api/ApiEventGate'
import { GetGate } from '../../api/ApiGate'
import { GetEvent } from '../../api/ApiEvent'
import BaseToggle from '../../components/input/BaseToggle'
import { AlertSuccess, AlertError } from '../../assets/sweetAlert'

const EventGate = () => {
    const [eventGateLists, setEventGateList] = useState([])
    const [eventLists, setEventLists] = useState([])
    const [gateLists, setGateLists] = useState([])

    const [gateId, setGateId] = useState()
    const [eventId, setEventId] = useState()
    const [isActive, setIsActive] = useState(false)
    const [direction, setDirection] = useState('IN')
    const [openTime, setOpenTime] = useState()
    const [closeTime, setCLoseTime] = useState()

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [pageOf, setPageOf] = useState();
    const [showModal, setShowModal] = useState(false);

    const showCreateForm = () => {
        handleShowModal()
    }

    // next btn
    const handleNextPage = () => {
        setPage(page + 1);
    }
    
    // prev btn
    const handlePrevPage = () => {
        setPage(page - 1);
    }

    // show modal
    const handleShowModal = () => {
        setShowModal(true);
    }

    // close modal
    const handleCloseModal = () => {
        setShowModal(false);
        resetData()
    }

    // reset all data in form input
    const resetData = () => {
        setEventId()
        setGateId()
        setIsActive(false)
        setDirection('IN')
        setOpenTime()
        setCLoseTime()
    }

    // get all data in table
    const getAllData = () => {
        GetEventGate(limit, page)
        .then(data => {
            setEventGateList(data.data)

            setTotal(data.meta.total)
            setPageOf(Math.ceil(total / limit));
        });
    }

    const getAllEventId = () => {
        GetEvent(9999, 1, '')
        .then(data => {
            setEventLists(data.data)
        });
    }

    const getAllGateId = () => {
        GetGate(9999, 1)
        .then(data => {
            setGateLists(data.data)
        });
    }
    
    const cek = () => {
        console.log(eventId)
        console.log(gateId)
        console.log(isActive)
        console.log(direction)
        console.log(openTime)
        console.log(closeTime)
    }

    // handle every change in form input
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if (name === 'eventId') {
            setEventId(parseInt(value, 10));
        } else if (name === 'gateId') {
            setGateId(parseInt(value, 10));
        } else if (name === 'isActive') {
            setIsActive(value);
        } else if (name === 'direction') {
            setDirection(value);
        } else if (name === 'openTime') {
            setOpenTime(value);
        } else if (name === 'closeTime') {
            setCLoseTime(value);
        }
    }

    // create event gate    (maintenance)
    const createData = () => {
        UpsertEventGate({
            event_id: eventId,
            gate_id: gateId,
            is_active: isActive,
            direction: direction,
            gate_open_time: openTime,
            gate_close_time: closeTime
        })
        .then(response => {
            getAllData()
            handleCloseModal()
            resetData()
            AlertSuccess('data has been created')
            console.log(response)
        }).catch(error => {
            handleCloseModal()
            console.log(error)
            setTimeout(() => {
                AlertError('Ups, something wrong!')
            }, 100);
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
                <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
                    <Modal.Body>
                        <Modal.Title className='mb-3'>Create Event Gate</Modal.Title>
                        <div className='d-flex justify-content-between gap-5 mb-3'>
                            <div className='w-100'>
                                <label>Event Id</label>
                                <Form.Select name='eventId' value={eventId} onChange={handleChange} onClick={getAllEventId}>
                                    <option></option>
                                    {eventLists.map(eventList => {
                                        return (
                                            <option key={eventList.id} value={eventList.id}>{eventList.id}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                            <div className='w-100'>
                                <label>Gate Id</label>
                                <Form.Select name='gateId' value={gateId} onChange={handleChange} onClick={getAllGateId}>
                                    <option></option>
                                    {gateLists.map(gateList => {
                                        return (
                                            <option key={gateList.id} value={gateList.id}>{gateList.id}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between gap-5 mb-3'>
                            <div className='w-100'>
                                <label>Active</label> <br/>
                                <BaseToggle slot={<input type="checkbox" name="isActive" value={isActive} onChange={handleChange} />} />
                            </div>
                            <div className='w-100'>
                                <label>Direction</label>
                                <Form.Select name='direction' value={direction} onChange={handleChange}>
                                    <option value="IN">IN</option>
                                    <option value="OUT">OUT</option>
                                    <option value="IN/OUT">IN/OUT</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className='w-100 mb-3'>
                            <label>Open Time</label>
                            <Form.Control type="datetime-local" step={1} name='openTime' value={openTime} onChange={handleChange} />
                        </div>
                        <div className='w-100 mb-3'>
                            <label>Close Time</label>
                            <Form.Control type="datetime-local" step={1} name='closeTime' value={closeTime} onChange={handleChange} />
                        </div>
                        <div className='d-flex justify-content-end gap-3 mt-5'>
                            <Button variant="secondary" onClick={handleCloseModal} >Close</Button>
                            <Button className='btn-primary' onClick={createData}>Create</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='container-fluid h-100 p-0'>
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <h2>Setup Event Gate</h2>
                        <Button variant="primary" onClick={showCreateForm}>Create New</Button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{width: '40px'}}>No</th>
                                <th scope="col" style={{minWidth: '300px'}}>Other</th>
                                <th scope="col">Open Time</th>
                                <th scope="col">Close Time</th>
                                <th scope="col">Create</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventGateLists.map((eventGateList, index) => {
                                const isActive = eventGateList.is_active
                                const isActiveString = isActive.toString();
                                return (
                                    <tr key={eventGateList.id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="d-flex flex-row gap-4 fw-bold">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Event Id</td>
                                                            <td>: {eventGateList.event_id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Gate Id</td>
                                                            <td>: {eventGateList.gate_id}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Is Active</td>
                                                            <td>: {isActiveString}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Direction</td>
                                                            <td>: {eventGateList.direction}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                        <td>
                                            <small>{eventGateList.gate_open_time}</small>
                                        </td>
                                        <td>
                                            <small>{eventGateList.gate_close_time}</small>
                                        </td>
                                        <td>
                                            <small>{eventGateList.created_at}</small>
                                        </td>
                                        <td>
                                            <Button className='btn-sm btn-danger'>
                                                <i className="fa-sharp fa-solid fa-trash"></i>
                                            </Button>
                                        </td>
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

export default EventGate