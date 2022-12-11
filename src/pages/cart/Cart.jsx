import React, { useEffect, useState, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Badge, Card, Button, Modal, Alert } from 'react-bootstrap';
import klever from '../../providers/klever';
import { fetchBalance } from '../../utils/KleverWebManager';
import { useNavigate } from 'react-router-dom';


import './cart.css';
const Cart = () => {
  let navigate = useNavigate();

  const [cartProduct, setCartProduct] = useState([]);
  const [error, setError] = useState('');
  const [kleverConnected, setKleverConnected] = useState(false);
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();
  const [txHash, setTxHash] = useState();
  const toRef = useRef();
  const amountRef = useRef();
  const [show, setShow] = useState(false);
  const [cartBalance, setCartBalance] = useState();
  const [showSucess, setShowSucess] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    GetProduct();
    sumCart();
    document.body.style.backgroundColor = "#1a0033";
  }, []);

  const connectToKlever = async () => {
    const address = await klever.connectWithSdk();
    if (!address.startsWith('klv')) {
      setError(address);
    }    
    setKleverConnected(true);
    setAddress(klever.address);
    await fetchBalance();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const to = toRef?.current?.value;
    const amount = amountRef?.current?.value;

    if (to && amount) {
      console.log({ to, amount });
      const data = await klever.send(to, parseInt(amount));
      setTxHash(JSON.stringify(data));
    }
  };
  const dataLS = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  const GetProduct = () => {
    setCartProduct(dataLS);
  };
  const sumCart = () => {
    if (dataLS[0]) {
      const resCart = dataLS.map((item) => item.base_price).reduce((acu, pres) => acu + pres).toFixed(2)
      setCartBalance(resCart)
    }
}

const handleBuy = () => {
  setShowSucess(true);
  setTimeout(() => {
    navigate('/balance');
  }, 1000);
  localStorage.setItem('cartBalance', JSON.stringify(cartBalance));
};
  return (
    <>
    <Header />
    <div id='C_box_item' className=''>
      {cartProduct[0] && (
        cartProduct.map((cartProduct) => (
        <Card id="Card" style={{ width: '18rem' }} className='d-flex'>
          <Card.Img 
            variant="top" 
            src={cartProduct.secure_thumbnail} />
          <Card.Body className='bg-dark'>
              <Card.Title className='text-white'>
                Preço <Badge bg="secondary"> R$ {cartProduct.base_price.toFixed(2)}</Badge>    
              </Card.Title>
              <Card.Text className='text-white's>
              {cartProduct.title}
              </Card.Text>
              <Button onClick={handleShow} variant="danger">Remover do carrinho</Button>
              <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Removendo produto do carrinho</Modal.Title>
              </Modal.Header>
              <Modal.Body>Você realmente deseja remover <strong>{cartProduct.title}</strong> do seu carrinho de compras?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Não
                </Button>
                <Button variant="success" onClick={handleClose}>
                  sim
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
          ))
          ) }
    </div>
    {showSucess ? (
              <Alert
                variant="success"
                onClose={() => setShowSucess(false)}
                dismissible
              >
                {`Você será redirecionado para a carteira.`}
              </Alert>
            ) : <center><h3>
              </h3></center>}
      <h2 id='C_box_item' className='text-white'>Total R$ : {cartBalance}</h2>
    <div className='d-grid gap-2'>
    <Button 
    onClick={handleBuy}
    variant='success'>
          Finalizar Compra
    </Button>
    <Footer />
    </div>
    </>
  );
};

export default Cart;
