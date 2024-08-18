/**
 * Pricing values
 */

let selectedDuration = "yearly";
let isAddonEnabled = true;
let monthly_option = !0;
let lastClickedCard = "";
let lastRecommendedCard = "free-card";

const additionalSupports = {
  500000: ["Live Chat", "Group Onboarding", "Weekly Product Training Sessions"],
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
      premium: 279,
      premiumPlus: 478,
    },
    yearly: {
      growth: 1290,
      pro: 1990,
      enterprise: 2790,
      creative_cockpit: 790,
      premium: 234 * 12,
      premiumPlus: 402 * 12,
    },
  },
  "250-500K": {
    monthly: {
      growth: 199,
      pro: 299,
      enterprise: 379,
      creative_cockpit: 99,
      premium: 379,
      premiumPlus: 678,
    },
    yearly: {
      growth: 1990,
      pro: 2990,
      enterprise: 3790,
      creative_cockpit: 990,
      premium: 318 * 12,
      premiumPlus: 570 * 12,
    },
  },
  "500-1M": {
    monthly: {
      growth: 299,
      pro: 399,
      enterprise: 499,
      creative_cockpit: 99,
      premium: 499,
      premiumPlus: 898,
    },
    yearly: {
      growth: 2990,
      pro: 3990,
      enterprise: 4990,
      creative_cockpit: 990,
      premium: 419 * 12,
      premiumPlus: 754 * 12,
    },
  },
  "1-2.5M": {
    monthly: {
      growth: 399,
      pro: 499,
      enterprise: 599,
      creative_cockpit: 149,
      premium: 599,
      premiumPlus: 1098,
    },
    yearly: {
      growth: 3990,
      pro: 4990,
      enterprise: 5990,
      creative_cockpit: 1490,
      premium: 503 * 12,
      premiumPlus: 922 * 12,
    },
  },
  "2.5-5M": {
    monthly: {
      growth: 599,
      pro: 649,
      enterprise: 799,
      creative_cockpit: 199,
      premium: 799,
      premiumPlus: 1448,
    },
    yearly: {
      growth: 5990,
      pro: 6490,
      enterprise: 7990,
      creative_cockpit: 1990,
      premium: 671 * 12,
      premiumPlus: 1216 * 12,
    },
  },
  "5-7.5M": {
    monthly: {
      growth: 799,
      pro: 999,
      enterprise: 1149,
      creative_cockpit: 249,
      premium: 1149,
      premiumPlus: 2148,
    },
    yearly: {
      growth: 7990,
      pro: 9990,
      enterprise: 11490,
      creative_cockpit: 2490,
      premium: 965 * 12,
      premiumPlus: 1804 * 12,
    },
  },
  "7.5-10M": {
    monthly: {
      growth: 1149,
      pro: 1299,
      enterprise: 1499,
      creative_cockpit: 299,
      premium: 1499,
      premiumPlus: 2798,
    },
    yearly: {
      growth: 11490,
      pro: 12990,
      enterprise: 14990,
      creative_cockpit: 2990,
      premium: 1259 * 12,
      premiumPlus: 2350 * 12,
    },
  },
  "10-15M": {
    monthly: {
      growth: 1499,
      pro: 1699,
      enterprise: 1999,
      creative_cockpit: 399,
      premium: 1999,
      premiumPlus: 3698,
    },
    yearly: {
      growth: 14990,
      pro: 16990,
      enterprise: 19990,
      creative_cockpit: 3990,
      premium: 1679 * 12,
      premiumPlus: 3106 * 12,
    },
  },
  "15-20M": {
    monthly: {
      growth: 1799,
      pro: 1999,
      enterprise: 2499,
      creative_cockpit: 499,
      premium: 2499,
      premiumPlus: 4498,
    },
    yearly: {
      growth: 17990,
      pro: 19990,
      enterprise: 24990,
      creative_cockpit: 4990,
      premium: 2099 * 12,
      premiumPlus: 3778 * 12,
    },
  },
  "20-30M": {
    monthly: {
      growth: 2199,
      pro: 2499,
      enterprise: 3199,
      creative_cockpit: 599,
      premium: 3199,
      premiumPlus: 5698,
    },
    yearly: {
      growth: 21990,
      pro: 24990,
      enterprise: 31990,
      creative_cockpit: 5990,
      premium: 2687 * 12,
      premiumPlus: 4786 * 12,
    },
  },
  "30-40M": {
    monthly: {
      growth: 2799,
      pro: 3199,
      enterprise: 3799,
      creative_cockpit: 699,
      premium: 3799,
      premiumPlus: 6998,
    },
    yearly: {
      growth: 27990,
      pro: 31990,
      enterprise: 37990,
      creative_cockpit: 6990,
      premium: 3191 * 12,
      premiumPlus: 5878 * 12,
    },
  },
  "40-50M": {
    monthly: {
      growth: 3499,
      pro: 3799,
      enterprise: 4499,
      creative_cockpit: 799,
      premium: 4499,
      premiumPlus: 8298,
    },
    yearly: {
      growth: 34990,
      pro: 37990,
      enterprise: 44990,
      creative_cockpit: 7990,
      premium: 3779 * 12,
      premiumPlus: 6970 * 12,
    },
  },
  "50M+": {
    monthly: {
      growth: "Custom",
      pro: "Custom",
      enterprise: "Custom",
      creative_cockpit: "Custom",
      premium: "Custom",
      premiumPlus: "Custom",
    },
    yearly: {
      growth: "Custom",
      pro: "Custom",
      enterprise: "Custom",
      creative_cockpit: "Custom",
      premium: "Custom",
      premiumPlus: "Custom",
    },
  },
};


