// Utility function for safe DOM operations
function getElementSafe(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }
  return element;
}

function setValueSafe(element, value) {
  try {
    if (element && typeof element.value !== 'undefined') {
      element.value = value;
    }
  } catch (err) {
    console.error('Error setting value:', err);
  }
}

// Initialize app with better error handling
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Safe DOM initialization
    const yearElement = getElementSafe('#year');
    const langSelector = getElementSafe('#language-selector');
    const positionSizeForm = getElementSafe('#position-size-form');
    const converterForm = getElementSafe('#converter-form');
    const profitLossForm = getElementSafe('#profit-loss-form');
    const feeForm = getElementSafe('#fee-form');
    const settingsForm = getElementSafe('#settings-form');
    
    // Initialize year
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize core functionality only if required elements exist
    if (positionSizeForm && converterForm && profitLossForm && feeForm && settingsForm) {
      initTabs();
      loadSettings();
      initFormHandlers();
      initModal();
      
      // Add language selector event listener
      if (langSelector) {
        langSelector.addEventListener('change', function() {
          changeLanguage(this.value);
        });
      }
      
      // Load saved language with error handling
      chrome.storage.sync.get(['language'], (result) => {
        try {
          const savedLanguage = result.language || 'fa';
          if (langSelector) {
            setValueSafe(langSelector, savedLanguage);
          }
          changeLanguage(savedLanguage);
        } catch (err) {
          console.error('Error loading language:', err);
        }
      });
    } else {
      console.error('Required form elements not found');
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
});

// ترجمه‌های متن
const translations = {
  fa: {
    title: 'ماشین حساب سود و زیان',
    marketType: 'نوع بازار:',
    forex: 'فارکس',
    crypto: 'ارز دیجیتال',
    iranianStock: 'بورس ایران',
    tabs: {
      positionSize: 'اندازه پوزیشن',
      converter: 'تبدیل ارز',
      profitLoss: 'سود و زیان',
      fees: 'کارمزدها'
    },
    forms: {
      accountBalance: 'موجودی حساب:',
      riskPercentage: 'درصد ریسک:',
      entryPrice: 'قیمت ورود:',
      stopLoss: 'حد ضرر:',
      calculate: 'محاسبه',
      amount: 'مقدار:',
      from: 'از:',
      to: 'به:',
      convert: 'تبدیل',
      tradeType: 'نوع معامله:',
      buy: 'خرید',
      sell: 'فروش',
      exitPrice: 'قیمت خروج:',
      positionSize: 'اندازه پوزیشن:',
      feePercentage: 'درصد کارمزد:',
      exchangePlatform: 'صرافی/پلتفرم:',
      customFee: 'کارمزد سفارشی (%):',
      transactionAmount: 'مبلغ تراکنش:',
      feeTypes: 'نوع کارمزد:',
      tradingFee: 'کارمزد معامله',
      withdrawalFee: 'کارمزد برداشت',
      networkFee: 'کارمزد شبکه'
    },
    results: {
      riskAmount: 'مقدار ریسک:',
      positionSize: 'اندازه پوزیشن:',
      units: 'واحد',
      result: 'نتیجه:',
      exchangeRate: 'نرخ تبدیل:',
      profitLoss: 'سود/زیان:',
      roi: 'بازده سرمایه‌گذاری:',
      totalFees: 'کل کارمزدها:',
      tradingFee: 'کارمزد معامله:',
      withdrawalFee: 'کارمزد برداشت:',
      networkFee: 'کارمزد شبکه:'
    },
    settings: {
      title: 'تنظیمات',
      defaultCurrency: 'ارز پیش‌فرض:',
      defaultExchange: 'صرافی پیش‌فرض:',
      exchangeRatesTitle: 'تنظیم نرخ‌های ارز',
      irrUsdRate: 'نرخ ریال/دلار:',
      btcUsdRate: 'قیمت بیت‌کوین (دلار):',
      ethUsdRate: 'قیمت اتریوم (دلار):',
      save: 'ذخیره تنظیمات'
    },
    currencies: {
      IRR: 'ریال',
      USDT: 'تتر',
      USD: 'دلار',
      BTC: 'بیت‌کوین',
      ETH: 'اتریوم'
    },
    exchanges: {
      nobitex: 'نوبیتکس',
      ramzinex: 'رمزینکس',
      binance: 'بایننس',
      kucoin: 'کوکوین',
      custom: 'سفارشی'
    },
    validation: {
      enterValidNumbers: 'لطفاً برای همه فیلدها اعداد معتبر وارد کنید',
      enterValidNumber: 'لطفاً یک عدد معتبر وارد کنید',
      enterValidTransactionAmount: 'لطفاً یک مبلغ تراکنش معتبر وارد کنید'
    },
    misc: {
      settingsSaved: 'تنظیمات با موفقیت ذخیره شد!',
      copyright: 'ساخته شده توسط',
      version: 'نسخه'
    }
  },
  en: {
    title: 'Trade Calculator',
    marketType: 'Market Type:',
    forex: 'Forex',
    crypto: 'Cryptocurrency',
    iranianStock: 'Iranian Stock',
    tabs: {
      positionSize: 'Position Size',
      converter: 'Currency Converter',
      profitLoss: 'Profit/Loss',
      fees: 'Fees'
    },
    forms: {
      accountBalance: 'Account Balance:',
      riskPercentage: 'Risk Percentage:',
      entryPrice: 'Entry Price:',
      stopLoss: 'Stop Loss:',
      calculate: 'Calculate',
      amount: 'Amount:',
      from: 'From:',
      to: 'To:',
      convert: 'Convert',
      tradeType: 'Trade Type:',
      buy: 'Buy',
      sell: 'Sell',
      exitPrice: 'Exit Price:',
      positionSize: 'Position Size:',
      feePercentage: 'Fee Percentage:',
      exchangePlatform: 'Exchange/Platform:',
      customFee: 'Custom Fee (%):',
      transactionAmount: 'Transaction Amount:',
      feeTypes: 'Fee Types:',
      tradingFee: 'Trading Fee',
      withdrawalFee: 'Withdrawal Fee',
      networkFee: 'Network Fee'
    },
    results: {
      riskAmount: 'Risk Amount:',
      positionSize: 'Position Size:',
      units: 'Units',
      result: 'Result:',
      exchangeRate: 'Exchange Rate:',
      profitLoss: 'Profit/Loss:',
      roi: 'ROI:',
      totalFees: 'Total Fees:',
      tradingFee: 'Trading Fee:',
      withdrawalFee: 'Withdrawal Fee:',
      networkFee: 'Network Fee:'
    },
    settings: {
      title: 'Settings',
      defaultCurrency: 'Default Currency:',
      defaultExchange: 'Default Exchange:',
      exchangeRatesTitle: 'Exchange Rates Settings',
      irrUsdRate: 'IRR/USD Rate:',
      btcUsdRate: 'BTC Price (USD):',
      ethUsdRate: 'ETH Price (USD):',
      save: 'Save Settings'
    },
    currencies: {
      IRR: 'IRR',
      USDT: 'USDT',
      USD: 'USD',
      BTC: 'Bitcoin',
      ETH: 'Ethereum'
    },
    exchanges: {
      nobitex: 'Nobitex',
      ramzinex: 'Ramzinex',
      binance: 'Binance',
      kucoin: 'KuCoin',
      custom: 'Custom'
    },
    validation: {
      enterValidNumbers: 'Please enter valid numbers for all fields',
      enterValidNumber: 'Please enter a valid number',
      enterValidTransactionAmount: 'Please enter a valid transaction amount'
    },
    misc: {
      settingsSaved: 'Settings saved successfully!',
      copyright: 'Created by',
      version: 'Version'
    }
  }
};

