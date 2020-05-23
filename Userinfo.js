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

    updateName = (e) => {
        this.setState({ name: e.target.value, id: 1 + Math.random() })
    }

    updateAge = (e) => {
        this.setState({ age: e.target.value })
    }

    updateGender = (e) => {
     if(e.target.value == 'Female'){
        this.setState({gender: e.target.value});
     }  
    }

    updateAbout = (e) => {
        this.setState({ about: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.arr.push(this.state)
        localStorage.setItem('personDetails', JSON.stringify(this.arr))
        this.forceUpdate()
        e.target.reset();
        this.setState(this.baseState)
    }

    UpdateSkills = (e) => {
        const temp = [...this.state.skills];
        temp.push(e.target.value)
        this.setState({
            skills: temp
        })
    }

    UNSAFE_componentWillMount() {
        var data = localStorage.getItem('personDetails');
        if (data != null) {
            data = JSON.parse(data);
            for (let index = 0; index < data.length; index++) {
                this.arr.push(data[index])
            }
        }
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div>
                    <label>Name:</label>
                    <input type="text" value={this.state.name} onChange={this.updateName} required />
                </div>

                <div>
                    <label>Age:</label>
                    <input type="text" value={this.state.age} onChange={this.updateAge} required />
                </div>

                <div>
                    <label>Gender:</label>
                    <select onChange={this.updateGender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label>About You</label>
                    <textarea onChange={this.updateAbout} value={this.state.about} required></textarea>
                </div>

                <button type="submit">Submit</button>
                <div>
                <ul>
                    {
                        this.arr.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.name}
                                    {item.age}
                                    {item.gender}
                                </li>
                            )
                        })
                    }
                </ul>
                </div>
             
               Programming <input type="checkbox" name="box" onClick={this.UpdateSkills} value="Programming"/>
               Gaming <input type="checkbox"  name="box" onClick={this.UpdateSkills} value="Gaming"  />
               Sleeping <input type="checkbox" name="box" onClick={this.UpdateSkills} value="Sleeping" />

            </form>
        )
    }
}

