import { React, useState, useEffect } from 'react'
import BaseButton from '../../components/input/BaseButton'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
// import { Axios } from 'axios'
import MenuBtn from '../../function/MenuBtn'
import { apiGetList, apiUpsert } from '../../api/ApiGate'
import { Button, Modal, InputGroup, Form } from 'react-bootstrap'
import BaseToggle from '../../components/input/BaseToggle'

const Gate = () => {
    const [gateLists, setGateList] = useState([])

    const [name, setName] = useState('');
    const [cameraNumber, setCameraNumber] = useState('');
    const [status, setStatus] = useState('online');
    const [isActive, setIsActive] = useState(false);
    const [networkIp, setNetworkIp] = useState('');
    const [uid, setUid] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [pageOf, setPageOf] = useState();

    // show all data in table
    const getAllData = () => {
        apiGetList(limit, page)
        .then(data => {
            setGateList(data.data)

            setTotal(data.meta.total)
            setPageOf(Math.ceil(total / limit));
        });
    }

    const cekPage = () => {
        console.log(total)
        console.log(limit)
        console.log(pageOf)
    }

    // next btn
    const handleNextPage = () => {
        setPage(page + 1);
    }
    
    // prev btn
    const handlePrevPage = () => {
        setPage(page - 1);
    }

    
    // handle change in form input
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'name') {
            setName(value);
        } else if (name === 'cameraNumber') {
            setCameraNumber(parseInt(value, 10));
        } else if (name === 'status') {
            setStatus(value);
        } else if (name === 'isActive') {
            setIsActive(value);
        } else if (name === 'networkIp') {
            setNetworkIp(value);
        } else if (name === 'uid') {
            setUid(value);
        }
    }

    // create data
    const handleSubmit = () => {
        console.log({
            name: name,
            camera_number: cameraNumber,
            Status: status,
            is_active: isActive,
            network_ip: networkIp,
            uid: uid,
        })
        apiUpsert({
            name: name,
            camera_number: cameraNumber,
            Status: status,
            is_active: isActive,
            network_ip: networkIp,
            uid: uid,
        })
        .then(response => {
            console.log(response.data);
            getAllData()
            handleCloseModal()
            resetData()
        }).catch(error => {
            console.log(error);
        });
    }

    // reset data in form
    const resetData = () => {
        setName('')
        setCameraNumber('')
        setStatus('online')
        setIsActive(false)
        setUid('')
        setNetworkIp('')
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

    const deleteData = (id) => {
        console.log(id)
    }
   

    // run in first load
    useEffect(() => {
        getAllData()

    }, [page, pageOf]);

    

    return (
        <div>
            <Sidebar />
            <section className='p-4 my-container h-100vh' id='section'>
            
                <BaseButton id='menuBtn' name={<i className="fa-solid fa-bars"></i>} />

                <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
                    <Modal.Body>
                        <Modal.Title className='mb-3'>Create Gate</Modal.Title>
                        <div>
                            <label>Name</label>
                            <Form.Control placeholder="name" name="name" value={name} onChange={handleChange} />
                        </div>
                        <div className='d-flex justify-content-between gap-3 mt-3 mb-3'>
                            <div>
                                <label>Status</label>
                                <Form.Select name="status" value={status} onChange={handleChange}>
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                    <option value="maintenance">Maintenance</option>
                                </Form.Select>
                            </div>
                            <div>
                                <label>Camera Number</label>
                                <Form.Control placeholder="" name="cameraNumber" value={cameraNumber} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Uid</label>
                                <Form.Control placeholder="" name="uid" value={uid} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Is Active</label>
                                <BaseToggle slot={<input type="checkbox" name="isActive" checked={isActive} onChange={handleChange} />} />
                            </div>
                        </div>
                        <div>
                            <label>Network Ip</label>
                            <Form.Control placeholder="network ip" name="networkIp" value={networkIp} onChange={handleChange} />
                        </div>

                        <div className='d-flex justify-content-end gap-3 mt-5'>
                            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                            <Button variant="primary" onClick={handleSubmit}>Save</Button>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className='container-fluid h-100 p-0'>
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <h2>Gate</h2>
                        <Button variant="primary" onClick={handleShowModal}>Create New</Button>
                    </div>

                    <button onClick={cekPage}>cek page</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope='col' style={{width: '40px'}}>No</th>
                                <th scope="col" style={{width: '200px'}}>Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Camera Number</th>
                                <th scope="col">Active</th>
                                <th scope="col">Network Ip</th>
                                <th scope="col">Uid</th>
                                <th scope="col">Created</th>
                                <th scope="col">Update</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gateLists.map((gateList, index) => {
                                const isActive = gateList.is_active
                                const isActiveString = isActive.toString();
                                return (
                                    <tr key={gateList.id}>
                                        {/* <td>{index + 1}</td> */}
                                        <td>{gateList.id}</td>
                                        <td>{gateList.name}</td>
                                        <td>{gateList.status}</td>
                                        <td className='text-center'>{gateList.camera_number}</td>
                                        <td>{isActiveString}</td>
                                        <td>{gateList.network_ip}</td>
                                        <td>{gateList.uid}</td>
                                        <td>
                                            <small>{gateList.created_at}</small>
                                        </td>
                                        <td>
                                            <small>{gateList.updated_at}</small>
                                        </td>
                                        <td>
                                            <BaseButton className='btn-sm btn-primary mt-1 ms-1' name={<i className="fa-solid fa-pen"></i>} />
                                            <BaseButton onClick={() => deleteData(gateList.id)} className='btn-sm btn-danger mt-1 ms-1' name={<i className="fa-sharp fa-solid fa-trash"></i>} />
                                            <Button className='btn-sm' onClick={() => deleteData(gateList.id)}>cek</Button>
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
            <MenuBtn />
        </div>
    )
}

export default Gate