// Language handling
function changeLanguage(lang) {
  try {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    
    const texts = translations[lang];
    if (!texts) {
      throw new Error(`Translation not found for language: ${lang}`);
    }
    
    // Update all text content
    updatePageText(texts);
    
    // Store language preference
    chrome.storage.sync.set({ language: lang });
  } catch (error) {
    console.error('Error changing language:', error);
  }
}

// Safe text content update
function updatePageText(texts) {
  // Update document title
  document.title = texts.title;
  
  // Update header
  const header = getElementSafe('h1');
  if (header) header.textContent = texts.title;
  
  // Update market type label
  const marketTypeLabel = getElementSafe('label[for="market-type"]');
  if (marketTypeLabel) marketTypeLabel.textContent = texts.marketType;
  
  // Update tabs
  updateTabLabels(texts.tabs);
  
  // Update forms
  updateFormLabels(texts.forms);
  
  // Update results
  updateResultLabels(texts.results);
  
  // Update settings
  updateSettingsLabels(texts.settings);
  
  // Update footer
  updateFooterText(texts.misc);
  
  // Update currency selectors
  updateCurrencySelectors(texts.currencies);
  
  // Update exchange selectors
  updateExchangeSelector(texts.exchanges);
}

// Update tab labels
function updateTabLabels(tabTexts) {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    const tabId = button.getAttribute('data-tab');
    
    switch(tabId) {
      case 'position-size':
        button.textContent = tabTexts.positionSize;
        break;
      case 'converter':
        button.textContent = tabTexts.converter;
        break;
      case 'profit-loss':
        button.textContent = tabTexts.profitLoss;
        break;
      case 'fees':
        button.textContent = tabTexts.fees;
        break;
    }
  });
  
  // Update tab heading titles
  document.querySelectorAll('.tab-pane h2').forEach(heading => {
    const tabPane = heading.closest('.tab-pane');
    if (tabPane) {
      const tabId = tabPane.id;
      switch(tabId) {
        case 'position-size':
          heading.textContent = tabTexts.positionSize;
          break;
        case 'converter':
          heading.textContent = tabTexts.converter;
          break;
        case 'profit-loss':
          heading.textContent = tabTexts.profitLoss;
          break;
        case 'fees':
          heading.textContent = tabTexts.fees;
          break;
      }
    }
  });
}

