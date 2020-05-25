import React, { Component } from 'react'


export default class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            gender: 'male',
            skills: [
            ],
            about: '',
            id: ''
        }
        this.arr = [];
        this.baseState = this.state;
    }

    updateState = (e) => {
        switch (e.target.name) {
            case "name":
                this.setState({ name: e.target.value })
                break;
            case "age":
                this.setState({ age: e.target.value })
                break;
            case "gender":
                this.setState({ gender: e.target.value })
                break;
            case "about":
                this.setState({ about: e.target.value })
                break;
            case "skills":
                if (e.target.checked === true) {
                    const temp = [...this.state.skills];
                    if (!temp.includes(e.target.value)) {
                        temp.push(e.target.value)
                        this.setState({
                            skills: temp
                        })
                    }
                }
                else if (e.target.checked === false) {
                    const temp = [...this.state.skills];
                    let index = temp.indexOf(e.target.value)
                    if (index !== -1) {
                        temp.splice(index, 1);
                        this.setState({
                            skills: temp
                        });
                    }
                }
                break;
            default:
                alert("Error encountered")
        }
        this.setState({
            id: 1 + Math.random()
        })
    }

    resetState = (e) => {
        this.setState(this.baseState)
    }

    updateStorage = (e) => {
        this.arr.push(this.state)
        localStorage.setItem('personDetails', JSON.stringify(this.arr))
    }

    handleSubmit = (e) => {
        this.updateStorage();
        this.resetState(e);
    }

    componentWillMount() {
        var data = localStorage.getItem('personDetails');
        if (data != null) {
            data = JSON.parse(data);
            for (let index = 0; index < data.length; index++) {
                this.arr.push(data[index])
            }
        }
    }

    personDetailTable = (person, index) => {
        return (
            <tr key={index}>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.gender}</td>
                <td>{person.about}</td>
                <td>{person.skills}</td>
            </tr>
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div class="col-15">
                        <label htmlFor="fname">Name:</label>
                    </div>
                    <div className="col-65">
                        <input type="text" value={this.state.name} onChange={this.updateState} required placeholder="Your Name" name="name" />
                    </div>
                </div>

                <div className="row">
                    <div class="col-15">
                        <label htmlFor="fname">Age:</label>
                    </div>
                    <div className="col-65">
                        <input type="text" value={this.state.age} onChange={this.updateState} required placeholder="Your Age" name="age" />
                    </div>
                </div>

                <div className="row">
                    <div class="col-15">
                        <label htmlFor="fname">Gender:</label>
                    </div>
                    <div className="col-65">
                        <select onChange={this.updateGender} name="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div class="col-15">
                        <label htmlFor="fname">About You:</label>
                    </div>
                    <div className="col-65">
                        <textarea onChange={this.updateState} value={this.state.about} required placeholder="About yourself" name="about"></textarea>
                    </div>
                </div>


                <div className="row">
                    <label htmlFor="fname">Programming</label>
                    <input type="checkbox" name="box" onChange={this.updateState} value="Programming" name="skills" />
                </div>

                <div className="row">
                    <label htmlFor="fname">Gaming</label>
                    <input type="checkbox" name="box" onChange={this.updateState} value="Gaming" name="skills" />
                </div>

                <div className="row">
                    <label htmlFor="fname">Sleeping</label>
                    <input type="checkbox" name="box" onChange={this.updateState} value="Sleeping" name="skills" />
                </div>

                <button type="submit">Submit</button>
               
                <div className="row">
                    <br></br>
                <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Age</td>
                                <td>Gender</td>
                                <td>About You</td>
                                <td>Skills</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.arr.map(this.personDetailTable)}
                        </tbody>
                </table>
               </div>
          
            </form>
        )
    }
}

