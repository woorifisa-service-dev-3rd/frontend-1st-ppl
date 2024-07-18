fetch('/ETC/category.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('card_Container');
        const cate = '카페';
        // const all = ['카페','한식','기타'];
        if (cate === '전체') {
            Object.entries(data.category).forEach(([categoryName, items]) => {
                console.log(categoryName);
                items.forEach(item => {
                    console.log(item);
                });
            });
        } else {
            data.category[cate].map(cafe => {
                container.innerHTML +=
                    `<div class="card_Item" id="item">
                <div class="card_Item">
                    <a href="${cafe.url}" aria-label="매장 정보 더보기" target="_blank" rel="noopener noreferrer">
                        <img class="card_Item_Img" src="${cafe.imgUrl}" alt="${cafe.name} 대표 이미지">
                        <p class="arrow_box guide-link">클릭시 "네이버지도"로 이동해요!</p>
                    </a>
                    <div class="card_Item_Content">
                        <div class="Item_Title">
                            <p>${cafe.name}</p>
                            <button type="button" title="찜하기 버튼" class="favorite-btn" data-id="${cafe.id}"></button>
                            <br>
                            <p>${cafe.introduce}</p>
                            <p>${cafe.time}</p>
                        </div>
                    </div>
                </div>`;
            })
        }
        })
    .catch (error => {
    console.error('There was a problem with the fetch operation:', error);
});


