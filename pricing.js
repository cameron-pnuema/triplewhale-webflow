/**
 * Pricing values
 */

let selectedDuration = "yearly";
let isAddonEnabled = true;
let monthly_option = !0;
let lastClickedCard = '';
let lastRecommendedCard = 'free-card';

const additionalSupports = {
  500000: [
    "Live Chat",
    "Group Onboarding",
    "Weekly Product Training Sessions",
  ],
  1000000: [
    "Live Chat",
    "Implementation Specialist (1:1 Onboarding)",
    "Weekly Product Training Sessions",
  ],
  5000000: [
    "Live Chat",
    "Email Support from Customer Success Team",
    "Implementation Specialist (1:1 Onboarding)",
    "Weekly Product Training Sessions",
  ],
  10000000: [
    "Live Chat",
    "Email & Phone Support from Dedicated Customer Success Manager",
    "Implementation Specialist (1:1 Onboarding)",
    "Weekly Product Training Sessions",
  ],
  50000000: [
    "Live Chat",
    "Email & Phone Support from Dedicated Customer Success Manager",
    "Strategic Consulting",
    "Implementation Specialist (1:1 Onboarding)",
    "Weekly Product Training Sessions",
  ],
};

const prices = {
  "0-250K": {
    monthly: {
      growth: 129,
      pro: 199,
      enterprise: 279,
      creative_cockpit: 79,
    },
    yearly: {
      growth: 1290,
      pro: 1990,
      enterprise: 2790,
      creative_cockpit: 790,
    },
  },
  "250-500K": {
    monthly: {
      growth: 199,
      pro: 299,
      enterprise: 379,
      creative_cockpit: 99,
    },
    yearly: {
      growth: 1990,
      pro: 2990,
      enterprise: 3790,
      creative_cockpit: 990,
    },
  },
  // Other pricing tiers here...
  "50M+": {
    monthly: {
      growth: "Custom",
      pro: "Custom",
      enterprise: "Custom",
      creative_cockpit: "Custom",
    },
    yearly: {
      growth: "Custom",
      pro: "Custom",
      enterprise: "Custom",
      creative_cockpit: "Custom",
    },
  },
};

const getMonthlyPrices = (range) => {
  const { monthly: { growth, pro, enterprise, creative_cockpit } } = prices[range];
  return { growth, pro, enterprise, creative_cockpit };
};

const getYearlyPrices = (range) => {
  const { yearly: { growth, pro, enterprise, creative_cockpit } } = prices[range];
  return { growth, pro, enterprise, creative_cockpit };
};

/**
 * Global Helper Functions
 */
const getElement = (value) => document.querySelector(`[fd-custom-code="${value}"]`);
const getElements = (value) => document.querySelectorAll(`[fd-custom-code="${value}"]`);

const addCommas = (num) => new Intl.NumberFormat("en-us").format(num);

/**
 * Helper Functions for Card Animations
 */
const hideEnterpriseForm = () => {
  const card = getElement("enterprise-card");
  card.classList.remove("form-visible");
  card.querySelector("[fd-custom-code='card-form']").style.display = "none";
};

const showEnterpriseForm = () => {
  const card = getElement("enterprise-card");
  card.classList.add("form-visible");
  card.querySelector("[fd-custom-code='card-form']").style.display = "block";
};

const decreaseCardSize = (card) => {
  card.classList.add("hide-card");
  card.querySelector(".card-icon-wrap").classList.add("vertical");
  card.querySelector(".card-overview").classList.add("hide");
  card.classList.remove("form-visible");
};

const showCard = (card) => {
  card.classList.remove("hide-card");
  card.querySelector(".card-icon-wrap").classList.remove("vertical");
  card.querySelector(".card-overview").classList.remove("hide");
};

const showCards = (arr) => {
  arr.forEach((el) => {
    const card = getElement(el);
    showCard(card);
  });
};

/**
 * Cards
 */
const freeCard = getElement("free-card");
const growthCard = getElement("growth-card");
const proCard = getElement("pro-card");
const enterpriseCard = getElement("enterprise-card");

const hideAllCards = () => {
  [freeCard, growthCard, proCard, enterpriseCard].forEach(decreaseCardSize);
  hideEnterpriseForm();
};

const showAllCards = () => {
  [freeCard, growthCard, proCard].forEach(showCard);
  hideEnterpriseForm();
};

const removeRecommendedClassFromCards = () => {
  [freeCard, growthCard, proCard, enterpriseCard].forEach((card) => {
    card.classList.remove("recommended-card");
  });
};

const removeRecommendedBorderFromCards = () => {
  [freeCard, growthCard, proCard, enterpriseCard].forEach((card) => {
    card.classList.remove("recommended-border");
  });
};