const getMonthlyPrices = (range) => {
  const {
    monthly: { growth, pro, enterprise, creative_cockpit, premium, premiumPlus },
  } = prices[range];

  return {
    growth,
    pro,
    enterprise,
    creative_cockpit,
    premium,
    premiumPlus,
  };
};

const getYearlyPrices = (range) => {
  const {
    yearly: { growth, pro, enterprise, creative_cockpit, premium, premiumPlus },
  } = prices[range];
  return {
    growth,
    pro,
    enterprise,
    creative_cockpit,
    premium,
    premiumPlus,
  };
};


/**
 * Global Helper Functions
 */
const getElement = (value) =>
  document.querySelector(`[fd-custom-code="${value}"]`);
const getElements = (value) =>
  document.querySelectorAll(`[fd-custom-code="${value}"]`);

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

let timeoutId;
let isFirstLoad;
let currentlyShowingCard = "free-card";

const showCard = (card) => {
  card.classList.remove("hide-card");
  card.querySelector(".card-icon-wrap").classList.remove("vertical");
  card.querySelector(".card-overview").classList.remove("hide");

  if (
    isFirstLoad ||
    currentlyShowingCard === card.getAttribute("fd-custom-code")
  ) {
    isFirstLoad = false;
    return;
  }
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
const premiumCard = getElement("premium-card");
const premiumPlusCard = getElement("premiumPlus-card");

const hideAllCards = () => {
  [freeCard, growthCard, proCard, enterpriseCard, premiumCard, premiumPlusCard].forEach(decreaseCardSize);
  hideEnterpriseForm();
};

const showAllCards = () => {
  [freeCard, growthCard, proCard, premiumCard, premiumPlusCard].forEach(showCard);
  hideEnterpriseForm();
};

const removeRecommendedClassFromCards = () => {
  [freeCard, growthCard, proCard, enterpriseCard, premiumCard, premiumPlusCard].forEach((card) => {
    card.classList.remove("recommended-card");
  });
};

const removeRecommendedBorderFromCards = () => {
  [freeCard, growthCard, proCard, enterpriseCard, premiumCard, premiumPlusCard].forEach((card) => {
    card.classList.remove("recommended-border");
  });
};

const addRecommendedClass = (el) => el.classList.add("recommended-card");
const addRecommendedBorder = (el) => el.classList.add("recommended-border");


/**
 * Logic to set card prices
 */

let priceDuration;
// index refers to the object key that will be selected
let index = 12;

/**
 * Helper functions for All Pricing Logics
 */
const growthPriceNodes = getElements("growth-price");
const proPriceNodes = getElements("pro-price");
const enterprisePriceNodes = getElements("enterprise-price");
const premiumPriceNodes = getElements("premium-price");
const premiumPlusPriceNodes = getElements("premiumPlus-price");
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

  //   setTotalCost("Custom", false);
  setAddonCost("Custom");
};

