import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormControl, Nav, Navbar,Button } from 'react-bootstrap';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav >
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        </Nav>
        <Form inline>
          <Button variant="outline-info" as={Link}to = "/login"> Login</Button>
        </Form>
      </Navbar>


      <Switch>
        <Route path= "/" exact>
          <Home/>
        </Route>
        <Route path= "/login">
          <Login/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