// Update form labels
// Update form labels
function updateFormLabels(formTexts) {
  try {
    // Position Size Calculator Form
    const positionSizeForm = document.getElementById('position-size-form');
    if (positionSizeForm) {
      const accountBalanceLabel = positionSizeForm.querySelector('label[for="account-balance"]');
      const riskPercentageLabel = positionSizeForm.querySelector('label[for="risk-percentage"]');
      const entryPriceLabel = positionSizeForm.querySelector('label[for="entry-price"]');
      const stopLossLabel = positionSizeForm.querySelector('label[for="stop-loss"]');
      const calculateBtn = positionSizeForm.querySelector('button.calculate-btn');
      
      if (accountBalanceLabel) accountBalanceLabel.textContent = formTexts.accountBalance;
      if (riskPercentageLabel) riskPercentageLabel.textContent = formTexts.riskPercentage;
      if (entryPriceLabel) entryPriceLabel.textContent = formTexts.entryPrice;
      if (stopLossLabel) stopLossLabel.textContent = formTexts.stopLoss;
      if (calculateBtn) calculateBtn.textContent = formTexts.calculate;
    }
    
    // Currency Converter Form
    const converterForm = document.getElementById('converter-form');
    if (converterForm) {
      const amountLabel = converterForm.querySelector('label[for="from-amount"]');
      const fromCurrencyLabel = converterForm.querySelector('label[for="from-currency"]');
      const toCurrencyLabel = converterForm.querySelector('label[for="to-currency"]');
      const convertBtn = converterForm.querySelector('button.calculate-btn');
      
      if (amountLabel) amountLabel.textContent = formTexts.amount;
      if (fromCurrencyLabel) fromCurrencyLabel.textContent = formTexts.from;
      if (toCurrencyLabel) toCurrencyLabel.textContent = formTexts.to;
      if (convertBtn) convertBtn.textContent = formTexts.convert;
    }
    
    // Profit/Loss Calculator Form
    const profitLossForm = document.getElementById('profit-loss-form');
    if (profitLossForm) {
      const tradeTypeLabel = profitLossForm.querySelector('label[for="trade-type"]');
      const entryPricePLLabel = profitLossForm.querySelector('label[for="entry-price-pl"]');
      const exitPriceLabel = profitLossForm.querySelector('label[for="exit-price"]');
      const positionSizePLLabel = profitLossForm.querySelector('label[for="position-size-pl"]');
      const feePercentageLabel = profitLossForm.querySelector('label[for="fee-percentage"]');
      const calculateBtn = profitLossForm.querySelector('button.calculate-btn');
      
      if (tradeTypeLabel) tradeTypeLabel.textContent = formTexts.tradeType;
      if (entryPricePLLabel) entryPricePLLabel.textContent = formTexts.entryPrice;
      if (exitPriceLabel) exitPriceLabel.textContent = formTexts.exitPrice;
      if (positionSizePLLabel) positionSizePLLabel.textContent = formTexts.positionSize;
      if (feePercentageLabel) feePercentageLabel.textContent = formTexts.feePercentage;
      if (calculateBtn) calculateBtn.textContent = formTexts.calculate;
      
      // Fixed radio buttons for buy/sell
      const buyRadioLabel = profitLossForm.querySelector('input[value="buy"]').parentNode;
      const sellRadioLabel = profitLossForm.querySelector('input[value="sell"]').parentNode;
      
      if (buyRadioLabel) {
        // Save the input element
        const buyInput = buyRadioLabel.querySelector('input');
        // Clear the label
        buyRadioLabel.innerHTML = '';
        // Add back the input
        buyRadioLabel.appendChild(buyInput);
        // Add a text node with the translation
        buyRadioLabel.appendChild(document.createTextNode(' ' + formTexts.buy));
      }
      
      if (sellRadioLabel) {
        // Save the input element
        const sellInput = sellRadioLabel.querySelector('input');
        // Clear the label
        sellRadioLabel.innerHTML = '';
        // Add back the input
        sellRadioLabel.appendChild(sellInput);
        // Add a text node with the translation
        sellRadioLabel.appendChild(document.createTextNode(' ' + formTexts.sell));
      }
    }
    
    // Fee Calculator Form
    const feeForm = document.getElementById('fee-form');
    if (feeForm) {
      const exchangeTypeLabel = feeForm.querySelector('label[for="exchange-type"]');
      const customFeeLabel = feeForm.querySelector('label[for="custom-fee"]');
      const transactionAmountLabel = feeForm.querySelector('label[for="transaction-amount"]');
      const feeTypeLabel = feeForm.querySelector('label[for="fee-type"]');
      const calculateBtn = feeForm.querySelector('button.calculate-btn');
      
      if (exchangeTypeLabel) exchangeTypeLabel.textContent = formTexts.exchangePlatform;
      if (customFeeLabel) customFeeLabel.textContent = formTexts.customFee;
      if (transactionAmountLabel) transactionAmountLabel.textContent = formTexts.transactionAmount;
      if (feeTypeLabel) feeTypeLabel.textContent = formTexts.feeTypes;
      if (calculateBtn) calculateBtn.textContent = formTexts.calculate;
      
      // Fixed checkboxes with same approach as radio buttons
      const tradingFeeLabel = feeForm.querySelector('input[id="trading-fee"]').parentNode;
      const withdrawalFeeLabel = feeForm.querySelector('input[id="withdrawal-fee"]').parentNode;
      const networkFeeLabel = feeForm.querySelector('input[id="network-fee"]').parentNode;
      
      if (tradingFeeLabel) {
        const input = tradingFeeLabel.querySelector('input');
        tradingFeeLabel.innerHTML = '';
        tradingFeeLabel.appendChild(input);
        tradingFeeLabel.appendChild(document.createTextNode(' ' + formTexts.tradingFee));
      }
      
      if (withdrawalFeeLabel) {
        const input = withdrawalFeeLabel.querySelector('input');
        withdrawalFeeLabel.innerHTML = '';
        withdrawalFeeLabel.appendChild(input);
        withdrawalFeeLabel.appendChild(document.createTextNode(' ' + formTexts.withdrawalFee));
      }
      
      if (networkFeeLabel) {
        const input = networkFeeLabel.querySelector('input');
        networkFeeLabel.innerHTML = '';
        networkFeeLabel.appendChild(input);
        networkFeeLabel.appendChild(document.createTextNode(' ' + formTexts.networkFee));
      }
    }
  } catch (error) {
    console.error('Error updating form labels:', error);
  }
}

