// Sample products data
const products = [
    {
        name: "Sand",
        price: 8.99,
        category: "sand",
        image: "sand.jpg"
    },
    {
        name: "3/4 Gravel",
        price: 10.99,
        category: "gravel",
        image: "gravel.jpg"
    },
    {
        name: "G1",
        price: 12.99,
        category: "aggregate",
        image: "g1.jpg"
    },
    {
        name: "Filling",
        price: 9.99,
        category: "filling",
        image: "filling.jpg"
    },
    // Add more products here
];

// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="view-detail" data-name="${product.name}" data-price="${product.price}">View Detail</button>
        </div>
    `;
}

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation menu for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Handle products page
    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        products.forEach(product => {
            productsGrid.innerHTML += createProductCard(product);
        });
    }

    // Handle contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }

    // Handle View Detail button clicks
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            const productImage = this.closest('.product-card').querySelector('img').src;
            
            // Get product description (you can customize this based on your needs)
            const descriptions = {
                'Sand': 'High-quality construction sand suitable for various building projects. Perfect for concrete mixing and masonry work.',
                '3/4 Gravel': 'Premium 3/4 inch gravel ideal for drainage, landscaping, and construction projects. Provides excellent drainage and stability.',
                'G1': 'Base course aggregate material perfect for road construction and foundation work. Ensures strong and stable base layers.',
                'Filling': 'Quality filling material suitable for land development and construction site preparation.',
                // Add more descriptions as needed
            };

            // Update modal content
            document.getElementById('modalProductName').textContent = productName;
            document.getElementById('modalProductPrice').textContent = productPrice;
            document.getElementById('modalProductImage').src = productImage;
            document.getElementById('modalProductImage').alt = productName;
            document.getElementById('modalProductDescription').textContent = descriptions[productName] || 'Product description not available.';

            // Show the modal
            const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
            modal.show();
        });
    });
});