document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const signupButton = document.getElementById('signup-button');
    const signupModal = document.getElementById('signup-modal');
    const signupForm = document.getElementById('signup-form');
    const usersList = document.getElementById('users-list');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Open signup modal
    signupButton.addEventListener('click', function() {
        signupModal.classList.remove('hidden');
    });

    // Close signup modal when clicking outside
    signupModal.addEventListener('click', function(e) {
        if (e.target === signupModal) {
            signupModal.classList.add('hidden');
        }
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Signed up successfully!');
                signupModal.classList.add('hidden');
                signupForm.reset();
                fetchUsers();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while signing up. Please try again.');
        });
    });

    // Fetch and display users
    function fetchUsers() {
        fetch('/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                usersList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `${user.name} (${user.email})`;
                    usersList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                usersList.innerHTML = '<li>Error fetching users</li>';
            });
    }

    // Initial fetch of users
    fetchUsers();
});