// Update result labels
function updateResultLabels(resultTexts) {
  // Position Size Result
  const positionSizeResult = document.getElementById('position-size-result');
  if (positionSizeResult) {
    const riskAmountLabel = positionSizeResult.querySelector('.result-item:nth-child(1) .result-label');
    const positionSizeLabel = positionSizeResult.querySelector('.result-item:nth-child(2) .result-label');
    
    if (riskAmountLabel) riskAmountLabel.textContent = resultTexts.riskAmount;
    if (positionSizeLabel) positionSizeLabel.textContent = resultTexts.positionSize;
  }
  
  // Currency Converter Result
  const converterResult = document.getElementById('converter-result');
  if (converterResult) {
    const resultLabel = converterResult.querySelector('.result-item:nth-child(1) .result-label');
    const exchangeRateLabel = converterResult.querySelector('.result-item:nth-child(2) .result-label');
    
    if (resultLabel) resultLabel.textContent = resultTexts.result;
    if (exchangeRateLabel) exchangeRateLabel.textContent = resultTexts.exchangeRate;
  }
  
  // Profit/Loss Result
  const profitLossResult = document.getElementById('profit-loss-result');
  if (profitLossResult) {
    const profitLossLabel = profitLossResult.querySelector('.result-item:nth-child(1) .result-label');
    const roiLabel = profitLossResult.querySelector('.result-item:nth-child(2) .result-label');
    const totalFeesLabel = profitLossResult.querySelector('.result-item:nth-child(3) .result-label');
    
    if (profitLossLabel) profitLossLabel.textContent = resultTexts.profitLoss;
    if (roiLabel) roiLabel.textContent = resultTexts.roi;
    if (totalFeesLabel) totalFeesLabel.textContent = resultTexts.totalFees;
  }
  
  // Fee Result
  const feeResult = document.getElementById('fee-result');
  if (feeResult) {
    const tradingFeeLabel = feeResult.querySelector('.result-item:nth-child(1) .result-label');
    const withdrawalFeeLabel = feeResult.querySelector('.result-item:nth-child(2) .result-label');
    const networkFeeLabel = feeResult.querySelector('.result-item:nth-child(3) .result-label');
    const totalFeeLabel = feeResult.querySelector('.result-item:nth-child(4) .result-label');
    
    if (tradingFeeLabel) tradingFeeLabel.textContent = resultTexts.tradingFee;
    if (withdrawalFeeLabel) withdrawalFeeLabel.textContent = resultTexts.withdrawalFee;
    if (networkFeeLabel) networkFeeLabel.textContent = resultTexts.networkFee;
    if (totalFeeLabel) totalFeeLabel.textContent = resultTexts.totalFees;
  }
}

