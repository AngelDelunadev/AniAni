import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormControl, Nav, Navbar,Button} from 'react-bootstrap';
import { Link,Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUser } from './redux/actions';
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userStatus, setUserStatus] = useState('LOADING');
  const logout = () => {
    fetch('/api/v1/users/logout')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // alert(data.success);
          dispatch(setUser(null));
        }
      });
  };
  useEffect(() => {
    fetch('/api/v1/users/current')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          dispatch(setUser(data));
        }
        setUserStatus('CHECKED');
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand  as= {Link}to="/">Navbar</Navbar.Brand>
        <Nav >
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        </Nav>
        {user ? (
        <Form inline>
          <Button variant="outline-info" onClick={logout}> Logout</Button>
        </Form>
        ) : (
          <Form inline>
          <Button variant="outline-info" as={Link}to = "/login"> Login</Button>
        </Form>

        )}
      </Navbar>


      {userStatus === 'LOADING' && 'Loading...'}
      {userStatus === 'CHECKED' && (
      <Switch>
        <Route path= "/" exact>
          <Home/>
        </Route>
        <Route path= "/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
      </Switch>
      )}
    </div>
  );
}

export default App;
