const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../lib/registry.ts');
let content = fs.readFileSync(registryPath, 'utf8');

const newCalculators = [
  {
    id: "payment-gateway-fee-calculator",
    slug: "payment-gateway-fee-calculator",
    name: "Payment Gateway Fee Calculator",
    category: "business",
    popular: true,
    description: "Calculate transaction charges, fixed gateway fees, GST/taxes, and net payout for Stripe, PayPal, Razorpay, or custom payment processors.",
    keywords: ["payment gateway fee calculator", "stripe fee calculator", "paypal fee calculator", "razorpay fee calculator", "merchant fee calculator", "reverse gateway fee"],
    relatedSlugs: ["freelance-rate-calculator", "invoice-total-calculator", "gst-calculator", "ecommerce-roas-break-even-calculator"]
  },
  {
    id: "upwork-net-earnings-calculator",
    slug: "upwork-net-earnings-calculator",
    name: "Upwork Net Earnings & Tax Calculator",
    category: "finance",
    popular: true,
    description: "Calculate your exact take-home pay on Upwork after freelancer service fees, Indian Section 194-O TDS, forex conversion, and withdrawal charges.",
    keywords: ["upwork fee calculator", "upwork earnings calculator", "upwork tds calculator", "upwork net income", "freelance take home calculator"],
    relatedSlugs: ["fiverr-net-earnings-calculator", "freelance-rate-calculator", "salary-calculator", "income-tax-calculator"]
  },
  {
    id: "fiverr-net-earnings-calculator",
    slug: "fiverr-net-earnings-calculator",
    name: "Fiverr Net Earnings & Tax Calculator",
    category: "finance",
    popular: true,
    description: "Calculate your net profit from Fiverr gig sales, extras, and tips after 20% seller fees, Indian TDS withholding, and bank withdrawal fees.",
    keywords: ["fiverr fee calculator", "fiverr earnings calculator", "fiverr net payout", "fiverr seller tax calculator", "fiverr reverse pricing"],
    relatedSlugs: ["upwork-net-earnings-calculator", "freelance-rate-calculator", "payment-gateway-fee-calculator", "profit-loss-calculator"]
  },
  {
    id: "ecommerce-roas-break-even-calculator",
    slug: "ecommerce-roas-break-even-calculator",
    name: "E-Commerce ROAS & Break-Even Margin Calculator",
    category: "business",
    popular: true,
    description: "Determine your break-even ROAS, maximum target CAC, net profit margin, and non-ad unit costs across Meta, Google, and Amazon ad campaigns.",
    keywords: ["ecommerce roas calculator", "break even roas calculator", "max cac calculator", "ecommerce profit margin calculator", "shopify profit calculator"],
    relatedSlugs: ["roas-calculator", "break-even-calculator", "profit-loss-calculator", "payment-gateway-fee-calculator"]
  }
];

// Check if calculators already exist in CALCULATORS array
newCalculators.forEach(calc => {
  if (!content.includes(`"${calc.slug}"`) && !content.includes(`'${calc.slug}'`)) {
    const insertPos = content.lastIndexOf('];');
    if (insertPos !== -1) {
      const calcCode = `  {\n    id: "${calc.id}",\n    slug: "${calc.slug}",\n    name: "${calc.name}",\n    category: "${calc.category}" as CalculatorCategory,\n    popular: ${calc.popular},\n    description: "${calc.description}",\n    keywords: ${JSON.stringify(calc.keywords)},\n    relatedSlugs: ${JSON.stringify(calc.relatedSlugs)},\n  },\n`;
      content = content.slice(0, insertPos) + calcCode + content.slice(insertPos);
      console.log(`[ADDED] ${calc.name}`);
    }
  }
});

fs.writeFileSync(registryPath, content, 'utf8');
console.log('[SUCCESS] Registry updated with 4 high-value calculators.');
