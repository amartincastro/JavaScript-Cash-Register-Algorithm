var values = [ 
    {name: 'ONE HUNDRED', value: 100},
    {name: 'TWENTY', value: 20},
    {name: 'TEN', value: 10},
    {name: 'FIVE', value: 5},
    {name: 'ONE', value: 1},
    {name: 'QUARTER', value: .25},
    {name: 'DIME', value: .1},
    {name: 'NICKEL', value: .05},
    {name: 'PENNY', value: .01},
  ];
  
  function checkCashRegister(price, cash, cid) {
    var output = {status: 0, change: []};
    var change = cash - price;
  
  var register = cid.reduce((accumulator, drawermoney) => {
    accumulator.total += drawermoney[1];
    accumulator[drawermoney[0]] = drawermoney[1];
    return accumulator;
  }, { total: 0 });
  
  if (register.total === change) {
    output.status = 'CLOSED';
    output.change = cid;
    return output;
  }
  
  else if (register.total < change) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }
  
  var change_array = values.reduce((accumulator, drawermoney) => {
    var value = 0;
    while (register[drawermoney.name] > 0 && change >= drawermoney.value) {
      change -= drawermoney.value;
      register[drawermoney.name] -= drawermoney.value;
      value += drawermoney.value;
      change = Math.round(change * 100) / 100;
    }
  
  if (value > 0) {
    accumulator.push([ drawermoney.name, value ]);
  }
  return accumulator;
  }, []);
  
  if (change_array.length < 1 || change > 0) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }
  
  output.status = 'OPEN';
  output.change = change_array;
  return output;
  
  };