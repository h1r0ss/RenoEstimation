# Apartment Renovation Cost Estimator

A simple, modular web application for estimating apartment renovation costs based on various parameters.

## Features

- Calculate renovation costs based on apartment size (m²)
- Add costs for bathrooms and toilets
- Include planning services
- Factor in window replacements
- Add new flooring
- Choose between standard and luxury quality finishes
- Get a detailed cost breakdown
- Print your estimate

## How to Use

1. Open `index.html` in any modern web browser
2. Fill in the form with your apartment details:
   - Apartment size in square meters
   - Number of bathrooms
   - Number of toilets
   - Number of rooms
   - Select options for planning, windows, flooring, and quality level
3. Click "Calculate Estimate" to see the results
4. View your detailed cost breakdown
5. Use the "Print Estimate" button to print or save as PDF

## Pricing Model

The application uses the following pricing model:

- Base renovation cost: €200 per m²
- Luxury upgrade: Additional €100 per m²
- Bathroom renovation: €5,000 per bathroom
- Toilet renovation: €2,000 per toilet
- Planning services: €3,000 flat fee
- Window replacement: €1,200 per room
- New flooring: €50 per m²

These values can be easily modified in the `app.js` file under the `COSTS` object.

## Technical Details

This application is built using:

- HTML5 for structure
- CSS3 for styling (with responsive design)
- Vanilla JavaScript for functionality

No external libraries or frameworks are required.

## Browser Compatibility

The application is compatible with all modern browsers:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Customization

To customize the cost parameters, edit the `COSTS` object in the `js/app.js` file:

```javascript
const COSTS = {
  BASE_COST_PER_SQM: 200, // Basic renovation cost per m²
  LUXURY_ADDITIONAL: 100, // Additional cost per m² for luxury finishes
  BATHROOM_COST: 5000, // Base cost for bathroom renovation
  TOILET_COST: 2000, // Base cost for toilet renovation
  PLANNING_SERVICE: 3000, // Cost for planning services
  WINDOW_COST_PER_ROOM: 1200, // Cost per window (assumed one per room)
  FLOORING_COST_PER_SQM: 50, // Cost per m² for new flooring
};
```

## License

This project is available for personal and commercial use.
