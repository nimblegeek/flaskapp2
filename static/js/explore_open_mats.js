document.addEventListener('DOMContentLoaded', function() {
    const openMatsGrid = document.getElementById('open-mats-grid');
    const viewMoreBtn = document.getElementById('view-more-btn');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const openMats = [
        { title: 'Open Mat 1', description: 'Join our open mat session for Brazilian Jiu-Jitsu enthusiasts of all levels.' },
        { title: 'Open Mat 2', description: 'Freestyle wrestling and submission grappling open mat.' },
        { title: 'Open Mat 3', description: 'Mixed martial arts sparring session for experienced practitioners.' },
        { title: 'Open Mat 4', description: 'Judo and sambo techniques exchange and light rolling.' },
        { title: 'Open Mat 5', description: 'No-gi grappling open mat with a focus on leg locks.' },
        { title: 'Open Mat 6', description: 'Traditional Japanese Jiu-Jitsu and self-defense oriented open mat.' }
    ];

    function createOpenMatCard(openMat) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-6';
        card.innerHTML = `
            <img src="https://via.placeholder.com/300x200" alt="Open Mat Image" class="w-full h-48 object-cover mb-4 rounded">
            <h2 class="text-xl font-semibold mb-2">${openMat.title}</h2>
            <p class="text-gray-600 mb-4">${openMat.description}</p>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Learn More
            </button>
        `;
        return card;
    }

    function displayOpenMats(start, end) {
        for (let i = start; i < end && i < openMats.length; i++) {
            openMatsGrid.appendChild(createOpenMatCard(openMats[i]));
        }
    }

    // Initially display 3 open mats
    displayOpenMats(0, 3);

    viewMoreBtn.addEventListener('click', function() {
        const currentCount = openMatsGrid.children.length;
        if (currentCount < openMats.length) {
            displayOpenMats(currentCount, currentCount + 3);
        }
        if (openMatsGrid.children.length >= openMats.length) {
            viewMoreBtn.style.display = 'none';
        }
    });

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
});