const setYearlyPrices = (growth, pro, enterprise, premium, premiumPlus, creative_cockpit) => {
  let duration = selectedDuration === "yearly" ? "/year" : "/month";
  growthPriceNodes.forEach((node) => setPrice(node, growth));
  proPriceNodes.forEach((node) => setPrice(node, pro));
  enterprisePriceNodes.forEach((node) => setPrice(node, enterprise));
  premiumPriceNodes.forEach((node) => setPrice(node, premium));
  premiumPlusPriceNodes.forEach((node) => setPrice(node, premiumPlus));
  durationNodes.forEach((node) => (node.innerText = `${duration}`));
  currencyNodes.forEach((node) => (node.innerText = "$"));

  /** set addon cost */
  setAddonCost(creative_cockpit);
  /** set total cost */
  //   const { selectedTabPrice, isEnterprise } = getSelectedTabPrice();
  //   setTotalCost(selectedTabPrice, isEnterprise);
};

const setMonthlyPrices = (growth, pro, enterprise, premium, premiumPlus, creative_cockpit) => {
  let duration = selectedDuration === "yearly" ? "/year" : "/month";
  growthPriceNodes.forEach((node) => setPrice(node, growth));
  proPriceNodes.forEach((node) => setPrice(node, pro));
  enterprisePriceNodes.forEach((node) => setPrice(node, enterprise));
  premiumPriceNodes.forEach((node) => setPrice(node, premium));
  premiumPlusPriceNodes.forEach((node) => setPrice(node, premiumPlus));
  durationNodes.forEach((node) => (node.innerText = `${duration}`));
  currencyNodes.forEach((node) => (node.innerText = "$"));

  /** set addon cost */
  setAddonCost(creative_cockpit);

  /** set total cost */
  //   const { selectedTabPrice, isEnterprise } = getSelectedTabPrice();
  //   setTotalCost(selectedTabPrice, isEnterprise);
};

const setTotalCost = (price, isEnterprise) => {
  const { creative_cockpit } =
    selectedDuration === "yearly"
      ? pricing_ranges_yearly[index]
      : pricing_ranges_monthly[index];

  let totalCost;
  /**
   * if the selected card is enterprise, we don't add the addon cost
   * also if the isAddonEnabled is false, we don't add the addon cost
   */
  const addonCost = !isAddonEnabled || isEnterprise ? 0 : creative_cockpit;
  if (price !== "Custom") {
    totalCost = addCommas(addonCost + Number(price));
  } else {
    totalCost = "Custom";
    durationNodes.forEach((node) => (node.innerText = ""));
    currencyNodes.forEach((node) => (node.innerText = ""));
  }

  const totalCostNode = document.getElementById("tw-total-cost");
  totalCostNode.innerText = `$${totalCost}`;
};