// Update settings labels
function updateSettingsLabels(settingsTexts) {
  const settingsModal = document.getElementById('settings-modal');
  if (settingsModal) {
    const modalTitle = settingsModal.querySelector('h2');
    const defaultCurrencyLabel = settingsModal.querySelector('label[for="default-currency"]');
    const defaultExchangeLabel = settingsModal.querySelector('label[for="default-exchange"]');
    const sectionTitle = settingsModal.querySelector('.settings-section-title');
    const irrUsdRateLabel = settingsModal.querySelector('label[for="irr-usd-rate"]');
    const btcUsdRateLabel = settingsModal.querySelector('label[for="btc-usd-rate"]');
    const ethUsdRateLabel = settingsModal.querySelector('label[for="eth-usd-rate"]');
    const saveButton = settingsModal.querySelector('.save-btn');
    
    if (modalTitle) modalTitle.textContent = settingsTexts.title;
    if (defaultCurrencyLabel) defaultCurrencyLabel.textContent = settingsTexts.defaultCurrency;
    if (defaultExchangeLabel) defaultExchangeLabel.textContent = settingsTexts.defaultExchange;
    if (sectionTitle) sectionTitle.textContent = settingsTexts.exchangeRatesTitle;
    if (irrUsdRateLabel) irrUsdRateLabel.textContent = settingsTexts.irrUsdRate;
    if (btcUsdRateLabel) btcUsdRateLabel.textContent = settingsTexts.btcUsdRate;
    if (ethUsdRateLabel) ethUsdRateLabel.textContent = settingsTexts.ethUsdRate;
    if (saveButton) saveButton.textContent = settingsTexts.save;
  }
  
  // Settings Button
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    settingsBtn.textContent = settingsTexts.title;
  }
}

// Update currency selectors
function updateCurrencySelectors(currencyTexts) {
  const currencySelectors = [
    'account-currency',
    'from-currency',
    'to-currency',
    'transaction-currency',
    'default-currency'
  ];
  
  currencySelectors.forEach(selectorId => {
    const selector = document.getElementById(selectorId);
    if (selector) {
      for (let i = 0; i < selector.options.length; i++) {
        const option = selector.options[i];
        const currency = option.value;
        if (currencyTexts[currency]) {
          option.textContent = currencyTexts[currency];
        }
      }
    }
  });
}

// Update exchange selector
function updateExchangeSelector(exchangeTexts) {
  const exchangeSelectors = [
    'exchange-type',
    'default-exchange'
  ];
  
  exchangeSelectors.forEach(selectorId => {
    const selector = document.getElementById(selectorId);
    if (selector) {
      for (let i = 0; i < selector.options.length; i++) {
        const option = selector.options[i];
        const exchange = option.value;
        if (exchangeTexts[exchange]) {
          option.textContent = exchangeTexts[exchange];
        }
      }
    }
  });
}

// Update footer text
function updateFooterText(miscTexts) {
  // Version
  const versionElement = document.querySelector('.version');
  if (versionElement) {
    versionElement.textContent = `${miscTexts.version} 1.0`;
  }
  
  // Copyright
  const copyrightSpan = document.querySelector('.copyright span:first-child');
  if (copyrightSpan) {
    copyrightSpan.textContent = miscTexts.copyright;
  }
  
  // Settings button
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn) {
    const lang = document.documentElement.lang;
    settingsBtn.textContent = translations[lang].settings.title;
  }
}

// کلاس محاسبه‌گر معاملات
class TradeCalculator {
  // محاسبه اندازه پوزیشن
  static calculatePositionSize(accountBalance, riskPercentage, entryPrice, stopLoss) {
    const riskAmount = (accountBalance * riskPercentage) / 100;
    const priceDifference = Math.abs(entryPrice - stopLoss);
    const positionSize = riskAmount / priceDifference;
    
    return {
      riskAmount,
      positionSize
    };
  }
  
  // محاسبه سود و زیان
  static calculateProfitLoss(tradeType, entryPrice, exitPrice, positionSize, feePercentage) {
    const isLong = tradeType === 'buy';
    
    // محاسبه سود/زیان خام بدون کارمزدها
    let profitLoss;
    if (isLong) {
      profitLoss = (exitPrice - entryPrice) * positionSize;
    } else {
      profitLoss = (entryPrice - exitPrice) * positionSize;
    }
    
    // محاسبه کارمزدها
    const entryFee = (entryPrice * positionSize) * (feePercentage / 100);
    const exitFee = (exitPrice * positionSize) * (feePercentage / 100);
    const totalFees = entryFee + exitFee;
    
    // محاسبه سود/زیان خالص
    const netProfitLoss = profitLoss - totalFees;
    
    // محاسبه بازده سرمایه‌گذاری
    const investment = entryPrice * positionSize;
    const roi = (netProfitLoss / investment) * 100;
    
    return {
      profitLoss: netProfitLoss,
      roi,
      totalFees
    };
  }
  
