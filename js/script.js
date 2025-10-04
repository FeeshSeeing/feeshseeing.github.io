const links = document.querySelectorAll('.feesh-link');
const fishContainer = document.querySelector('.fish');
const fishIdContainer = document.getElementById('fish');
const fishTitleHolder = document.getElementById('title');
let fish = {};
const fishNavMenu = document.querySelector('.fish-nav-menu');
const freshwaterBtn = document.querySelector('.freshwater'); 
const saltwaterBtn = document.querySelector('.saltwater'); 

const fishCategoryLinks = document.querySelectorAll('.fish-nav-categories--links a');
const fishTank = document.getElementById("fish-tank");

const additionalLinkContainer = document.querySelector('.fish-header--additional-links');

const mobileMenuClose = document.querySelector('.mobile-close');
const mobileMenuList = document.querySelector('.mobile-list');
const navigation = document.querySelector('.navigation');

// ---------------- Search feature ----------------
window.addEventListener("load", () => {
  const clearSearch = document.getElementById("clear-search");
  const filter = document.getElementById("the-filter");
  const list = document.querySelectorAll(".fish-nav-categories--menu-list li");

  clearSearch.addEventListener('click', () => {
    filter.value = "";
    clearSearch.classList.add("hide");
    list.forEach(item => item.classList.remove("hide"));
  });

  function debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }

  filter.addEventListener("keyup", debounce(() => {
    let search = filter.value.toLowerCase();
    clearSearch.classList.remove("hide");
    list.forEach(item => {
      item.classList.toggle("hide", !item.innerText.toLowerCase().includes(search));
    });
  }, 200));
});

// ---------------- Helper functions ----------------
function resetFade() {
  fishTank.classList.remove("fade-in");
  void fishTank.offsetWidth;
  fishTank.classList.add("fade-in");
}

function removeActiveLinkClasses() {
  links.forEach(link => link.classList.remove('active'));
}

function removeEachActiveCategoryLinkClasses() {
  fishCategoryLinks.forEach(link => link.classList.remove('active'));
}

function fishNavMenuReset() {
  fishNavMenu.className = 'fish-nav-menu';
}

// ---------------- Water Type Toggle ----------------
function menuToggle(watertype, currentType, setNewType) {
  setNewType.addEventListener('click', () => {
    fishNavMenu.dataset.category = watertype;
    fishNavMenuReset();
    currentType.classList.remove('active');
    setNewType.classList.add('active');  
    fishCategoryLinks.forEach(link => {
      if(link.classList.contains("active")){
        fishNavMenu.classList.add(`${watertype}-${link.dataset.category}`);
      }
    });
    updateURLParams();
  });
}

menuToggle("freshwater", saltwaterBtn, freshwaterBtn);
menuToggle("saltwater", freshwaterBtn, saltwaterBtn);

// Create a temporary tooltip for copy feedback
function showCopyMessage(element, message = "Copied!") {
  const tooltip = document.createElement("span");
  tooltip.className = "copy-tooltip";
  tooltip.innerText = message;
  element.appendChild(tooltip);

  // Animate and remove after 1.5s
  setTimeout(() => {
    tooltip.classList.add("fade-out");
  }, 1000);

  setTimeout(() => {
    tooltip.remove();
  }, 1500);
}



// ---------------- Size link clicks ----------------
fishCategoryLinks.forEach(link => {
  link.addEventListener('click', () => {
    fishNavMenuReset();
    removeEachActiveCategoryLinkClasses();
    link.classList.add('active');
    fishNavMenu.classList.add(`${fishNavMenu.dataset.category}-${link.dataset.category}`);
    updateURLParams();
  });
});

