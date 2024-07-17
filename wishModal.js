const wishModal = document.getElementById('wish-modal');
const wishModalOpen = document.getElementById('wish-open-btn');
const wishModalClose = document.getElementById('wish-close-btn');

//열기 버튼을 눌렀을 때 모달팝업이 열림
wishModalOpen.addEventListener('click',function(){
    wishModal.style.display = 'block';
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
wishModalClose.addEventListener('click',function(){
    wishModal.style.display = 'none';
});


