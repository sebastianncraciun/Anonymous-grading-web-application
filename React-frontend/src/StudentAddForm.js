const { useState } = require("react")

function StudentAddForm(props){
    const {onAdd, setTeam, team} = props
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const add = (evt) => {
        onAdd({
            name,
            email, 
            password,
            team 
        })
    }

    return(
        <div>
            <h4>Add a Student</h4>
            <div>
                <input type='text' placeholder="name" onChange={(evt) => setName(evt.target.value)}/>
            </div>
            <div>
                <input type='text' placeholder="email" onChange={(evt) => setEmail(evt.target.value)}/>
            </div>
            <div>
                <input type='text' placeholder="password" onChange={(evt) => setPassword(evt.target.value)}/>
            </div>
            <div>
                <input type='text' placeholder="team" onChange={(evt) => setTeam(evt.target.value)}/>
            </div>
            <div>
                <input type='button' value='add me!' onClick={add}/>
            </div>
        </div>
    )
}

export default StudentAddForm