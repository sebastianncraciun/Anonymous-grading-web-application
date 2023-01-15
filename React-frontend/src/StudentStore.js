import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class StudendtStore{
    constructor(){
        this.data = []
        this.emmiter = new EventEmitter()
    }

    async getStudents(){
        try{
            const response = await fetch(`${SERVER}/students`)
            if(!response.ok){
                throw response
            }
            this.data = await response.json()
            this.emmiter.emit('GET_STUDENTS_SUCCESS')
        } catch(err){
            console.warn(err)
            this.emmiter.emit('GET_STUDENTS_ERROR')
        }
    }

    async addStudent(student){
        try{
            const response = await fetch(`${SERVER}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(student)
            })
            if(!response.ok){
                throw response
            }
            this.getStudents()
        } catch(err){
            console.warn(err)
            this.emmiter.emit('ADD_STUDENT_ERROR')
        }
    }

    async updateStudent(id, student){}
    
    async deleteStudent(student){}
}

const store = new StudendtStore()

export default store