  // محاسبه کارمزدها
  static calculateFees(amount, exchangeType, feeTypes, customFee = 0.1) {
    let tradingFeePercentage;
    let withdrawalFeeValue;
    
    // تنظیم مقادیر کارمزد بر اساس صرافی
    switch(exchangeType) {
      case 'nobitex':
        tradingFeePercentage = 0.35;
        withdrawalFeeValue = 0.001;
        break;
      case 'ramzinex':
        tradingFeePercentage = 0.25;
        withdrawalFeeValue = 0.0015;
        break;
      case 'binance':
        tradingFeePercentage = 0.1;
        withdrawalFeeValue = 0.0005;
        break;
      case 'kucoin':
        tradingFeePercentage = 0.1;
        withdrawalFeeValue = 0.0004;
        break;
      case 'custom':
        tradingFeePercentage = customFee;
        withdrawalFeeValue = customFee / 100;
        break;
      default:
        tradingFeePercentage = 0.1;
        withdrawalFeeValue = 0.001;
    }
    
    // محاسبه کارمزدهای خاص بر اساس انواع انتخاب شده
    const tradingFee = feeTypes.tradingFee ? amount * (tradingFeePercentage / 100) : 0;
    const withdrawalFee = feeTypes.withdrawalFee ? withdrawalFeeValue : 0;
    const networkFee = feeTypes.networkFee ? 0.0001 * amount : 0;
    
    const totalFees = tradingFee + withdrawalFee + networkFee;
    
    return {
      tradingFee,
      withdrawalFee,
      networkFee,
      totalFees
    };
  }
}

// کلاس تبدیل ارز
class CurrencyConverter {
  constructor() {
    this.rates = {
      IRR_USD: 520000, // 1 دلار = 520,000 ریال
      USDT_USD: 1,     // 1 تتر ≈ 1 دلار
      BTC_USD: 60000,  // قیمت 1 بیت‌کوین به دلار
      ETH_USD: 3000    // قیمت 1 اتریوم به دلار
    };
  }
  
  updateRates(rates) {
    if (rates.IRR_USD) this.rates.IRR_USD = rates.IRR_USD;
    if (rates.BTC_USD) this.rates.BTC_USD = rates.BTC_USD;
    if (rates.ETH_USD) this.rates.ETH_USD = rates.ETH_USD;
  }
  
  // دریافت نرخ بین دو ارز
  getRate(fromCurrency, toCurrency) {
    // اگر ارزها یکسان باشند، نرخ 1 است
    if (fromCurrency === toCurrency) return 1;
    
    // ابتدا به دلار تبدیل می‌کنیم به‌عنوان ارز پایه
    let fromToUSD, usdToTarget;
    
    // دریافت نرخ از مبدأ به دلار
    switch(fromCurrency) {
      case 'USD':
        fromToUSD = 1;
        break;
      case 'IRR':
        fromToUSD = 1 / this.rates.IRR_USD;
        break;
      case 'USDT':
        fromToUSD = 1 / this.rates.USDT_USD;
        break;
      case 'BTC':
        fromToUSD = this.rates.BTC_USD;
        break;
      case 'ETH':
        fromToUSD = this.rates.ETH_USD;
        break;
      default:
        fromToUSD = 1;
    }
    
    // دریافت نرخ از دلار به مقصد
    switch(toCurrency) {
      case 'USD':
        usdToTarget = 1;
        break;
      case 'IRR':
        usdToTarget = this.rates.IRR_USD;
        break;
      case 'USDT':
        usdToTarget = this.rates.USDT_USD;
        break;
      case 'BTC':
        usdToTarget = 1 / this.rates.BTC_USD;
        break;
      case 'ETH':
        usdToTarget = 1 / this.rates.ETH_USD;
        break;
      default:
        usdToTarget = 1;
    }
    
    // محاسبه نرخ نهایی
    return fromToUSD * usdToTarget;
  }
  
  // تبدیل مقدار بین ارزها
  convert(amount, fromCurrency, toCurrency) {
    const rate = this.getRate(fromCurrency, toCurrency);
    return amount * rate;
  }
  
  // قالب‌بندی مقادیر ارزی
  formatCurrency(amount, currency) {
    const lang = document.documentElement.lang;
    const isFA = lang === 'fa';
    
    switch(currency) {
      case 'IRR':
        return Math.round(amount).toLocaleString() + (isFA ? ' ریال' : ' IRR');
      case 'USDT':
      case 'USD':
        return amount.toFixed(2) + ' ' + currency;
      case 'BTC':
        return amount.toFixed(8) + ' ' + (isFA ? 'بیت‌کوین' : 'BTC');
      case 'ETH':
        return amount.toFixed(6) + ' ' + (isFA ? 'اتریوم' : 'ETH');
      default:
        return amount.toString();
    }
  }
}