const addRecommendedClass = (el) => el.classList.add("recommended-card");
const addRecommendedBorder = (el) => el.classList.add('recommended-border');

/**
 * Logic to set card prices
 */
const growthPriceNodes = getElements("growth-price");
const proPriceNodes = getElements("pro-price");
const enterprisePriceNodes = getElements("enterprise-price");
const durationNodes = getElements("duration");
const currencyNodes = getElements("currency");

const setPrice = (node, price) => {
  node.innerText = price === "Custom" ? "Custom" : addCommas(price);
  node.setAttribute("price", price);
};

const setAddonCost = (creative_cockpit) => {
  getElement("addon-cost").innerText = `$${creative_cockpit}`;
};

const setPricesToCustom = () => {
  growthPriceNodes.forEach((node) => setPrice(node, "Custom"));
  proPriceNodes.forEach((node) => setPrice(node, "Custom"));
  enterprisePriceNodes.forEach((node) => setPrice(node, "Custom"));
  durationNodes.forEach((node) => (node.innerText = ""));
  currencyNodes.forEach((node) => (node.innerText = ""));

  setAddonCost("Custom");
};

const setYearlyPrices = (growth, pro, enterprise, creative_cockpit) => {
  const duration = selectedDuration === "yearly" ? "/year" : "/month";
  growthPriceNodes.forEach((node) => setPrice(node, growth));
  proPriceNodes.forEach((node) => setPrice(node, pro));
  enterprisePriceNodes.forEach((node) => setPrice(node, enterprise));
  durationNodes.forEach((node) => (node.innerText = `${duration}`));
  currencyNodes.forEach((node) => (node.innerText = "$"));

  setAddonCost(creative_cockpit);
};

const setMonthlyPrices = (growth, pro, enterprise, creative_cockpit) => {
  const duration = selectedDuration === "yearly" ? "/year" : "/month";
  growthPriceNodes.forEach((node) => setPrice(node, growth));
  proPriceNodes.forEach((node) => setPrice(node, pro));
  enterprisePriceNodes.forEach((node) => setPrice(node, enterprise));
  durationNodes.forEach((node) => (node.innerText = `${duration}`));
  currencyNodes.forEach((node) => (node.innerText = "$"));

  setAddonCost(creative_cockpit);
};

const setCardsPriceValue = (range = "0-250K") => {
  currentRange = range;
  if (range === "50M+") {
    setPricesToCustom();
    return;
  }

  if (selectedDuration === "monthly") {
    const { growth, pro, enterprise, creative_cockpit } = getMonthlyPrices(range);
    setMonthlyPrices(growth, pro, enterprise, creative_cockpit);
  } else {
    const { growth, pro, enterprise, creative_cockpit } = getYearlyPrices(range);
    setYearlyPrices(growth, pro, enterprise, creative_cockpit);
  }
};

const handleSliderChange = (value) => {
  const ctaOfGrowth = getElement("growth-card").querySelector(".card-demo-btn");

  removeRecommendedClassFromCards();
  hideEnterpriseForm();
  hideAllCards();

  if (value >= 5000000) {
    showCard(getElement("enterprise-card"));
    showCard(getElement("pro-card"));
    addRecommendedClass(getElement("enterprise-card"));
    addRecommendedBorder(getElement("enterprise-card"));
    lastRecommendedCard = 'enterprise-card';
    showEnterpriseForm();
  } else {
    if (value < 500000) {
      ctaOfGrowth.innerText = "Get Started";
      ctaOfGrowth.setAttribute("href", "https://app.triplewhale.com/signup");
    } else if (value < 1000000) {
      ctaOfGrowth.innerText = "Get Started";
      ctaOfGrowth.setAttribute("href", "https://app.triplewhale.com/signup");
    }
    decreaseCardSize(getElement("enterprise-card"));

    if (value >= 1000000 && value < 5000000) {
      showEnterpriseForm();
      addRecommendedClass(getElement("pro-card"));
      addRecommendedBorder(getElement('pro-card'));
      lastRecommendedCard = 'pro-card';
      showCard(getElement("pro-card"));
      showCard(getElement("enterprise-card"));
    } else if (value >= 500000 && value < 1000000) {
      addRecommendedClass(getElement("growth-card"));
      addRecommendedBorder(getElement('growth-card'));
      lastRecommendedCard = 'growth-card';
      showCard(getElement("growth-card"));
      showCard(getElement("pro-card"));
    } else if (value < 500000) {
      addRecommendedClass(getElement("free-card"));
      addRecommendedBorder(getElement('free-card'));
      lastRecommendedCard = 'free-card';
      showCard(getElement("free-card"));
      showCard(getElement("growth-card"));
    }
  }

  const supportTexts = getAdditionalSupportText(value);
  setAdditionalSupportText(supportTexts);
};

