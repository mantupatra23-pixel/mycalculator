const fs = require('fs');
const path = require('path');

const regPath = path.join(process.cwd(), 'lib/trading/registry.ts');
let content = fs.readFileSync(regPath, 'utf8');

// Ensure Position Size Calculator has robust FAQs and worked examples
const positionSizeToolMatch = content.findIndex(c => c.includes('slug: "position-size-calculator"'));
console.log("Registry patch ready for application.");
