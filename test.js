document.addEventListener('DOMContentLoaded', function () {
  const chips = document.querySelectorAll('.chip');
  const checkAllChip = document.querySelector('#check-All');
  const cardContainer = document.getElementById('card_Container');

  if (!cardContainer) {
      console.error('카드 컨테이너를 찾을 수 없습니다. id="card_Container"를 확인해주세요.');
      return;
  }
  chips.forEach(function (chip) {
    const checkbox = chip.querySelector('.chip-input');
    const label = chip.querySelector('.chip-label');

    // div 클릭 시 checkbox 상태를 토글하고, 선택된 스타일을 적용
    chip.addEventListener('click', function () {
      toggleCheckbox(checkbox);
      updateChipStyle(chip, checkbox.checked);
      updateCheckAllStatus();
      console.log(chip.dataset.category);
      fetchCategoryData(chip.dataset.category);
    });

    // label 클릭 시 checkbox 상태를 토글하고, 선택된 스타일을 적용
    label.addEventListener('click', function (event) {
      toggleCheckbox(checkbox);
      updateChipStyle(chip, checkbox.checked);
      updateCheckAllStatus();
      fetchCategoryData(chip.dataset.category);
    });

    // checkbox 클릭 시 div의 선택 상태 및 스타일 업데이트
    checkbox.addEventListener('click', function (event) {
      event.stopPropagation(); // 이벤트 전파 중단
      updateChipStyle(chip, checkbox.checked);
      updateCheckAllStatus();
      fetchCategoryData(chip.dataset.category);
    });
  });

  // 전체보기 클릭 시 다른 카테고리 비활성화 처리 (전체보기는 활성화 되어야함)
  checkAllChip.addEventListener('click', function () {
    const isChecked = !checkAllChip.querySelector('.chip-input').checked;

    chips.forEach(function (chip) {
      const checkbox = chip.querySelector('.chip-input');
      if (chip !== checkAllChip) { // 전체보기 이외의 칩에 대해서만 처리
        checkbox.checked = isChecked;
        updateChipStyle(chip, isChecked);
      }
    });

    // 전체보기의 스타일 변경
    updateChipStyle(checkAllChip, true); // 전체보기는 항상 활성화 상태로 설정
  });

  // div의 선택 상태에 따라 스타일 변경 함수
  function updateChipStyle(chip, isChecked) {
    if (isChecked) {
      chip.classList.add('selected');
      chip.querySelector('.chip-label').style.fontWeight = 'bold';
      chip.style.border = '2px solid #007bff';
    } else {
      chip.classList.remove('selected');
      chip.querySelector('.chip-label').style.fontWeight = 'normal';
      chip.style.border = '1px solid #ccc';
    }
  }

  // checkbox 상태를 토글하는 함수
  function toggleCheckbox(checkbox) {
    checkbox.checked = !checkbox.checked;
  }

  // 전체보기 상태 업데이트 함수
  function updateCheckAllStatus() {
    const allChecked = Array.from(chips).every(function (chip) {
      const checkbox = chip.querySelector('.chip-input');
      return checkbox.checked;
    });

    checkAllChip.querySelector('.chip-input').checked = allChecked;
    updateChipStyle(checkAllChip, allChecked);
  }


  // 카테고리 데이터 가져오기 함수
  function fetchCategoryData(category) {
    fetch('/ETC/category.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // const container = document.getElementById('card_Container');
        const cate = category;
        cardContainer.innerHTML = ''; // 기존 카드 제거
        if (cate === '전체') {
          Object.entries(data.category).forEach(([categoryName, items]) => {
            console.log(categoryName);
            items.forEach(item => {
              renderCard(item);
            });
          });
        } else {
          data.category[category].forEach(item => {
            renderCard(item);
          });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  // 카드 렌더링 함수
  function renderCard(item) {
    cardContainer.innerHTML += `
    <div class="card_Item" id="item">
    <div class="card_Item">
    <a href="${item.url}" aria-label="매장 정보 더보기" target="_blank" rel="noopener noreferrer">
    <img class="card_Item_Img" src="${item.imgUrl}" alt="${item.name} 대표 이미지">
    <p class="arrow_box guide-link">클릭시 "네이버지도"로 이동해요!</p>
    </a>
    <div class="card_Item_Content">
    <div class="Item_Title">
    <p>${item.name}</p>
    <button type="button" title="찜하기 버튼" class="favorite-btn" data-id="${item.id}"></button>
    <br>
    </div>
    <div class="card_Item_Content_">
    <p>${item.introduce}</p>
    <p>${item.time}</p>
    </div>
    </div>
    </div>
    </div>`;
  }

  // 초기 로드 시 전체보기 데이터 가져오기
  fetchCategoryData('전체');



});