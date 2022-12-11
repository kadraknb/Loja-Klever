import { useState, useEffect } from 'react';
import {
  getProducts,
  getProductsFromCategoryAndQuery,
  multiGetProductItemByID,
} from '../../services/api';
import Placeholder from 'react-bootstrap/Placeholder';
import { Badge, Button, Card, Container } from 'react-bootstrap';
import './home.css';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import imgLoad from '../../utils/images/load.png';

export const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [search, setSearch] = useState('');
  const load = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  const ajusteProducts = async (data) => {
    const idProducts = data
      .slice(0, 16)
      .map((item) => item.id)
      .join(',');
    const allProdutos = await multiGetProductItemByID(idProducts);
    setProdutos(allProdutos);
  };

  const products = async () => {
    const data = await getProducts();
    ajusteProducts(data);
  };
  const getBySearch = async () => {
    const { results } = await getProductsFromCategoryAndQuery(search);
    ajusteProducts(results);
  };

  useEffect(() => {
    products();
  }, []);
  return (
    <>
      <Header />
      <label id="H_label_busca">
        <div id="H_box_input">
          <input
            id="H_input_busca"
            type="text"
            placeholder="Busca"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button id="H_Button_busca" onClick={getBySearch}>
            Buscar
          </button>
        </div>
      </label>
      {produtos[0] ? (
        <div className="justify-content-center" >
          <div id="H_box_itens" >
            {produtos.map(({ body }) => (
              <Card
                key={body.id}
                id="Card"
                className="cardStyle"
                style={{ width: '18rem' }}
              >
                <div id="H_card_img_box">
                  <Card.Img
                    id="Card-img"
                    variant="top"
                    src={body.pictures[0].secure_url}
                    alt={body.title}
                  />
                </div>
                <div>
                  <Card.Body className="bg-dark" id="H_card_body">
                    <Card.Title>
                      <Badge id="H_preco" bg="white">
                        <p className="text-dark">R$ {body.price.toFixed(2)}</p>
                      </Badge>
                    </Card.Title>
                    <Card.Text className="flex-wrap text-white" id="Card-Text">
                      {body.title}
                    </Card.Text>
                  </Card.Body>
                  <Link
                    id="link-home-card"
                    to={body.id}
                    className="d-grid gap-2"
                  >
                    <Button id="btn-home-card" className="rounded-0 bg-dark">
                      Detalhes
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div id="H_box_itens_load">
          {load.map((_, ii) => (
            <Card id='Card' key={ii} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={imgLoad} />
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                  <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};
