document.getElementById('downloadBtn').addEventListener('click', () => {
    const statusDiv = document.getElementById('status');
    const container = document.getElementById('cardsContainer');
    
    container.innerHTML = ''; 
    statusDiv.textContent = 'Завантаження...';

    fetch('https://randomuser.me/api/?results=5')
        .then(response => {
            if (!response.ok) {
                throw new Error('По мережі сталася помилка');
            }
            return response.json();
        })
        .then(data => {
            statusDiv.textContent = 'success!';
            
            data.results.forEach(user => {
                const card = document.createElement('div');
                card.className = 'card';

                const imgSrc = user.picture.large;
                const postCode = user.location.postcode;
                const cityName = user.location.city;
                const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
                const emailUser = user.email;

                card.innerHTML = `
                    <img src="${imgSrc}" alt="Avatar">
                    <p><strong>Postcode:</strong> ${postCode}</p>
                    <p><strong>City:</strong> ${cityName}</p>
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>E-mail:</strong> ${emailUser}</p>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            statusDiv.textContent = 'Помилка завантаження!';
            console.error('Помилка:', error);
        });
});
