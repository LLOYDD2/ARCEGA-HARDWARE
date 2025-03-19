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
            <h3 class="card-title">${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            ${buttonHtml}
        </div>
    `;
}

// Function to filter products based on search query
function filterProducts() {
    document.getElementById('loading-message').style.display = 'block'; // Show loading
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    let found = false;

    productCards.forEach(card => {
        const productName = card.querySelector('.card-title').textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            card.style.display = 'block'; // Show matching product
            found = true;
        } else {
            card.style.display = 'none'; // Hide non-matching product
        }
    });

    // Visual feedback
    const message = document.getElementById('no-results-message');
    if (!found) {
        message.style.display = 'block'; // Show message if no results found
    } else {
        message.style.display = 'none'; // Hide message if results found
    }
    document.getElementById('loading-message').style.display = 'none'; // Hide loading
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

    // Remove the search button event listener
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.removeEventListener('click', filterProducts);
    }

    // Add event listener to search input for filtering on keystrokes
    const searchInputField = document.getElementById('searchInput');
    if (searchInputField) {
        searchInputField.addEventListener('input', filterProducts);
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
                'Sand': 'Fine-grain construction sand, perfect for concrete mixing, masonry work, and general construction. Properly graded for optimal workability and strength.',
                'G1 Gravel': 'Grade 1 construction aggregate, suitable for heavy-duty applications. Excellent for road base, foundation work, and large-scale construction projects.',
                '3/4 Gravel': '3/4 inch sized gravel, perfect for concrete mixing and construction. Ideal for driveways, pathways, and general construction applications. Provides excellent drainage and structural support.',
                '3/8 Gravel': '3/8 inch sized gravel, ideal for finer construction work and concrete mixing. Perfect for smaller projects, decorative landscaping, and detailed applications.',
                'Filling': 'Quality fill material for site preparation, leveling, and backfilling. Ensures proper ground stability and drainage for construction projects.',
                'Cement': 'Federal brand cement, high-quality Portland cement for construction. Perfect for concrete mixing, masonry work, and general construction needs.',
                'Readymix': 'Pre-mixed concrete solution, ready for immediate use. Ensures consistent quality and strength for all construction applications.',
                'Dakal2': 'High-quality crushed limestone aggregate. Excellent for soil stabilization, road construction, and general building applications. Provides superior compaction and durability.',
                '12MM': '12mm thick plywood, ideal for heavy-duty construction and furniture making. Superior strength and durability for walls, flooring, and structural applications.',
                '9MM': '9mm thick plywood, perfect for construction and furniture making. Features excellent strength and durability. Ideal for walls, ceilings, and general carpentry work.',
                'Layun': 'Traditional bamboo poles (Layun) for construction. Perfect for temporary structures, scaffolding, and traditional Filipino building applications.',
                'Smart Board': 'Premium fiber cement board available in various thicknesses. Ideal for interior and exterior walls, offering excellent durability and weather resistance.',
                'Marine Plywood': 'Water-resistant marine-grade plywood. Specially treated to resist moisture and weather damage. Perfect for outdoor construction, marine applications, and high-moisture areas.',
                'Phenolic Board': 'High-density phenolic boards with superior water resistance. Available in different thicknesses. Ideal for outdoor furniture, cabinets, and moisture-prone areas.',
                'Atlanta PVC Blue Pipe': 'Premium Atlanta brand blue PVC pipes for water systems. Available in multiple sizes, perfect for professional plumbing installations with superior durability.',
                'Common Nails': 'High-quality steel common nails in various sizes. Essential for general construction, woodworking, and carpentry projects. Provides strong, reliable fastening.',
                'Angle Bar': 'Structural steel angle bars for construction. Available in various sizes, perfect for framing, supports, and structural reinforcement applications.',
                'Metal Farring': 'Metal furring channels for ceiling and wall systems. Provides sturdy support for drywall and ceiling installations. Available in standard sizes.',
                'Vulcaseal': 'Professional-grade waterproofing sealant. Excellent for roof repairs, gutters, and general waterproofing applications. Provides long-lasting protection.',
                'Flexibond': 'High-performance concrete bonding adhesive. Perfect for joining new concrete to old surfaces and general concrete repair work. Ensures strong, reliable bonds.',
                'C Purlins': 'Structural steel C-purlins for robust construction. Available in various sizes and gauges. Ideal for roof framing, wall supports, and general structural applications.',
                'Metal Studs': 'High-quality metal studs for modern construction. Provides excellent structural support for walls and partitions. Fire-resistant and perfect for commercial and residential buildings.',
                'Sahara': 'Premium Sahara stone finish paint. Creates elegant textured surfaces with excellent durability. Perfect for interior and exterior walls, offering both protection and aesthetic appeal.',
                'Epoxy Primer': 'Professional-grade epoxy primer for superior surface preparation. Ensures excellent adhesion and durability. Ideal for metal surfaces, concrete floors, and marine applications.',
                'Gl Wire 16': 'Durable galvanized wire, perfect for fencing and construction applications. Provides excellent tensile strength and corrosion resistance.',
                'Toilet Bowl': 'High-quality ceramic toilet bowl, designed for comfort and efficiency. Features a modern design with a powerful flush system.',
                'GL Corr 5x8': 'Galvanized corrugated steel sheets, perfect for roofing and siding. Provides excellent durability and weather resistance.',
                'Footing': 'Pre-cast concrete footings, ideal for supporting structures. Ensures stability and load-bearing capacity for various construction applications.',
                'Metal Primer': 'Professional-grade metal primer, perfect for preparing surfaces for painting. Ensures excellent adhesion and corrosion resistance.'
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
                }else if (productName === 'Phenolic Board') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Phenolic Board 1/2"</span>
                            <span class="variant-price">₱970</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Phenolic Board 3/4"</span>
                            <span class="variant-price">₱1300</span>
                        </div>`;
                }else if (productName === 'Smart Board') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Smart Board 3/16"</span>
                            <span class="variant-price">₱430</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Smart Board 1/4"</span>
                            <span class="variant-price">₱490</span>
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

                }else if (productName === 'Cyclone 2x4ft') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Cyclone 2x4ft"</span>
                            <span class="variant-price">₱600</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Cyclone 2x5ft"</span>
                            <span class="variant-price">₱750</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Cyclone 2x6ft"</span>
                            <span class="variant-price">₱900</span>
                        </div>`;
                }else if (productName === 'Cyclone 4x4ft') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Cyclone 4x4ft"</span>
                            <span class="variant-price">₱440</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Cyclone 4x5ft"</span>
                            <span class="variant-price">₱550</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Cyclone 4x6ft"</span>
                            <span class="variant-price">₱660</span>
                        </div>`;
                }else if (productName === 'Ordinary Plywood') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Ordinary Plywood 1/4"</span>
                            <span class="variant-price">₱380</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Ordinary Plywood 1/2"</span>
                            <span class="variant-price">₱720</span>
                        </div>`;
                }else if (productName === 'Marine Plywood') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Marine Plywood 1/4"</span>
                            <span class="variant-price">₱480</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Marine Plywood 1/2"</span>
                            <span class="variant-price">₱840</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Marine Plywood 3/4"</span>
                            <span class="variant-price">₱1,450</span>
                        </div>`;
                }else if (productName === 'C Purlins') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">C Purlins 1.2x 2x3</span>
                            <span class="variant-price">₱590</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">C Purlins 1.5x 2x3</span>
                            <span class="variant-price">₱640</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">C Purlins 1.5x 2x4</span>
                            <span class="variant-price">₱780</span>
                        </div>
                       <div class="variant-item">
                            <span class="variant-name">C Purlins 1.5x 2x6</span>
                            <span class="variant-price">₱1,100</span>
                        </div>`;
                }else if (productName === 'Angle Bar') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Angle Bar 3/16 x1</span>
                            <span class="variant-price">₱345</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Angle Bar 1/4 x1</span>
                            <span class="variant-price">₱480</span>
                        </div>
                        <div class="variant-item"> 
                            <span class="variant-name">Angle Bar 1/4x 1 1/2</span>
                            <span class="variant-price">₱820</span>
                        </div>
                       <div class="variant-item">
                            <span class="variant-name">Angle Bar 1/4 x 2</span>
                            <span class="variant-price">₱1,380</span>
                        </div>`;
                }else if (productName === 'Flat Bar') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Flat Bar 3/16 x1</span>
                            <span class="variant-price">₱295</span>
                        </div>'`;
                }else if (productName === 'GI Pipe') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">GI Pipe 1/2"</span>
                            <span class="variant-price">₱405</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">GI Pipe 3/4"</span>
                            <span class="variant-price">₱495</span>
                        </div>
                        <div class="variant-item"> 
                            <span class="variant-name">GI Pipe 1"</span>
                            <span class="variant-price">₱695</span>
                        </div>
                       <div class="variant-item">
                            <span class="variant-name">GI Pipe 1 1/4"</span>
                            <span class="variant-price">₱980</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">GI Pipe 1 1/2"</span>
                            <span class="variant-price">₱1,180</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">GI Pipe 2"</span>
                            <span class="variant-price">₱1,580</span>
                        </div>`;
                }else if (productName === 'GL Corr 3x8') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">GL Corr 3x8</span>
                            <span class="variant-price">₱304</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">GL Corr 3x10</span>
                            <span class="variant-price">₱380</span>
                        </div>
                        <div class="variant-item"> 
                            <span class="variant-name">GL Corr 3x12</span>
                            <span class="variant-price">₱456</span>
                        </div>`;
                }else if (productName === 'GL Corr 4x8') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">GL Corr 4x8</span>
                            <span class="variant-price">₱384</span>
                        </div>
                        <div class="variant-item"> 
                            <span class="variant-name">GL Corr 4x10</span>
                            <span class="variant-price">₱480</span>
                        </div>
                        <div class="variant-item"> 
                            <span class="variant-name">GL Corr 4x12</span>
                            <span class="variant-price">₱576</span>
                        </div>`;

                }else if (productName === 'GL Corr 5x8') { 
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">GL Corr 5x8</span>
                            <span class="variant-price">₱432</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">GL Corr 5x10</span>
                            <span class="variant-price">₱540</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">GL Corr 5x12</span>
                            <span class="variant-price">₱648</span>
                        </div>`;
                }else if (productName === 'Concreate Pipe') { 
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Concreate Pipe #3</span>
                            <span class="variant-price">₱550</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Concreate Pipe #2</span>
                            <span class="variant-price">₱600</span>
                        </div>`;
                }else if (productName === 'Drainage Pipe') {
                    modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Drainage Pipe 8"</span>
                            <span class="variant-price">₱380</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Drainage Pipe 10"</span>
                            <span class="variant-price">₱480</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Drainage Pipe 12"</span>
                            <span class="variant-price">₱580</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Drainage Pipe 24"</span>
                            <span class="variant-price">₱1,200</span>
                        </div>`;
                     }else if (productName === 'Footing') {
                            modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Footing 3"</span>
                            <span class="variant-price">₱550</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Footing 4"</span>
                            <span class="variant-price">₱600</span>
                        </div>`;
                     }else if (productName === 'Vulcaseal') {
                        modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Vulcaseal 1/4 1litter"</span>
                            <span class="variant-price">₱85 pack</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Vulcaseal 6"</span>
                            <span class="variant-price">₱180 1/4 1litter</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Vulcaseal 8"</span>
                            <span class="variant-price">₱280 1/2 1litter</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Vulcaseal 10"</span>
                            <span class="variant-price">₱680 1litter</span>
                        </div>`;
                    }else if (productName === 'Elastoseal') {
                        modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Elastoseal Small"</span>
                            <span class="variant-price">₱85</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Elastoseal Big"</span>
                            <span class="variant-price">₱185</span>
                        </div>`;
                    }else if (productName === 'Paint Thinner') {
                        modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Paint Thinner"</span>
                            <span class="variant-price">₱80 Bottle</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Paint Thinner"</span>
                            <span class="variant-price">₱380 Gallon</span>
                        </div>`;
                    }else if (productName === 'Laquer Thinner') {
                        modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Laquer Thinner"</span>
                            <span class="variant-price">₱60 Bottle</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Laquer Thinner"</span>
                            <span class="variant-price">₱480 Gallon</span>
                        </div>`;
                    }else if (productName === 'Flexibond') {
                        modalContent += `
                        <div class="variant-item">
                            <span class="variant-name">Flexibond Gallon"</span>
                            <span class="variant-price">₱820</span>
                        </div>
                        <div class="variant-item">
                            <span class="variant-name">Flexibond Gallon 16hos"</span>
                            <span class="variant-price">₱3,200</span>
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
            if (!modal) return; // Ensure modal exists
            const modalBody = modal.querySelector('.modal-body');
            if (!modalBody) return; // Ensure modal body exists
            modalBody.innerHTML = modalContent;

            // Show the modal
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }
    });
});

// Product search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        const productContainer = document.getElementById('products-container');
        
        products.forEach(product => {
            const productParent = product.parentElement;
            const title = product.querySelector('.card-title').textContent.toLowerCase();
            const description = product.querySelector('.product-description').textContent.toLowerCase();
            const price = product.querySelector('.price').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || price.includes(searchTerm)) {
                productParent.style.display = '';
                // Reset the order for visible items
                productParent.style.order = '0';
            } else {
                productParent.style.display = 'none';
                // Move hidden items to the end
                productParent.style.order = '1';
            }
        });

        // Force grid layout refresh
        productContainer.style.display = 'none';
        productContainer.offsetHeight; // Force reflow
        productContainer.style.display = 'flex';
    }

    // Search on input change
    searchInput.addEventListener('keyup', performSearch);
    
    // Search on button click
    searchButton.addEventListener('click', performSearch);
});