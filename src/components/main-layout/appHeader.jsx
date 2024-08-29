import { Button, Header } from 'rsuite'
import { Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';

function AppHeader() {

  return (
    <>
      <Navbar appearance='inverse'>
        <Navbar.Brand href="#">LOGO</Navbar.Brand>
        <Nav>
          {/* <Nav.Item>Home</Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Products</Nav.Item> */}
        </Nav>
        <Nav pullRight>
          <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
        </Nav>
      </Navbar>
    </>
  )
}

export default AppHeader
