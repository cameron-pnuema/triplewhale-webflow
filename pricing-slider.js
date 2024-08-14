/**
 * Pricing values
 */

let selectedDuration = "yearly";
let isAddonEnabled = true;
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

const revenue_levels = [
  49999999, 39999999, 29999999, 19999999, 14999999, 9999999, 7499999, 4999999,
  2499999, 999999, 499999, 249999, 0,
];

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
  "500-1M": {
    monthly: {
      growth: 299,
      pro: 399,
      enterprise: 499,
      creative_cockpit: 99,
    },
    yearly: {
      growth: 2990,
      pro: 3990,
      enterprise: 4990,
      creative_cockpit: 990,
    },
  },
  "1-2.5M": {
    monthly: {
      growth: 399,
      pro: 499,
      enterprise: 599,
      creative_cockpit: 149,
    },
    yearly: {
      growth: 3990,
      pro: 4990,
      enterprise: 5990,
      creative_cockpit: 1490,
    },
  },
  "2.5-5M": {
    monthly: {
      growth: 599,
      pro: 649,
      enterprise: 799,
      creative_cockpit: 199,
    },
    yearly: {
      growth: 5990,
      pro: 6490,
      enterprise: 7990,
      creative_cockpit: 1990,
    },
  },
  "5-7.5M": {
    monthly: {
      growth: 799,
      pro: 999,
      enterprise: 1149,
      creative_cockpit: 249,
    },
    yearly: {
      growth: 7990,
      pro: 9990,
      enterprise: 11490,
      creative_cockpit: 2490,
    },
  },
  "7.5-10M": {
    monthly: {
      growth: 1149,
      pro: 1299,
      enterprise: 1499,
      creative_cockpit: 299,
    },
    yearly: {
      growth: 11490,
      pro: 12990,
      enterprise: 14990,
      creative_cockpit: 2990,
    },
  },
  "10-15M": {
    monthly: {
      growth: 1499,
      pro: 1699,
      enterprise: 1999,
      creative_cockpit: 399,
    },
    yearly: {
      growth: 14990,
      pro: 16990,
      enterprise: 19990,
      creative_cockpit: 3990,
    },
  },
  "15-20M": {
    monthly: {
      growth: 1799,
      pro: 1999,
      enterprise: 2499,
      creative_cockpit: 499,
    },
    yearly: {
      growth: 17990,
      pro: 19990,
      enterprise: 24990,
      creative_cockpit: 4990,
    },
  },
  "20-30M": {
    monthly: {
      growth: 2199,
      pro: 2499,
      enterprise: 3199,
      creative_cockpit: 599,
    },
    yearly: {
      growth: 21990,
      pro: 24990,
      enterprise: 31990,
      creative_cockpit: 5990,
    },
  },
  "30-40M": {
    monthly: {
      growth: 2799,
      pro: 3199,
      enterprise: 3799,
      creative_cockpit: 699,
    },
    yearly: {
      growth: 27990,
      pro: 31990,
      enterprise: 37990,
      creative_cockpit: 6990,
    },
  },
  "40-50M": {
    monthly: {
      growth: 3499,
      pro: 3799,
      enterprise: 4499,
      creative_cockpit: 799,
    },
    yearly: {
      growth: 34990,
      pro: 37990,
      enterprise: 44990,
      creative_cockpit: 7990,
    },
  },
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

/**
 * Global Helper Functions
 */
const getElement = (value) =>
  document.querySelector(`[fd-custom-code="${value}"]`);
const getElements = (value) =>
  document.querySelectorAll(`[fd-custom-code="${value}"]`);

const addCommas = (num) => new Intl.NumberFormat("en-us").format(num);

function getRevenueRange(revenue) {
  const ranges = Object.keys(prices);
  for (let range of ranges) {
    const [min, max] = range.split('-').map(val => {
      if (val.endsWith('K')) return parseFloat(val) * 1000;
      if (val.endsWith('M')) return parseFloat(val) * 1000000;
      if (val === '50M+') return Infinity;
      return parseFloat(val);
    });
    if (revenue >= min && revenue < max) return range;
  }
  return '50M+';
}

function formatRevenue(revenue) {
  if (revenue >= 1000000) {
    return (revenue / 1000000).toFixed(1) + 'M';
  } else if (revenue >= 1000) {
    return (revenue / 1000).toFixed(0) + 'K';
  }
  return revenue.toString();
}

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

let currentlyShowingCard = "free-card";

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
    card.classList.remove('recommended-border');
  });
};

const addRecommendedClass = (el) => el.classList.add("recommended-card");
const addRecommendedBorder = (el) => el.classList.add('recommended-border');

/**
 * Logic to set card prices
 */

let currentRange = "0-250K";

