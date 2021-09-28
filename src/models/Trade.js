class Trade {
  constructor({ currency_hexcode, token_amount, price_to_xrp }) {
    this.currency_hexcode = currency_hexcode;
    this.token_amount = token_amount;
    this.price_to_xrp = price_to_xrp;
  }
}

export default Trade;