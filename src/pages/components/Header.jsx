import cart from '../../utils/images/icon-cart.png';
import logo from '../../utils/images/logo.png';
import klever from '../../providers/klever';

import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap';
import { useEffect, useState } from 'react';
//import { fetchBalance } from "../../utils/KleverWebManager";

export const Header = () => {
  const [kleverConnected, setKleverConnected] = useState(false);
  const [address, setAddress] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const connectToKlever = async () => {
    const address = await klever.connectWithSdk();
    if (!address.startsWith('klv')) {
      setError(address);
    }
    setKleverConnected(true);
    setAddress(klever.address);
    setShow(false);
    await fetchBalance();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            id="H_logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Produtos</Nav.Link>
          <Nav.Link href="cart">Carrinho</Nav.Link>
          <Nav.Link href="balance">Carteira</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
