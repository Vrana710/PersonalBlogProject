function loadFooter(path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.querySelector('footer').innerHTML = data;
            console.log('Footer loaded successfully');
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Function to determine the correct path based on conditions
function determinePathfooter() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/index')) {
        return './common/footer.html';
    } else if (currentPath.includes('/chapters/')) {
        return '../../../common/footer.html';
    } else if (currentPath.includes('/shlokas/')) {
        return '../../common/footer.html';
    } else if (currentPath.includes('/Pages/')) {
        return '../../../common/footer.html';
    } else {
        // Default path if no conditions are met
        return './common/footer.html';
    }
}

// Call the function to load the header
document.addEventListener('DOMContentLoaded', () => {
    const path = determinePathfooter();
    loadFooter(path);
});