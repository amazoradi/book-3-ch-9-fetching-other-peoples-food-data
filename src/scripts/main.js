// need a function to create a div that contains the tite foodnae, subtitle country
// p of ingredients, p of nutrients

let foodlist = document.querySelector("#foodlist")
let fragment =document.createDocumentFragment()

function elementFactory(el, content, ...children) {
  let element = document.createElement(el);
  element.innerHTML = content
  children.forEach(child => {
    element.appendChild(child)
  })
  return element
}


let localFood = []


fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    parsedFoods.forEach((food) => {
      localFood.push(food)
      console.log(food)
      fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
        .then(response => response.json())
        .then(productInfo => {
          console.log(productInfo)
          let title = elementFactory("h2", localFood.name)
          let subtitle = elementFactory("h3", localFood.ethnicity)
          console.log(productInfo.product.ingredients_text)
          let ingredients = elementFactory("p", productInfo.product.ingredients_text)
          console.log(productInfo.product.countries_hierarchy[0])
          let nutrients = elementFactory("p", ``)
          console.log(productInfo.product.nutriments.energy_serving)
          console.log(productInfo.product.nutriments.fat_serving)
          console.log(productInfo.product.nutriments.sugars_serving)
        })
    })
  });



  


  function domDisplayer (...params) {

  }
//     console.table(parsedFoods)
//     let foodlist = document.querySelector("#foodlist")
//     parsedFoods.forEach(foodElement => {
//       let foodDiv = document.createElement("div")
//       let foodCard = document.createElement("h2")
//       foodCard.textContent = foodElement.name
//       let foodCardType = document.createElement("p")
//       let foodCardEth = document.createElement("p")
//       foodCardType.textContent = foodElement.type
//       foodCardEth.textContent = foodElement.ethnicity
//       foodDiv.appendChild(foodCard)
//       foodDiv.appendChild(foodCardType)
//       foodDiv.appendChild(foodCardEth)
//       foodlist.appendChild(foodDiv)
//     });
//   })
// let foodDiv = document.createElement("div")
// let foodTitle = document.createElement("h1")
// let foodSubtitle = document.createElement("h3")
// let foodContent = document.createElement("p")
// let foodnutri = document.createElement("p")

// //for each food item fetch with url with unique barcode, seach to x location, display that text
// //dinamically on the DOM in the 2nd (or new) P in the right div



