document.addEventListener('DOMContentLoaded', function () {
    // Toggle between Monthly and Yearly Pricing
    const toggleSwitch = document.querySelector('#toggle-pricing');
    const priceElements = document.querySelectorAll('.price');

    toggleSwitch.addEventListener('change', function () {
        const isYearly = toggleSwitch.checked;

        priceElements.forEach(priceElement => {
            const monthlyPrice = priceElement.getAttribute('data-monthly');
            const yearlyPrice = priceElement.getAttribute('data-yearly');

            if (isYearly) {
                priceElement.innerText = yearlyPrice;
            } else {
                priceElement.innerText = monthlyPrice;
            }
        });
    });

    // Handle Plan Selection
    const buttons = document.querySelectorAll('.btn-select');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedPlan = this.closest('.pricing-card').querySelector('h2').innerText;
            alert('You have selected the ' + selectedPlan + ' plan.');
        });
    });

    // Optional: Add selected plan to cart or process payment (custom logic can go here)
    function addToCart(plan) {
        console.log(plan + ' added to cart.');
        // Add additional logic here for payment processing or cart functionality
    }
});