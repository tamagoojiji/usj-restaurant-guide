// USJレストラン診断 メインロジック
(function () {
  "use strict";

  // === LIFF設定 ===
  var LIFF_ID = "2009540998-dXlvsJUc";
  var USER_MASTER_URL = "https://script.google.com/macros/s/AKfycbylb9DgElCxvX8P42y_Vu6EBDlRpxaeaOUF8Jw-kToTxXxpJ-8TKpAnLumn0WBahePI/exec";
  var RESTAURANT_GAS_URL = "https://script.google.com/macros/s/AKfycbzj2r9Suo7U3bT5nxBMVAKD_GLV3nhNeAn8ozmIAUN5bNWAspQsabXPgzSY3iDaz-xo4g/exec";

  // === ユーザー情報 ===
  var lineUid = null;
  var lineDisplayName = null;
  var userRegistered = false;

  // === 診断状態 ===
  var answers = {};
  var currentQuestion = 0;

  var QUESTIONS = [
    { key: "time", title: "いつ食べたい？", options: TIME_SLOTS },
    { key: "food", title: "何が食べたい？", options: FOOD_CATEGORIES },
    { key: "character", title: "好きなキャラ・世界観は？", options: CHARACTERS },
    { key: "area", title: "遊んでいるエリアは？", options: AREAS },
    { key: "priority", title: "一番重視するのは？", options: PRIORITIES }
  ];

  // === 画面ID ===
  var screenIds = [
    "screen-loading", "screen-liff-error", "screen-register",
    "screen-top", "screen-question", "screen-result"
  ];

  // === 画面遷移 ===
  function showScreen(id) {
    screenIds.forEach(function (sid) {
      var el = document.getElementById(sid);
      if (el) el.classList.add("hidden");
    });
    document.getElementById(id).classList.remove("hidden");
    window.scrollTo(0, 0);
  }

  // ============================================================
  //  LIFF初期化
  // ============================================================
  function initLiff() {
    liff.init({ liffId: LIFF_ID }).then(function () {
      if (!liff.isLoggedIn()) {
        // LINE内ブラウザならログインを促す、外部ブラウザなら登録なしで進む
        if (liff.isInClient()) {
          liff.login();
          return;
        }
        // 外部ブラウザ → 登録なしで診断のみ利用可能
        showScreen("screen-top");
        return;
      }
      return liff.getProfile();
    }).then(function (profile) {
      if (!profile) return;
      lineUid = profile.userId;
      lineDisplayName = profile.displayName;

      // localStorage旧キー移行（ep_ → tamago_）
      var oldReg = localStorage.getItem("ep_registered_" + lineUid);
      var oldUser = localStorage.getItem("ep_user_" + lineUid);
      if (oldReg && !localStorage.getItem("tamago_registered_" + lineUid)) {
        localStorage.setItem("tamago_registered_" + lineUid, oldReg);
      }
      if (oldUser && !localStorage.getItem("tamago_user_" + lineUid)) {
        localStorage.setItem("tamago_user_" + lineUid, oldUser);
      }

      checkUserRegistration();
    }).catch(function (err) {
      console.error("LIFF init error:", err);
      // LIFF初期化失敗 → 登録なしで診断のみ利用可能
      showScreen("screen-top");
    });
  }

  // ============================================================
  //  ユーザー登録チェック（共通ユーザーマスター、キャッシュ優先）
  // ============================================================
  function checkUserRegistration() {
    var cachedRegistered = localStorage.getItem("tamago_registered_" + lineUid);
    var localUser = localStorage.getItem("tamago_user_" + lineUid);

    if (cachedRegistered === "true" || localUser) {
      userRegistered = true;
      showScreen("screen-top");

      // バックグラウンドでユーザーマスターと同期
      if (USER_MASTER_URL) {
        fetch(USER_MASTER_URL + "?action=checkUser&uid=" + encodeURIComponent(lineUid))
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (!data.registered) {
              localStorage.removeItem("tamago_registered_" + lineUid);
            }
          })
          .catch(function () { /* バックグラウンドなので無視 */ });
      }
      return;
    }

    // キャッシュなし → ユーザーマスターに問い合わせ
    if (!USER_MASTER_URL) {
      showRegisterScreen();
      return;
    }

    fetch(USER_MASTER_URL + "?action=checkUser&uid=" + encodeURIComponent(lineUid))
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.registered) {
          userRegistered = true;
          localStorage.setItem("tamago_registered_" + lineUid, "true");
          showScreen("screen-top");
        } else {
          showRegisterScreen();
        }
      })
      .catch(function () {
        showRegisterScreen();
      });
  }

  // ============================================================
  //  登録画面
  // ============================================================
  function showRegisterScreen() {
    showScreen("screen-register");

    var welcomeEl = document.getElementById("register-welcome");
    if (lineDisplayName) {
      welcomeEl.textContent = lineDisplayName + "さん、ようこそ！";
    }

    // 生年月日プルダウン生成
    var yearSelect = document.getElementById("reg-year");
    var monthSelect = document.getElementById("reg-month");
    var daySelect = document.getElementById("reg-day");

    if (yearSelect.options.length <= 1) {
      var currentYear = new Date().getFullYear();
      for (var y = currentYear; y >= 1930; y--) {
        var opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y + "年";
        yearSelect.appendChild(opt);
      }
      for (var m = 1; m <= 12; m++) {
        var opt2 = document.createElement("option");
        opt2.value = m;
        opt2.textContent = m + "月";
        monthSelect.appendChild(opt2);
      }
      for (var d = 1; d <= 31; d++) {
        var opt3 = document.createElement("option");
        opt3.value = d;
        opt3.textContent = d + "日";
        daySelect.appendChild(opt3);
      }
    }

    // 性別ボタン
    var selectedGender = null;
    var genderBtns = document.querySelectorAll(".gender-btn");
    genderBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        genderBtns.forEach(function (b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
        selectedGender = btn.getAttribute("data-gender");
        updateRegisterBtn();
      });
    });

    // バリデーション
    var registerBtn = document.getElementById("register-btn");
    var privacyCheckbox = document.getElementById("privacy-checkbox");

    function updateRegisterBtn() {
      var valid = yearSelect.value && monthSelect.value && daySelect.value
        && selectedGender && privacyCheckbox.checked;
      registerBtn.disabled = !valid;
    }

    yearSelect.addEventListener("change", updateRegisterBtn);
    monthSelect.addEventListener("change", updateRegisterBtn);
    daySelect.addEventListener("change", updateRegisterBtn);
    privacyCheckbox.addEventListener("change", updateRegisterBtn);

    // 登録ボタン
    registerBtn.addEventListener("click", function () {
      if (registerBtn.disabled) return;

      var birthday = yearSelect.value + "-" +
        String(monthSelect.value).padStart(2, "0") + "-" +
        String(daySelect.value).padStart(2, "0");

      var userData = {
        uid: lineUid,
        name: lineDisplayName,
        birthday: birthday,
        gender: selectedGender,
        registeredAt: new Date().toISOString()
      };

      // ローカル保存（共通キー）
      localStorage.setItem("tamago_user_" + lineUid, JSON.stringify(userData));
      localStorage.setItem("tamago_registered_" + lineUid, "true");
      userRegistered = true;

      // ユーザーマスターGASに送信
      if (USER_MASTER_URL) {
        fetch(USER_MASTER_URL, {
          method: "POST",
          body: JSON.stringify({ action: "registerUser", data: userData })
        }).catch(function (err) {
          console.error("User master register error:", err);
        });
      }

      showScreen("screen-top");
    });

    // プライバシーポリシーリンク
    var privacyLinkReg = document.getElementById("privacy-link-reg");
    if (privacyLinkReg) {
      privacyLinkReg.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("privacy-modal").classList.remove("hidden");
      });
    }
  }

  // ============================================================
  //  プライバシーポリシーモーダル
  // ============================================================
  function initPrivacyModal() {
    var modal = document.getElementById("privacy-modal");
    var closeBtn = document.getElementById("modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        modal.classList.add("hidden");
      });
    }
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) modal.classList.add("hidden");
      });
    }
  }

  // ============================================================
  //  診断開始
  // ============================================================
  function startDiagnosis() {
    answers = {};
    currentQuestion = 0;
    renderQuestion();
    showScreen("screen-question");
  }

  function renderQuestion() {
    var q = QUESTIONS[currentQuestion];
    var container = document.getElementById("question-container");
    var progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

    container.innerHTML =
      '<div class="quiz-header">' +
        '<button class="quiz-back-btn" id="quiz-back">&#8249; 戻る</button>' +
        '<div class="progress-info">' +
          '<span class="q-number">' + (currentQuestion + 1) + '</span> / <span class="q-total">' + QUESTIONS.length + '</span>' +
        '</div>' +
        '<div class="progress-bar">' +
          '<div class="progress-fill" style="width: ' + progress + '%"></div>' +
        '</div>' +
      '</div>' +
      '<h2 class="question-title">' + q.title + '</h2>' +
      '<div class="options-grid">' +
        q.options.map(function (opt) {
          return '<button class="option-btn" data-key="' + q.key + '" data-value="' + opt.id + '">' +
            '<span class="option-icon">' + opt.icon + '</span>' +
            '<span class="option-label">' + opt.label + '</span>' +
          '</button>';
        }).join("") +
      '</div>';

    // 戻るボタン
    document.getElementById("quiz-back").addEventListener("click", function () {
      if (currentQuestion > 0) {
        // 前の質問の回答を削除
        var prevKey = QUESTIONS[currentQuestion - 1].key;
        delete answers[prevKey];
        currentQuestion--;
        renderQuestion();
      } else {
        showScreen("screen-top");
      }
    });

    // イベント委譲
    container.querySelectorAll(".option-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        selectAnswer(btn.getAttribute("data-key"), btn.getAttribute("data-value"), btn);
      });
    });
  }

  function selectAnswer(key, value, btnEl) {
    answers[key] = value;
    btnEl.classList.add("selected");

    setTimeout(function () {
      currentQuestion++;
      if (currentQuestion < QUESTIONS.length) {
        renderQuestion();
      } else {
        showResult();
      }
    }, 200);
  }

  // ============================================================
  //  スコアリング
  // ============================================================
  function scoreRestaurants() {
    return RESTAURANTS.map(function (r) {
      var score = 0;
      var reasons = [];

      // 1. フード分類マッチ
      if (answers.food !== "any") {
        var foodLabel = null;
        FOOD_CATEGORIES.forEach(function (f) { if (f.id === answers.food) foodLabel = f.label; });
        if (foodLabel && r.foodCategories.indexOf(foodLabel) !== -1) {
          score += 30;
          reasons.push(foodLabel + "が食べられる");
        } else {
          score -= 20;
        }
      }

      // 2. キャラクターマッチ
      if (answers.character !== "none") {
        var charLabel = null;
        CHARACTERS.forEach(function (c) { if (c.id === answers.character) charLabel = c.label; });
        var rCharId = r.character ? CHARACTER_MAP[r.character] : null;
        if (rCharId === answers.character) {
          score += 25;
          reasons.push(charLabel + "の世界観");
        }
      }

      // 3. エリアマッチ
      if (answers.area !== "anywhere") {
        var areaGroup = AREA_GROUP_MAP[answers.area] || [];
        if (areaGroup.indexOf(r.areaId) !== -1) {
          score += 20;
          reasons.push(r.area + "エリア内");
        } else {
          score -= 5;
        }
      }

      // 4. 時間帯による加点
      if (answers.time === "morning" || answers.time === "afternoon") {
        if (r.foodCategories.indexOf("軽食") !== -1 || r.foodCategories.indexOf("デザート・スイーツ") !== -1) {
          score += 10;
          if (answers.time === "afternoon") reasons.push("おやつ休憩にぴったり");
        }
      }
      if (answers.time === "dinner") {
        if (r.budgetMin >= 1500) {
          score += 5;
        }
      }

      // 5. 重視ポイント
      switch (answers.priority) {
        case "avoid_crowd":
          if (r.crowdLevel === "穴場") { score += 20; reasons.push("穴場で混雑回避"); }
          if (r.crowdLevel === "混雑") score -= 15;
          break;
        case "kids":
          if (r.kidsFriendly && r.kidsFriendly.indexOf("キッズメニュー充実") !== -1) { score += 20; reasons.push("キッズメニュー充実"); }
          else if (r.kidsFriendly && r.kidsFriendly.indexOf("キッズメニュー") !== -1) { score += 10; reasons.push("キッズメニューあり"); }
          if (r.character) score += 5;
          break;
        case "atmosphere":
          if (r.character) { score += 15; reasons.push(r.character + "の世界観が楽しめる"); }
          if (r.seatType.indexOf("着席サービス") !== -1) score += 10;
          break;
        case "cospa":
          if (r.budgetMin <= 1200) { score += 15; reasons.push("予算" + r.budget + "でコスパ◎"); }
          if (r.budgetMin >= 3000) score -= 10;
          break;
        case "relax":
          if (r.seatType.indexOf("着席サービス") !== -1) { score += 20; reasons.push("テーブルサービスでゆっくり"); }
          if (r.crowdLevel === "穴場") { score += 10; reasons.push("空いていてゆっくりできる"); }
          if (r.crowdLevel === "混雑") score -= 10;
          break;
      }

      // 6. コラボ加点
      if (r.collab) {
        score += 3;
      }

      // reasons重複排除
      var uniqueReasons = [];
      reasons.forEach(function (reason) {
        if (uniqueReasons.indexOf(reason) === -1) uniqueReasons.push(reason);
      });

      return { name: r.name, area: r.area, areaId: r.areaId, genre: r.genre, budget: r.budget,
        budgetMin: r.budgetMin, seatType: r.seatType, kidsFriendly: r.kidsFriendly,
        character: r.character, crowdLevel: r.crowdLevel, collab: r.collab, collabMenu: r.collabMenu,
        foodCategories: r.foodCategories, mainMenu: r.mainMenu, dessertMenu: r.dessertMenu,
        kidsMenu: r.kidsMenu, peakTime: r.peakTime, recommendedTime: r.recommendedTime,
        features: r.features, url: r.url, score: score, reasons: uniqueReasons };
    }).sort(function (a, b) { return b.score - a.score; });
  }

  // ============================================================
  //  結果表示
  // ============================================================
  function showResult() {
    var ranked = scoreRestaurants();
    var top3 = ranked.slice(0, 3);
    var container = document.getElementById("result-container");

    var timeLabel = "";
    TIME_SLOTS.forEach(function (t) { if (t.id === answers.time) timeLabel = t.label; });

    var isDessertMode = answers.food === "dessert";

    var html = '<h2 class="result-title">あなたにおすすめのレストラン</h2>' +
      '<p class="result-subtitle">' + timeLabel + 'の食事にぴったり！</p>' +
      '<p class="result-note">※ 食べ歩きフードは本診断の対象外です</p>';

    top3.forEach(function (r, i) {
      var budgetDisplay = r.budget;
      if (isDessertMode && r.dessertMenu && r.dessertMenu.length > 0) {
        var priceSet = {};
        r.dessertMenu.forEach(function (d) {
          var match = d.match(/¥[\d,]+/);
          if (match) priceSet[match[0]] = true;
        });
        var prices = Object.keys(priceSet);
        budgetDisplay = prices.length > 1 ? prices.join("〜") : prices[0] || r.budget;
      }

      html += '<div class="result-card ' + (i === 0 ? 'top-pick' : '') + '">' +
        '<div class="result-rank">' + (i === 0 ? '🏆 第1位' : i === 1 ? '🥈 第2位' : '🥉 第3位') + '</div>' +
        '<h3 class="result-name">' + r.name + '</h3>';

      if (r.collab) {
        html += '<div class="collab-badge">🎉 ' + r.collab + 'コラボ中！</div>';
      }

      html += '<div class="result-info">' +
        '<div class="info-row"><span class="info-label">📍 エリア</span><span>' + r.area + (r.areaId === "nintendo" ? '（エリアに入場しないと利用できません）' : '') + '</span></div>' +
        '<div class="info-row"><span class="info-label">🍽️ ジャンル</span><span>' + r.genre + '</span></div>' +
        '<div class="info-row"><span class="info-label">💰 予算</span><span>' + budgetDisplay + (isDessertMode ? '（デザート）' : '') + '</span></div>' +
        '<div class="info-row"><span class="info-label">🪑 座席</span><span>' + r.seatType + '</span></div>' +
        '<div class="info-row"><span class="info-label">👶 子連れ</span><span>' + r.kidsFriendly + '</span></div>' +
        '<div class="info-row"><span class="info-label">🔗 公式</span><span><a href="' + r.url + '" target="_blank" rel="noopener" class="official-link">公式サイト</a></span></div>' +
        '</div>';

      if (r.reasons.length > 0) {
        html += '<div class="result-reasons"><p class="reasons-title">✅ おすすめポイント</p>';
        r.reasons.forEach(function (reason) {
          html += '<span class="reason-tag">' + reason + '</span>';
        });
        html += '</div>';
      }

      html += '<div class="result-menu"><p class="menu-title">📋 主なメニュー</p><ul>';
      r.mainMenu.forEach(function (m) { html += '<li>' + m + '</li>'; });
      html += '</ul></div>';

      if (r.dessertMenu && r.dessertMenu.length > 0) {
        html += '<div class="result-menu"><p class="menu-title">🍰 デザートメニュー</p><ul>';
        r.dessertMenu.forEach(function (m) { html += '<li>' + m + '</li>'; });
        html += '</ul></div>';
      }

      if (r.kidsMenu && r.kidsMenu.length > 0) {
        html += '<div class="result-menu"><p class="menu-title">👶 キッズメニュー</p><ul>';
        r.kidsMenu.forEach(function (m) { html += '<li>' + m + '</li>'; });
        html += '</ul></div>';
      }

      if (r.collabMenu) {
        html += '<div class="result-collab-menu"><p class="menu-title">🎉 コラボメニュー</p><ul>';
        r.collabMenu.forEach(function (m) { html += '<li>' + m + '</li>'; });
        html += '</ul></div>';
      }

      html += '<div class="result-tips">' +
        '<p class="tips-title">💡 混雑回避のコツ</p>' +
        '<p>ピーク: ' + r.peakTime + '</p>' +
        '<p>おすすめ: ' + r.recommendedTime + '</p>' +
        '</div>' +
        '<p class="result-features">' + r.features.replace(/。/g, '。<br>') + '</p>' +
        '</div>';
    });

    html += '<button class="btn-restart" id="btn-restart">レストラン診断に戻る</button>';
    if (window.parent !== window) {
      html += '<button class="btn-top" id="back-to-main-btn">メインサイトにもどる</button>';
    } else {
      html += '<button class="btn-top" id="btn-top">トップに戻る</button>';
    }

    container.innerHTML = html;

    document.getElementById("btn-restart").addEventListener("click", startDiagnosis);
    if (window.parent !== window) {
      document.getElementById("back-to-main-btn").addEventListener("click", function () {
        window.parent.postMessage({ type: "back-to-main" }, "*");
      });
    } else {
      document.getElementById("btn-top").addEventListener("click", function () { showScreen("screen-top"); });
    }

    showScreen("screen-result");

    // GASに診断結果を保存
    saveRestaurantDiagnosisResult(top3);
  }

  // ============================================================
  //  診断結果をGASに保存
  // ============================================================
  function saveRestaurantDiagnosisResult(top3) {
    if (!RESTAURANT_GAS_URL || !lineUid) return;

    var answersStr = Object.keys(answers).map(function (k) {
      return k + ":" + answers[k];
    }).join(",");

    var data = {
      uid: lineUid,
      name: lineDisplayName || "",
      answers: answersStr,
      result1: top3[0] ? top3[0].name : "",
      result2: top3[1] ? top3[1].name : "",
      result3: top3[2] ? top3[2].name : "",
      diagnosedAt: new Date().toISOString()
    };

    fetch(RESTAURANT_GAS_URL, {
      method: "POST",
      body: JSON.stringify({ action: "saveDiagnosis", data: data })
    }).catch(function (err) {
      console.error("Restaurant GAS save error:", err);
    });
  }

  // ============================================================
  //  初期化
  // ============================================================
  function init() {
    initPrivacyModal();

    // 診断スタートボタン（トップ画面）
    var startBtn = document.querySelector("#screen-top .btn-start");
    if (startBtn) {
      startBtn.addEventListener("click", startDiagnosis);
    }

    initLiff();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
