const Cash = props => {
  const value = ((props.cash / props.ratio) * props.price).toFixed(2);
  return (
    <div className="cash">
      {props.title} {props.cash <= 0 ? "Insert amount" : value}
    </div>
  );
};

class CurrencyExchange extends React.Component {
  state = {
    amount: "",
    product: "electricity"
  };

  static defaultProps = {
    currencies: [
      {
        id: 1,
        name: "dollar",
        ratio: 0.8,
        title: "Dollar value:"
      },
      {
        id: 2,
        name: "euro",
        ratio: 0.6,
        title: "Euro value:"
      },
      {
        id: 3,
        name: "yen",
        ratio: 0.234,
        title: "Yen value:"
      }
    ],

    prices: {
      electricity: 0.46,
      petrol: 4.32,
      orange: 0.24
    }
  };

  handleChange = e => {
    this.setState({
      amount: e.target.value
    });
  };
  handleSelect = e => {
    this.setState({
      product: e.target.value,
      amount: ""
    });
  };

  insertSuffix(select) {
    if (select === "electricity") return <em>kWh</em>;
    else if (select === "petrol") return <em>l</em>;
    if (select === "orange") return <em>kg</em>;
    else return null;
  }

  selectPrice = select => {
    const price = this.props.prices[select];
    return price;
  };

  render() {
    const { amount, product } = this.state;
    const price = this.selectPrice(product);
    const calculator = this.props.currencies.map(currency => (
      <Cash
        key={currency.id}
        ratio={currency.ratio}
        title={currency.title}
        cash={amount}
        price={price}
      />
    ));

    return (
      <div className="app">
        <label className="productName">
          Choose product:
          <select value={product} onChange={this.handleSelect}>
            <option value="electricity">Electricity</option>
            <option value="petrol">Petrol</option>
            <option value="orange">Orange</option>
          </select>
          <br />
        </label>
        <h3>Insert your amount please</h3>
        <br />
        <label>
          <input
            type="number"
            value={this.state.amount}
            onChange={this.handleChange}
          />

          {this.insertSuffix(this.state.product)}
          <br />
        </label>

        <br />
        {calculator}
      </div>
    );
  }
}

ReactDOM.render(<CurrencyExchange />, document.getElementById("root"));
