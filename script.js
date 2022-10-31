chrome.runtime.onInstalled.addListener(() => {
  let parent = chrome.contextMenus.create({
    id: 'parent-menu',
    title: 'Preencher dados do cartão de crédito',
  });

  chrome.contextMenus.create({
    'id': 'mastercard',
    'title': 'Mastercard',
    'parentId': parent,
  });
  chrome.contextMenus.create({
    'id': 'visa',
    'title': 'Visa',
    'parentId': parent,
  });
  chrome.contextMenus.create({
    'id': 'amex',
    'title': 'Amex',
    'parentId': parent,
  });
  chrome.contextMenus.create({
    'id': 'diners',
    'title': 'Diners',
    'parentId': parent,
  });
  chrome.contextMenus.create({
    'id': 'discover',
    'title': 'Discover',
    'parentId': parent,
  });
  chrome.contextMenus.create({
    'id': 'jcb',
    'title': 'JCB',
    'parentId': parent,
  });
  chrome.contextMenus.create({
    'id': 'enroute',
    'title': 'EnRoute',
    'parentId': parent,
  });
  chrome.contextMenus.create({
    'id': 'voyager',
    'title': 'Voyager',
    'parentId': parent,
  });
});

chrome.contextMenus.onClicked.addListener((info, tabs) => {
  chrome.scripting.executeScript({
    target: { tabId: tabs.id },
    function: renderDataCreditCard,
    args: [info.menuItemId],
  });
});

function renderDataCreditCard(flag) {
  const amexPrefixList = [
    "34",
    "37"
  ];
  const dinersPrefixList = [
    "300",
    "301",
    "302",
    "303",
    "36",
    "38"
  ];
  const discoverPrefixList = ["6011"];
  const enRoutePrefixList = [
    "2014",
    "2149"
  ];
  
  const jcbPrefixList = [
    "35"
  ];
  
  const mastercardPrefixList = [
    "51",
    "52",
    "53",
    "54",
    "55",
    "2221",
    "2222",
    "2223",
    "2224",
    "2225",
    "2226",
    "2227",
    "2228",
    "2229",
    "223",
    "224",
    "225",
    "226",
    "227",
    "228",
    "229",
    "23",
    "24",
    "25",
    "26",
    "270",
    "271",
    "2720"
  ];
  
  const visaPrefixList = [
    "4539",
    "4556",
    "4916",
    "4532",
    "4929",
    "40240071",
    "4485",
    "4716",
    "4"
  ];
  
  const voyagerPrefixList = ["8699"];
  
  function generateCVV() {
    return Math.floor(Math.random() * 999);
  }

  function generateExpirationDate() {
    let month = (Math.floor(Math.random() * 12) + 1).toString();
    if (month.length === 1) {
      month = 0 + month;
    }
    const year = Math.floor(Math.random() * 10) + new Date().getFullYear();
    return `${month}/${year}`;
  }

  function generateCompletedNumber(prefix, length) {
    const ccnumber = [];
    for (let _i = 0, prefix_1 = prefix; _i < prefix_1.length; _i++) {
        let prefixNum = prefix_1[_i];
        ccnumber.push(parseInt(prefixNum));
    }
    // generate digits
    while (ccnumber.length < (length - 1)) {
        ccnumber.push(Math.floor(Math.random() * 10));
    }
    ccnumber.reverse();
    // calculate sum
    let sum = 0;
    let pos = 0;
    while (pos < length - 1) {
        var odd = ccnumber[pos] * 2;
        if (odd > 9) {
            odd -= 9;
        }
        sum += odd;
        if (pos != (length - 2)) {
            sum += ccnumber[pos + 1];
        }
        pos += 2;
    }
    // calculate check digit
    const checkdigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
    ccnumber.reverse();
    ccnumber.push(checkdigit);
    let ccstr = "";
    for (let _a = 0, ccnumber_1 = ccnumber; _a < ccnumber_1.length; _a++) {
        let n = ccnumber_1[_a];
        ccstr += n.toString();
    }
    return ccstr;
  }
  
  function generateCreditCardNumber(prefixList = mastercardPrefixList, length = 16, howMany = 1) {
    const result = [];
    for (let i = 0; i < howMany; i++) {
        const randomArrayIndex = Math.floor(Math.random() * prefixList.length);
        const ccnumber = prefixList[randomArrayIndex];
        result.push(generateCompletedNumber(ccnumber, length));
    }
    return result;
  }

  const cardNumberEl = document.getElementById('card-number');
  const cardOwnerEl = document.getElementById('card-owner');
  const cardExpirationEl = document.getElementById('card-expiration');
  const cardCVVEl = document.getElementById('card-cvv');

  const flags = {
    mastercard: mastercardPrefixList,
    visa: visaPrefixList,
    amex: amexPrefixList,
    diners: dinersPrefixList,
    discover: discoverPrefixList,
    jcb: jcbPrefixList,
    enroute: enRoutePrefixList,
    voyager: voyagerPrefixList,
  };

  const creditCardNumber = generateCreditCardNumber(flags[flag]);
  cardNumberEl.value = creditCardNumber[0];
  cardOwnerEl.value = 'John Doe';
  cardExpirationEl.value = generateExpirationDate();
  cardCVVEl.value = generateCVV();
}
