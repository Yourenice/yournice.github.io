const apiUrl = "https://api.sampleapis.com/beers/ale";
let allBeers = []; 

async function fetchBeers() {
    const beerContainer = document.getElementById('beer-container');
    const loader = document.getElementById('loader');

    try {
        const response = await fetch(apiUrl);
        allBeers = await response.json();
        
        displayBeers(allBeers);
        
        loader.classList.add('d-none');
    } catch (error) {
        console.error("Error:", error);
        loader.innerHTML = "<p class='text-danger'>Page not loading.</p>";
    }
}

function displayBeers(beers) {
    const beerContainer = document.getElementById('beer-container');
    beerContainer.innerHTML = ""; 

    beers.forEach(beer => {
    
        const imgUrl = beer.image ? beer.image : 'https://via.placeholder.com/150?text=No+Image';
        
        const cardHtml = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card shadow-sm">
                    <img src="${imgUrl}" class="card-img-top beer-img" alt="${beer.name}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
                    <div class="card-body">
                        <h5 class="card-title text-truncate">${beer.name}</h5>
                        <p class="card-text text-muted small">${beer.price}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="rating">⭐ ${beer.rating.average.toFixed(1)}</span>
                            <span class="badge bg-warning text-dark">${beer.rating.reviews} reviews</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        beerContainer.innerHTML += cardHtml;
    });
}

// Search Functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBeers = allBeers.filter(beer => 
        beer.name.toLowerCase().includes(searchTerm)
    );
    displayBeers(filteredBeers);
});

// Run
fetchBeers();
