document.addEventListener('DOMContentLoaded', function () {
  const chips = document.querySelectorAll('.chip');
  const checkAllChip = document.querySelector('#check-All');
  const cardContainer = document.getElementById('card_Container');

  if (!cardContainer) {
    console.error('카드 컨테이너를 찾을 수 없습니다. id="card_Container"를 확인해주세요.');
    return;
  }
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const checkbox = chip.querySelector('.chip-input');
      const isChecked = checkbox.checked;

      // 다른 칩들의 선택 해제
      chips.forEach(function (otherChip) {
        if (otherChip !== chip) {
          const otherCheckbox = otherChip.querySelector('.chip-input');
          otherCheckbox.checked = false;
          updateChipStyle(otherChip, false); // 스타일 업데이트
        }
      });
      // 현재 칩의 선택 상태 토글
      checkbox.checked = !isChecked;
      updateChipStyle(chip, checkbox.checked); // 스타일 업데이트

      if (checkbox.checked) {
        fetchCategoryData(chip.dataset.category); // 선택된 카테고리 데이터 가져오기
      } else {
        updateCheckAllStyle();
        fetchCategoryData('전체'); // 전체보기 데이터 가져오기
      }
    });
  });

  // 칩 스타일 업데이트 함수
  function updateChipStyle(chip, isChecked) {
    if (isChecked) {
      chip.classList.add('selected');
    } else {
      chip.classList.remove('selected');
    }
  }

  // 전체보기 버튼의 스타일 업데이트 함수
  function updateCheckAllStyle() {
    const allChecked = Array.from(chips).every(function (chip) {
      const checkbox = chip.querySelector('.chip-input');
      return !checkbox.checked;
    });
    updateChipStyle(checkAllChip, allChecked); // 전체보기 버튼 스타일 업데이트
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
    <a class="card-link" href="${item.url}" aria-label="매장 정보 더보기" target="_blank" rel="noopener noreferrer">
    <img class="card_Item_Img" src="${item.imgUrl}" alt="${item.name} 대표 이미지">
    <p class="arrow_box guide-link">클릭시 "네이버지도"로 이동해요!</p>
    </a>
    <div class="card_Item_Content">
    <div class="Item_Title">
    <p class="shopName">${item.name}</p>
    <button type="button" title="찜하기 버튼" class="favorite-btn" data-id="${item.id}"></button>
    <hr class="hr-3"></hr>
    </div>
    <div class="description">
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