const getSelectedTabPrice = () => {
  const allPriceTabs = document.querySelectorAll("[fd-card-tab]");
  const selectedTab = [...allPriceTabs].find((el) =>
    el.classList.contains("w--current")
  );
  //check if selected tab is enterprise
  const isEnterprise = selectedTab.querySelector(
    "[fd-custom-code='enterprise-price']"
  );
  const selectedTabPrice = selectedTab
    .querySelector("[price]")
    .getAttribute("price");

  return {
    selectedTabPrice,
    isEnterprise,
  };
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

/** helper functions end */
let currentRange = "0-250K";

const setCardsPriceValue = (range = currentRange) => {
  currentRange = range;
  if (range === "50M+") {
    setPricesToCustom();
    return;
  }

  if (selectedDuration === "monthly") {
    const { growth, pro, enterprise, creative_cockpit, premium, premiumPlus } = getMonthlyPrices(range);
    setMonthlyPrices(growth, pro, enterprise, creative_cockpit, premium, premiumPlus);
  } else {
    const { growth, pro, enterprise, creative_cockpit, premium, premiumPlus } = getYearlyPrices(range);
    setYearlyPrices(growth, pro, enterprise, creative_cockpit, premium, premiumPlus);
  }
};


const handleSliderChange = (value) => {
  const ctaOfGrowth = getElement("growth-card").querySelector(".card-demo-btn");

  removeRecommendedClassFromCards();
  hideEnterpriseForm();
  hideAllCards();
  if (value >= 5000000) {
    // show enterprise, pro, premium, and premiumPlus for price >= 5 Million
    showCard(getElement("enterprise-card"));
    showCard(getElement("pro-card"));
    showCard(getElement("premium-card"));
    showCard(getElement("premiumPlus-card"));
    addRecommendedClass(getElement("enterprise-card"));
    addRecommendedBorder(getElement("enterprise-card"));
    lastRecommendedCard = "enterprise-card";
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
      addRecommendedBorder(getElement("pro-card"));
      lastRecommendedCard = "pro-card";
      showCard(getElement("pro-card"));
      showCard(getElement("enterprise-card"));
      showCard(getElement("premium-card"));
      showCard(getElement("premiumPlus-card"));
    } else if (value >= 500000 && value < 1000000) {
      addRecommendedClass(getElement("growth-card"));
      addRecommendedBorder(getElement("growth-card"));
      lastRecommendedCard = "growth-card";
      showCard(getElement("growth-card"));
      showCard(getElement("pro-card"));
      showCard(getElement("premium-card"));
      showCard(getElement("premiumPlus-card"));
    } else if (value < 500000) {
      addRecommendedClass(getElement("free-card"));
      addRecommendedBorder(getElement("free-card"));
      lastRecommendedCard = "free-card";
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
  console.log("closing");
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

// Function to toggle the visibility of the "dont-toggle" div
function toggleDontToggleVisibility(isVisible) {
  const dontToggleElement = document.getElementById("dont-toggle");
  if (dontToggleElement) {
    dontToggleElement.style.display = isVisible ? "block" : "none";
  }
}

const initSliderAnimation = () => {
  hideDurationAndCurrency(); // Hide elements by default

  getElement("pricing-dropdown-container").addEventListener("click", () => {
    if (!isOpen) {
      showDropdown();
      // add event listener on body to close the dropdown on clicking anywhere else
      document.querySelector("body").addEventListener("click", handleBodyClick);
    } else {
      closeDropdown();
      document
        .querySelector("body")
        .removeEventListener("click", handleBodyClick);
    }
    isOpen = !isOpen;
  });

  /** add click listeners on each of the options */
  const allOptions = document.querySelectorAll(".pricing-dropdown-item");
  allOptions.forEach((option) => {
    option.addEventListener("click", () => {
      lastClickedCard = "";
      removeRecommendedBorderFromCards();
      isOpen = true;
      // change selected price text
      const priceVal = Number(option.getAttribute("fd-pricing-value")) - 1;
      const range = option.getAttribute("fd-custom-range");
      getElement("selected-price").innerText = `${option.innerText}`;
      getElement("selected-price-wrapper").classList.remove("is-open");
      // toggle the dropdown
      handleSliderChange(priceVal);
      setCardsPriceValue(range);

      showDurationAndCurrency(); // Show elements when a price is selected

      getElement("pricing-dropdowns").style.display = "none";

      toggleDontToggleVisibility(false); // Hide the div when a price is selected
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

        if (
          selectedCard === "enterprise-card" ||
          selectedCard === "pro-card" ||
          selectedCard === "premium-card" ||
          selectedCard === "premiumPlus-card"
        ) {
          showCard(getElement("pro-card"));
          showCard(getElement("enterprise-card"));
          showCard(getElement("premium-card"));
          showCard(getElement("premiumPlus-card"));
          showEnterpriseForm();
        } else {
          hideEnterpriseForm();
          if (selectedCard === "free-card")
            showCards(["free-card", "growth-card"]);
          if (selectedCard === "growth-card")
            showCards(["growth-card", "pro-card"]);
          if (selectedCard === "premium-card")
            showCards(["premium-card", "premiumPlus-card"]);
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

    // logic for setting total cost
    // const { selectedTabPrice, isEnterprise } = getSelectedTabPrice();

    // setTotalCost(selectedTabPrice, isEnterprise);
  });
};

const addAddonClickListener = () => {
  let isOn = true;
  const addOnToggle = document.getElementById("tw-toggle-add-on-cc");
  const thumb = addOnToggle.querySelector(".toggle-thumb");
  thumb.style.transition = "transform 0.3s ease";

  addOnToggle.addEventListener("click", () => {
    // if already on, we change the color to grey else we change back to green
    const bgColor = isOn ? "rgb(182, 185, 206)" : "rgb(14, 188, 110)";
    const transformValue = isOn ? "translateX(-100%)" : "translateX(0)";
    addOnToggle.style.backgroundColor = bgColor;
    thumb.style.transform = transformValue;

    isOn = !isOn;
    isAddonEnabled = isOn;

    // const { selectedTabPrice, isEnterprise } = getSelectedTabPrice();
    // setTotalCost(selectedTabPrice, isEnterprise);
  });
};

const addTabClickListener = () => {
  const tabs = document.querySelectorAll(
    ".price-box-tall.w-inline-block.w-tab-link"
  );
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const price = tab.querySelector("[price]").getAttribute("price");
      //check if tab is enterprise
      const isEnterprise = tab.querySelector(
        "[fd-custom-code='enterprise-price']"
      );

      //   setTotalCost(price, isEnterprise);
    });
  });
};

/**
 * Scroll Event
 */
const handleScroll = () => {
  const stickyCards = document.querySelectorAll(".pricing-card");
  stickyCards.forEach((card) => {
    // if (card.classList.contains("hide-card")) return;

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

// functions to display "Pick your Plan" when nothing is selected
function setDefaultPriceElements() {
  const priceElements = document.querySelectorAll(
    '[fd-custom-code="growth-price"], [fd-custom-code="pro-price"], [fd-custom-code="enterprise-price"]'
  );
  priceElements.forEach((element) => {
    element.innerText = "Pick Your Plan"; // Set default text
  });

  toggleDontToggleVisibility(true); // Make the div visible
}

function updatePriceElements(growth, pro, enterprise, premium, premiumPlus) {
  const growthPrices = document.querySelectorAll('[fd-custom-code="growth-price"]');
  const proPrices = document.querySelectorAll('[fd-custom-code="pro-price"]');
  const enterprisePrices = document.querySelectorAll('[fd-custom-code="enterprise-price"]');
  const premiumPrices = document.querySelectorAll('[fd-custom-code="premium-price"]');
  const premiumPlusPrices = document.querySelectorAll('[fd-custom-code="premiumPlus-price"]');

  growthPrices.forEach((node) => (node.innerText = growth));
  proPrices.forEach((node) => (node.innerText = pro));
  enterprisePrices.forEach((node) => (node.innerText = enterprise));
  premiumPrices.forEach((node) => (node.innerText = premium));
  premiumPlusPrices.forEach((node) => (node.innerText = premiumPlus));

  toggleDontToggleVisibility(false); // Hide the div when prices are updated
}


//
document.addEventListener("DOMContentLoaded", function () {
  setDefaultPriceElements(); // Set default text on initial load
});

//
const allOptions = document.querySelectorAll(".pricing-dropdown-item");
allOptions.forEach((option) => {
  option.addEventListener("click", () => {
    lastClickedCard = "";
    removeRecommendedBorderFromCards();
    isOpen = true;

    const priceVal = Number(option.getAttribute("fd-pricing-value")) - 1;
    const range = option.getAttribute("fd-custom-range");
    getElement("selected-price").innerText = `${option.innerText}`;
    getElement("selected-price-wrapper").classList.remove("is-open");
    handleSliderChange(priceVal);
    const { growth, pro, enterprise, premium, premiumPlus } = setCardsPriceValue(range);
    updatePriceElements(growth, pro, enterprise, premium, premiumPlus);
    getElement("pricing-dropdowns").style.display = "none";
  });
});


/**
 * Function Calls
 */

initSliderAnimation();
addListenerToCards();

addToggleListener();

setCardsPriceValue(currentRange);

addAddonClickListener();

addTabClickListener();

// Format the number for display purposes
function formatNumber(number) {
  if (number < 1000000) {
    return Math.round(number / 1000) + "k";
  } else if (number < 10000000) {
    return (Math.round(number / 100000) / 10).toFixed(1) + "M";
  } else {
    return Math.round(number / 1000000) + "M";
  }
}

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

  // Determine what plan should be recommended
  handleSliderChange(value);
};

// Function to handle both formatting and pricing updates
function updateCopyDigits() {
  const displayValue = document.getElementById("fs-display-value");
  if (!displayValue) return;

  const value = parseInt(displayValue.textContent.replace(/,/g, ""), 10);
  if (isNaN(value)) return;

  const formattedValue = formatNumber(value);

  // Update elements with the formatted value
  const copyDigitsElements = document.querySelectorAll('[copy-digits="value"]');
  copyDigitsElements.forEach((element) => {
    element.textContent = formattedValue;
  });

  // Trigger the pricing update
  updatePricingBasedOnValue(value);
}

// Run the function initially
updateCopyDigits();

// Set up a MutationObserver to watch for changes in the fs-display-value element
const targetNode = document.getElementById("fs-display-value");
if (targetNode) {
  const observer = new MutationObserver(updateCopyDigits);
  observer.observe(targetNode, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

// Optional: Trigger initial check if the value is already set
const initialValue = parseInt(targetNode.textContent.replace(/,/g, ""), 10);
if (!isNaN(initialValue)) {
  updatePricingBasedOnValue(initialValue);
}
