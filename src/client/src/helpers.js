import numeral from 'numeral';

require('numeral/locales/es');

const parseCurrency = (amount) => {
  numeral.locale('en');
  if (amount.includes(',')) {
    numeral.locale('es');
  }
  return numeral(amount).value();
};

export default parseCurrency;
