// USJレストラン診断 メインロジック

let answers = {};
let currentQuestion = 0;

const QUESTIONS = [
  { key: "time", title: "いつ食べたい？", options: TIME_SLOTS },
  { key: "food", title: "何が食べたい？", options: FOOD_CATEGORIES },
  { key: "character", title: "好きなキャラ・世界観は？", options: CHARACTERS },
  { key: "area", title: "遊んでいるエリアは？", options: AREAS },
  { key: "priority", title: "一番重視するのは？", options: PRIORITIES }
];

function init() {
  showScreen("screen-top");
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo(0, 0);
}

function startDiagnosis() {
  answers = {};
  currentQuestion = 0;
  renderQuestion();
  showScreen("screen-question");
}

function renderQuestion() {
  const q = QUESTIONS[currentQuestion];
  const container = document.getElementById("question-container");
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  container.innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${progress}%"></div>
    </div>
    <p class="question-number">Q${currentQuestion + 1} / ${QUESTIONS.length}</p>
    <h2 class="question-title">${q.title}</h2>
    <div class="options-grid">
      ${q.options.map(opt => `
        <button class="option-btn" onclick="selectAnswer('${q.key}', '${opt.id}')">
          <span class="option-icon">${opt.icon}</span>
          <span class="option-label">${opt.label}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function selectAnswer(key, value) {
  answers[key] = value;

  // ボタンを一瞬ハイライト
  event.currentTarget.classList.add("selected");

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < QUESTIONS.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 200);
}

function scoreRestaurants() {
  return RESTAURANTS.map(r => {
    let score = 0;
    let reasons = [];

    // 1. フード分類マッチ
    if (answers.food !== "any") {
      const foodLabel = FOOD_CATEGORIES.find(f => f.id === answers.food)?.label;
      if (foodLabel && r.foodCategories.includes(foodLabel)) {
        score += 30;
        reasons.push(`${foodLabel}が食べられる`);
      } else {
        score -= 20;
      }
    }

    // 2. キャラクターマッチ
    if (answers.character !== "none") {
      const charLabel = CHARACTERS.find(c => c.id === answers.character)?.label;
      const rCharId = r.character ? CHARACTER_MAP[r.character] : null;
      if (rCharId === answers.character) {
        score += 25;
        reasons.push(`${charLabel}の世界観`);
      }
    }

    // 3. エリアマッチ
    if (answers.area !== "anywhere") {
      const areaGroup = AREA_GROUP_MAP[answers.area] || [];
      if (areaGroup.includes(r.areaId)) {
        score += 20;
        reasons.push(`${r.area}エリア内`);
      } else {
        score -= 5;
      }
    }

    // 4. 時間帯による加点
    if (answers.time === "morning" || answers.time === "afternoon") {
      // 朝・おやつ時間帯は軽食やデザートを加点
      if (r.foodCategories.includes("軽食") || r.foodCategories.includes("デザート・スイーツ")) {
        score += 10;
        if (answers.time === "afternoon") reasons.push("おやつ休憩にぴったり");
      }
    }
    if (answers.time === "dinner") {
      // ディナーはしっかり食べられる店を加点
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
        if (r.kidsFriendly && r.kidsFriendly.includes("キッズメニュー充実")) { score += 20; reasons.push("キッズメニュー充実"); }
        else if (r.kidsFriendly && r.kidsFriendly.includes("キッズメニュー")) { score += 10; reasons.push("キッズメニューあり"); }
        if (r.character) score += 5;
        break;
      case "atmosphere":
        if (r.character) { score += 15; reasons.push(`${r.character}の世界観が楽しめる`); }
        if (r.seatType.includes("着席サービス")) score += 10;
        break;
      case "cospa":
        if (r.budgetMin <= 1200) { score += 15; reasons.push(`予算${r.budget}でコスパ◎`); }
        if (r.budgetMin >= 3000) score -= 10;
        break;
      case "relax":
        if (r.seatType.includes("着席サービス")) { score += 20; reasons.push("テーブルサービスでゆっくり"); }
        if (r.crowdLevel === "穴場") { score += 10; reasons.push("空いていてゆっくりできる"); }
        if (r.crowdLevel === "混雑") score -= 10;
        break;
    }

    // 6. コラボ加点（コラボ中はちょっとだけ加点）
    if (r.collab) {
      score += 3;
    }

    return { ...r, score, reasons: [...new Set(reasons)] };
  }).sort((a, b) => b.score - a.score);
}

function showResult() {
  const ranked = scoreRestaurants();
  const top3 = ranked.slice(0, 3);
  const container = document.getElementById("result-container");

  const timeLabel = TIME_SLOTS.find(t => t.id === answers.time)?.label || "";

  container.innerHTML = `
    <h2 class="result-title">あなたにおすすめのレストラン</h2>
    <p class="result-subtitle">${timeLabel}の食事にぴったり！</p>
    <p class="result-note">※ 食べ歩きフードは本診断の対象外です</p>

    ${top3.map((r, i) => {
      const isDessertMode = answers.food === "dessert";
      let budgetDisplay = r.budget;
      if (isDessertMode && r.dessertMenu && r.dessertMenu.length > 0) {
        const prices = [...new Set(r.dessertMenu.map(d => d.match(/¥[\d,]+/)?.[0]).filter(Boolean))];
        budgetDisplay = prices.length > 1 ? prices.join("〜") : prices[0] || r.budget;
      }
      return `
      <div class="result-card ${i === 0 ? 'top-pick' : ''}">
        <div class="result-rank">${i === 0 ? '🏆 第1位' : i === 1 ? '🥈 第2位' : '🥉 第3位'}</div>
        <h3 class="result-name">${r.name}</h3>
        ${r.collab ? `<div class="collab-badge">🎉 ${r.collab}コラボ中！</div>` : ''}
        <div class="result-info">
          <div class="info-row"><span class="info-label">📍 エリア</span><span>${r.area}</span></div>
          <div class="info-row"><span class="info-label">🍽️ ジャンル</span><span>${r.genre}</span></div>
          <div class="info-row"><span class="info-label">💰 予算</span><span>${budgetDisplay}${isDessertMode ? '（デザート）' : ''}</span></div>
          <div class="info-row"><span class="info-label">🪑 座席</span><span>${r.seatType}</span></div>
          <div class="info-row"><span class="info-label">👶 子連れ</span><span>${r.kidsFriendly}</span></div>
          <div class="info-row"><span class="info-label">🔗 公式</span><span><a href="${r.url}" target="_blank" rel="noopener" class="official-link">公式サイト</a></span></div>
        </div>

        ${r.reasons.length > 0 ? `
          <div class="result-reasons">
            <p class="reasons-title">✅ おすすめポイント</p>
            ${r.reasons.map(reason => `<span class="reason-tag">${reason}</span>`).join("")}
          </div>
        ` : ''}

        <div class="result-menu">
          <p class="menu-title">📋 主なメニュー</p>
          <ul>${r.mainMenu.map(m => `<li>${m}</li>`).join("")}</ul>
        </div>

        ${r.dessertMenu && r.dessertMenu.length > 0 ? `
          <div class="result-menu">
            <p class="menu-title">🍰 デザートメニュー</p>
            <ul>${r.dessertMenu.map(m => `<li>${m}</li>`).join("")}</ul>
          </div>
        ` : ''}

        ${r.kidsMenu && r.kidsMenu.length > 0 ? `
          <div class="result-menu">
            <p class="menu-title">👶 キッズメニュー</p>
            <ul>${r.kidsMenu.map(m => `<li>${m}</li>`).join("")}</ul>
          </div>
        ` : ''}

        ${r.collabMenu ? `
          <div class="result-collab-menu">
            <p class="menu-title">🎉 コラボメニュー</p>
            <ul>${r.collabMenu.map(m => `<li>${m}</li>`).join("")}</ul>
          </div>
        ` : ''}

        <div class="result-tips">
          <p class="tips-title">💡 混雑回避のコツ</p>
          <p>ピーク: ${r.peakTime}</p>
          <p>おすすめ: ${r.recommendedTime}</p>
        </div>

        <p class="result-features">${r.features}</p>
      </div>
    `;}).join("")}

    <button class="btn-restart" onclick="startDiagnosis()">もう一度診断する</button>
    <button class="btn-top" onclick="showScreen('screen-top')">トップに戻る</button>
  `;

  showScreen("screen-result");
}

document.addEventListener("DOMContentLoaded", init);
