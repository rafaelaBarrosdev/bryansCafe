document.addEventListener('DOMContentLoaded', function () {
    // Form submission logic
    const form = document.getElementById('enquiryForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual form submission
        confirmationMessage.style.display = 'block'; // Show confirmation message
    });

    // Load branches from XML
    fetch('branches.xml')
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'text/xml');

            const branches = xml.getElementsByTagName('branch');
            const branchesList = document.getElementById('branchesList');

            Array.from(branches).forEach(branch => {
                const name = branch.getElementsByTagName('name')[0].textContent;
                const address = branch.getElementsByTagName('address')[0].textContent;
                const phone = branch.getElementsByTagName('phone')[0].textContent;
                const hours = branch.getElementsByTagName('hours')[0].textContent;
                const mapLink = branch.getElementsByTagName('maplink')[0].textContent;

                const branchItem = `
                    <div class="branch-item">
                        <h4>${name}</h4>
                        <p>Address: ${address}</p>
                        <p>Phone: ${phone}</p>
                        <p>Opening Hours: ${hours}</p>
                        <a href="${mapLink}" target="_blank">View on Google Maps</a>
                    </div>
                `;

                branchesList.innerHTML += branchItem;
            });
        })
        .catch(error => console.error('Error fetching branches XML:', error));
});
