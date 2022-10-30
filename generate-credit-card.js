
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

export function generateCreditCardNumber(prefixList, length, howMany = 1) {
    const result = [];
    for (let i = 0; i < howMany; i++) {
        const randomArrayIndex = Math.floor(Math.random() * prefixList.length);
        const ccnumber = prefixList[randomArrayIndex];
        result.push(generateCompletedNumber(ccnumber, length));
    }
    return result;
}
