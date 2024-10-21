const links = document.querySelectorAll('.feesh-link');
const fishContainer = document.querySelector('.fish');
const fish = document.getElementById('fish');
const fishTitleHolder = document.querySelector('.fish-title span');
let fishName = "chub";
let fishTitle = "chub";
let fishCategory = "fw";
let fishSize = "s";

const fishNavMenu = document.querySelector('.fish-nav-menu');
const freshwaterBtn = document.querySelector('.freshwater'); 
const saltwaterBtn = document.querySelector('.saltwater'); 

const fishCategoryLinks = document.querySelectorAll('.fish-nav-categories--links a');
const fishCategoryActiveLink = document.querySelector('.fish-nav-categories--links a.active');

const fishTank = document.getElementById("fish-tank");

links.forEach((link) => {
  
    link.addEventListener('click', () => {
      resetFade();
    
    fishTitle = link.innerText;
    fishSize = link.dataset.size;
    fishCategory = link.dataset.category;
    fishName = link.dataset.name;
    fish.src = `/img/${fishCategory}/${fishSize}-${fishCategory}-${fishName}.png`;
    
    fishContainer.className = "fish";
    fishContainer.classList.add(fishSize);
    
    fishTank.classList.add("fade-in");
    fishTitleHolder.innerText = fishTitle;
  })
})

function resetFade(){
  fishTank.className = "fish-tank";
}

function removeActiveLinkClasses() {
    links.forEach( link => {link.classList.remove('active')})
}

function menuToggle(watertype, currentType, setNewType) {
  setNewType.addEventListener('click', () =>{
    fishNavMenu.dataset.category = watertype;
    fishNavMenuReset();
    currentType.classList.remove('active');
    setNewType.classList.add('active');  
    fishCategoryLinks.forEach((fishCategoryLink) => {
      if(fishCategoryLink.classList.contains("active")){
        fishNavMenu.classList.add(watertype+`-${fishCategoryLink.dataset.category}`);
      }
    })
  })
}

menuToggle("freshwater", saltwaterBtn, freshwaterBtn ) // removes saltwater and adds freshwater
menuToggle("saltwater", freshwaterBtn,saltwaterBtn  ) // removes freshwater and adds saltwater

fishCategoryLinks.forEach((fishCategoryLink) => {
  fishCategoryLink.addEventListener('click', () =>{
    fishNavMenuReset();
    removeEachActiveCategoryLinkClasses();

    fishCategoryLink.classList.add('active');
    fishNavMenu.classList.add(`${fishNavMenu.dataset.category}-${fishCategoryLink.dataset.category}`);
    
  })
})

function removeEachActiveCategoryLinkClasses() {
  fishCategoryLinks.forEach( fishCategoryLink => {fishCategoryLink.classList.remove('active')})
}

function fishNavMenuReset() {
  fishNavMenu.className = 'fish-nav-menu';
}