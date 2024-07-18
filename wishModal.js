import { getCookie, removeIdFromCookie } from './favorite.js';

const wishModal = document.getElementById('wish-modal');
const wishModalOpen = document.getElementById('wish-open-btn');
const wishModalClose = document.getElementById('wish-close-btn');

//열기 버튼을 눌렀을 때 모달팝업 열림
wishModalOpen.addEventListener('click',function(){
    wishModal.style.display = 'block';

    fetch('/ETC/id.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // const dataString = getCookie('favorite');
        // const dataArray = dataString.split(',').map(item => parseInt(item.trim(), 10));
        const dataArray = ['1', '2'];

        dataArray.map(id => {
            console.log(data[id]);

            const wishContainer = document.querySelector('.wish-container');
            const WISH_TEMPLATE = () => 
                `<div class="wish-item">
                    <img class="wish-item-img" src="${data[id].imgUrl}">
                    <div class="wish-item-name" id>${data[id].name}</div>
                    <button class="wish-delete-btn" id=${id} data-id=${id}>
                        <img src="./assets/icons/delete.svg" alt="삭제">
                    </button>
                </div>`;
            wishContainer.insertAdjacentHTML("afterbegin", WISH_TEMPLATE(id));
            console.log('1');
        });
        
        const wishItemDeleteBtns = document.getElementsByClassName('wish-delete-btn');
        for (const btn of wishItemDeleteBtns) {
            btn.addEventListener('click', function(event) {
                console.log('Delete button clicked', event.target.dataset.id);
                event.target.closest('.wish-item').remove();

                const id = this.getAttribute("data-id");
                removeIdFromCookie(id);
                // location.reload();
                console.log('delete');
            });
        }
    })

    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});



//닫기 버튼을 눌렀을 때 모달팝업 닫힘
wishModalClose.addEventListener('click',function(){
    wishModal.style.display = 'none';
});