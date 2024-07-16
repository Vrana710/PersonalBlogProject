function loadHeader(path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.querySelector('header').innerHTML = data;
            console.log('Header loaded successfully');
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to determine the correct path based on conditions
function determinePathheader() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/index')) {
        return './common/header.html';
    } else if (currentPath.includes('/chapters/')) {
        return '../../../common/header.html';
    } else if (currentPath.includes('/shlokas/')) {
        return '../../common/header.html';
    } else if (currentPath.includes('/Pages/')) {
        return '../../../common/header.html';
    } else {
        // Default path if no conditions are met
        return './common/header.html';
    }
}

// Call the function to load the header
document.addEventListener('DOMContentLoaded', () => {
    const path = determinePathheader();
    loadHeader(path);
});
