(function () {
  const gallery = window.__DAYCARE_GALLERY__ || [];
  const galleryRoot = document.getElementById("gallery");
  const dialog = document.getElementById("lightbox");
  const dialogImage = document.getElementById("lightbox-image");
  const dialogTitle = document.getElementById("lightbox-title");
  const dialogDesc = document.getElementById("lightbox-desc");
  const dialogClose = document.getElementById("lightbox-close");

  function escapeAttr(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderGallery() {
    if (!galleryRoot) return;

    galleryRoot.innerHTML = gallery
      .map((item) => {
        const src = item.src || "";
        const title = item.title || "사진";
        const desc = item.desc || "";
        const category = item.category || "갤러리";

        return `
          <article class="gallery-card">
            <button class="gallery-button" data-src="${escapeAttr(src)}" data-title="${escapeAttr(title)}" data-desc="${escapeAttr(desc)}" data-alt="${escapeAttr(title)}">
              <img src="${escapeAttr(src)}" alt="${escapeAttr(title)}" loading="lazy" />
            </button>
            <div class="gallery-copy">
              <span class="gallery-tag">${category}</span>
              <h3>${title}</h3>
              <p>${desc}</p>
            </div>
          </article>
        `;
      })
      .join("");

    galleryRoot.querySelectorAll(".gallery-button").forEach((button) => {
      button.addEventListener("click", () => {
        if (!dialog || !dialogImage || !dialogTitle || !dialogDesc) return;

        dialogImage.src = button.dataset.src || "";
        dialogImage.alt = button.dataset.alt || "";
        dialogTitle.textContent = button.dataset.title || "";
        dialogDesc.textContent = button.dataset.desc || "";
        dialog.showModal();
      });
    });
  }

  if (dialogClose && dialog) {
    dialogClose.addEventListener("click", () => dialog.close());
  }

  if (dialog) {
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!inside) dialog.close();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog && dialog.open) {
      dialog.close();
    }
  });

  renderGallery();

  const siteConfig = window.__DAYCARE_SITE_CONFIG__ || {};
  let configKey = "";
  if (typeof siteConfig.kakaoMapAppKey === "string") {
    configKey = siteConfig.kakaoMapAppKey.trim();
  } else if (typeof siteConfig.getKakaoMapAppKey === "function") {
    configKey = String(siteConfig.getKakaoMapAppKey() || "").trim();
  } else if (Array.isArray(siteConfig.kakaoMapAppKeyBytes)) {
    configKey = String.fromCharCode(...siteConfig.kakaoMapAppKeyBytes).trim();
  }
  const legacyKey = window.__KAKAO_MAP_APP_KEY__;
  const kakaoMapAppKey = configKey || legacyKey || "";

  const nurseryName = "꿈초롱어린이집 어린이집";
  const nurseryAddressDisplay =
    "서울 강서구 허준로 234 912동 106호 (가양 9단지 아파트)";
  const nurseryAddressCandidates = [
    "서울 강서구 허준로 234 912동 106호",
    "서울 강서구 허준로 234",
    "강서구 허준로 234",
  ];
  const nurseryKeywordCandidates = [
    "꿈초롱어린이집 어린이집 서울 강서구 허준로 234 912동 106호",
    "꿈초롱어린이집 어린이집",
    "서울 강서구 허준로 234 912동 106호",
  ];
  const mapTarget = document.getElementById("kakao-map");

  if (!mapTarget) return;

  if (!kakaoMapAppKey) {
    mapTarget.innerHTML =
      '<div style="padding:24px;color:#5f6b63;">지도를 불러오려면 Kakao 지도 키 설정이 필요합니다.</div>';
    return;
  }

  function createMap() {
    if (!window.kakao || !window.kakao.maps || !mapTarget) {
      mapTarget.innerHTML =
        '<div style="padding:24px;color:#5f6b63;">지도를 불러오지 못했습니다. 도메인 허용 상태와 키를 확인해 주세요.</div>';
      return;
    }

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const places = new window.kakao.maps.services.Places();

      function renderMap(coords) {
        const map = new window.kakao.maps.Map(mapTarget, {
          center: coords,
          level: 3,
        });

        const marker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });

        const info = new window.kakao.maps.InfoWindow({
          content: `
              <div style="padding:10px 12px; font-size:13px; line-height:1.5; min-width:190px;">
                <strong>${nurseryName}</strong><br />
                ${nurseryAddressDisplay}
              </div>
            `,
        });

        info.open(map, marker);
      }

      function searchAddress(index) {
        if (index >= nurseryAddressCandidates.length) {
          searchKeyword(0);
          return;
        }

        const candidate = nurseryAddressCandidates[index];
        geocoder.addressSearch(candidate, (result, status) => {
          if (
            status !== window.kakao.maps.services.Status.OK ||
            !result ||
            !result.length
          ) {
            searchAddress(index + 1);
            return;
          }

          renderMap(
            new window.kakao.maps.LatLng(
              Number(result[0].y),
              Number(result[0].x)
            )
          );
        });
      }

      function searchKeyword(index) {
        if (index >= nurseryKeywordCandidates.length) {
          mapTarget.innerHTML =
            '<div style="padding:24px;color:#5f6b63;">주소 좌표를 찾지 못했습니다.</div>';
          return;
        }

        places.keywordSearch(nurseryKeywordCandidates[index], (data, status) => {
          if (
            status !== window.kakao.maps.services.Status.OK ||
            !data ||
            !data.length
          ) {
            searchKeyword(index + 1);
            return;
          }

          renderMap(
            new window.kakao.maps.LatLng(
              Number(data[0].y),
              Number(data[0].x)
            )
          );
        });
      }

      searchAddress(0);
    });
  }

  if (window.kakao && window.kakao.maps && window.kakao.maps.load) {
    createMap();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapAppKey}&autoload=false&libraries=services`;
  script.async = true;
  script.onload = createMap;
  script.onerror = () => {
    mapTarget.innerHTML =
      '<div style="padding:24px;color:#5f6b63;">Kakao 지도 스크립트를 불러오지 못했습니다.</div>';
  };
  document.head.appendChild(script);
})();
