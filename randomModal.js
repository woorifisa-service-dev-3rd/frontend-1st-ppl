import * as cookie from './cookie.js';

const randomModal = document.getElementById('random-modal');
const randomModalOpen = document.getElementById('random-open-btn');
const randomModalClose = document.getElementById('random-close-btn');

const diceInput = document.getElementsByName('dice-radio');
let diceInputRange = '';
const dice = document.getElementById('dice');
const diceResult = document.querySelector('.dice-result-container');
let randomResultID;

//열기 버튼을 눌렀을 때 모달팝업이 열림
randomModalOpen.addEventListener('click', function () {
    randomModal.style.display = 'block';
    // 랜덤 결과 초기화
    randomResultID = 0;
});

//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
randomModalClose.addEventListener('click', function () {
    randomModal.style.display = 'none';
    dice.style.display = 'block';
    location.reload();
});

//  전체 아이템 크기
const randomOfEntire = () => {
    const num = Math.floor(Math.random() * 19) + 1;
    console.log("num", num);
    return num;

};

const randomOfWish = (array) => {
    const filteredArr = array.filter(num => !isNaN(num));


    if (filteredArr.length === 0) {
        window.alert("찜 목록이 비어있어요!");
        diceInput[1].checked = false; // 찜 목록이 비었을 때 체크 해제

    }
    else {
        const randomIndex = Math.floor(Math.random() * array.length);
        console.log("randomIndex", randomIndex);
        return array[randomIndex];
    }
};

diceInput.forEach(function (input) {
    input.addEventListener('click', function (event) {
        // 결과에 따라 범위 다르게 해서 랜덤 뽑기
        diceInputRange = event.target.value;
        console.log(diceInputRange);

        // 쿠키로 찜 목록 아이템 id 정보 받기
        const dataString = cookie.getCookie('favorite');
        const dataArray = dataString.split(',').map(item => parseInt(item.trim(), 10));

        randomResultID = (diceInputRange === 'entire-list' ? randomOfEntire() : randomOfWish(dataArray));

    });
});


dice.addEventListener('click', function () {
    console.log('aaa', randomResultID);
    // 2초 후에 rotate 클래스를 제거하여 다음 클릭 때 다시 회전하도록 함
    if (randomResultID === 0 || randomResultID == undefined) {
        window.alert("원하는 메뉴를 선택해 주세요!");

    }
    else {
        this.classList.add('rotate');
        setTimeout(() => {
            this.classList.remove('rotate');
            this.style.display = 'none';
            diceResult.style.display = 'block';
            fetchRandomResultData();
        }, 2000);
    }
});

const fetchRandomResultData = () => {
    console.log(randomResultID);
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
            randomContainer.innerHTML =
                `
                <a href="${randomResultData.url}" aria-label="매장 정보 더보기" target="_blank" rel="noopener noreferrer">
            <img class="dice-result-img" style="width:100%" src="${randomResultData.imgUrl}" alt="베브릿지_상암IT점 대표 이미지">
                </a>
                <div class="dice-result-info">
                    <h3 style="font-weight: bold; padding-bottom: 10px">${randomResultData.name}</h3>
                    <p style="padding-bottom: 10px;">${randomResultData.introduce}</p>
                    <p>${randomResultData.time}</p>
                </div>`;
        });

};