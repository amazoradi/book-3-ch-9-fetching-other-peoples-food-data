// need a function to create a div that contains the tite foodnae, subtitle country
// p of ingredients, p of nutrients

let foodlist = document.querySelector("#foodlist")
let fragment =document.createDocumentFragment()


// function that will create a certain element 
function elementFactory(el, content, ...children) {
  // creates any element you pass through el
  let element = document.createElement(el);
  // allows any content to be passed to the element through content or nothing (null)
  element.innerHTML = content || null
  // appends the children (passed through with children) to the element
  children.forEach(child => {
    element.appendChild(child)
  })
  // returns the element
  return element
}


let localFood = []


fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    parsedFoods.forEach((food) => {
      localFood.push(food)
      fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
          // calling our element creting function with our data that has been extracted from the local and external API
          let title = elementFactory("h2", food.name)
          let subtitle = elementFactory("h3", food.ethnicity)
          let ingredients = elementFactory("p", productInfo.product.ingredients_text)
          let nutrients = elementFactory("p", `Calories per Serving: ${productInfo.product.nutriments.energy_serving}. Fat per serving ${productInfo.product.nutriments.fat_serving}. Sugar per serving: ${productInfo.product.nutriments.sugars_serving}. `)
          let foodCard = elementFactory("div", null, title, subtitle,ingredients, nutrients)
          fragment.appendChild(foodCard)
          foodlist.appendChild(fragment)
        })
    })
  });
