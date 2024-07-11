
function loadFooter() {
    fetch('assets/nav/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Call the functions to load the header and footer
document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
});