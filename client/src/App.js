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
import AnimeSingle from './pages/AnimeSingle';
import ResultsAnime from './pages/ResultsAnime';
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userStatus, setUserStatus] = useState('LOADING');
  const [form, setForm] = useState({
    search: "",
})

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

  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('ran')
    history.push(`/search/${form.search}`)
    setForm("")
  }

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
}
  

  

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand  as= {Link}to="/" className="twice" style={{fontSize: 25}}>AniAni</Navbar.Brand>
        <Nav >
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        <Form inline onSubmit = {handleSubmit}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2"
           onChange= {handleChange} 
           value={form.search}
           name="search"
            />
          <Button type="submit" variant="outline-info">Search</Button>
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
          <Home />
        </Route>
        <Route path= "/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path= "/anime/:id">
          <AnimeSingle/>
        </Route>
        <Route path= "/search/:title">
          <ResultsAnime/>
        </Route>
      </Switch>
      )}
    </div>
  );
}

export default App;