const showDropdown = () => {
  getElement("pricing-dropdowns").style.display = "block";
  getElement("selected-price-wrapper").classList.add("is-open");
};

const closeDropdown = () => {
  getElement("pricing-dropdowns").style.display = "none";
  getElement("selected-price-wrapper").classList.remove("is-open");
};

const arrayMatch = (arr1, arr2) => arr1.some((item) => arr2.includes(item));

/**
 * Main Starter Functions
 */
let isOpen = false;

const handleBodyClick = (e) => {
  const classes = [...e.target.classList];
  const targetClasses = [
    "selected-price-wrapper",
    "pricing-dropdowns",
    "pricing-dropdown-item",
    "selected-price-range",
    "pricing-dropdown-arrow",
  ];
  if (arrayMatch(classes, targetClasses)) return;
  isOpen = false;
  closeDropdown();
};

const hideDurationAndCurrency = () => {
  durationNodes.forEach((node) => (node.style.display = "none"));
  currencyNodes.forEach((node) => (node.style.display = "none"));
};

const showDurationAndCurrency = () => {
  durationNodes.forEach((node) => (node.style.display = "inline"));
  currencyNodes.forEach((node) => (node.style.display = "inline"));
};

function toggleDontToggleVisibility(isVisible) {
    const dontToggleElement = document.getElementById('dont-toggle');
    if (dontToggleElement) {
        dontToggleElement.style.display = isVisible ? 'block' : 'none';
    }
}

const initSliderAnimation = () => {
  hideDurationAndCurrency();

  getElement("pricing-dropdown-container").addEventListener("click", () => {
    if (!isOpen) {
      showDropdown();
      document.querySelector("body").addEventListener("click", handleBodyClick);
    } else {
      closeDropdown();
      document.querySelector("body").removeEventListener("click", handleBodyClick);
    }
    isOpen = !isOpen;
  });

  const allOptions = document.querySelectorAll(".pricing-dropdown-item");
  allOptions.forEach((option) => {
    option.addEventListener("click", () => {
      lastClickedCard = '';
      removeRecommendedBorderFromCards();
      isOpen = true;
      const priceVal = Number(option.getAttribute("fd-pricing-value")) - 1;
      const range = option.getAttribute("fd-custom-range");
      getElement("selected-price").innerText = `${option.innerText}`;
      getElement("selected-price-wrapper").classList.remove("is-open");
      handleSliderChange(priceVal);
      setCardsPriceValue(range);
      showDurationAndCurrency();
      getElement("pricing-dropdowns").style.display = "none";
      toggleDontToggleVisibility(false);
    });
  });
};

const addListenerToCards = () => {
  const allCards = document.querySelectorAll("[fd-pricing-card]");
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedCard = card.getAttribute("fd-custom-code");
      if (selectedCard === lastClickedCard) return;
      removeRecommendedClassFromCards();
      removeRecommendedBorderFromCards();
      addRecommendedBorder(card);
      if (card.classList.contains("hide-card")) {
        hideAllCards();
        if (selectedCard === "enterprise-card" || selectedCard === "pro-card") {
          showCard(getElement("pro-card"));
          showCard(getElement("enterprise-card"));
          showEnterpriseForm();
        } else {
          hideEnterpriseForm();
          if (selectedCard === "free-card")
            showCards(["free-card", "growth-card"]);
          if (selectedCard === "growth-card")
            showCards(["growth-card", "pro-card"]);
        }
      }
      if (selectedCard === lastRecommendedCard) {
        addRecommendedClass(getElement(selectedCard));
      }
      lastClickedCard = selectedCard;

      allCards.forEach((item) => {
        const cardIconWrap = item.querySelector(".card-icon-wrap");
        if (cardIconWrap.classList.contains("vertical")) {
          cardIconWrap.style.top = `0px`;
        }
      });
    });
  });
};

const addToggleListener = () => {
  const toggler = getElement("duration-toggle");

  toggler.addEventListener("click", () => {
    selectedDuration = selectedDuration === "yearly" ? "monthly" : "yearly";
    setCardsPriceValue();
  });
};

const addAddonClickListener = () => {
  let isOn = true;
  const addOnToggle = document.getElementById("tw-toggle-add-on-cc");
  const thumb = addOnToggle.querySelector(".toggle-thumb");
  thumb.style.transition = "transform 0.3s ease";

  addOnToggle.addEventListener("click", () => {
    const bgColor = isOn ? "rgb(182, 185, 206)" : "rgb(14, 188, 110)";
    const transformValue = isOn ? "translateX(-100%)" : "translateX(0)";
    addOnToggle.style.backgroundColor = bgColor;
    thumb.style.transform = transformValue;

    isOn = !isOn;
    isAddonEnabled = isOn;
  });
};

