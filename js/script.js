const links = document.querySelectorAll('.feesh-link');
const fishContainer = document.querySelector('.fish');
const fishIdContainer = document.getElementById('fish');
const fishTitleHolder = document.getElementById('title');
let fish = {};
const fishNavMenu = document.querySelector('.fish-nav-menu');
const freshwaterBtn = document.querySelector('.freshwater'); 
const saltwaterBtn = document.querySelector('.saltwater'); 

const fishCategoryLinks = document.querySelectorAll('.fish-nav-categories--links a');
const fishCategoryActiveLink = document.querySelector('.fish-nav-categories--links a.active');
const fishTank = document.getElementById("fish-tank");

const additionalLinkContainer = document.querySelector('.fish-header--additional-links');

links.forEach((link) => {
    link.addEventListener('click', () => {
    resetFade();
    fish.title = link.innerText;
    fish.size = link.dataset.size;
    fish.category = link.dataset.category;
    fish.name = link.dataset.name;
    fish.id = link.dataset.id;
    fish.alias = link.dataset.alias;
    fish.eorzeadb = link.dataset.eorzeadb;

    Object.assign(fishIdContainer, {
      src : `/img/${fish.category}/${fish.size}-${fish.category}-${fish.name}.png`
    });

    fishContainer.className = "fish";
    fishContainer.classList.add(fish.size);
    
    fishTank.classList.add("fade-in");
    fishTitleHolder.innerText = fish.title;
    additionalLinkContainer.innerHTML = '';
    // add additional links
    if(fish.id !== 'undefined' && fish.id !== null) {
      let garlandToolsLink = document.createElement("a");
      let universalisLink = document.createElement("a");
      Object.assign(garlandToolsLink, {
        href: `https://www.garlandtools.org/db/#item/`+ fish.id,
        classList : 'garland-tools',
        target: '_blank',
        title: 'Garland Tools'
      });

      Object.assign(universalisLink, {
        href: `https://universalis.app/market/`+ fish.id,
        classList : 'universalis',
        target: '_blank',
        title: 'Universalis'
      });
      additionalLinkContainer.appendChild(garlandToolsLink);
      additionalLinkContainer.appendChild(universalisLink);
    }
    
    if(fish.eorzeadb !== 'undefined' && fish.eorzeadb !== null) {
      let eorzeaDBLink = document.createElement("a");
      Object.assign(eorzeaDBLink, {
        href: `https://na.finalfantasyxiv.com/lodestone/playguide/db/item/`+ fish.eorzeadb,
        classList : 'eorzeadb_link eorzea-db',
        target: '_blank',
        title: 'Eorzea Database'
      });
    
      additionalLinkContainer.appendChild(eorzeaDBLink);
    }
    if (fish.alias !== 'undefined' && fish.alias !== null) {
      let gamerescapeLink = document.createElement("a");
      Object.assign(gamerescapeLink, {
        href: `https://ffxiv.gamerescape.com/wiki/`+ fish.alias,
        classList : 'gamerescape',
        target: '_blank',
        title: 'Gamer Escape'
      });
      additionalLinkContainer.appendChild(gamerescapeLink);
    }
   
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