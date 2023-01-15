import { useEffect, useState } from "react"
import store from "./StudentStore"
import StudentAddForm from "./StudentAddForm"

function StudentList(){
    const [students, setStudents] = useState([])
    const [team, setTeam] = useState([])

    useEffect(() => {
        store.getStudents()
        store.emmiter.addListener('GET_STUDENTS_SUCCESS', () => {
            const lista = []
            store.data.forEach((element) => lista.push(element));
            const sortedSearch = lista.filter((student)=> student.team === team);
            console.log(sortedSearch);
            setStudents(sortedSearch);
        })
    },[])
    useEffect(() => {
        store.getStudents()
        store.emmiter.addListener('GET_STUDENTS_SUCCESS', () => {
            const lista = []
            store.data.forEach((element) => lista.push(element));
            const sortedSearch = lista.filter((student)=> student.team === team);
            console.log(sortedSearch);
            setStudents(sortedSearch);
        })
    },[team])
    const addStudent = (student) => {
        store.addStudent(student)
    }

    return(
        <div>
            <h4>Students</h4>
            {
                students.map(e => <div key={e.id}>{e.name} Team: {e.team}</div>)
            }
            <StudentAddForm setTeam={setTeam} team={team} onAdd={addStudent}/>
        </div>
)
}
export default StudentList