const randomModal = document.getElementById('random-modal');
const randomModalOpen = document.getElementById('random-open-btn');
const randomModalClose = document.getElementById('random-close-btn');

const diceInput = document.getElementsByName('dice-radio');
let diceInputRange = '';
const dice = document.getElementById('dice');
const diceResult = document.querySelector('.dice-result-container');
let randomResultID;

//열기 버튼을 눌렀을 때 모달팝업이 열림
randomModalOpen.addEventListener('click',function(){
    randomModal.style.display = 'block';
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
randomModalClose.addEventListener('click',function(){
    randomModal.style.display = 'none';
    // 랜덤 결과 초기화
    randomResultID = 0;
    dice.style.display = 'block';
});

//  전체 아이템 크기
const randomOfEntire = () => {
    return Math.floor(Math.random() * 19) + 1;
};

const randomOfWish = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length); 
    return array[randomIndex];
};

diceInput.forEach(function(input) {
    input.addEventListener('click', function(event) {
        // 결과에 따라 범위 다르게 해서 랜덤 뽑기
        diceInputRange = event.target.value;
        console.log(diceInputRange);
        
        // 쿠키로 찜 목록 아이템 id 정보 받기
        const array = ["1","2","3"];
        randomResultID = (diceInputRange === 'entire-list'? randomOfEntire() : randomOfWish(array) );
    });
});
console.log(diceInputRange);


dice.addEventListener('click', function() {
    this.classList.add('rotate');
    // 2초 후에 rotate 클래스를 제거하여 다음 클릭 때 다시 회전하도록 함
    setTimeout(() => {
        this.classList.remove('rotate');
        this.style.display = 'none';
        diceResult.style.display = 'block';
        fetchRandomResultData();
    }, 2000);
});

const fetchRandomResultData = () => {
    fetch('/ETC/id.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const randomResultData = data[randomResultID];
        console.log(randomResultData);

        const randomContainer = document.querySelector('.dice-result-box');
        // const RANDOM_TEMPLATE = () => 
        //     `<img class="dice-result-img" src="./assets/images/${randomResultData.name}.jpeg" alt="베브릿지_상암IT점 대표 이미지">
        //      <div class="dice-result-info">
        //         <h3 style="font-weight: bold; padding-bottom: 10px;">${randomResultData.name}</h3>
        //         <p style="padding-bottom: 10px;">${randomResultData.introduce}</p>
        //         <p>${randomResultData.time}</p>
        //      </div>`;
        // randomContainer.insertAdjacentHTML("afterbegin", RANDOM_TEMPLATE(randomResultData));   
        randomContainer.innerHTML += 
            `<img class="dice-result-img" src="./assets/images/${randomResultData.name}.jpeg" alt="베브릿지_상암IT점 대표 이미지">
             <div class="dice-result-info">
                <h3 style="font-weight: bold; padding-bottom: 10px;">${randomResultData.name}</h3>
                <p style="padding-bottom: 10px;">${randomResultData.introduce}</p>
                <p>${randomResultData.time}</p>
             </div>`;
    });
};