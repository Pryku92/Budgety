//budget data controller
var budgetDataController = (function() {

  return {

  }

})();



//UI controller
var UIcontroller = (function() {

  return {

  }

})();



//app controller
var appController = (function(budgetCtrl, UICtrl) {

  var ctrlAddItem = function() {


    //do stuff
    console.log('now this works like that');


  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if(event.keyCode === 13 || event.which === 13) ctrlAddItem();
  });

})(budgetDataController, UIcontroller);