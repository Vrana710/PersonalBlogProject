function loadHeader() {
    fetch('/assets/nav/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            console.log(data);
        })
        
        .catch(error => console.error('Error loading header:', error));
        console.log(data);
}

// Call the functions to load the header and footer
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
});