const addTabClickListener = () => {
  const tabs = document.querySelectorAll(".price-box-tall.w-inline-block.w-tab-link");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const price = tab.querySelector("[price]").getAttribute("price");
      const isEnterprise = tab.querySelector("[fd-custom-code='enterprise-price']");
    });
  });
};

/**
 * Scroll Event
 */
const handleScroll = () => {
  const stickyCards = document.querySelectorAll(".pricing-card");
  stickyCards.forEach((card) => {
    const navBar = document.querySelector(".new-navbar-2022");
    const navHeight = navBar.clientHeight;
    const cardPaddingTop = window.getComputedStyle(card.querySelector(".card-content-wrap")).paddingTop;
    const cardPaddingTopValue = Number(cardPaddingTop.replace("px", ""));
    const cardPos = card.offsetTop + cardPaddingTopValue;

    if (window.scrollY - cardPos >= 0)
      card.querySelector(".card-icon-wrap").classList.add("is-sticky");
    else card.querySelector(".card-icon-wrap").classList.remove("is-sticky");

    const cardIconWrap = card.querySelector(".card-icon-wrap");

    const windowWidth = window.innerWidth;
    if (windowWidth < 992) {
      cardIconWrap.style.top = `${navHeight}px`;
      return;
    }
    if (cardIconWrap.classList.contains("vertical")) {
      cardIconWrap.style.top = `0px`;
    } else {
      cardIconWrap.style.top = `${navHeight}px`;
    }
  });
};

// functions to display "Pick your Plan" when nothing is selected
function setDefaultPriceElements() {
    const priceElements = document.querySelectorAll('[fd-custom-code="growth-price"], [fd-custom-code="pro-price"], [fd-custom-code="enterprise-price"]');
    priceElements.forEach(element => {
        element.innerText = 'Pick Your Plan'; // Set default text
    });

    toggleDontToggleVisibility(true); // Make the div visible
}

function updatePriceElements(growth, pro, enterprise) {
    const growthPrices = document.querySelectorAll('[fd-custom-code="growth-price"]');
    const proPrices = document.querySelectorAll('[fd-custom-code="pro-price"]');
    const enterprisePrices = document.querySelectorAll('[fd-custom-code="enterprise-price"]');

    growthPrices.forEach(node => node.innerText = growth);
    proPrices.forEach(node => node.innerText = pro);
    enterprisePrices.forEach(node => node.innerText = enterprise);

    toggleDontToggleVisibility(false); // Hide the div when prices are updated
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    setDefaultPriceElements(); // Set default text on initial load
});

// Function to determine the revenue range based on the value
const determineRevenueRange = (value) => {
  if (value >= 50000000) return "50M+";
  if (value >= 40000000) return "40-50M";
  if (value >= 30000000) return "30-40M";
  if (value >= 20000000) return "20-30M";
  if (value >= 15000000) return "15-20M";
  if (value >= 10000000) return "10-15M";
  if (value >= 7500000) return "7.5-10M";
  if (value >= 5000000) return "5-7.5M";
  if (value >= 2500000) return "2.5-5M";
  if (value >= 1000000) return "1-2.5M";
  if (value >= 500000) return "500-1M";
  if (value >= 250000) return "250-500K";
  return "0-250K";
};

// Function to update the pricing based on the value
const updatePricingBasedOnValue = (value) => {
  const range = determineRevenueRange(value);
  setCardsPriceValue(range);
  handleSliderChange(value);
  updateRecommendedDetails(value);  // This function will be added to update recommended details
};

// Function to handle both formatting and pricing updates
function updateCopyDigits() {
  const displayValue = document.getElementById('fs-display-value');
  if (!displayValue) return;

  const value = parseInt(displayValue.textContent.replace(/,/g, ''), 10);
  if (isNaN(value)) return;

  const formattedValue = formatNumber(value);

  const copyDigitsElements = document.querySelectorAll('[copy-digits="value"]');
  copyDigitsElements.forEach(element => {
    element.textContent = formattedValue;
  });

  updatePricingBasedOnValue(value);
}

// Set up MutationObserver to watch for changes in the fs-display-value element
const targetNode = document.getElementById('fs-display-value');
if (targetNode) {
  const observer = new MutationObserver(updateCopyDigits);
  observer.observe(targetNode, { childList: true, characterData: true, subtree: true });
}

// Optional: Trigger initial check if the value is already set
const initialValue = parseInt(targetNode.textContent.replace(/,/g, ''), 10);
if (!isNaN(initialValue)) {
  updatePricingBasedOnValue(initialValue);
}

/**
 * Function Calls
 */
initSliderAnimation();
addListenerToCards();
addToggleListener();
setCardsPriceValue("0-250K");
addAddonClickListener();
addTabClickListener();