// نمونه‌سازی از کلاس تبدیل ارز
const currencyConverter = new CurrencyConverter();

// عملکرد تب‌ها
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // حذف کلاس active از همه دکمه‌ها و پنل‌ها
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
      
      // افزودن کلاس active به دکمه کلیک شده و پنل مربوطه
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// بارگذاری تنظیمات ذخیره شده
function loadSettings() {
  chrome.storage.sync.get(['settings'], (result) => {
    if (result.settings) {
      const settings = result.settings;
      
      // به‌روزرسانی مبدل ارز با نرخ‌های ذخیره شده
      currencyConverter.updateRates({
        IRR_USD: settings.irrUsdRate || 520000,
        BTC_USD: settings.btcUsdRate || 60000,
        ETH_USD: settings.ethUsdRate || 3000
      });
      
      // تنظیم مقادیر پیش‌فرض در فرم‌ها
      document.getElementById('account-currency').value = settings.defaultCurrency || 'IRR';
      document.getElementById('default-currency').value = settings.defaultCurrency || 'IRR';
      document.getElementById('default-exchange').value = settings.defaultExchange || 'nobitex';
      document.getElementById('irr-usd-rate').value = settings.irrUsdRate || 520000;
      document.getElementById('btc-usd-rate').value = settings.btcUsdRate || 60000;
      document.getElementById('eth-usd-rate').value = settings.ethUsdRate || 3000;
    }
  });
}

// Improve form handlers initialization
function initFormHandlers() {
  try {
    // Position Size Calculator
    const positionSizeForm = getElementSafe('#position-size-form');
    if (positionSizeForm) {
      positionSizeForm.addEventListener('submit', handlePositionSizeSubmit);
    }
    
    // Currency Converter
    const converterForm = getElementSafe('#converter-form');
    if (converterForm) {
      converterForm.addEventListener('submit', handleConverterSubmit);
    }
    
    // Profit/Loss Calculator
    const profitLossForm = getElementSafe('#profit-loss-form');
    if (profitLossForm) {
      profitLossForm.addEventListener('submit', handleProfitLossSubmit);
    }
    
    // Fee Calculator
    const feeForm = getElementSafe('#fee-form');
    if (feeForm) {
      feeForm.addEventListener('submit', handleFeeSubmit);
    }
    
    // Exchange Type Change Handler
    const exchangeType = getElementSafe('#exchange-type');
    if (exchangeType) {
      exchangeType.addEventListener('change', handleExchangeTypeChange);
    }
    
    // Settings Form
    const settingsForm = getElementSafe('#settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', handleSettingsSubmit);
    }
  } catch (err) {
    console.error('Error initializing form handlers:', err);
  }
}

// راه‌اندازی پردازشگرهای فرم
function handlePositionSizeSubmit(e) {
  e.preventDefault();
  
  const accountBalance = parseFloat(document.getElementById('account-balance').value);
  const riskPercentage = parseFloat(document.getElementById('risk-percentage').value);
  const entryPrice = parseFloat(document.getElementById('entry-price').value);
  const stopLoss = parseFloat(document.getElementById('stop-loss').value);
  const currency = document.getElementById('account-currency').value;
  
  if (isNaN(accountBalance) || isNaN(riskPercentage) || isNaN(entryPrice) || isNaN(stopLoss)) {
    const lang = document.documentElement.lang;
    alert(translations[lang].validation.enterValidNumbers);
    return;
  }
  
  const result = TradeCalculator.calculatePositionSize(
    accountBalance, 
    riskPercentage, 
    entryPrice, 
    stopLoss
  );
  
  document.getElementById('risk-amount').textContent = 
    currencyConverter.formatCurrency(result.riskAmount, currency);
  
  const lang = document.documentElement.lang;
  const unitText = lang === 'fa' ? ' واحد' : ' ' + translations[lang].results.units;
  document.getElementById('position-size-value').textContent = 
    result.positionSize.toFixed(4) + unitText;
}

// تبدیل ارز
function handleConverterSubmit(e) {
  e.preventDefault();
  
  const amount = parseFloat(document.getElementById('from-amount').value);
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;
  
  if (isNaN(amount)) {
    const lang = document.documentElement.lang;
    alert(translations[lang].validation.enterValidNumber);
    return;
  }
  
  const convertedAmount = currencyConverter.convert(amount, fromCurrency, toCurrency);
  const rate = currencyConverter.getRate(fromCurrency, toCurrency);
  
  document.getElementById('converted-amount').textContent = 
    currencyConverter.formatCurrency(convertedAmount, toCurrency);
  
  document.getElementById('exchange-rate').textContent = 
    `1 ${fromCurrency} = ${rate.toFixed(toCurrency === 'IRR' ? 0 : 6)} ${toCurrency}`;
}

