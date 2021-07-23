import React , { useState }from 'react';
import { Button } from 'semantic-ui-react';
import './ToDoApp.css'

const ToDoApp = () => {

    const [task, setTask] = useState('');
    const [tasklist, setTaskList] = useState([
        {id: 1001, value: 'Buy Milk'},
        {id: 1002, value: 'Buy Water'},
    ]);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const AddTask = () => {
        if (task !== '') {
            const taskDet = {
                id: Math.floor(Math.random() * 1000),
                value: task,
                isComleted: false,
            };
            setTaskList([...tasklist, taskDet]);
        }
        // setTaskList('');
    };

    const deletetask = (e, id) => {
        e.preventDefault();
        setTaskList(tasklist.filter((t) => t.id !== id));
    };

    const taskCompleted = (e, id) => {
        e.preventDefault();
        //поиск индекса элемента
        const element = tasklist.findIndex((elem) => elem.id === id);

        //копируем массив в переменную
        const newTaskList = [...tasklist];

        //меняем элемент
        newTaskList[element] = {
            ...newTaskList[element],
            isCompleted: true,
        };

        setTaskList(newTaskList);
    };

    return (
        <div className='todo'>
            <div className="ui left icon right labeled input">
                <input type="text" placeholder="Enter tasks" onChange={e => handleChange(e)} />
                <i aria-hidden="true" className="tags icon" ></i>
                <Button className="ui tag label label" color='green' onClick={AddTask}>Add Task</Button>
            </div>
            {tasklist !== [] ? (
                <ul>
                    {tasklist.map((t) => (
                        <li className={t.isCompleted ? "crossText" : "listitem"}>
                            {t.value}
                            <Button
                                className="completed"
                                color='green'
                                onClick={(e) => taskCompleted(e, t.id)}>
                                <i>&#10004;</i>
                            </Button>
                            <Button className="delete" color='red' onClick={(e) => deletetask(e, t.id)}>
                                <i>&#10008;</i>
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

export default ToDoApp;
