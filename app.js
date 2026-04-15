
(function () {
  const gallery = window.__DAYCARE_GALLERY__ || [];
  const galleryRoot = document.getElementById('gallery');
  const dialog = document.getElementById('lightbox');
  const dialogImage = document.getElementById('lightbox-image');
  const dialogTitle = document.getElementById('lightbox-title');
  const dialogDesc = document.getElementById('lightbox-desc');
  const dialogClose = document.getElementById('lightbox-close');

  function renderGallery() {
    if (!galleryRoot) return;
    galleryRoot.innerHTML = gallery.map((item) => `
      <article class="gallery-card">
        <button class="gallery-button" data-file="${item.file}" data-title="${item.title}" data-desc="${item.desc}" data-alt="${item.alt}">
          <img src="./images/${item.file}" alt="${item.alt}" loading="lazy" />
        </button>
        <div class="gallery-copy">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </article>
    `).join('');

    galleryRoot.querySelectorAll('.gallery-button').forEach((button) => {
      button.addEventListener('click', () => {
        dialogImage.src = `./images/${button.dataset.file}`;
        dialogImage.alt = button.dataset.alt || '';
        dialogTitle.textContent = button.dataset.title || '';
        dialogDesc.textContent = button.dataset.desc || '';
        dialog.showModal();
      });
    });
  }

  if (dialogClose) dialogClose.addEventListener('click', () => dialog.close());
  if (dialog) {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
      if (!inside) dialog.close();
    });
  }
  renderGallery();

  const KAKAO_MAP_APP_KEY = window.__KAKAO_MAP_APP_KEY__;
  const NURSERY_NAME = '꿈초롱 어린이집';
  const NURSERY_ADDRESS = '서울 강서구 가양아파트 9단지 912동 106호';
  const mapTarget = document.getElementById('kakao-map');
  if (!mapTarget) return;
  if (!KAKAO_MAP_APP_KEY) {
    mapTarget.innerHTML = '<div style="padding:24px;color:#5f6b63;">Kakao 지도 키가 아직 입력되지 않았습니다. 운영 전 키를 설정해 주세요.</div>';
    return;
  }

  function createMap() {
    if (!window.kakao || !window.kakao.maps || !mapTarget) {
      mapTarget.innerHTML = '<div style="padding:24px;color:#5f6b63;">지도를 불러오지 못했습니다. Kakao key와 도메인 등록 상태를 확인해 주세요.</div>';
      return;
    }
    window.kakao.maps.load(function () {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(NURSERY_ADDRESS, function (result, status) {
        if (status !== window.kakao.maps.services.Status.OK || !result || !result.length) {
          mapTarget.innerHTML = '<div style="padding:24px;color:#5f6b63;">주소 좌표를 찾지 못했습니다.</div>';
          return;
        }
        const coords = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
        const map = new window.kakao.maps.Map(mapTarget, { center: coords, level: 3 });
        const marker = new window.kakao.maps.Marker({ map: map, position: coords });
        const info = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding:10px 12px; font-size:13px; line-height:1.5; min-width:180px;">
              <strong>${NURSERY_NAME}</strong><br />
              ${NURSERY_ADDRESS}
            </div>
          `
        });
        info.open(map, marker);
      });
    });
  }

  if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
    createMap();
    return;
  }

  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`;
  script.async = true;
  script.onload = createMap;
  script.onerror = function () {
    mapTarget.innerHTML = '<div style="padding:24px;color:#5f6b63;">Kakao 지도 스크립트를 불러오지 못했습니다.</div>';
  };
  document.head.appendChild(script);
})();
