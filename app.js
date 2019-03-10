//budget controller
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, id;

      if(data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }
      
      if(type === 'exp') newItem = new Expense(id, des, val);
      else if(type === 'inc') newItem = new Income(id, des, val);
      
      data.allItems[type].push(newItem);
      return newItem;
    }
  };

})();



//UI controller
var UIcontroller = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    expCntr: '.expenses__list',
    incCntr: '.income__list'
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
    },

    addListItem: function(obj, type) {
      var html, newHtml, list;

      if(type === 'exp') {
        list = DOMstrings.expCntr;

        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if(type === 'inc') {
        list = DOMstrings.incCntr;

        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      document.querySelector(list).insertAdjacentHTML('beforeend', newHtml);
    }

  };

})();



//app controller
var appController = (function(budgetCtrl, UICtrl) {

  var setEventListeners = function() {

    var DOMstrings = UICtrl.getDOMstrings();

    document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
    if(event.keyCode === 13 || event.which === 13) ctrlAddItem();
    });

  };

  var ctrlAddItem = function() {
    var input, newItem;

    input = UICtrl.getInput();

    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    UICtrl.addListItem(newItem, input.type);

  };

  return {
    init: function() {
      setEventListeners();
    }
  }

})(budgetController, UIcontroller);

appController.init();