import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Alert, Button, Card, Container, Form, Modal } from 'react-bootstrap';
import klever from '../../providers/klever';
import { useNavigate } from 'react-router-dom';
import './balance.css';

const Balance = () => {
  const [balance, setBalance] = useState();
  const [kleverConnected, setKleverConnected] = useState(false);
  const [address, setAddress] = useState();
  const [txHash, setTxHash] = useState();
  const [show, setShow] = useState(false);
  const [cartBalance, setCartBalance] = useState(0);
  const [adressToSend, setAdressToSend] = useState({ to: '', amount: '' });
  const [showSucess, setShowSucess] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const toRef = useRef();
  // const amountRef = useRef();
  let navigate = useNavigate();

  const fetchBalance = async () => {
    const amount = await klever.balance();
    const currencyNormalizeMultiplier = Math.pow(10, 6);

    setBalance(amount / currencyNormalizeMultiplier);
  };

  useEffect(() => {
    const getLS = JSON.parse(localStorage.getItem('cartBalance')) || [];
    setCartBalance(getLS);
    setAdressToSend({ ...adressToSend, amount: getLS });
    document.body.style.backgroundColor = '#1a0033';
  }, []);

  const compraFeita = () => (
    <div id="borao">
      <div id="BAL_box_comFei">
        <p id="BAL_p_comFei">Você Comprou na Klever Web com sucesso.</p>
        <p id="BAL_token_comFei">token:{txHash.data.txsHashes}</p>
        <button id="BAL_btt_comFei" onClick={() => navigate('/')}>
          Voltar para home
        </button>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { to, amount } = adressToSend;
    if (to && amount) {
      const data = await klever.send(to, parseInt(amount));
      console.log(data);
      if (data.code === 'successful') {
        localStorage.removeItem('cartBalance');
        localStorage.removeItem('shoppingCart');
        setTxHash(data);
        setShowSucess(true);
      }
    }
  };

  const connectToKlever = async () => {
    const address = await klever.connectWithSdk();

    setAdressToSend({ ...adressToSend, to: address });
    if (!address.startsWith('klv')) {
      setError(address);
    }
    setKleverConnected(true);
    setAddress(klever.address);

    setShow(false);
    await fetchBalance();
  };

  const connectedStyle = (provider) => {
    return { backgroundColor: provider ? '#48ad3e' : '#bf2222' };
  };

  const className = (provider) => {
    return { bg: provider ? 'success' : 'danger' };
  };

  return (
    <>
      
      {!showSucess && <Header />}
      {showSucess && compraFeita()}
      <center>
        <h1 className="text-white">Carteira</h1>
      </center>
      <Card className="bg-dark">
        <Card.Header className="text-white">Informações da conta</Card.Header>
        <Card.Body>
          <p>
            <b className="text-white">Endereço: {address}</b>
          </p>
          <p>
            <b className="text-white">Saldo: {balance}</b>
          </p>
          <p>
            <Button
              onClick={handleShow}
              style={connectedStyle(kleverConnected)}
            >
              Status da conta KLV
            </Button>
          </p>
        </Card.Body>
      </Card>
      <Card className="bg-dark">
        <Container>
          <Card className="bg-dark">
            <Card.Header>
              <center>
                <h3 className="text-white">Informações de pagamento</h3>
              </center>
            </Card.Header>
            <Card.Body>
              <p className="text-white">Valor : {cartBalance}</p>
            </Card.Body>
          </Card>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group>
                <Form.Label>To:</Form.Label>
                <Form.Control required name="to" ref={toRef} />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Amount:</Form.Label>
                <Form.Control required type="number" name="amount" ref={amountRef} />
              </Form.Group> */}
            <div className="d-grid gap-2">
              <Button type="submit">Realizar pagamento.</Button>
            </div>
            <div className="d-grid gap-2">
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Bem Vindo a Klever Web</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Você esta se conecntado na KleverWeb deseja continuar?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Não
                  </Button>

                  <Button variant="success" onClick={connectToKlever}>
                    sim
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Form>
          <center>Transaction Hash</center>
          {/* {showSucess ? (
            <Alert
              variant="success"
              onClose={() => setShowSucess(false)}
              dismissible
            >
              {`Você Comprou na Klever Web com sucesso.`}
            </Alert>
          ) : null} */}
          {/* {txHash || (
            <Card>
              <code>{txHash}</code>
            </Card>
          )} */}
        </Container>
      </Card>
      <Footer />
    </>
  );
};

export default Balance;
