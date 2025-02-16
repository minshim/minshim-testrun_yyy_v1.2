document.addEventListener("DOMContentLoaded", () => {
  var iconContainer = document.querySelector("#icon-mode");

  if (!iconContainer) {
      console.error("#icon-mode element not found!");
      return;
  }

  var icon = iconContainer.querySelector("img");

  // テーマを適用する関数
  function applyTheme(theme) {
      if (theme === "dark") {
          document.body.classList.add("dark-mode");
          icon.src = "./bau/img/moon.png"; // ダークモード用アイコン
      } else {
          document.body.classList.remove("dark-mode");
          icon.src = "./bau/img/moon.png"; // ライトモード用アイコン
      }
  }

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme || "light");

  // コンテナクリック時の処理
  iconContainer.addEventListener("click", () => {
      const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
});




// ----------------------------clock
function updateTime() {
var now = luxon.DateTime.local();
var hours = now.hour;
var minutes = now.minute;
var seconds = now.second;
var date = now.toFormat('LLLL dd yyyy'); // fmt 
var timezone = now.zoneName; 
var clockElement = document.getElementById('clock');
var dateElement = document.getElementById('date');
var timezoneElement = document.getElementById('timezone');

var timeString = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) ;

clockElement.textContent = timeString;
dateElement.textContent = date;

var timeZoneAbbreviation = getTimeZoneAbbreviation(timezone);

timezoneElement.textContent = "(" + timeZoneAbbreviation + ")";
}

updateTime();

setInterval(updateTime, 1000);

function formatTime(time) {
return (time < 10) ? '0' + time : time;
}

function getTimeZoneAbbreviation(timezone) {
var timeZoneAbbreviations = {
"Asia/Tokyo": "JST", 
"Asia/Shanghai": "CST",
"Asia/Kolkata": "IST", 
"Asia/Bangkok": "ICT", 
"Asia/Dubai": "GST", 
"Asia/Seoul": "KST",
"Asia/Singapore": "SGT", 
"Asia/Taipei": "CST", 
"Asia/Hong_Kong": "HKT",
"America/Los_Angeles": "PST", 
"America/New_York": "EST", 
"Europe/London": "GMT",
"Europe/Paris": "CET",
"Europe/Berlin": "CET",

};
return timeZoneAbbreviations[timezone] || timezone;
}


// ---------------------------------------------------------------count

const startDate = new Date(1720, 12, 1); // 1720年12月1日
const today = new Date();
const timeDifference = today.getTime() - startDate.getTime();
const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365)); 
const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)); 
const resultElement = document.getElementById('result');
resultElement.textContent = years + " years + " + days + " days";



// ---------------------------------------------------------------logo rotate

document.addEventListener('DOMContentLoaded', function () {
  const contentElements = document.querySelectorAll('.leftside, .gallery-container, .calendar-container');
  const logoElements = document.querySelectorAll('.logoA, .logoB, .logoC');

  // Initial rotation values for logos
  const initialRotationMap = {
    logoA: 0,   // Start at 0 degrees
    logoB: 90,  // Start at 90 degrees
    logoC: 0,  // Start at 45 degrees
  };

  // 各コンテンツ要素に対してスクロールイベントを適用
  contentElements.forEach(function (contentsElement) {
    contentsElement.addEventListener('scroll', function () {
      console.log('Scrolling:', contentsElement); // デバッグ用
      updateRotation(contentsElement); // スクロールイベント発生時に回転処理を実行
    });
  });

  // ロゴがクリックされたときに非表示にする
  logoElements.forEach(function (logoElement) {
    logoElement.addEventListener('click', function () {
      hideLogo(logoElement);
    });

    // Set initial rotation for each logo
    const logoClass = Array.from(logoElement.classList).find(cls => initialRotationMap[cls]);
    if (logoClass) {
      const initialRotation = initialRotationMap[logoClass];
      logoElement.style.transform = `rotate(${initialRotation}deg)`;
    }
  });

  // スクロール時にロゴを回転させる関数
  function updateRotation(contentsElement) {
    let scrollPosition = 0, maxScroll = 0;

    if (
      contentsElement.classList.contains('leftside') || 
      contentsElement.classList.contains('calendar-container')
    ) {
      // 縦スクロール
      scrollPosition = contentsElement.scrollTop;
      maxScroll = contentsElement.scrollHeight - contentsElement.clientHeight;
    } else if (contentsElement.classList.contains('gallery-container')) {
      // 横スクロール
      scrollPosition = contentsElement.scrollLeft;
      maxScroll = contentsElement.scrollWidth - contentsElement.clientWidth;
    } else {
      // 未定義の要素の場合は警告を出して処理を中断
      console.warn('No matching class for scroll behavior:', contentsElement);
      return;
    }

    // ロゴごとに異なる最大回転角度を設定
    const maxRotationMap = {
      logoA: 30, 
      logoB: 260, 
      logoC: 280, 
    };

    // スクロール量に基づいて回転角度を計算し、ロゴごとに適用
    logoElements.forEach(function (logoElement) {
      if (logoElement) {
        const logoClass = Array.from(logoElement.classList).find(cls => maxRotationMap[cls]);
        if (logoClass) {
          const maxRotation = maxRotationMap[logoClass];
          const initialRotation = initialRotationMap[logoClass] || 0;
          const rotation = maxScroll > 0 ? (scrollPosition / maxScroll) * maxRotation : 0;

          // Combine initial rotation with calculated rotation
          logoElement.style.transform = `rotate(${initialRotation + rotation}deg)`;
        }
      }
    });
  }

  // ロゴを非表示にする関数
  function hideLogo(logoElement) {
    if (logoElement) {
      logoElement.style.transition = 'opacity 0.3s'; // アニメーションを加える
      logoElement.style.opacity = '0'; // ロゴを透明にする
      setTimeout(function () {
        logoElement.style.display = 'none'; // 完全に非表示にする
      }, 300); // アニメーション時間と同じ300ms後にdisplay: noneを適用
    }
  }
});







