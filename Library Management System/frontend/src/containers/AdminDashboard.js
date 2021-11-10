import React from 'react'
import BookTable from './BookTable'
import CreateBook from './CreateBook'


const AdminDashboard = () => {
    return (
        <div>
            <div style={{margin: "20px 50px 0px"}}>
                <CreateBook />
            </div>
            <BookTable />
        </div>
    )
}

export default AdminDashboard
