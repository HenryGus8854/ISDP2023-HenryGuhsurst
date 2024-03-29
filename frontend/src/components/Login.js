import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const salt = bcrypt.genSaltSync(11);
let res;

export default function Login({user, setUser}) {
  //console.log(setUser);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function getEmp(){
    try {
      res = await fetch('http://localhost:8000/employee/'+username);
    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
    }
    if (!res.ok) {
      setErrorText("Username or Password is Wrong");
    }else{
      const emp = await res.json();
      console.log(emp)
      authenticateUser(emp);
    }
    
  }


  const authenticateUser = (emp) =>{
    const hashedPassword = bcrypt.hashSync(emp.password, salt);
    console.log();
    //console.log(temphashedPassword);
    if(bcrypt.compareSync(password, hashedPassword)){
      delete emp.password;
      let txnAudit = {
        txnID:0,
        txnType: "Login",
        status :  "Success",
        SiteID: emp.siteID,
        deliveryID: 0,
        employeeID: emp.employeeID,
        notes: emp.username+' logged in',
      };
      fetch('http://localhost:8000/txnaudit/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(txnAudit)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //window.location.reload();
      })
      localStorage.setItem("User",JSON.stringify(emp));

      setUser(emp);
      console.log(emp)
      if(emp.siteID === 9999){
        navigate('/acadia');
      }else{
        navigate('/');
      }
    }else{
      setErrorText("Password is Wrong");
    }
    //console.log(user);
  }
  function customer(){
    navigate('/customer');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getEmp();
  }
  
  return (
    <div>
      <Row xs={1} md={3} className="g-4">
      <Col>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Are you a Customer?</Card.Title>
              <Card.Text>
                <span>If so, you can order items form your local Store, or check up on a order </span>
                <Button variant='primary' onClick={customer}>Click Here</Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <Card.Title>Login Page</Card.Title>
                <Card.Text>
                <label>
                Username:
                <input 
                  type="text" 
                  onChange={(event) => setUsername(event.target.value)}
                  required 
                />
                
                </label>
                <br />
                <label>
                  Password:
                  <input 
                    type="password" 
                    onChange={(event) => setPassword(event.target.value)} 
                    required
                  />
                </label>
                <br />
                <span>{errorText}</span><br/>
                </Card.Text>
                <Button type="submit" variant='primary'>Login</Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