document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".details").forEach((el) => {
    const summary = el.querySelector(".summary");
    const answer = el.querySelector(".answer");
    const p = el.querySelector(".section-txtbox p");

    // 初期表示で2行に制限
    p.style.display = "-webkit-box";

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // アコーディオンを閉じる
      if (el.hasAttribute("open")) {
        const closingAnim = answer.animate(closingAnimation(answer), animTiming);

        closingAnim.onfinish = () => {
          el.removeAttribute("open");
          // 2行制限を再適用
          p.style.display = "-webkit-box";
        };
      } else {
        // アコーディオンを開く
        el.setAttribute("open", "true");
        const openingAnim = answer.animate(openingAnimation(answer), animTiming);

        openingAnim.onfinish = () => {
          // 全文表示を適用
          p.style.display = "block";
        };
      }
    });
  });
});

// アニメーションのタイミング設定
const animTiming = {
  duration: 300,
  easing: "ease-in-out",
};

// アコーディオンを閉じるときのキーフレーム
const closingAnimation = (answer) => [
  {
    height: answer.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: "calc(2 * 1.2em)", // 2行分の高さ
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

// アコーディオンを開くときのキーフレーム
const openingAnimation = (answer) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: "calc(2 * 1.2em)", // 2行分の高さ
    opacity: 1,
  },
  {
    height: answer.scrollHeight + "px",
    opacity: 1,
  },
];



//左にスライドさせる

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery-container");
  const rightside = document.querySelector(".rightside");

  // クリックイベントを追加
  rightside.addEventListener("click", function (event) {
    const galleryWidth = gallery.clientWidth;
    const clickX = event.clientX - rightside.getBoundingClientRect().left;
    const scrollAmount = 600; // スクロール量（大きく動かしたい場合は増やす）

    if (clickX < galleryWidth / 2) {
      // 左へスクロール
      gallery.scrollLeft -= scrollAmount;
    } else {
      // 右へスクロール
      gallery.scrollLeft += scrollAmount;
    }
  });
});


// ---------------modal
// モーダル要素とモーダル内の画像・キャプションを取得
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");

// 既存の .gallery-container 内の画像にイベントを追加
const galleryItems = document.querySelectorAll(".gallery-container .gallery-item");
galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        modal.classList.add("open");
        modalImage.src = item.src; // クリックした画像をモーダルに表示
        modalCaption.textContent = item.getAttribute("data-caption") || ""; // データ属性からキャプションを取得
    });
});

// 新しく追加した .thumbs-container 内の画像にイベントを追加
const thumbItems = document.querySelectorAll(".thumbs-container .picsinthumbs");
thumbItems.forEach((item) => {
    item.addEventListener("click", () => {
        modal.classList.add("open");
        modalImage.src = item.src; // クリックした画像をモーダルに表示
        modalCaption.textContent = item.getAttribute("data-caption") || ""; // データ属性からキャプションを取得
    });
});










