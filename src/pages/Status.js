import React from 'react'

// components
import Sidebar from '../components/Sidebar'
import BaseSelect from '../components/input/BaseSelect'

const Status = () => {
    return (
        <div>
            <Sidebar />
            <section className='p-4 my-container h-100vh d-flex flex-column'>
                <div className='container-fluid h-100 p-0'>
                    <BaseSelect label='event'>
                        <option>satu</option>
                        <option>dua</option>
                        <option>tiga</option>
                    </BaseSelect>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope='col' style={{width: '40px'}}>No</th>
                                <th scope="col" style={{width: '400px'}}>Name</th>
                                <th scope="col" style={{width: '120px'}}>Status</th>
                                <th scope="col" style={{width: '120px'}}>Direction</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Status