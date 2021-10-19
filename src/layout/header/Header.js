import React from 'react';
import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      UncontrolledDropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
    } from "reactstrap";
    import { useState } from 'react';
    import { Link } from 'react-router-dom';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

const toggle = () => setIsOpen(!isOpen);

return (
  <div>
    <Navbar color="dark" dark expand="md">
    <Link to="/"> <NavbarBrand>Menu</NavbarBrand></Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Itens
            </DropdownToggle>
            <DropdownMenu right>
            <Link to="/"><DropdownItem>Home</DropdownItem></Link>
              <DropdownItem divider />
              <Link to="/clientes"><DropdownItem>Clientes</DropdownItem></Link>
              <DropdownItem divider />
              <Link to="/produtos"><DropdownItem>Produtos</DropdownItem></Link>
              <DropdownItem divider />
              <Link to="/pedidos"><DropdownItem>Produtos</DropdownItem></Link>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
);
};


export default Header;