const setCardsPriceValue = (range = currentRange) => {
  currentRange = range;
  if (range === "50M+") {
    setPricesToCustom();
    return;
  }

  if (selectedDuration === "monthly") {
    const { growth, pro, enterprise, creative_cockpit } = prices[range].monthly;
    setMonthlyPrices(growth, pro, enterprise, creative_cockpit);
  } else {
    const { growth, pro, enterprise, creative_cockpit } = prices[range].yearly;
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

const getAdditionalSupportText = (value) => {
  const thresholds = [500000, 1000000, 5000000, 10000000, 50000000];
  const defaultThreshold = 50000000;

  const selectedThreshold =
    thresholds.find((threshold) => value < threshold) || defaultThreshold;
  return additionalSupports[selectedThreshold];
};

const setAdditionalSupportText = (supports) => {
  const wrapperNodes = getElements("additional-support");
  wrapperNodes.forEach((node) => {
    node.innerHTML = "";
    supports.forEach((support) => {
      let div = document.createElement("div");
      div.classList.add("card-list-flex");
      div.innerHTML = `
      <img src="https://assets-global.website-files.com/61bcbae3ae2e8ee49aa790b0/651ad7899a658b656c548cd9_647606ad31337d3beb5e2cc5_check-icon-brix-templates.svg.svg"
      loading="lazy" alt=""  class="tick-icon">
      <div>${support}</div>
      `;
      node.appendChild(div);
    });
  });
};

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
  let duration = selectedDuration === "yearly" ? "/year" : "/month";
  growthPriceNodes.forEach((node) => setPrice(node, growth));
  proPriceNodes.forEach((node) => setPrice(node, pro));
  enterprisePriceNodes.forEach((node) => setPrice(node, enterprise));
  durationNodes.forEach((node) => (node.innerText = `${duration}`));
  currencyNodes.forEach((node) => (node.innerText = "$"));
  setAddonCost(creative_cockpit);
};

const setMonthlyPrices = (growth, pro, enterprise, creative_cockpit) => {
  let duration = selectedDuration === "yearly" ? "/year" : "/month";
  growthPriceNodes.forEach((node) => setPrice(node, growth));
  proPriceNodes.forEach((node) => setPrice(node, pro));
  enterprisePriceNodes.forEach((node) => setPrice(node, enterprise));
  durationNodes.forEach((node) => (node.innerText = `${duration}`));
  currencyNodes.forEach((node) => (node.innerText = "$"));
  setAddonCost(creative_cockpit);
};

function updatePricesAndRecommendation(revenue) {
  const range = getRevenueRange(revenue);
  setCardsPriceValue(range);

  let recommendedPlan;
  if (revenue >= 5000000) {
    recommendedPlan = 'Enterprise';
  } else if (revenue >= 1000000) {
    recommendedPlan = 'Pro';
  } else if (revenue >= 500000) {
    recommendedPlan = 'Growth';
  } else if (revenue > 0) {
    recommendedPlan = 'Free';
  } else {
    recommendedPlan = '';
  }

  const recommendedPlanElement = document.querySelector('[recommended-plan="name"]');
  if (recommendedPlanElement) {
    recommendedPlanElement.textContent = recommendedPlan;
  }

  const recommendedPriceElement = document.querySelector('[recommended-price="digits"]');
  if (recommendedPriceElement && recommendedPlan) {
    const price = prices[range][selectedDuration][recommendedPlan.toLowerCase()];
    recommendedPriceElement.textContent = price === 'Custom' ? 'Custom' : `$${price}`;
  }

  if (revenue === 0) {
    setDefaultPriceElements();
    toggleDontToggleVisibility(true);
  } else {
    updatePriceElements(
      prices[range][selectedDuration].growth,
      prices[range][selectedDuration].pro,
      prices[range][selectedDuration].enterprise
    );
    toggleDontToggleVisibility(false);
  }

  handleSliderChange(revenue);
}

function observeFsDisplayValue() {
  const fsDisplayValue = document.getElementById('fs-display-value');
  if (!fsDisplayValue) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        const revenue = parseFloat(fsDisplayValue.textContent.replace(/,/g, ''));
        updatePricesAndRecommendation(revenue);
      }
    });
  });

  observer.observe(fsDisplayValue, { characterData: true, childList: true, subtree: true });
}

function setDefaultPriceElements() {
  const priceElements = document.querySelectorAll('[fd-custom-code="growth-price"], [fd-custom-code="pro-price"], [fd-custom-code="enterprise-price"]');
  priceElements.forEach(element => {
    element.innerText = 'Pick Your Plan';
  });
}

function toggleDontToggleVisibility(isVisible) {
  const dontToggleElement = document.getElementById('dont-toggle');
  if (dontToggleElement) {
    dontToggleElement.style.display = isVisible ? 'block' : 'none';
  }
}

function updatePriceElements(growth, pro, enterprise) {
  growthPriceNodes.forEach(node => node.innerText = growth);
  proPriceNodes.forEach(node => node.innerText = pro);
  enterprisePriceNodes.forEach(node => node.innerText = enterprise);
}

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

const handleScroll = () => {
  const stickyCards = document.querySelectorAll(".pricing-card");
  stickyCards.forEach((card) => {
    const navBar = document.querySelector(".new-navbar-2022");
    const navHeight = navBar.clientHeight;
    const cardPaddingTop = window.getComputedStyle(
      card.querySelector(".card-content-wrap")
    ).paddingTop;
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

document.addEventListener('DOMContentLoaded', function() {
  observeFsDisplayValue();
  const fsDisplayValue = document.getElementById('fs-display-value');
  if (fsDisplayValue) {
    const initialRevenue = parseFloat(fsDisplayValue.textContent.replace(/,/g, ''));
    updatePricesAndRecommendation(initialRevenue);
  }
  
  initSliderAnimation();
  addListenerToCards();
  addToggleListener();
  addAddonClickListener();
  window.addEventListener('scroll', handleScroll);
});

// Initialize slider animation (you may need to adjust this based on your specific implementation)
function initSliderAnimation() {
  const allOptions = document.querySelectorAll(".pricing-dropdown-item");
  allOptions.forEach((option) => {
    option.addEventListener("click", () => {
      lastClickedCard = '';
      removeRecommendedBorderFromCards();
      const revenue = Number(option.getAttribute("fd-pricing-value")) - 1;
      getElement("selected-price").innerText = `${option.innerText}`;
      getElement("selected-price-wrapper").classList.remove("is-open");
      updatePricesAndRecommendation(revenue);
      getElement("pricing-dropdowns").style.display = "none";
    });
  });
}
