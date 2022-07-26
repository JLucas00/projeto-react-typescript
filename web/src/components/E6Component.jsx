import React, { Component } from 'react';

class ClassES6Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    document.title = `Você clicou ${this.state.count} vezes`;
  }
  componentDidUpdate() {
    document.title = `Você clicou ${this.state.count} vezes`;
  }
  componentWillUnmount() {
    console.log('O componente foi desmontado');
  }

  render() {
    return (
      <div>
        <p>Você clicou {this.state.count} vezes</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

import { useState, useEffect } from 'react';

const FunctionComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Você clicou ${count} vezes`;
    return () => {
      console.log('O componente foi desmontado');
    };
  });

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>Clique aqui</button>
    </div>
  );
};