//modal スライドショー

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");
  const closeModal = document.getElementById("close-btn");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  let currentGallery = []; // To hold the images of the selected gallery
  let currentIndex = 0; // Current image index

  // Function to show modal with selected image
  function showModal(index) {
      if (index < 0 || index >= currentGallery.length) return; // Check if the index is within range

      currentIndex = index; // Update the index
      const imgElement = currentGallery[currentIndex];
      
      modalImg.src = imgElement.src;
      modalCaption.textContent = imgElement.getAttribute("data-caption");
      modal.style.display = "block";
      modal.classList.add("open"); // Show modal
  }

  // Event listener for images in gallery1
  const gallery1Items = document.querySelectorAll("#gallery1 .gallery-item");
  gallery1Items.forEach((item, index) => {
      item.addEventListener("click", function () {
          currentGallery = Array.from(gallery1Items); // Store the images of gallery1
          showModal(index);
      });
  });

  // Event listener for images in gallery2
  const gallery2Items = document.querySelectorAll("#gallery2 .picsinthumbs");
  gallery2Items.forEach((item, index) => {
      item.addEventListener("click", function () {
          currentGallery = Array.from(gallery2Items); // Store the images of gallery2
          showModal(index);
      });
  });

  // Event listener for images in gallery3
  const gallery3Items = document.querySelectorAll("#gallery3 .picsinthumbs_3");
  gallery3Items.forEach((item, index) => {
      item.addEventListener("click", function () {
          currentGallery = Array.from(gallery3Items); // Store the images of gallery3
          showModal(index);
      });
  });

  // Event listener for images in gallery4
  const gallery4Items = document.querySelectorAll("#gallery4 .picsinthumbs_4");
  gallery4Items.forEach((item, index) => {
      item.addEventListener("click", function () {
          currentGallery = Array.from(gallery4Items); // Store the images of gallery4
          showModal(index);
      });
  });

  // Event listener for images in gallery5
  const gallery5Items = document.querySelectorAll("#gallery5 .picsinthumbs_5");
  gallery5Items.forEach((item, index) => {
      item.addEventListener("click", function () {
          currentGallery = Array.from(gallery5Items); // Store the images of gallery5
          showModal(index);
      });
  });

  // Prevent the modal from closing when the image itself is clicked
  modalImg.addEventListener("click", function(event) {
      event.stopPropagation(); // Prevent event propagation to avoid closing modal
  });

  // Prevent the modal from closing when clicking on navigation buttons
  nextBtn.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent closing modal when clicking the next button
      if (currentIndex < currentGallery.length - 1) {
          showModal(currentIndex + 1); // Show next image
      } else {
          showModal(0); // If at the last image, go back to the first one
      }
  });

  prevBtn.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent closing modal when clicking the previous button
      if (currentIndex > 0) {
          showModal(currentIndex - 1); // Show previous image
      } else {
          showModal(currentGallery.length - 1); // If at the first image, go to the last one
      }
  });

// **モーダルの外側をクリックで前後の画像に切り替え**
modal.addEventListener("click", function (event) {
  const modalRect = modal.getBoundingClientRect(); // モーダルの位置とサイズ
  const clickX = event.clientX; // クリックしたX座標

  if (clickX < modalRect.left + modalRect.width / 2) {
      // **左半分をクリック → 前の画像**
      showModal(currentIndex > 0 ? currentIndex - 1 : currentGallery.length - 1);
  } else {
      // **右半分をクリック → 次の画像**
      showModal(currentIndex < currentGallery.length - 1 ? currentIndex + 1 : 0);
  }
});

// **画像の左右クリックでスライド**
modalImg.addEventListener("click", function (event) {
  const imgRect = modalImg.getBoundingClientRect(); // 画像の位置とサイズ
  const imgClickX = event.clientX - imgRect.left; // 画像内でのX座標

  if (imgClickX < imgRect.width / 2) {
      // **画像の左半分をクリック → 前の画像**
      showModal(currentIndex > 0 ? currentIndex - 1 : currentGallery.length - 1);
  } else {
      // **画像の右半分をクリック → 次の画像**
      showModal(currentIndex < currentGallery.length - 1 ? currentIndex + 1 : 0);
  }
});

 // **閉じるボタンの処理**
 closeModal.addEventListener("click", function (event) {
  event.stopPropagation(); // 他のイベントが発火しないようにする
  closeModalContent();
});

// **モーダルを閉じる関数**
function closeModalContent() {
  modalImg.src = ""; // 画像リセット
  modalCaption.textContent = ""; // キャプションリセット
  modal.style.display = "none"; // モーダルを隠す
  modal.classList.remove("open");
}
});