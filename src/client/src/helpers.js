import numeral from 'numeral';

require('numeral/locales/es');

const parseCurrency = (amount) => {
  if (amount.includes(',')) {
    numeral.locale('es');
  }
  return numeral(amount).value();
};

export default parseCurrency;
