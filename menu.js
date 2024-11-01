// JavaScript to dynamically load menu items from XML
document.addEventListener('DOMContentLoaded', function () {
    // Load the XML document
    fetch('menu.xml')
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'text/xml');

            // Get meals and beverages
            const meals = xml.getElementsByTagName('meal');
            const beverages = xml.getElementsByTagName('beverage');

            // Populate Meals
            const mealsList = document.getElementById('meals-list');
            Array.from(meals).forEach(meal => {
                const name = meal.getElementsByTagName('name')[0].textContent;
                const price = meal.getElementsByTagName('price')[0].textContent;
                const description = meal.getElementsByTagName('description')[0].textContent;
                const image = meal.getElementsByTagName('image')[0].textContent;

                const mealItem = `
                    <div class="menu-item">
                        <img src="${image}" alt="${name}">
                        <div class="menu-item-info">
                            <h4>${name}</h4>
                            <p>${description}</p>
                            <p class="price">$${price}</p>
                        </div>
                    </div>
                `;
                mealsList.innerHTML += mealItem;
            });

            // Populate Beverages
            const beveragesList = document.getElementById('beverages-list');
            Array.from(beverages).forEach(beverage => {
                const name = beverage.getElementsByTagName('name')[0].textContent;
                const price = beverage.getElementsByTagName('price')[0].textContent;
                const description = beverage.getElementsByTagName('description')[0].textContent;
                const image = beverage.getElementsByTagName('image')[0].textContent;

                const beverageItem = `
                    <div class="menu-item">
                        <img src="${image}" alt="${name}">
                        <div class="menu-item-info">
                            <h4>${name}</h4>
                            <p>${description}</p>
                            <p class="price">$${price}</p>
                        </div>
                    </div>
                `;
                beveragesList.innerHTML += beverageItem;
            });
        })
        .catch(error => console.error('Error fetching XML:', error));
});
