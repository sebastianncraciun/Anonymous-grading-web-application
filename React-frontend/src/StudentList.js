import { useEffect, useState } from "react"
import store from "./StudentStore"
import StudentAddForm from "./StudentAddForm"

function StudentList(){
    const [students, setStudents] = useState([])
    useEffect(() => {
        store.getStudents()
        store.emmiter.addListener('GET_STUDENTS_SUCCESS', () => {
            setStudents(store.data)
        })
    },[])

    const addStudent = (student) => {
        store.addStudent(student)
    }

    return(
        <div>
            <h4>Students</h4>
            {
            students.map(e => <div key={e.id}>{e.name}</div>)
            }
            <StudentAddForm onAdd={addStudent}/>
        </div>
)
}
export default StudentList