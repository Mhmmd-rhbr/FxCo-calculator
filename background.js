// این اسکریپت در پس‌زمینه اجرا می‌شود
chrome.runtime.onInstalled.addListener(() => {
  try {
    chrome.storage.sync.get(['settings', 'language'], (result) => {
      // Set language based on browser language
      if (!result.language) {
        const userLanguage = chrome.i18n.getUILanguage().toLowerCase();
        const defaultLanguage = userLanguage.startsWith('fa') ? 'fa' : 'en';
        
        chrome.storage.sync.set({ language: defaultLanguage });
      }
      
      // Set default settings if not exists
      if (!result.settings) {
        chrome.storage.sync.set({
          settings: {
            defaultCurrency: 'IRR',
            defaultExchange: 'nobitex',
            irrUsdRate: 520000,
            btcUsdRate: 60000,
            ethUsdRate: 3000
            // Removing usdtUsdRate from default settings
          }
        });
      }
    });
  } catch (error) {
    console.error('Error initializing extension:', error);
  }
});
  
// شنونده برای وقتی که کاربر روی آیکون اکستنشن کلیک می‌کند
chrome.action.onClicked.addListener((tab) => {
  // اینجا می‌توانید کد اضافی برای مدیریت کلیک روی آیکون اضافه کنید
  // اما با توجه به اینکه از popup.html استفاده می‌کنیم، نیازی به این کد نیست
});