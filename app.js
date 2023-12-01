let topBar = document.querySelector(".top-bar")
let allItems = document.querySelector(".all-items")
let search = document.querySelector(".search-png")
let modal = document.querySelector(".modal")
let generateNew = document.querySelector(".button")
const homeDiv = document.querySelector('.home');
const aboutDiv = document.querySelector('.about');
const specialityPage = document.querySelector('.bar');
const specialityDiv = document.querySelector('.speciality');
const itemDisplayPage = document.querySelector('.top-bar');
let specialityImage = document.querySelector(".speciality-image")

async function getData(){
  try{
    let randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
    let respone = await fetch(randomUrl)
    let data = await respone.json();
    console.log(data);
    let randomImage = data.meals[0].strMealThumb
    let randomName = data.meals[0].strMeal
    let randomCategory = data.meals[0].strCategory
    let specialityImage = document.querySelector(".speciality-image")
    specialityImage.style.backgroundImage = `url(${randomImage})`
    let itemName = document.querySelector(".item-name")
    itemName.innerHTML = `${randomName}`;
    let category = document.querySelector(".category")
    category.innerHTML = `${randomCategory}`;

    let allIngredients = document.querySelector(".all-ingredients")
    allIngredients.innerHTML = ""

    for(let i=0; i<20;i++){
      if (data.meals[0][`strIngredient${i+1}`] != ""){
        let ing = document.createElement('div')
        ing.className = "ing"
        let ingImage = document.createElement('div')
        ingImage.className = 'ing-img'
        let ingText = document.createElement('div')
        ingText.className = 'ing-text'
        let text = data.meals[0][`strIngredient${i+1}`]
        let measure = data.meals[0][`strMeasure${i+1}`] 
        let imageIng = `https://www.themealdb.com/images/ingredients/${text}-Small.png`
        ingImage.style.backgroundImage = `url('${imageIng}')`;
        ingText.innerHTML = `${text} --> ${measure}`
        ing.append(ingImage)
        ing.append(ingText)
        allIngredients.append(ing)
        let instruction = data.meals[0].strInstructions
        let inst= document.querySelector('.inst')
        inst.innerHTML = instruction
      }
    }
    function openTutorial() {
      window.open(`${tutorialUrl}`);
    }
    let tutorialUrl = data.meals[0].strYoutube;
    let tutorial = document.querySelector(".tutorial");
    let cloneTutorial = tutorial.cloneNode(true); 
    tutorial.parentNode.replaceChild(cloneTutorial, tutorial); 
    cloneTutorial.removeEventListener("click", openTutorial); 
    cloneTutorial.addEventListener("click", openTutorial); 

  }
  catch{

  }
}
getData()
async function getItems(inputValue){
  try{
    let obj = [];
    let gridUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`
    let res = await fetch(gridUrl)
    let gridData = await res.json()
    obj = gridData.meals;
    for(let i = 0;i<obj.length;i++){
      let image = obj[i].strMealThumb
      let name = obj[i].strMeal
      let items = document.createElement('div')
      items.className = "items"
      let itemImage = document.createElement('div')
      itemImage.className = "item-image"
      itemImage.style.backgroundImage = `url(${image})`
      let foodName = document.createElement('div')
      foodName.className = "food-name"
      foodName.innerHTML = name
      items.append(itemImage,foodName)
      allItems.append(items)
      
    }
  }
  catch(err){
    alert("This category is not avialable")
  }
}


generateNew.addEventListener("click", () => {
  getData()
})

specialityDiv.addEventListener('click', () => {
  specialityPage.scrollIntoView({ behavior: 'smooth' });

  specialityDiv.style.color = '#71411B';

  homeDiv.style.color = '#989898';
  aboutDiv.style.color = '#989898';
});


homeDiv.addEventListener('click', ()=>{
  const background = document.querySelector(".home-scroll")
  background.scrollIntoView({behavior:'smooth'})
  homeDiv.style.color='#71411b';
  specialityDiv.style.color = '#989898'
  aboutDiv.style.color = '#989898'
})


function searchData(){
  topBar.style.display = "block"
  allItems.innerHTML = ""
  let input = document.querySelector("#input").value
  let inputValue = input
  getItems(inputValue)
  const specialityDiv = document.querySelector('.speciality');
  const homeDiv = document.querySelector('.home');
  specialityDiv.style.color = '#989898';
  homeDiv.style.color = '#989898';
  
}

search.addEventListener("click",()=>{
  searchData()
  setTimeout(()=>{
    itemDisplayPage.scrollIntoView({ behavior: 'smooth' });
    
  },1000)
})



const inputField = document.querySelector('#input');
inputField.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchData()
    setTimeout(()=>{
      itemDisplayPage.scrollIntoView({ behavior: 'smooth' });
      
    },1000)
  }
});


specialityImage.addEventListener("click",()=>{
  modal.style.display = "block"
})
modal.addEventListener("click",()=>{
  modal.style.display = "none"
})
