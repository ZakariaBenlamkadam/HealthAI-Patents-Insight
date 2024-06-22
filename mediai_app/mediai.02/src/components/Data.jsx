import { useEffect , useState} from "react"
import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const Data = () => {
    const[patents, setPatents] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3001/getUsers')
        .then(response => setPatents(response.data.patents))
        .catch(err => console.log(err))

    },[])
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50">
        <table className="table">
            <thead>
                <tr>
                    <th>publication_number</th>
                    <th>title</th>
                    <th>abstract</th>
                    <th>inventors</th>
                    <th>publication_date</th>
                </tr>
            </thead>
                
            <tbody>
                {users.map(user => {
                        return <tr> 
                            <td>{user.Publication_Number}</td>
                            <td>{user.Title}</td>
                            <td>{user.Abstract}</td>
                            <td>{user.Inventors}</td>
                            <td>{user.Publication_Date}</td>
                        </tr>
                    })
                }

            </tbody>
        </table>
        </div>
    </div>
  );
}

export default Data
