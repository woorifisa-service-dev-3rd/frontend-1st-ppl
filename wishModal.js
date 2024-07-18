import * as cookie from "./cookie.js";

const wishCount = document.getElementById("favorite-cnt");
const wishModal = document.getElementById("wish-modal");
const wishModalOpen = document.getElementById("wish-open-btn");
const wishModalClose = document.getElementById("wish-close-btn");

//열기 버튼을 눌렀을 때 모달팝업 열림
wishModalOpen.addEventListener("click", function () {
  const wishContainer = document.querySelector(".wish-container");
  wishContainer.innerHTML = "";

  wishModal.style.display = "block";

  fetch("./ETC/id.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      let dataString = cookie.getCookie("favorite");
      let dataArray = dataString
        .split(",")
        .map((item) => parseInt(item.trim(), 10));

      if (!dataString) {
        wishCount.textContent = "총 0개";
      } else {
        wishCount.textContent = `총 ${dataArray.length}개`;
      }

      dataArray.map((id) => {
        const WISH_TEMPLATE = () =>
          `<div class="wish-item">
                    <img class="wish-item-img" src="${data[id].imgUrl}">
                    <div class="wish-item-name" id>${data[id].name}</div>
                    <button class="wish-delete-btn" id=${id} data-id=${id}>
                        <img src="./assets/icons/delete.svg" alt="삭제">
                    </button>
                </div>`;
        wishContainer.insertAdjacentHTML("afterbegin", WISH_TEMPLATE(id));
      });

      const wishItemDeleteBtns =
        document.getElementsByClassName("wish-delete-btn");
      for (const btn of wishItemDeleteBtns) {
        btn.addEventListener("click", function (event) {
          event.target.closest(".wish-item").remove();

          const id = this.getAttribute("data-id");
          cookie.removeIdFromCookie(id);

          dataString = cookie.getCookie("favorite");
          dataArray = dataString
            .split(",")
            .map((item) => parseInt(item.trim(), 10));
          if (!dataString) {
            wishCount.textContent = "총 0개";
          } else {
            wishCount.textContent = `총 ${dataArray.length}개`;
          }
        });
      }
    })

    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

//닫기 버튼을 눌렀을 때 모달팝업 닫힘
wishModalClose.addEventListener("click", function () {
  wishModal.style.display = "none";
  location.reload();
});
