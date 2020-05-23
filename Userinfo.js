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
        if (e.target.value === 'Female') {
            this.setState({ gender: e.target.value });
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

    componentWillMount() {
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
                <div className="row">
                    <div class="col-15">
                        <label htmlFor="fname">Name:</label>
                    </div>
                    <div className="col-65">
                        <input type="text" value={this.state.name} onChange={this.updateName} required placeholder="Your name" />
                    </div>
                </div>

                <div className="row">
                    <div class="col-15">
                        <label htmlFor="fname">Age:</label>
                    </div>
                    <div className="col-65">
                        <input type="text" value={this.state.age} onChange={this.updateAge} required placeholder="Your Age" />
                    </div>
                </div>

                <div className="row">
                    <div class="col-15">
                        <label htmlFor="fname">Gender:</label>
                    </div>
                    <div className="col-65">
                        <select onChange={this.updateGender}>
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
                        <textarea onChange={this.updateAbout} value={this.state.about} required placeholder="About yourself"></textarea>
                    </div>
                </div>


                <div className="row">
                    <label htmlFor="fname">Programming</label>
                    <input type="checkbox" name="box" onClick={this.UpdateSkills} value="Programming" />

                </div>

                <div className="row">
                    <label htmlFor="fname">Gaming</label>
                    <input type="checkbox" name="box" onClick={this.UpdateSkills} value="Gaming" />
                </div>

                <div className="row">
                    <label htmlFor="fname">Sleeping</label>
                    <input type="checkbox" name="box" onClick={this.UpdateSkills} value="Sleeping" />
                </div>


                <button type="submit">Submit</button>

                <div className="row">
                    <ul>
                        {
                            this.arr.map(item => {
                                return (
                                    <li key={item.id}>
                                        {item.name}{' '}
                                        {item.age}{' '}
                                        {item.gender}{' '}
                                        {item.skills}{' '}
                                        {item.about}{' '}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </form>
        )
    }
}

