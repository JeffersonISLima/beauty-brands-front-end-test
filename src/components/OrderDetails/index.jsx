import axios from "axios";
import "./OrderDetails.css";
import Navbar from "../Navbar";
import React, { Component } from "react";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productItems: [],
      addressClient: {},
      productFreight: "",
      productDetails: []
    };
    this.renderSwitch = this.renderSwitch.bind(this);
    this.getProductDetails = this.getProductDetails.bind(this);
  }

  getProductDetails() {
    const { email, id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/${email}/${id}.json`)
      .then(response => {
        this.setState({
          productDetails: response.data,
          productItems: response.data.items,
          addressClient: response.data.address,
          productFreight: response.data.freight.price
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  renderSwitch(status) {
    if (status) {
      switch (status) {
        case "Aguardando pagamento":
          return (
            <>
              <section className="container-status-balls">
                <div className="status-color-yellow">
                  <h4>Aguardando pagamento</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pagamento aprovado</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido em separação</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido em transporte</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido entregue</h4>
                </div>
              </section>
            </>
          );
        case "Pagamento aprovado":
          return (
            <>
              <section className="container-status-balls">
                <div className="status-color-green">
                  <h4>Aguardando pagamento</h4>
                </div>
                <div className="status-color-yellow">
                  <h4>Pagamento aprovado</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido em separação</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido em transporte</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido entregue</h4>
                </div>
              </section>
            </>
          );
        case "Pedido em separação":
          return (
            <>
              <section className="container-status-balls">
                <div className="status-color-green">
                  <h4>Aguardando pagamento</h4>
                </div>
                <div className="status-color-green">
                  <h4>Pagamento aprovado</h4>
                </div>
                <div className="status-color-yellow">
                  <h4>Pedido em separação</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido em transporte</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido entregue</h4>
                </div>
              </section>
            </>
          );
        case "Pedido em transporte":
          return (
            <>
              <section className="container-status-balls">
                <div className="status-color-green">
                  <h4>Aguardando pagamento</h4>
                </div>
                <div className="status-color-green">
                  <h4>Pagamento aprovado</h4>
                </div>
                <div className="status-color-green">
                  <h4>Pedido em separação</h4>
                </div>
                <div className="status-color-yellow">
                  <h4>Pedido em transporte</h4>
                </div>
                <div className="status-color-red">
                  <h4>Pedido entregue</h4>
                </div>
              </section>
            </>
          );
        default:
          return;
      }
    }
  }

  componentDidMount() {
    this.getProductDetails();
  }

  render() {
    /* General details of the product */
    const {
      id,
      name,
      date,
      total,
      status,
      payment_method
    } = this.state.productDetails;

    /* Delivery address */
    const {
      city,
      state,
      number,
      street,
      postcode,
    } = this.state.addressClient;

    /* All orders array */
    const { productItems } = this.state;

    /* Freight value */
    const { productFreight } = this.state;

    return (
      <div>
        <header className="App-header">
          <Navbar />
        </header>

        <section className="main-section">
          <div className="second-section">
            <h1 className="welcome-user txt-name-user">Olá, {name}</h1>
            <div className="container-background-pink">
              <h2>Numero do pedido: {id}</h2>
              <h2>Data da compra: {date}</h2>
            </div>
            <div className="brief-purchase">
              <h2>RESUMO DA COMPRA</h2>

              {productItems.map((e, idx) => {
                return (
                  <div key={idx} className="order-informations">
                    <h2>{e.qty} x</h2>
                    <h2>{e.name}</h2>
                    <h2>R$ {e.price.replace(/['.']/, ",")}</h2>
                  </div>
                );
              })}
            </div>
            <div className="container-background-pink">
              <h2>
                Prazo de entrega: <span>de 5 a 7 dias</span>
              </h2>
              <h2>Frete: R$ {productFreight.replace(/['.']/, ",")}</h2>
              <h2>
                Total: R$
                {total ? total.replace(/['.']/, ",") : null}
              </h2>
            </div>
            <h2>Acompanhe seu pedido</h2>
            <div className="container-status">{this.renderSwitch(status)}</div>
            <h2 className="deliver-title">ENTREGAR EM: </h2>
            <p>
              {street}, {number}
            </p>
            {city} - {state} - CEP: {postcode}
            <p />
            <h2 className="payment-method">Forma de pagamento</h2>
            <h3>{payment_method}</h3>
          </div>
        </section>
      </div>
    );
  }
}

export default Orders;
