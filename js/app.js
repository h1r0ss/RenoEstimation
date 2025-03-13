"use strict";

// Base costs for renovation calculations
const COSTS = {
    BASE_COST_PER_SQM: 200, // Basic renovation cost per m²
    LUXURY_ADDITIONAL: 100, // Additional cost per m² for luxury finishes
    BATHROOM_COST: 5000,    // Base cost for bathroom renovation
    TOILET_COST: 2000,      // Base cost for toilet renovation
    PLANNING_SERVICE: 3000, // Cost for planning services
    WINDOW_COST_PER_ROOM: 1200, // Cost per window (assumed one per room)
    FLOORING_COST_PER_SQM: 50,  // Cost per m² for new flooring
};

// DOM Elements
const form = document.getElementById('renovation-form');
const resultsSection = document.getElementById('results-section');
const totalCostElement = document.getElementById('total-cost');
const costPerSqmElement = document.getElementById('cost-per-sqm');
const breakdownList = document.getElementById('breakdown-list');
const printButton = document.getElementById('print-estimate');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set up form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateRenovationCost();
    });

    // Set up print functionality
    printButton.addEventListener('click', () => {
        window.print();
    });
});

/**
 * Calculate the renovation cost based on user inputs
 */
function calculateRenovationCost() {
    // Get form values
    const squareMeters = parseFloat(document.getElementById('square-meters').value) || 0;
    const bathrooms = parseInt(document.getElementById('bathrooms').value) || 0;
    const toilets = parseInt(document.getElementById('toilets').value) || 0;
    const rooms = parseInt(document.getElementById('rooms').value) || 0;
    
    const includePlanning = document.getElementById('planning-yes').checked;
    const replaceWindows = document.getElementById('windows-yes').checked;
    const newFlooring = document.getElementById('flooring-yes').checked;
    const isLuxury = document.getElementById('quality-luxury').checked;

    // Validate inputs
    if (squareMeters <= 0 || rooms <= 0) {
        showError('Please enter valid values for apartment size and number of rooms.');
        return;
    }

    // Calculate costs
    const breakdown = calculateCostBreakdown(
        squareMeters,
        bathrooms,
        toilets,
        rooms,
        includePlanning,
        replaceWindows,
        newFlooring,
        isLuxury
    );

    // Calculate total cost
    const totalCost = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);
    const costPerSqm = totalCost / squareMeters;

    // Display results
    displayResults(totalCost, costPerSqm, breakdown);
}

/**
 * Calculate the breakdown of renovation costs
 */
function calculateCostBreakdown(
    squareMeters,
    bathrooms,
    toilets,
    rooms,
    includePlanning,
    replaceWindows,
    newFlooring,
    isLuxury
) {
    // Initialize the breakdown object
    const breakdown = {};

    // Base renovation cost
    const baseRatePerSqm = isLuxury 
        ? COSTS.BASE_COST_PER_SQM + COSTS.LUXURY_ADDITIONAL 
        : COSTS.BASE_COST_PER_SQM;
    
    breakdown.baseCost = squareMeters * baseRatePerSqm;

    // Bathroom and toilet costs
    if (bathrooms > 0) {
        breakdown.bathroomCost = bathrooms * COSTS.BATHROOM_COST;
    }
    
    if (toilets > 0) {
        breakdown.toiletCost = toilets * COSTS.TOILET_COST;
    }

    // Planning services
    if (includePlanning) {
        breakdown.planningCost = COSTS.PLANNING_SERVICE;
    }

    // Window replacement
    if (replaceWindows) {
        breakdown.windowCost = rooms * COSTS.WINDOW_COST_PER_ROOM;
    }

    // New flooring
    if (newFlooring) {
        breakdown.flooringCost = squareMeters * COSTS.FLOORING_COST_PER_SQM;
    }

    return breakdown;
}

/**
 * Display the calculated results
 */
function displayResults(totalCost, costPerSqm, breakdown) {
    // Format currency values
    const formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    // Update total cost displays
    totalCostElement.textContent = formatter.format(totalCost);
    costPerSqmElement.textContent = `${formatter.format(costPerSqm)} per m²`;

    // Clear previous breakdown
    breakdownList.innerHTML = '';

    // Create breakdown items
    const breakdownLabels = {
        baseCost: 'Base Renovation Cost',
        bathroomCost: 'Bathroom Renovation',
        toiletCost: 'Toilet Renovation',
        planningCost: 'Planning Services',
        windowCost: 'Window Replacement',
        flooringCost: 'New Flooring'
    };

    // Add each item to the breakdown list
    for (const [key, cost] of Object.entries(breakdown)) {
        if (cost > 0) {
            const listItem = document.createElement('li');
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'item-label';
            labelSpan.textContent = breakdownLabels[key] || key;
            
            const costSpan = document.createElement('span');
            costSpan.className = 'item-cost';
            costSpan.textContent = formatter.format(cost);
            
            listItem.appendChild(labelSpan);
            listItem.appendChild(costSpan);
            breakdownList.appendChild(listItem);
        }
    }

    // Show results section
    resultsSection.classList.add('visible');
}

/**
 * Display an error message
 */
function showError(message) {
    alert(message);
} 
