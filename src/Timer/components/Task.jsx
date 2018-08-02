import React, { Component } from 'react';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], newTask: '', clickedTask: '' };
        this.handleChange = this.handleChange.bind(this);
        this.createTask = this.createTask.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ newTask: event.target.value });
    }

    createTask(event) {
        event.preventDefault();
        // this.tasksRef.push({ task: this.state.newTask, timeAdded: this.props.firebase.database.ServerValue.TIMESTAMP });
        let tmp = this.state.tasks;
        tmp.push(this.state.newTask);
        this.setState({ tasks: tmp })

        this.setState({ newTask: '' });
    }

    removeTask(id) {
        let tmp = this.state.tasks;
        delete tmp[id];
        this.setState({ clickedTask: id, tasks: tmp });
    }

    render() {
        return (
            <div className="tasks">
                <h3>Tasks</h3>
                <form className="form-inline" onSubmit={this.createTask} >
                    <div className="form-row align-items-center">
                        <div className="my-1">
                            <input type="text" className="form-control" value={this.state.newTask} placeholder="enter new task" maxlength="50" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="col-auto my-1">
                        <button type="submit" className="btn btn-primary">Enter</button>
                    </div>
                </form>
                <br/>
                {this.state.tasks.map((value, key) =>
                    <ul className="task list-group list-group-flush" >
                        <li key={key} className="list-group-item"  >{value}
                            <button type="button" className="close" aria-label="Close" onClick={() => this.removeTask(key)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        );
    }
}

export default Tasks;
