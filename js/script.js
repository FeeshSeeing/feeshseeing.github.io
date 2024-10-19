const links = document.querySelectorAll('.feesh-link');
const fishContainer = document.querySelector('.fish');
const fish = document.getElementById('fish');
const fishTitleHolder = document.querySelector('.fish-title');
let fishName = "chub";
let fishTitle = "chub";
let fishCategory = "fw";
let fishSize = "s";


const fishNavMenu = document.querySelector('.fish-nav-menu');
const freshwaterBtn = document.querySelector('.freshwater'); 
const saltwaterBtn = document.querySelector('.saltwater'); 

const fishCategoryLinks = document.querySelectorAll('.fish-nav-categories--links a');
const fishCategoryActiveLink = document.querySelector('.fish-nav-categories--links a.active');

links.forEach((link) => {
  
    link.addEventListener('click', () => {
    fishTitle = link.innerText;
    fishSize = link.dataset.size;
    fishCategory = link.dataset.category;
    fishName = link.dataset.name;
    fish.src = `/img/freshwater/${fishSize}-${fishCategory}-${fishName}.png`;
    fishContainer.className = "fish";
    fishContainer.classList.add(fishSize);
    fishTitleHolder.innerText = fishTitle;
  })
})

function removeActiveLinkClasses() {
    links.forEach( link => {link.classList.remove('active')})
}




freshwaterBtn.addEventListener('click', () =>{
  fishNavMenuReset();
  
  fishNavMenu.dataset.category = "freshwater";
  freshwaterBtn.classList.add('active');
  saltwaterBtn.classList.remove('active');


  fishCategoryLinks.forEach((fishCategoryLink) => {
    if(fishCategoryLink.classList.contains("active")){
      fishNavMenu.classList.add(`freshwater-${fishCategoryLink.dataset.category}`);
    }
  })
  //fishNavMenu.classList.add(`freshwater-${fishCategoryActiveLink.dataset.category}`);

})

saltwaterBtn.addEventListener('click', () =>{
  fishNavMenu.dataset.category = "saltwater";
  fishNavMenuReset();
  saltwaterBtn.classList.add('active');
  freshwaterBtn.classList.remove('active');
  fishCategoryLinks.forEach((fishCategoryLink) => {
    if(fishCategoryLink.classList.contains("active")){
      fishNavMenu.classList.add(`saltwater-${fishCategoryLink.dataset.category}`);
    }
  })
  //fishNavMenu.classList.add(`saltwater-${fishCategoryActiveLink.dataset.category}`);

})





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