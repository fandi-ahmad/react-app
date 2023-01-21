import { React, useState, useEffect, useRef } from 'react'
import BaseButton from '../../components/input/BaseButton'
import Sidebar from '../../components/Sidebar'
import MenuBtn from '../../function/MenuBtn'
import Resize from '../../function/Resize'
import { GetGate, UpsertGate, DeleteGate } from '../../api/ApiGate'
import { Button, Modal, Form } from 'react-bootstrap'
import { AlertSuccess, AlertError, AlertConfirm } from '../../assets/sweetAlert'

const Gate = () => {
    const [gateLists, setGateList] = useState([])

    const [id, setId] = useState()
    const [name, setName] = useState('');
    const [status, setStatus] = useState('online');
    const [networkIp, setNetworkIp] = useState('');
    const [uid, setUid] = useState('');
    const [timezone, setTimezone] = useState('')
    const [deviceGw, setDeviceGw] = useState('')
    const [deviceDns, setDeviceDns] = useState('')
    const [deviceSn, setDeviceSn] = useState('')
    const [heartbeat, setHeartbeat] = useState('')
    const [opMode, setOpMode] = useState('')

    const [showModal, setShowModal] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [pageOf, setPageOf] = useState();

    // const createNewBtn = useRef(null)
    const createBtn = useRef(null)
    const updateBtn = useRef(null)

    // show all data in table
    const getAllData = () => {
        GetGate(limit, page, '', '', '')
        .then(data => {
            setGateList(data.data)

            setTotal(data.meta.total)
            setPageOf(Math.ceil(total / limit));
        });
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
        } else if (name === 'status') {
            setStatus(value);
        } else if (name === 'networkIp') {
            setNetworkIp(value);
        } else if (name === 'uid') {
            setUid(value);
        }
    }

    const showCreateForm = () => {
        handleShowModal()
        setTimeout(() => {
            createBtn.current.className = 'btn btn-primary d-block'
            updateBtn.current.className = 'd-none'
        }, 0);
    }

    // create data
    const upsertData = () => {
        UpsertGate({
            name: name,
            Status: status,
            network_ip: networkIp,
            uid: uid,
        })
        .then(response => {
            getAllData()
            handleCloseModal()
            resetData()
            AlertSuccess('data has been created')
        }).catch(error => {
            handleCloseModal()
            setTimeout(() => {
                AlertError('Ups, something wrong!')
            }, 100);
        });
    }

    // reset data in form
    const resetData = () => {
        setId()
        setName('')
        setStatus('online')
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

    // delete data
    const deleteData = (id) => {
        AlertConfirm({
            title: 'Delete?',
            confirmText: 'Yes, Delete It',
            preConfirm: () => {
                DeleteGate(id)
                .then((result) => {
                    AlertSuccess('data has been deleted')
                    getAllData()
                }).catch((err) => {
                    AlertError('Ups, something wrong!')
                });
            }
        })
    }

    const showUpdateForm = (gateList) => {
        handleShowModal()
        setId(gateList.id)
        setName(gateList.name)
        setStatus(gateList.status)
        setNetworkIp(gateList.network_ip)
        setUid(gateList.uid)
        setTimeout(() => {
            createBtn.current.className = 'd-none'
            updateBtn.current.className = 'btn btn-primary d-block'
        }, 0);
    }

    // update
    const updateData = () => {
        UpsertGate({
            id: id,
            name: name,
            Status: status,
            network_ip: networkIp,
            uid: uid,
        })
        .then(response => {
            getAllData()
            handleCloseModal()
            resetData()
            AlertSuccess('data has been updated')
        }).catch(error => {
            handleCloseModal()
            setTimeout(() => {
                AlertError('Ups, something wrong')
            }, 100);
        });
    }

    // display timezone
    const displayTimeZone = (timezone) => {
        if (timezone == 'Asia/Jakarta') {
            return 'Jakarta'
        } else if (timezone == 'Asia/Makassar') {
            return 'Makassar'
        } else if (timezone == 'Asia/Jayapura') {
            return 'Jayapura'
        } else {
            return 'indefined'
        }
    }
   
    // display in op_mode
    const displayOpMode = (op_mode) => {
        if (op_mode == '0') {
            return 'disable'
        } else if (op_mode == '1') {
            return 'in'
        } else if (op_mode == '2') {
            return 'out'
        } else if (op_mode == '3') {
            return 'in/out'
        } else if (op_mode == '4') {
            return 'drop'
        } else {
            return 'undefined'
        }
    }

    // display class in op_mode
    const classOpMode = (op_mode) => {
        if (op_mode == '0') {
            return 'bg-secondary'
        } else if (op_mode == '1') {
            return 'bg-success'
        } else if (op_mode == '2') {
            return 'bg-danger'
        } else if (op_mode == '3') {
            return 'bg-warning text-dark'
        } else if (op_mode == '4') {
            return 'bg-info text-dark'
        } else {
            return 'undefined'
        }
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
                                <label>Uid</label>
                                <Form.Control placeholder="" name="uid" value={uid} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label>Network Ip</label>
                            <Form.Control placeholder="network ip" name="networkIp" value={networkIp} onChange={handleChange} />
                        </div>

                        <div className='d-flex justify-content-end gap-3 mt-5'>
                            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                            <Button className='btn-primary' ref={createBtn} onClick={upsertData}>Create</Button>
                            <Button className='btn-primary' ref={updateBtn} onClick={updateData}>Update</Button>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className='container-fluid h-100 p-0'>
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
                        <h2>Gate</h2>
                        <Button variant="primary" onClick={showCreateForm}>Create New</Button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope='col' style={{width: '40px'}}>No</th>
                                <th scope="col" style={{minWidth: '200px'}}>Name</th>
                                <th scope="col">Timezone</th>
                                <th scope="col">Status</th>
                                <th scope="col">Network</th>
                                <th scope="col">Created</th>
                                <th scope="col">Update</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gateLists.map((gateList, index) => {
                                return (
                                    <tr key={gateList.id}>
                                        <td>{index + 1}</td>
                                        <td>{gateList.name}</td>
                                        <td>{displayTimeZone(gateList.timezone)}</td>
                                        <td>
                                            <div className='d-flex flex-row'>
                                                <div style={{minWidth: '120px'}}>
                                                    <b>Uid</b>
                                                    <div>{gateList.uid}</div>
                                                </div>
                                                <div>
                                                    <b>Status</b>
                                                    <div>{gateList.status}</div>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-row'>
                                                <div style={{minWidth: '120px'}}>
                                                    <b>Heartbeat</b>
                                                    <div>{gateList.heartbeat_interval}</div>
                                                </div>
                                                <div>
                                                    <b>Op Mode</b>
                                                    <div>
                                                        <span className={`badge ${classOpMode(gateList.op_mode)}`} style={{minWidth: '60px'}}>{displayOpMode(gateList.op_mode)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='d-flex flex-row'>
                                                <div style={{minWidth: '130px'}}>
                                                    <b>Network Ip</b>
                                                    <div>{gateList.network_ip}</div>
                                                </div>
                                                <div>
                                                    <b>Gateway</b>
                                                    <div>{gateList.device_gw}</div>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-row'>
                                                <div style={{minWidth: '130px'}}>
                                                    <b>Device DNS</b>
                                                    <div>{gateList.device_dns}</div>
                                                </div>
                                                <div>
                                                    <b>Subnet Mask</b>
                                                    <div>{gateList.device_sn}</div>
                                                </div>
                                            </div>
                                            
                                        </td>
                                        <td>
                                            <small>{gateList.created_at}</small>
                                        </td>
                                        <td>
                                            <small>{gateList.updated_at}</small>
                                        </td>
                                        <td>
                                            <Button className='btn-sm btn-primary mt-1 ms-1' onClick={() => showUpdateForm(gateList)}>
                                                <i className="fa-solid fa-pen"></i>
                                            </Button>
                                            <Button className='btn-sm btn-danger mt-1 ms-1' onClick={() => deleteData(gateList.id)}>
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
            <MenuBtn />
            <Resize />
        </div>
    )
}

export default Gate