const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 1000,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1200,
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.amount * this.kcall;
        }
    }
}
// product.plainBurger.doubleMayonnaise = true;

const extraProduct = {
    doubleMayonnaise: {
        kcall: 100,
        price: 500,
        name: 'Двойной майонез'
    },
    lettuce: {
        kcall: 20,
        price: 200,
        name: 'Салатный лист'
    },
    cheese: {
        kcall: 70,
        price: 1000,
        name: 'Сыр'
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
      checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
      
for(let i = 0; i < btnPlusOrMinus.length; i++){
    btnPlusOrMinus[i].addEventListener('click', function(){
        // console.log(this);
        plusOrMinus(this);
    })
}

function plusOrMinus(element) {
    // .closest() - метод возвращает ближайший родительский элемент. Если нет совпадений вернет null
    const parent = element.closest('.main__product'),
          parentId = parent.getAttribute('id');
          amount = parent.querySelector('.main__product-num'),
          price = parent.querySelector('.main__product-price span'),
          kcall = parent.querySelector('.main__product-kcall span'),
          elementSymbol = element.getAttribute('data-symbol');
        
    if(elementSymbol == '+' && product[parentId].amount < 10) {
        product[parentId].amount++;
    }
    else if(elementSymbol == '-' && product[parentId].amount > 0) {
     product[parentId].amount--;   
    }
    
    
    amount.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}
/* -----функция для доп.продуктов---- */
function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
          parentId = parent.getAttribute('id'),
          price =  parent.querySelector('.main__product-price span'), 
          kcall =  parent.querySelector('.main__product-kcall span'), 
          elementExtra = element.getAttribute('data-extra');
        //   console.dir(element);
        
        product[parentId][elementExtra] = element.checked;
        // console.log(product[parentId][elementExtra]);
        // console.log(product[parentId]);
        
        if(product[parentId][elementExtra] === true) {
            // product[parentId] = product[parentId] + 1
            product[parentId].price += extraProduct[elementExtra].price;
            product[parentId].kcall += extraProduct[elementExtra].kcall;
        }
        else {
            product[parentId].price -= extraProduct[elementExtra].price;
            product[parentId].kcall -= extraProduct[elementExtra].kcall;
        }
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
}


for(let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function(){
        addExtraProduct(this);
    })
}
// -------чек-лист----------

let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;    
    
    
const addCart = document.querySelector('.addCart'),
      receipt = document.querySelector('.receipt'),
      receiptWindow = receipt.querySelector('.receipt__window'),
      receiptOut = receiptWindow.querySelector('.receipt__window-out'),
      receiptBtn = receiptWindow.querySelector('.receipt__window-btn');
      
addCart.addEventListener('click', function() {
    for(const key in product){
       const po = product[key];
       if(po.amount > 0) {
           arrayProduct.push(po)
           for(const newKey in po){
               if(po[newKey] === true){
                // '\n' - экранирование, совершает перенос строки   
                    po.name += "\n" + extraProduct[newKey].name;
               }
           }
       }
       po.price = po.Summ;
       po.kcall = po.Kcall;
    }
    for(let i = 0; i < arrayProduct.length; i++){
        const obj = arrayProduct[i];
        totalPrice += obj.price;
        totalKcall += obj.kcall;
        totalName += '\n' + obj.name + '\n';
    }
    receiptOut.innerHTML = `Вы заказали: \n ${totalName} \n Калорийность ${totalKcall} \n Стоимость покупки ${totalPrice} сум`;
    receipt.style.display = 'flex';
    setTimeout(function(){
        receipt.style.opacity = '1';
    }, 100)
    setTimeout(function() { receiptWindow.style.top = '0';}, 100)
})

receiptBtn.addEventListener('click', function(){
    location.reload();
})

let logo = document.querySelector('.header__timer-extra');

function lvl_100() {
    if (logo.innerHTML < 50) {
        logo.innerHTML++
        setTimeout(lvl_100, 100)
    } else if (logo.innerHTML >= 50 && logo.innerHTML < 80) {
        logo.innerHTML++;
        setTimeout(lvl_100, 200);
    } else if (logo.innerHTML >= 70 && logo.innerHTML < 100) {
        logo.innerHTML++;
        setTimeout(lvl_100, 300)
    } else if (logo.innerHTML >= 80 && logo.innerHTML < 100) {
        logo.innerHTML++;
        setTimeout(lvl_100, 500)
    } 
    

}

lvl_100()