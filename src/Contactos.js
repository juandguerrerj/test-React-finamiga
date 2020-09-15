import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row, Col, Form, Table, FormGroup } from 'reactstrap'



function Contactos(){    

    const [tasks, setTasks] = React.useState([]);
    const [newTask, setNewTask] = React.useState({
        id: '',
        name : '',
        phoneNumber : '',
        email: ''
    });
    const [updateTask, setUpdateTask] = React.useState({
        upid: '',
        updatedName : '',
        updatedPhoneNumber : '',
        updatedEmail: ''
    });
    
    /*const [telefonos, setTelefono] = React.useState([]);    
    const [newTelefono, setNewTelefono] = React.useState('');
    const [updateTelefono, setUpdateTelefono] = React.useState('');    */

    React.useEffect(() => {
        const readTasks = () => {
            if(localStorage.getItem('tasks')){
                setTasks(JSON.parse(localStorage.getItem('tasks')));
                //setTelefono(JSON.parse(localStorage.getItem('telefonos')));
            }
        }
        readTasks()
    }, [newTask]);

    const onCreate = () => {        
        if(localStorage.getItem('tasks')){            
            const arrayIds = JSON.parse(localStorage.getItem('tasks'));
            const idsArray = [];
            arrayIds.map(cods => {
                idsArray.push(cods.id);
                return idsArray;
            });            
            var idValIni = idsArray[0];
            for(var i = 0; i <= idsArray.length; i++){
                if(idsArray[i] >= idValIni){
                    idValIni = idsArray[i]; 
                }
            }
            newTask.id = idValIni + 1;
            if(newTask.id == null || isNaN(newTask.id)){
                newTask.id = 1;
            }
        }else{
            newTask.id = 1;
        }

        tasks.push(newTask)        
        localStorage.setItem('tasks', JSON.stringify(tasks))
        setNewTask('')

        //Limpiar los imputs
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.value = '')
    };

    function onDelete(task){
        let index = tasks.indexOf(task);
        tasks.splice(index,1)
        localStorage.setItem('tasks',JSON.stringify(tasks))
        setNewTask('')
        setTasks(JSON.parse(localStorage.getItem('tasks')))
    }

    const onUpdate = (task) => {
        let index = tasks.indexOf(task);        
        let tasks2 = JSON.parse(localStorage.getItem('tasks'))
        console.log(updateTask);
        tasks2[index].id = tasks2[index].id
        tasks2[index].name = updateTask.updatedName ? updateTask.updatedName : tasks2[index].name;
        tasks2[index].phoneNumber = updateTask.updatedPhoneNumber ? updateTask.updatedPhoneNumber : tasks2[index].phoneNumber;
        tasks2[index].email = updateTask.updatedEmail ? updateTask.updatedEmail : tasks2[index].email;

        localStorage.setItem('tasks', JSON.stringify(tasks2))
        setTasks(JSON.parse(localStorage.getItem('tasks')))
    }

    //render(){
        
        return(
            <div>
                <br></br>
                <h2 id="contactsTittle">Formulario de Contactos: </h2>
                
                <Container>
                    <br />
                    
                    <Row>
                        <Col>
                            <Form>
                                <FormGroup controls="formBasicCheckbox" 
                                >
                                    
                                    <label htmlFor="name"> Nombre: </label>
                                    <input type="text" name="name" autoComplete="off" value={newTask.nombre} 
                                                onChange={e => setNewTask({...newTask,[e.target.name] : e.target.value})}
                                                /> <br/>

                                    <label htmlFor="phoneNumber"> Telefono: </label>
                                    <input type="text" name="phoneNumber" autoComplete="off" value={newTask.telefono}
                                                onChange={e => setNewTask({...newTask,[e.target.name]: e.target.value})}    
                                                /> <br />
                                    
                                    <label htmlFor="email"> Email: </label>
                                    <input type="text" name="email" autoComplete="off" value={newTask.email}
                                                onChange={e => setNewTask({...newTask,[e.target.name]: e.target.value})}  />
                                    
                                    <br/>
                                </FormGroup>
                                <Button variant="primary" onClick={onCreate}> Crear Contacto </Button>
                            </Form>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <Table striped bordered hover variant="dark"> 
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                        <th>Borrar Contacto</th>
                                        <th>Actualizar Contacto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                        <tr key={task.id}>                                            
                                            <td> {task.id} </td>
                                            <td> {task.name}</td>
                                            <td> {task.phoneNumber} </td>
                                            <td> {task.email} </td>
                                            <td> <Button variant="danger" onClick={() => onDelete(task)}>Borrar</Button> </td>
                                            <td> 
                                                <input type="text"  name="updatedName" 
                                                    onChange={e => setUpdateTask({...updateTask,[e.target.name]: e.target.value})} 
                                                    placeholder={task.name}></input> 
                                                <input type="text" className=" " name="updatedPhoneNumber" 
                                                    onChange={e => setUpdateTask({...updateTask,[e.target.name]: e.target.value})} 
                                                    placeholder={task.phoneNumber}></input> 
                                                <input type="text" className=" " name="updatedEmail" 
                                                    onChange={e => setUpdateTask({...updateTask,[e.target.name]: e.target.value})} 
                                                    placeholder={task.email}></input> 
                                                <Button className="text-white ml-4" variant="warning" 
                                                    onClick={() => onUpdate(task)}> Actualizar</Button>
                                            </td>
                                        </tr>                                        
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

                
            </div>        
        )
    //}    
}

export default Contactos