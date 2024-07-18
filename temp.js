fetch('/ETC/category.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('container');
        data.category.카페.map(cafe => {
            container.innerHTML += 
            `<div id="item">
                id : ${cafe.id} <br>
                name : ${cafe.name} <br>
                time : ${cafe.time} <br>
                introduce : ${cafe.introduce} <br>
                url : ${cafe.url}
            </div>`;
        });
        
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