// محاسبه‌گر سود و زیان
function handleProfitLossSubmit(e) {
  e.preventDefault();
  
  const tradeType = document.querySelector('input[name="trade-type"]:checked').value;
  const entryPrice = parseFloat(document.getElementById('entry-price-pl').value);
  const exitPrice = parseFloat(document.getElementById('exit-price').value);
  const positionSize = parseFloat(document.getElementById('position-size-pl').value);
  const feePercentage = parseFloat(document.getElementById('fee-percentage').value);
  
  if (isNaN(entryPrice) || isNaN(exitPrice) || isNaN(positionSize) || isNaN(feePercentage)) {
    const lang = document.documentElement.lang;
    alert(translations[lang].validation.enterValidNumbers);
    return;
  }
  
  const result = TradeCalculator.calculateProfitLoss(
    tradeType,
    entryPrice,
    exitPrice,
    positionSize,
    feePercentage
  );
  
  const currency = document.getElementById('account-currency').value || 'USDT';
  
  document.getElementById('profit-loss-value').textContent = 
    currencyConverter.formatCurrency(result.profitLoss, currency);
  
  document.getElementById('roi-value').textContent = 
    result.roi.toFixed(2) + '%';
  
  document.getElementById('total-fees').textContent = 
    currencyConverter.formatCurrency(result.totalFees, currency);
}

// محاسبه‌گر کارمزد
function handleFeeSubmit(e) {
  e.preventDefault();
  
  const exchangeType = document.getElementById('exchange-type').value;
  const transactionAmount = parseFloat(document.getElementById('transaction-amount').value);
  const transactionCurrency = document.getElementById('transaction-currency').value;
  const customFee = parseFloat(document.getElementById('custom-fee').value || '0.1');
  
  const feeTypes = {
    tradingFee: document.getElementById('trading-fee').checked,
    withdrawalFee: document.getElementById('withdrawal-fee').checked,
    networkFee: document.getElementById('network-fee').checked
  };
  
  if (isNaN(transactionAmount)) {
    const lang = document.documentElement.lang;
    alert(translations[lang].validation.enterValidTransactionAmount);
    return;
  }
  
  const result = TradeCalculator.calculateFees(
    transactionAmount,
    exchangeType,
    feeTypes,
    customFee
  );
  
  document.getElementById('trading-fee-value').textContent = 
    currencyConverter.formatCurrency(result.tradingFee, transactionCurrency);
  
  document.getElementById('withdrawal-fee-value').textContent = 
    currencyConverter.formatCurrency(result.withdrawalFee, transactionCurrency);
  
  document.getElementById('network-fee-value').textContent = 
    currencyConverter.formatCurrency(result.networkFee, transactionCurrency);
  
  document.getElementById('total-fee-value').textContent = 
    currencyConverter.formatCurrency(result.totalFees, transactionCurrency);
}

// فرم تنظیمات
function handleSettingsSubmit(e) {
  e.preventDefault();
  
  const settings = {
    defaultCurrency: document.getElementById('default-currency').value,
    defaultExchange: document.getElementById('default-exchange').value,
    irrUsdRate: parseFloat(document.getElementById('irr-usd-rate').value) || 520000,
    btcUsdRate: parseFloat(document.getElementById('btc-usd-rate').value) || 60000,
    ethUsdRate: parseFloat(document.getElementById('eth-usd-rate').value) || 3000
  };
  
  // ذخیره تنظیمات
  chrome.storage.sync.set({ settings }, () => {
    const lang = document.documentElement.lang;
    alert(translations[lang].misc.settingsSaved);
    
    // به‌روزرسانی نرخ‌های مبدل
    currencyConverter.updateRates({
      IRR_USD: settings.irrUsdRate,
      BTC_USD: settings.btcUsdRate,
      ETH_USD: settings.ethUsdRate
    });
    
    // بستن مدال
    document.getElementById('settings-modal').style.display = 'none';
  });
}

// تغییر نوع صرافی
function handleExchangeTypeChange(e) {
  const customFeeGroup = document.getElementById('custom-fee-group');
  customFeeGroup.style.display = e.target.value === 'custom' ? 'block' : 'none';
}

// Improve modal initialization
function initModal() {
  try {
    const modal = getElementSafe('#settings-modal');
    const settingsBtn = getElementSafe('#settings-btn');
    const closeBtn = document.querySelector('.close');
    
    if (modal && settingsBtn && closeBtn) {
      settingsBtn.addEventListener('click', () => {
        modal.style.display = 'block';
      });
      
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      
      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  } catch (err) {
    console.error('Error initializing modal:', err);
  }
}