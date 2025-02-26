# ماشین حساب سود و زیان (Trade Calculator)

![Version](https://img.shields.io/badge/version-1.0-green)
![Languages](https://img.shields.io/badge/languages-fa%2Fen-blue)

<div dir="rtl">

## معرفی

اکستنشن ماشین حساب سود و زیان، یک ابزار کاربردی برای معامله‌گران بازارهای مالی (فارکس، ارز دیجیتال و بورس) است. این اکستنشن به کاربران کمک می‌کند تا محاسبات اندازه پوزیشن، سود و زیان، تبدیل ارز و کارمزدها را به راحتی انجام دهند.

این اکستنشن با پشتیبانی کامل از دو زبان فارسی و انگلیسی طراحی شده و برای استفاده در بازارهای ایران و جهانی بهینه‌سازی شده است.

## امکانات

اکستنشن ماشین حساب سود و زیان شامل چهار بخش اصلی است:

1. **محاسبه‌گر اندازه پوزیشن**: محاسبه اندازه مناسب پوزیشن بر اساس موجودی حساب، درصد ریسک، قیمت ورود و حد ضرر
2. **تبدیل ارز**: تبدیل بین ارزهای مختلف از جمله ریال، دلار، تتر، بیت‌کوین و اتریوم
3. **محاسبه‌گر سود و زیان**: محاسبه سود یا زیان معاملات با در نظر گرفتن کارمزدها و نمایش بازده سرمایه‌گذاری (ROI)
4. **محاسبه‌گر کارمزد**: محاسبه انواع کارمزدهای معاملاتی برای صرافی‌های مختلف از جمله نوبیتکس، رمزینکس، بایننس و کوکوین

## ویژگی‌های خاص

- پشتیبانی کامل از دو زبان فارسی و انگلیسی
- قابلیت تنظیم نرخ‌های ارز به صورت دستی
- رابط کاربری ساده و زیبا
- قابلیت ذخیره تنظیمات و ترجیحات کاربر
- سازگاری با انواع صرافی‌های ایرانی و خارجی
- تنظیم خودکار زبان بر اساس زبان مرورگر
- پشتیبانی از حالت‌های RTL و LTR در رابط کاربری

</div>

## Installation Guide / راهنمای نصب

<div dir="ltr">

### English

1. **Download the Extension**
   - Download and extract the extension files from the provided source.

2. **Install in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top-right corner
   - Click "Load unpacked" and select the folder containing the extension files
   - The extension icon should appear in your browser toolbar

3. **Using the Extension**
   - Click on the extension icon to open the calculator
   - Select your preferred language (English/Persian) from the dropdown
   - Use the tabs to navigate between different calculators

4. **Customizing Settings**
   - Click the "Settings" button at the bottom to customize your preferences
   - Set default currency, exchange, and update exchange rates
   - Settings are saved automatically across browser sessions

</div>

<div dir="rtl">

### فارسی

1. **دانلود اکستنشن**
   - فایل‌های اکستنشن را از منبع ارائه شده دانلود و استخراج کنید.

2. **نصب در کروم**
   - مرورگر کروم را باز کنید و به آدرس `chrome://extensions/` بروید
   - حالت "توسعه‌دهنده" را با استفاده از گزینه موجود در گوشه بالا سمت راست فعال کنید
   - روی دکمه "بارگذاری بسته نشده" کلیک کنید و پوشه حاوی فایل‌های اکستنشن را انتخاب کنید
   - آیکون اکستنشن باید در نوار ابزار مرورگر شما ظاهر شود

3. **استفاده از اکستنشن**
   - روی آیکون اکستنشن کلیک کنید تا ماشین حساب باز شود
   - زبان مورد نظر خود (فارسی/انگلیسی) را از منوی کشویی انتخاب کنید
   - از تب‌ها برای مرور بین محاسبه‌گرهای مختلف استفاده کنید

4. **شخصی‌سازی تنظیمات**
   - برای شخصی‌سازی ترجیحات خود، روی دکمه "تنظیمات" در پایین صفحه کلیک کنید
   - ارز پیش‌فرض، صرافی و نرخ‌های ارز را تنظیم کنید
   - تنظیمات به صورت خودکار در جلسات مختلف مرورگر ذخیره می‌شوند

</div>

## Developer Guide / راهنمای توسعه‌دهنده

<div dir="ltr">

### English

#### Project Structure

```
trade-calculator/
├── manifest.json      # Extension manifest
├── popup.html         # Main HTML interface
├── popup.js           # Main JavaScript logic
├── styles.css         # CSS styles
├── background.js      # Background service worker
└── icons/             # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

#### Key Technologies

- **HTML5/CSS3**: For user interface
- **JavaScript**: For calculator logic and DOM manipulation
- **Chrome Extension API**: For storage and browser integration

#### Adding New Features

1. **Adding a New Currency**:
   - Update the currency options in `popup.html`
   - Add new currency conversion logic in the `CurrencyConverter` class in `popup.js`
   - Add translation for the new currency in both languages in the `translations` object

2. **Adding a New Exchange**:
   - Add the exchange option in the HTML
   - Update the fee calculations in the `calculateFees` method in the `TradeCalculator` class
   - Add translations for the new exchange in both languages

3. **Adding a New Calculator Tab**:
   - Create a new tab button and panel in the HTML
   - Add the necessary form elements and results display
   - Implement the calculation logic in `popup.js`
   - Add event listeners for the new form
   - Add translations for all new elements

#### Modifying Exchange Rates

The exchange rates are stored in the `CurrencyConverter` class in `popup.js`. To update them:

1. Modify the default rates in the constructor
2. Update the settings form in `popup.html` if you're adding UI for new rates
3. Add the new rate controls to the settings update logic in `initFormHandlers`

#### Language Support

The extension uses a translation system that allows for easy addition of new languages:

1. Add a new language object to the `translations` constant in `popup.js`
2. Add a new option to the language selector in `popup.html`
3. Update the `changeLanguage` function if necessary to handle language-specific formatting

</div>

<div dir="rtl">

### فارسی

#### ساختار پروژه

```
trade-calculator/
├── manifest.json      # فایل منیفست اکستنشن
├── popup.html         # رابط کاربری HTML اصلی
├── popup.js           # منطق اصلی جاوااسکریپت
├── styles.css         # استایل‌های CSS
├── background.js      # سرویس ورکر پس‌زمینه
└── icons/             # آیکون‌های اکستنشن
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

#### فناوری‌های کلیدی

- **HTML5/CSS3**: برای رابط کاربری
- **JavaScript**: برای منطق محاسبه و دستکاری DOM
- **Chrome Extension API**: برای ذخیره‌سازی و یکپارچه‌سازی با مرورگر

#### افزودن ویژگی‌های جدید

1. **افزودن ارز جدید**:
   - گزینه‌های ارز را در `popup.html` به‌روزرسانی کنید
   - منطق تبدیل ارز جدید را در کلاس `CurrencyConverter` در `popup.js` اضافه کنید
   - ترجمه برای ارز جدید را در هر دو زبان در آبجکت `translations` اضافه کنید

2. **افزودن یک صرافی جدید**:
   - گزینه صرافی را در HTML اضافه کنید
   - محاسبات کارمزد را در متد `calculateFees` در کلاس `TradeCalculator` به‌روزرسانی کنید
   - ترجمه‌های صرافی جدید را در هر دو زبان اضافه کنید

3. **افزودن یک تب محاسبه‌گر جدید**:
   - یک دکمه تب و پنل جدید در HTML ایجاد کنید
   - عناصر فرم و نمایش نتایج مورد نیاز را اضافه کنید
   - منطق محاسبه را در `popup.js` پیاده‌سازی کنید
   - شنونده‌های رویداد را برای فرم جدید اضافه کنید
   - ترجمه‌ها را برای تمام عناصر جدید اضافه کنید

#### اصلاح نرخ‌های ارز

نرخ‌های ارز در کلاس `CurrencyConverter` در `popup.js` ذخیره می‌شوند. برای به‌روزرسانی آنها:

1. نرخ‌های پیش‌فرض را در سازنده تغییر دهید
2. اگر می‌خواهید رابط کاربری برای نرخ‌های جدید اضافه کنید، فرم تنظیمات را در `popup.html` به‌روزرسانی کنید
3. کنترل‌های نرخ جدید را به منطق به‌روزرسانی تنظیمات در `initFormHandlers` اضافه کنید

#### پشتیبانی زبان

اکستنشن از یک سیستم ترجمه استفاده می‌کند که افزودن زبان‌های جدید را آسان می‌کند:

1. یک آبجکت زبان جدید به ثابت `translations` در `popup.js` اضافه کنید
2. یک گزینه جدید به انتخاب‌کننده زبان در `popup.html` اضافه کنید
3. در صورت نیاز، تابع `changeLanguage` را برای مدیریت قالب‌بندی خاص زبان به‌روزرسانی کنید

</div>

## Troubleshooting / عیب‌یابی

<div dir="ltr">

### English

#### Common Issues

1. **Extension not loading**
   - Verify that Developer mode is enabled in Chrome extensions page
   - Check for any errors in Chrome's extension page
   - Ensure all files are in the correct locations

2. **Currency conversion not working**
   - Check your exchange rates in the settings
   - Verify network connectivity if using online rates
   - Try resetting to default rates

3. **Language not changing**
   - Clear extension storage and try again
   - Reinstall the extension
   - Check browser language settings

4. **Calculation errors**
   - Ensure you're entering valid numbers in all fields
   - Check that all required form fields are filled
   - Try simpler values to isolate the issue

For persistent issues, check the browser console for JavaScript errors and log messages.

</div>

<div dir="rtl">

### فارسی

#### مشکلات رایج

1. **اکستنشن بارگذاری نمی‌شود**
   - مطمئن شوید که حالت توسعه‌دهنده در صفحه افزونه‌های کروم فعال است
   - خطاهای احتمالی در صفحه افزونه‌های کروم را بررسی کنید
   - اطمینان حاصل کنید که همه فایل‌ها در مکان‌های صحیح قرار دارند

2. **تبدیل ارز کار نمی‌کند**
   - نرخ‌های ارز خود را در تنظیمات بررسی کنید
   - اگر از نرخ‌های آنلاین استفاده می‌کنید، اتصال شبکه را بررسی کنید
   - نرخ‌ها را به حالت پیش‌فرض بازنشانی کنید

3. **زبان تغییر نمی‌کند**
   - حافظه افزونه را پاک کنید و دوباره امتحان کنید
   - اکستنشن را مجدداً نصب کنید
   - تنظیمات زبان مرورگر را بررسی کنید

4. **خطاهای محاسباتی**
   - مطمئن شوید که اعداد معتبر در همه فیلدها وارد می‌کنید
   - بررسی کنید که همه فیلدهای فرم مورد نیاز پر شده‌اند
   - از مقادیر ساده‌تر برای جداسازی مشکل استفاده کنید

برای مشکلات پایدار، کنسول مرورگر را برای خطاهای جاوااسکریپت و پیام‌های لاگ بررسی کنید.

</div>

## License / مجوز

<div dir="ltr">

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

</div>
