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
    {
        name: "PVC Pipe Ordinary",
        price: 0,
        category: "pipe",
        image: "pipe.jpg",
        hasVariants: true
    },
    {
        name: "Atlanta PVC Pipe",
        price: 0,
        category: "pipe",
        image: "atlanta-pvc-pipe.jpg",
        hasVariants: true
    },
    {
        name: "Ordinary PVC Blue Pipe",
        price: 0,
        category: "pipe",
        image: "ordinary-pvc-blue-pipe.jpg",
        hasVariants: true
    },
    // Add more products here
];

// Function to create product cards
function createProductCard(product) {
    let buttonHtml = '';
    if (product.hasVariants) {
        buttonHtml = `<button class="view-detail" data-name="${product.name}" data-has-variants="true">View Detail</button>`;
    } else {
        buttonHtml = `<button class="view-detail" data-name="${product.name}" data-price="${product.price}">View Detail</button>`;
    }
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            ${buttonHtml}
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

    // Handle View Detail button clicks using event delegation
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('view-detail')) {
            const button = event.target;
            const productName = button.getAttribute('data-name');
            const hasVariants = button.getAttribute('data-has-variants') === 'true';
            const productImage = button.closest('.product-card').querySelector('img').src;
            
            // Get product description
            const descriptions = {
                'Sand': 'High-quality construction sand suitable for various building projects.',
                '3/4 Gravel': 'Premium 3/4 inch gravel ideal for drainage and construction.',
                'G1': 'Base course aggregate material perfect for road construction.',
                'Filling': 'Quality filling material for land development.',
                'PVC Pipe Ordinary': 'High-quality PVC pipes available in various sizes for plumbing and construction needs.',
                'Atlanta PVC Pipe': 'High-quality Atlanta PVC pipes available in various sizes for plumbing and construction needs.',
                // Add more descriptions as needed
            };

            let modalContent = `
                <div class="row">
                    <div class="col-md-6">
                        <div class="product-image-container">
                            <img id="modalProductImage" src="${productImage}" alt="${productName}" class="img-fluid rounded">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h3 id="modalProductName">${productName}</h3>
                        <div class="product-description mb-4">
                            <h5>Description</h5>
                            <p>${descriptions[productName] || 'Product description not available.'}</p>
                        </div>`;

            if (hasVariants) {
                modalContent += `<div class="variants-container"><h5>Available Sizes:</h5>`;
                
                if (productName === 'Ordinary PVC Pipe') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">PVC Pipe 2"</span>
                            <span class="variant-price">₱134</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">PVC Pipe 3"</span>
                            <span class="variant-price">₱235</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">PVC Pipe 4"</span>
                            <span class="variant-price">₱295</span>
                        </div>`;
                } else if (productName === 'Atlanta PVC Pipe') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">PVC Pipe 2"</span>
                            <span class="variant-price">₱390</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">PVC Pipe 3"</span>
                            <span class="variant-price">₱820</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">PVC Pipe 4"</span>
                            <span class="variant-price">₱1,180</span>
                        </div>`;
                }else if (productName === 'Ordinary PVC Blue Pipe') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Ordinary PVC Blue Pipe 1/2"</span>
                            <span class="variant-price">₱90</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Ordinary PVC Blue Pipe 3/4"</span>
                            <span class="variant-price">₱110</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Ordinary PVC Blue Pipe 1"</span>
                            <span class="variant-price">₱160</span>
                        </div>`;
                }else if (productName === 'Atlanta PVC Blue Pipe') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Atlanta PVC Blue Pipe 1/2"</span>
                            <span class="variant-price">₱90</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Atlanta PVC Blue Pipe 3/4"</span>
                            <span class="variant-price">₱110</span>
                            </div>`;
                }else if (productName === 'Electrical Pipe') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Electrical Pipe 1/2"</span>
                            <span class="variant-price">₱145</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Electrical Pipe 3/4"</span>
                            <span class="variant-price">₱175</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Electrical Pipe 1"</span>
                            <span class="variant-price">₱205</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Electrical Pipe 1 1/4"</span>
                            <span class="variant-price">₱265</span>
                            </div>`;

                }
                modalContent += `</div>`;
            } else {
                const productPrice = button.getAttribute('data-price');
                modalContent += `
                        <div class="product-price mb-3">
                            <h5>Price:</h5>
                            <span class="price-amount">${productPrice}</span>
                        </div>`;
            }

            modalContent += `
                    </div>
                </div>`;

            // Update modal content
            const modal = document.getElementById('productDetailModal');
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = modalContent;

            // Show the modal
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    });
});