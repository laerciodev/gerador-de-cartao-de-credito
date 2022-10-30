import { generateCreditCardNumber } from './generate-credit-card.js';
import { visaPrefixList } from './constants/index.js';

const visa = generateCreditCardNumber(visaPrefixList, 16);
