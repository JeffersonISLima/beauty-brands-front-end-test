import "./Home.css";
import axios from "axios";
import Navbar from "../Navbar";
import Input from "../FormField";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameUser: "",
      orderFiltered: [],
      emailOfTheUser: "",
      controlView: false,
      ordersOfTheUser: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getAllOrdersOftheUser = this.getAllOrdersOftheUser.bind(this);
  }

  getAllOrdersOftheUser() {
    const { emailOfTheUser } = this.state;
    axios
      .get(`http://localhost:5000/${emailOfTheUser}/orders.json`)
      .then(response => {
        this.setState({
          ordersOfTheUser: response.data,
          nameUser: response.data[0].name
        });
      })
      .catch(() => {
        this.props.history.push(
          "/?=Usuário não localizado no banco. Crie uma conta."
        );
      });
  }

  handleChange(event) {
    event.preventDefault();
    const {
      target: { name, value }
    } = event;

    const regExp = new RegExp(value, "gi");
    const filterOrder = [...this.state.ordersOfTheUser].filter(e => {
      if (e.id.toString().match(regExp)) {
        return e;
      }
      return null;
    });
    this.setState({
      [name]: value,
      controlView: true,
      orderFiltered: filterOrder
    });
  }

  componentDidMount() {
    this.getAllOrdersOftheUser();
  }

  componentWillMount() {
    const { email } = this.props.location.state;
    for (let key in email) {
      if (email[key] !== "") {
        this.setState({
          emailOfTheUser: email[key]
        });
      }
    }
  }

  render() {
    const {
      nameUser,
      controlView,
      orderFiltered,
      ordersOfTheUser
    } = this.state;

    return (
      <>
        <header>
          <Navbar />
        </header>

        <section className="main-section">
          <div className="welcome-container">
            <h1 className="welcome-user">Olá, {nameUser} </h1>
            <h2>Encontre um pedido pelo número</h2>

            <div className="container-search-order">
              
              <Input
                type="search"
                name="orderFiltered"
                className="search-order"
                placeholder="Número do pedido"
                onChange={e => this.handleChange(e)}
              />
              <i className="fas fa-search" />
            </div>
          </div>

          {controlView
            ? orderFiltered.map(e => {
                return (
                  <section key={e.id} className="container-orders-card">
                    <Link to={`/orders-details/${e.email}/${e.id}`}>
                      <div className="card-order">
                        <h2>Número do pedido: {e.id}</h2>
                        <div className="container-date-status">
                          <h2>Data da compra: {e.date}</h2>
                          <h2>Status: {e.status}</h2>
                        </div>
                        <h2 className="price">
                          Total: {e.total.replace(/['.']/, ",")}
                        </h2>
                        <h2 className="see-all">
                          Ver completo{" "}
                          <i className="fas fa-angle-double-right" />
                        </h2>
                      </div>
                    </Link>
                  </section>
                );
              })
            : ordersOfTheUser.map(e => {
                return (
                  <section key={e.id} className="container-orders-card">
                    <Link key={e.id} to={`/orders-details/${e.email}/${e.id}`}>
                      <div className="card-order">
                        <h2>Número do pedido: {e.id}</h2>
                        <div className="container-date-status">
                          <h2>Data da compra: {e.date}</h2>
                          <h2>Status: {e.status}</h2>
                        </div>
                        <h2 className="price">
                          Total: {e.total.replace(/['.']/, ",")}
                        </h2>
                        <h2 className="see-all">
                          Ver completo{" "}
                          <i className="fas fa-angle-double-right" />
                        </h2>
                      </div>
                    </Link>
                  </section>
                );
              })}
        </section>
      </>
    );
  }
}

export default Home;
