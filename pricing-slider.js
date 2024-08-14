/**
 * Pricing values
 */


let selectedDuration = "yearly";
let isAddonEnabled = true;
let monthly_option = !0;
let lastClickedCard = ''
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

// ... (keep all the existing code up to the pricing object)

// Function to get the appropriate price range for a given revenue
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

// Function to format revenue for display
function formatRevenue(revenue) {
  if (revenue >= 1000000) {
    return (revenue / 1000000).toFixed(1) + 'M';
  } else if (revenue >= 1000) {
    return (revenue / 1000).toFixed(0) + 'K';
  }
  return revenue.toString();
}

// Function to update prices and recommended plan
function updatePricesAndRecommendation(revenue) {
  const range = getRevenueRange(revenue);
  setCardsPriceValue(range);

  // Determine recommended plan
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

  // Update recommended plan display
  const recommendedPlanElement = document.querySelector('[recommended-plan="name"]');
  if (recommendedPlanElement) {
    recommendedPlanElement.textContent = recommendedPlan;
  }

  // Update recommended price display
  const recommendedPriceElement = document.querySelector('[recommended-price="digits"]');
  if (recommendedPriceElement && recommendedPlan) {
    const price = prices[range][selectedDuration][recommendedPlan.toLowerCase()];
    recommendedPriceElement.textContent = price === 'Custom' ? 'Custom' : `$${price}`;
  }

  // Update UI based on revenue
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

  // Update card visibility and recommended status
  handleSliderChange(revenue);
}

// Function to observe changes in the fs-display-value element
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

// Modify the setDefaultPriceElements function
function setDefaultPriceElements() {
  const priceElements = document.querySelectorAll('[fd-custom-code="growth-price"], [fd-custom-code="pro-price"], [fd-custom-code="enterprise-price"]');
  priceElements.forEach(element => {
    element.innerText = 'Pick Your Plan';
  });
}

// Modify the toggleDontToggleVisibility function
function toggleDontToggleVisibility(isVisible) {
  const dontToggleElement = document.getElementById('dont-toggle');
  if (dontToggleElement) {
    dontToggleElement.style.display = isVisible ? 'block' : 'none';
  }
}

// Modify the existing event listener for dropdown items
const allOptions = document.querySelectorAll(".pricing-dropdown-item");
allOptions.forEach((option) => {
  option.addEventListener("click", () => {
    lastClickedCard = '';
    removeRecommendedBorderFromCards();
    isOpen = true;
    
    const revenue = Number(option.getAttribute("fd-pricing-value")) - 1;
    getElement("selected-price").innerText = `${option.innerText}`;
    getElement("selected-price-wrapper").classList.remove("is-open");
    updatePricesAndRecommendation(revenue);
    getElement("pricing-dropdowns").style.display = "none";
  });
});

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  observeFsDisplayValue();
  // Initialize with the current value of fs-display-value
  const fsDisplayValue = document.getElementById('fs-display-value');
  if (fsDisplayValue) {
    const initialRevenue = parseFloat(fsDisplayValue.textContent.replace(/,/g, ''));
    updatePricesAndRecommendation(initialRevenue);
  }
});

// ... (keep the rest of the existing code)
