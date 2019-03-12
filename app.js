//budget controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calcTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (current) {
            sum += current.value;
        });
        data.total[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, id;

            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            if (type === 'exp') newItem = new Expense(id, des, val);
            else if (type === 'inc') newItem = new Income(id, des, val);

            data.allItems[type].push(newItem);
            return newItem;
        },

        calcBudget: function () {
            calcTotal('inc');
            calcTotal('exp');

            data.budget = data.total.inc - data.total.exp;
            if (data.total.inc > 0) {
                data.percentage = Math.round(data.total.exp / data.total.inc * 100);
            } else {
                data.percentage = -1;
            }

        },

        getBudget: function () {
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.total.inc,
                totalExp: data.total.exp
            }
        },

        test: function () {
            console.log(data.allItems);
        }
    };

})();



//UI controller
var UIcontroller = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expCntnr: '.expenses__list',
        incCntnr: '.income__list',
        budgetDisplay: '.budget__value',
        incDisplay: '.budget__income--value',
        expDisplay: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container'
    };

    return {

        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc / exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        },

        addListItem: function (obj, type) {
            var html, newHtml, list;

            if (type === 'exp') {
                list = DOMstrings.expCntnr;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'inc') {
                list = DOMstrings.incCntnr;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(list).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fieldsList, fieldsArr;

            fieldsList = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fieldsList);

            fieldsArr.forEach(function (current) {
                current.value = '';
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {

            document.querySelector(DOMstrings.budgetDisplay).textContent = obj.budget;
            document.querySelector(DOMstrings.incDisplay).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expDisplay).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentage).textContent = '---';
            }

        }

    };

})();



//app controller
var appController = (function (budgetCtrl, UICtrl) {

    var setEventListeners = function () {

        var DOMstrings = UICtrl.getDOMstrings();

        document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
        });

        document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem);

    };

    var updateBudget = function () {
        budgetCtrl.calcBudget();

        var budget = budgetCtrl.getBudget();

        console.log(budget);

        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function () {
        var input, newItem;

        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            UICtrl.addListItem(newItem, input.type);

            UICtrl.clearFields();

            updateBudget();
        };
    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, id;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            id = splitID[1];
        }

        console.log(splitID, type, id);
    };

    return {
        init: function () {

            UICtrl.displayBudget({
                budget: 0,
                percentage: -1,
                totalInc: 0,
                totalExp: 0
            });

            setEventListeners();

        }
    }

})(budgetController, UIcontroller);

appController.init();