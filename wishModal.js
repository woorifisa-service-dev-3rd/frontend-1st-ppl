const wishModal = document.getElementById('wish-modal');
const wishModalOpen = document.getElementById('wish-open-btn');
const wishModalClose = document.getElementById('wish-close-btn');

const randomModal = document.getElementById('random-modal');
const randomModalOpen = document.getElementById('random-open-btn');
const randomModalClose = document.getElementById('random-close-btn');

const dice = document.getElementById('dice');

dice.addEventListener('click', function() {
    this.classList.add('rotate');
    // 2초 후에 rotate 클래스를 제거하여 다음 클릭 때 다시 회전하도록 함
    setTimeout(() => {
        this.classList.remove('rotate');
        this.style.display = 'none';
    }, 2000);
});

//열기 버튼을 눌렀을 때 모달팝업이 열림
wishModalOpen.addEventListener('click',function(){
    wishModal.style.display = 'block';
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
wishModalClose.addEventListener('click',function(){
    wishModal.style.display = 'none';
});

//열기 버튼을 눌렀을 때 모달팝업이 열림
randomModalOpen.addEventListener('click',function(){
    randomModal.style.display = 'block';
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
randomModalClose.addEventListener('click',function(){
    randomModal.style.display = 'none';
});

