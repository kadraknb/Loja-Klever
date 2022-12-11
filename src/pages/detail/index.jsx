import React, { useEffect, useState } from 'react';
import {
  Accordion,
  Alert,
  Button,
  Card,
  Carousel,
  Container,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProductItemByID } from '../../services/api';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import './detail.css';

function Detail() {
  const [imgSelect, setImgSelect] = useState();
  const [product, setProduct] = useState({});
  const [showSucess, setShowSucess] = useState(false);
  let navigate = useNavigate();
  const idProduct = window.location.pathname.slice(1);
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const results = await getProductItemByID(idProduct);
    console.log(results);
    setProduct(results);
  };

  const addShoppingCart = (salvarProduct) => {
    const { title, base_price, pictures } = salvarProduct;
    const getLS = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    getLS.push({ title, base_price, secure_thumbnail: pictures[0].url });
    localStorage.setItem('shoppingCart', JSON.stringify(getLS));
    setShowSucess(true);
    console.log('ADD TO CART', getLS);
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  return (
    <>
      <Header />
      <div id='D_main'>
        {product.id && (
          <div id="D_box_item">
            <div id="D_imgs_box">
              <div id="D_map_img">
                {product.pictures.slice(0, 5).map((picture, ii) => (
                  <img
                    id="H_mini_thumb"
                    key={picture.id}
                    src={picture.url}
                    alt="thumbnail"
                    onClick={() => setImgSelect(picture.url)}
                  />
                ))}
              </div>
              <img
                id="thumb"
                src={imgSelect || product.pictures[0].url}
                alt="thumbnail"
              />
            </div>
            
            <div id="D_items">
              <p id='D_tittle'>{product.title}</p>
              <div className='d-grid gap-2'>
              <Button id='D_button' className={'dark'} onClick={() => addShoppingCart(product)}>
                Adicionar ao carrinho
              </Button>
              </div>
              <p id='D_price'>Preço R${product.base_price.toFixed(2)}</p>
              {showSucess ? (
                <Alert
                  variant="success"
                  onClose={() => setShowSucess(false)}
                  dismissible
                >
                  {`O produto foi adicionado com sucesso ao carrinho de compras.`}
                </Alert>
              ) : null}
              
              
              <ListGroupItem variant="danger" className='bg-dark'><center>{product.warranty}</center></ListGroupItem>
              <Accordion id='D_accor' className='rounded-0' defaultActiveKey='0' alwaysOpen={true}>
                <Accordion.Item eventKey="0" className='bg-dark'>
                  <Accordion.Header>Atributos</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup className='D_list_attri scroll'>
                      {product.attributes
                        .filter((attribute) => !!attribute.value_name)
                        .map((attribute) => (
                          <ListGroupItem
                            variant="info"
                            key={attribute.id}
                          >{`${attribute.name}: ${attribute.value_name}`}</ListGroupItem>
                        ))}
                      {product.descriptions[0] &&
                        product.descriptions.map((description) => (
                          <ListGroupItem>{description}</ListGroupItem>
                        ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
          </div>
          </div>

        )}
      </div>
      <Footer />
    </>
  );
}

export default Detail;
