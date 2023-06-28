// importing data from other js file
import { menuArray } from "./data.js";

// creating two empty arrays. 1 for the ordered food items, the other for the ordered food item prices
let addedFoodItems = [];
let foodPriceArray = [];

// setting up global variable for the payment form modal container that shows the form
const paymentModal = document.getElementById("modal-section");

// setting up global variable for the payment form modal
const paymentForm = document.getElementById("payment-modal");

//adding the selected items to the order div
document.getElementById("display-food").addEventListener("click", (event) => {
  if (event.target.id) {
    addFoodItemToOrder(event.target.id);
  }
});

// this event listener is watching for the remove and complete order clicks
document
  .getElementById("display-order-total")
  .addEventListener("click", (event) => {
    if (event.target.id) {
      event.target.id === "order-btn"
        ? payForFoodOrder()
        : removeFoodFromOrder(+event.target.id);
    }
  });

// submit button for the payment and calling the function to show the order is on the way
document
  .getElementById("payment-modal")
  .addEventListener("submit", orderOnTheWay);

// function to remove any food item from the ordered food item list displayed on the screen
function removeFoodFromOrder(foodItem) {
  addedFoodItems = addedFoodItems.filter((_, indx) => indx !== foodItem);
  foodPriceArray = addedFoodItems.map((item) => item.price);

  foodOrder(addedFoodItems);
}

// function to show the payment modal
function payForFoodOrder() {
  paymentModal.classList.toggle("hidden");
}

// function to show that your order is confirmed and on the way
function orderOnTheWay(event) {
  event.preventDefault();

  // getting the user name from the payment form
  const paymentFormData = new FormData(paymentForm);
  const name = paymentFormData.get("paymentName");
  
  document.getElementById(
    "display-order-confirmation"
  ).innerHTML = `Thanks, ${name}! Your order is on its way!`;
  document.getElementById(
    "display-order-confirmation"
  ).classList.add('confirmation-color')
  
  resetOrderProcess();
  setTimeout(() => {
    document.getElementById(
      "display-order-confirmation"
    ).innerHTML = ''
    document.getElementById(
      "display-order-confirmation"
    ).classList.remove('confirmation-color')
  },5000)
}

function resetOrderProcess() {
  document.getElementById("display-order-total").innerHTML = ''
  payForFoodOrder();
  addedFoodItems = [];
  foodPriceArray = [];
  document.getElementById("paymentName").value = "";
  document.getElementById("cardNumber").value = "";
  document.getElementById("cvvNumber").value = "";
}

// This is the function that adds the selected food item to the div. Remember that foodId comes in as a string not as a number.
function addFoodItemToOrder(foodId) {
  // adding the food items to the global array and adding the price to the global price array
  menuArray.forEach((item) => {
    // changing foodId to number with the '+' symbol and adding the food item to the global array to store
    if (item.id === +foodId) {
      addedFoodItems.push(item);
      foodPriceArray.push(item.price);
    }
  });

  foodOrder(addedFoodItems);
}

function foodOrder(foodOrdered) {
  //showing the order total if the addedfooditems array has any items in it
  if (foodOrdered.length > 0) {
    let totalPrice = foodPriceArray.reduce((prev, curr) => prev + curr, 0);

    let order = `<h1 class="order-title">Your order</h1>`;

    foodOrdered.forEach((item, indx) => {
      order += `
                <div class="individual-food-item"
                    <h4 class="food-item">${item.name}</h4>
                    <p id="${indx}" class="remove-item">remove</p>
                    <div class="food-price">$${item.price}</div>
                </div>
            `;
    });

    order += `
                <div class="total-price-container">
                    <hr class="break-line">
                    <div class ="price-container">
                      <h4 class="total-price-title">Total price:</h4>
                      <p class="total-food-price">$${totalPrice}</p>
                    </div>
                    <button id="order-btn" class="order-btn">Complete order</button>
                </div>
        `;

    document.getElementById("display-order-total").innerHTML = order;

    // if the array length is 0, don't show the complete order button
  } else {
    document.getElementById("display-order-total").innerHTML = "";
    paymentModal.classList.add("hidden");
  }
}

// function to create html elements for each food item on the list from the data.js file and include specifics about the food.
function listFoodOptions() {
  let foodItems = "";

  menuArray.forEach((item) => {
    foodItems += `
            <div class="food-section">
                <p class="food-emoji">${item.emoji}</p>
                <div class="food-info">
                    <h3 class="food-title">${item.name}</h3>
                    <p class="food-ingredients">${item.ingredients}</p>
                    <p class="food-price">$${item.price}</p>
                </div>
                
                <img src="./images/add-btn.png" id="${item.id}" />
                
            </div>
            <hr>
        `;
  });

  return foodItems;
}

// function to show the food
function renderFoodList() {
  document.getElementById("display-food").innerHTML = listFoodOptions();
}

// rendering the food list to the dom
renderFoodList();
