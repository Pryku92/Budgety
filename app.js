//budget data controller
var budgetDataController = (function() {

  return {

  }

})();



//UI controller
var UIcontroller = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // inc / exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();



//app controller
var appController = (function(budgetCtrl, UICtrl) {

  var DOMstrings = UICtrl.getDOMstrings();

  var ctrlAddItem = function() {

    var input = UICtrl.getInput();
    console.log(input);

  }

  document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if(event.keyCode === 13 || event.which === 13) ctrlAddItem();
  });

})(budgetDataController, UIcontroller);