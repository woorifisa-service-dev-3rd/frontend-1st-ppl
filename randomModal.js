const randomModal = document.getElementById('random-modal');
const randomModalOpen = document.getElementById('random-open-btn');
const randomModalClose = document.getElementById('random-close-btn');

const diceInput = document.getElementsByName('dice-radio');
console.log(diceInput);
console.dir(diceInput);
const dice = document.getElementById('dice');
const diceResult = document.querySelector('.dice-result-container');

dice.addEventListener('click', function() {
    this.classList.add('rotate');
    // 2초 후에 rotate 클래스를 제거하여 다음 클릭 때 다시 회전하도록 함
    setTimeout(() => {
        this.classList.remove('rotate');
        this.style.display = 'none';
        diceResult.style.display = 'block';
    }, 2000);
});

//열기 버튼을 눌렀을 때 모달팝업이 열림
randomModalOpen.addEventListener('click',function(){
    randomModal.style.display = 'block';
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
randomModalClose.addEventListener('click',function(){
    randomModal.style.display = 'none';
});

diceInput.forEach(function(input) {
    input.addEventListener('click', function(event) {
        console.log(event.target.value);
        // 결과에 따라 범위 다르게 해서 랜덤 뽑기
        
        //document.getElementById('result').innerText = event.target.value;
    });
});