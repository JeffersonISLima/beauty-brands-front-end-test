import "./Login.css";
import Button from "../Button";
import Input from "../FormField";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const email = { ...this.state };

    return (
      <>
        <main className="background-image">
          <div className="container-login">
            <h1>LOGIN</h1>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              onChange={e => this.handleChange(e)}
            />

            <div className="btn-container">
              <Button className="btn-signin">
                <Link
                  to={{
                    pathname: "/home",
                    state: {
                      email: email
                    }
                  }}
                >
                  <h3>Entrar</h3>
                </Link>
              </Button>
              <Button className="btn-disabled" disabled>
                <h3>Criar conta</h3>
              </Button>
            </div>
          </div>

          {this.props.location.search ? (
            <>
              <div className="message-user-existent">
                {this.props.location.search.slice(2).length > 45
                  ? "Usuário não localizado no banco. Crie uma conta."
                  : this.props.location.search.slice(2)}
              </div>
            </>
          ) : null}
        </main>
      </>
    );
  }
}

export default Login;