// ---------------- Fish click ----------------
document.addEventListener("click", e => {
  const link = e.target.closest(".feesh-link");
  if (!link) return;

  removeActiveLinkClasses();
  link.classList.add("active");
  resetFade();

  fish = {
    title: link.innerText,
    size: link.dataset.size,
    category: link.dataset.category,
    name: link.dataset.name,
    id: link.dataset.id,
    alias: link.dataset.alias,
    eorzeadb: link.dataset.eorzeadb,
    description: link.title,
    isTradable: link.dataset.isTradable
  };

  scaleFishPreview(fish);

  Object.assign(fishIdContainer, {
    src: `/img/${fish.category}/${fish.size}/${fish.name}.png`,
    alt: fish.description
  });

  navigation.classList.toggle("active");
  fishContainer.className = "fish " + fish.size;
  fishTitleHolder.innerText = fish.title;
  additionalLinkContainer.innerHTML = "";

  // Share link
  let shareLink = document.createElement("a");
  Object.assign(shareLink, {
    href: "#",
    className: "share-fish",
    title: `Share ${fish.title}`
  });

  // Optional: add icon
  shareLink.innerHTML = "📤"; // can add svg later

  // Copy to clipboard on click
  shareLink.addEventListener("click", (e) => {
    e.preventDefault();

    // Map shorthand to full category names
    const categoryMap = {
      fw: "freshwater",
      sw: "saltwater"
    };
    const fullCategory = categoryMap[fish.category] || fish.category;

    const shareURL = `${window.location.origin}${window.location.pathname}?fish=${fish.name.toLowerCase()}&size=${fish.size}&category=${fullCategory}`;

    navigator.clipboard.writeText(shareURL)
      .then(() => {
        showCopyMessage(shareLink); // shows tooltip instead of alert
      })
      .catch(err => {
        console.error("Could not copy URL: ", err);
      });
  });

  additionalLinkContainer.appendChild(shareLink);

  

  if(fish.id) {
    let garlandToolsLink = document.createElement("a");
    Object.assign(garlandToolsLink, {
      href: `https://www.garlandtools.org/db/#item/${fish.id}`,
      classList: "garland-tools",
      target: "_blank",
      title: "Garland Tools"
    });
    additionalLinkContainer.appendChild(garlandToolsLink);
  }

  if(fish.id && fish.isTradable === "true") {
    let universalisLink = document.createElement("a");
    Object.assign(universalisLink, {
      href: `https://universalis.app/market/${fish.id}`,
      classList: 'universalis',
      target: '_blank',
      title: 'Universalis'
    });
    additionalLinkContainer.appendChild(universalisLink);
  }

  if(fish.eorzeadb) {
    let eorzeaDBLink = document.createElement("a");
    Object.assign(eorzeaDBLink, {
      href: `https://na.finalfantasyxiv.com/lodestone/playguide/db/item/${fish.eorzeadb}`,
      classList: "eorzeadb_link eorzea-db",
      target: "_blank",
      title: "Eorzea Database"
    });
    additionalLinkContainer.appendChild(eorzeaDBLink);
  }

  if(fish.alias) {
    let gamerescapeLink = document.createElement("a");
    Object.assign(gamerescapeLink, {
      href: `https://ffxiv.gamerescape.com/wiki/${fish.alias}`,
      classList: "gamerescape",
      target: "_blank",
      title: "Gamer Escape"
    });
    additionalLinkContainer.appendChild(gamerescapeLink);
  }

  updateURLParams(); // update URL on fish click
});

// ---------------- Keyboard accessibility ----------------
links.forEach(link => {
  link.setAttribute("tabindex", "0");
  link.addEventListener("keydown", e => {
    if(e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      link.click();
    }
  });
});

// ---------------- Scaling ----------------
const fishScaleMap = { s: 35, m: 40, l: 50, xl: 85 };
function scaleFishPreview(fish) {
  const scale = fishScaleMap[fish.size];
  if (!scale) return;
  fishIdContainer.style.width = scale + "%";
  fishIdContainer.style.height = "auto";
}

// ---------------- Mobile menu ----------------
mobileMenuClose.addEventListener('click', () => navigation.classList.toggle("active"));
mobileMenuList.addEventListener('click', () => navigation.classList.toggle("active"));

// ---------------- URL Handling ----------------
function selectFishByName(fishName) {
  const link = [...document.querySelectorAll('.feesh-link')].find(
    a => a.dataset.name.toLowerCase() === fishName.toLowerCase()
  );
  if (!link) return;

  removeActiveLinkClasses();
  link.classList.add('active');
  link.click();
}

function selectSize(size) {
  const sizeLink = [...fishCategoryLinks].find(link => link.dataset.category === size);
  if(!sizeLink) return;

  removeEachActiveCategoryLinkClasses();
  sizeLink.classList.add('active');
  fishNavMenuReset();
  fishNavMenu.classList.add(`${fishNavMenu.dataset.category}-${sizeLink.dataset.category}`);
}

function selectCategory(category) {
  if(category === "freshwater") {
    freshwaterBtn.click();
  } else if(category === "saltwater") {
    saltwaterBtn.click();
  }
}

function updateURLParams() {
  const activeFish = document.querySelector(".feesh-link.active");
  const activeSizeLink = [...fishCategoryLinks].find(link => link.classList.contains("active"));
  const activeCategoryBtn = freshwaterBtn.classList.contains("active") ? freshwaterBtn :
                            saltwaterBtn.classList.contains("active") ? saltwaterBtn : null;

  const url = new URL(window.location);
  if(activeFish) url.searchParams.set("fish", activeFish.dataset.name);
  if(activeSizeLink) url.searchParams.set("size", activeSizeLink.dataset.category);
  if(activeCategoryBtn) url.searchParams.set("category", activeCategoryBtn.dataset.category);
  history.replaceState(null, "", url);
}

// ---------------- On page load ----------------
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const fishName = params.get("fish");
  const size = params.get("size");
  const category = params.get("category");

  if(fishName) selectFishByName(fishName);
  if(category) selectCategory(category);
  if(size) selectSize(size);

  // Fallback: if no fish selected, pick first
  if(!fishName) {
    const firstFish = document.querySelector('.feesh-link');
    if(firstFish) {
      firstFish.classList.add("active");
      firstFish.click();
    }
  }
});
