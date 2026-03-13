// USJレストラン診断データ
// ソース: ~/USJ-Knowledge/USJ/レストラン/
// ※ 食べ歩きフードは本診断の対象外です

const RESTAURANTS = [
  {
    id: "mels",
    name: "メルズ・ドライブイン",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/mels-drive-in",
    area: "ハリウッドエリア",
    areaId: "hollywood",
    genre: "ハンバーガー",
    budget: "¥1,800〜¥2,100",
    budgetMin: 1800,
    seatType: "テーブル席・テラス席",
    capacity: "多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "普通",
    character: null,
    kidsFriendly: "キッズメニューあり（¥1,000）、ハイチェア完備、テラスで開放的に食事可能",
    mainMenu: [
      "トリプルチーズバーガーセット ¥2,100",
      "BBQベーコンチーズバーガーセット ¥2,000",
      "クラシックチーズバーガーセット ¥1,900",
      "クラシックバーガーセット ¥1,800"
    ],
    dessertMenu: [
      "アメリカン・アップルクランブルパイ ¥600",
      "アメリカン・チョコブラウニー ¥600"
    ],
    kidsMenu: ["キッズ・ハンバーガーセット ¥1,000"],
    collab: null,
    collabMenu: null,
    features: "1950年代アメリカンダイナーを再現。席数が多く回転も早い。先に座席を確保してからオーダーしに行くスタイル。",
    foodCategories: ["ハンバーガー", "デザート・スイーツ"]
  },
  {
    id: "happiness",
    name: "ハピネス・カフェ",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/happiness-cafe",
    area: "サンフランシスコエリア",
    areaId: "sanfrancisco",
    genre: "ハンバーガー・カレーなど",
    budget: "¥2,200〜¥2,600",
    budgetMin: 2200,
    seatType: "テーブル席・テラス席",
    capacity: "非常に多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ",
    crowdLevel: "普通",
    character: "ミニオン",
    kidsFriendly: "キッズメニューあり、ハイチェア完備、広くベビーカー対応",
    mainMenu: [
      "ボブのワッフルチキンプレート ¥2,600",
      "スチュアートのベーコンチーズバーガープレート ¥2,400",
      "デイブのキーマカレープレート ¥2,200"
    ],
    dessertMenu: [
      "ティムのチョコレートプリン&コーヒーゼリー ¥600",
      "ミニオンのバナナムース&ブルーレモンゼリー ¥600"
    ],
    kidsMenu: ["ミニオン・キッズセット ¥1,000"],
    collab: null,
    collabMenu: null,
    features: "パーク内最大級の座席数を誇るフードコート形式。万人向けメニュー豊富。オーダー後に席が案内される。",
    foodCategories: ["ハンバーガー", "カレー"]
  },
  {
    id: "discovery",
    name: "ディスカバリー・レストラン",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/discovery-restaurant",
    area: "ジュラシック・パークエリア",
    areaId: "jurassic",
    genre: "ハンバーガー（恐竜テーマ）",
    budget: "¥2,200〜¥4,500",
    budgetMin: 2200,
    seatType: "テーブル席（テラス席もあり）",
    capacity: "多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "穴場",
    character: "恐竜（ジュラシック・パーク）",
    kidsFriendly: "キッズメニューあり、ハイチェア完備、恐竜好きの子向け",
    mainMenu: [
      "T-REX・ガーリックトマト・ビーフバーガーセット ¥4,500",
      "ラプトル・ベーコン&ビーフバーガーセット ¥2,500",
      "プテラノドン・フライドチキンバーガーセット ¥2,300",
      "モササウルス・フィッシュバーガーセット ¥2,200"
    ],
    dessertMenu: [
      "ジュラシック・パーク・ケーキ〜チョコ&ダークチェリー〜 ¥2,000",
      "フライングダイノソー・カップケーキ〜チョコ&ラズベリー〜 ¥900"
    ],
    kidsMenu: ["トリケラトプス・キッズバーガーセット ¥1,000"],
    collab: null,
    collabMenu: null,
    features: "恐竜テーマのバーガーメニューにリニューアル。メインエリアから少し離れた穴場。先に座席を確保してから注文しに行くスタイル。",
    foodCategories: ["ハンバーガー", "デザート・スイーツ"]
  },
  {
    id: "louis",
    name: "ルイズN.Y.ピザパーラー",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/louies-ny-pizza-parlor",
    area: "ニューヨークエリア",
    areaId: "newyork",
    genre: "ピザ",
    budget: "¥1,750〜¥1,950",
    budgetMin: 1750,
    seatType: "テーブル席",
    capacity: "多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "穴場",
    character: null,
    kidsFriendly: "ピザは子ども向け、手軽でシェアしやすい",
    mainMenu: [
      "ミートボール・ボロネーゼセット ¥1,950",
      "クアトロチーズ＆ハチミツセット ¥1,850",
      "ペパロニセット ¥1,750",
      "マルゲリータセット ¥1,750"
    ],
    dessertMenu: [
      "ティラミス ¥500"
    ],
    kidsMenu: null,
    collab: null,
    collabMenu: null,
    features: "ニューヨークスタイルの大きなピザ。提供が早く回転も良い穴場。コスパ◎",
    foodCategories: ["ピザ"]
  },
  {
    id: "kinopio",
    name: "キノピオ・カフェ",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/kinopio-cafe",
    area: "スーパー・ニンテンドー・ワールド",
    areaId: "nintendo",
    genre: "パスタ・ハンバーガー・プレート",
    budget: "¥2,500〜¥2,700",
    budgetMin: 2500,
    seatType: "テーブル席",
    capacity: "多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。混雑時は整理券制（店舗前QRコード）",
    crowdLevel: "混雑",
    character: "マリオ",
    kidsFriendly: "キッズメニューあり、ハイチェア完備、ベビーケアルームあり、キャラクターフードで子ども大喜び",
    mainMenu: [
      "大魔王クッパ・ハンバーグステーキ ¥2,700",
      "マリオ・バーガー～ベーコン&チーズ～ ¥2,600",
      "ルイージ・バーガー～グリーンカレー・チキン～ ¥2,600",
      "ヨッシー・スパゲティ～ほうれん草カルボナーラ～ ¥2,500",
      "ファイアフラワー・スパゲティ～ミートボール&トマトソース～ ¥2,500"
    ],
    dessertMenu: [
      "ピーチ姫のケーキ ¥3,500",
      "ハテナブロック・ティラミス ¥1,100",
      "ダブルチェリーのチョコレートカップケーキ ¥1,100"
    ],
    kidsMenu: ["キッズ・プレート (スクエア) ¥2,200", "キッズ・プレート (ボウル) ¥2,200", "ハンバーガー・キッズセット ¥1,800", "カレー・キッズセット ¥1,400"],
    collab: null,
    collabMenu: null,
    features: "マリオの世界観を再現。キノコやスター型のキャラクターフードが楽しめる。キノピオ・カフェの入場方法は①フリー入場（そのまま並ぶ）②整理券（混雑時・店舗前QRコードから取得）の2パターン。",
    foodCategories: ["パスタ", "ハンバーガー", "デザート・スイーツ"]
  },
  {
    id: "parkside",
    name: "パークサイド・グリル",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/park-side-grille",
    area: "ハリウッドエリア",
    areaId: "hollywood",
    genre: "ステーキ・グリル",
    budget: "¥3,500〜¥6,000",
    budgetMin: 3500,
    seatType: "テーブル席（着席サービス）",
    capacity: "中程度",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。事前予約（公式サイト）or 当日予約（店舗前QRコード）",
    crowdLevel: "穴場",
    character: null,
    kidsFriendly: "キッズメニューあり。落ち着いた雰囲気で特別な日向け",
    mainMenu: [
      "エイジングステーキ グリル・サーロイン(250g) ¥4,500",
      "エイジングステーキ グリル・リブロース(400g) ¥6,000",
      "サーモン ¥3,500",
      "徳島県産阿波尾鶏 マスタードソース ¥3,500",
      "プレミアムコース ¥6,000"
    ],
    dessertMenu: [
      "ガトーショコラ ¥1,200",
      "バナナタルト ¥1,200",
      "ティラミス ¥1,200"
    ],
    kidsMenu: ["キッズ・サンドウィッチセット ¥1,200"],
    collab: null,
    collabMenu: null,
    features: "パーク内の高級レストラン。落ち着いた雰囲気でゆっくり食事できる。事前予約（公式サイトから・1ヶ月前〜）・当日予約（店舗前QRコード）可能。ランチ営業（〜15時）とディナー営業（15時〜）に分かれている。",
    foodCategories: ["ステーキ・肉料理", "デザート・スイーツ"]
  },
  {
    id: "saido",
    name: "SAIDO（彩道）",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/saido",
    area: "ニューヨークエリア",
    areaId: "newyork",
    genre: "和食（御膳スタイル）",
    budget: "¥2,600〜¥3,800",
    budgetMin: 2600,
    seatType: "テーブル席",
    capacity: "中程度",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。事前予約（公式サイト）or 当日予約（店舗前QRコード）推奨",
    crowdLevel: "普通",
    character: null,
    kidsFriendly: "お子様御膳あり（¥1,200）、ハイチェア完備、うどんは子どもが食べやすい",
    mainMenu: [
      "牛ステーキ丼御膳 ¥3,800",
      "海鮮丼御膳 ¥3,800",
      "天ぷら御膳 ¥3,200",
      "とんかつ御膳 ¥3,200",
      "阿波尾鶏と肉味噌うどん御膳 ¥2,600"
    ],
    dessertMenu: [
      "NYチーズケーキ＆ほうじ茶の和風パフェ ¥1,500"
    ],
    kidsMenu: ["お子様御膳 ¥1,200"],
    collab: null,
    collabMenu: null,
    features: "パーク内唯一の本格和食レストラン。御膳スタイルで洋食に飽きた時に重宝。事前予約（公式サイトから・1ヶ月前〜）・当日予約（店舗前QRコード）可能。混雑少なめだが予約推奨。",
    foodCategories: ["和食", "デザート・スイーツ"]
  },
  {
    id: "dragons",
    name: "ドラゴンズ・パール",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/the-dragons-pearl",
    area: "サンフランシスコエリア",
    areaId: "sanfrancisco",
    genre: "中華",
    budget: "¥1,800〜¥2,000",
    budgetMin: 1800,
    seatType: "テーブル席",
    capacity: "中程度",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "穴場",
    character: null,
    kidsFriendly: "キッズメニューあり、ハイチェア完備",
    mainMenu: [
      "ドラゴンズ・パール・コンボ（チャーハン大盛り）¥2,000",
      "ドラゴンズ・パール・コンボ（チャーハン）¥1,800",
      "ドラゴンズ・パール・コンボ（ジャージャー麺）¥1,800"
    ],
    dessertMenu: null,
    kidsMenu: null,
    collab: null,
    collabMenu: null,
    features: "中華料理レストラン。中華を選ぶ人が少ないため比較的空いている穴場。大盛りのセットがあるので、小さいお子さんとなら分けて食べることもできる。",
    foodCategories: ["中華"]
  },
  {
    id: "broomsticks",
    name: "三本の箒",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/three-broomsticks",
    area: "ウィザーディング・ワールド・オブ・ハリー・ポッター",
    areaId: "harrypotter",
    genre: "イギリス料理（ロースト・フィッシュ&チップスなど）",
    budget: "¥2,600〜¥3,500",
    budgetMin: 2600,
    seatType: "テーブル席・テラス席",
    capacity: "多い",
    peakTime: "11:00〜14:00",
    recommendedTime: "10:30がおすすめ",
    crowdLevel: "混雑",
    character: "ハリー・ポッター",
    kidsFriendly: "キッズメニューあり、ハイチェア完備",
    mainMenu: [
      "ローストビーフ ¥3,500",
      "ロティサリー・スモークチキン＆ポークリブ ¥3,000",
      "フィッシュ＆チップス ¥2,600",
      "ベジタブル・アイリッシュシチュー ¥2,700"
    ],
    dessertMenu: [
      "バタービール™・プディング ¥800",
      "糖蜜タルト ¥800",
      "バタービール™アイスクリーム ¥550"
    ],
    kidsMenu: ["サンドウィッチ・キッズプレート ¥1,800", "カレー・キッズプレート ¥1,400"],
    collab: null,
    collabMenu: null,
    features: "ホグズミード村の食堂を再現。バタービールが飲める唯一のレストラン。三本の箒だけクラフトビールも提供している。",
    foodCategories: ["イギリス料理", "デザート・スイーツ"]
  },
  {
    id: "amity",
    name: "アミティ・ランディング・レストラン",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/amity-landing-restaurant",
    area: "アミティ・ビレッジエリア",
    areaId: "amity",
    genre: "ブリトー・シーフード",
    budget: "¥2,000〜¥2,600",
    budgetMin: 2000,
    seatType: "テーブル席・テラス席",
    capacity: "多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "穴場",
    character: "ジョーズ",
    kidsFriendly: "キッズメニューあり、ハイチェア完備",
    mainMenu: [
      "スパイシーシュリンプ・ブリトーセット ¥2,600",
      "チキン＆アボカド・ブリトーセット ¥2,200",
      "バーベキューポーク・ブリトーセット ¥2,100",
      "チリコンカンビーンズ・ブリトーセット ¥2,000"
    ],
    dessertMenu: [
      "JAWSがくるぞ！クリームソーダ・ロールケーキ ¥600"
    ],
    kidsMenu: ["アミティ・キッズ・セット ¥1,000"],
    collab: null,
    collabMenu: null,
    features: "ジョーズの隣にある港町の雰囲気。比較的空いている穴場。",
    foodCategories: ["軽食", "デザート・スイーツ"]
  },
  {
    id: "snoopy",
    name: "スヌーピー・バックロット・カフェ",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/snoopys-backlot-cafe",
    area: "ユニバーサル・ワンダーランド",
    areaId: "wonderland",
    genre: "パスタ・ハンバーガー",
    budget: "¥1,600〜¥1,800",
    budgetMin: 1600,
    seatType: "テーブル席",
    capacity: "多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "混雑",
    character: "スヌーピー",
    kidsFriendly: "キッズメニュー充実、ハイチェア完備、ベビーケアルームあり",
    mainMenu: [
      "クリーミースープパスタセット ¥1,800",
      "ミートスパゲティセット ¥1,700",
      "テリヤキビーフバーガーセット ¥1,600",
      "エビカツバーガーセット ¥1,600"
    ],
    dessertMenu: [
      "ウィンター・チーズケーキ ¥850",
      "スヌーピーまん～カスタード～ ¥800"
    ],
    kidsMenu: ["スヌーピー・キッズセット【パンケーキ】 ¥1,000", "スヌーピー・キッズセット【サンドウィッチ】 ¥1,000"],
    collab: null,
    collabMenu: null,
    features: "子連れに一番人気。ワンダーランド中心部でアトラクション合間の食事に最適。座席数は少ないので気をつけること。",
    foodCategories: ["パスタ", "ハンバーガー", "デザート・スイーツ"]
  },
  {
    id: "lostworld",
    name: "ロストワールド・レストラン",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/lost-world-restaurant",
    area: "ロストワールドエリア",
    areaId: "lostworld",
    genre: "創作料理（モンスターハンター）",
    budget: "¥2,800〜¥3,500",
    budgetMin: 2800,
    seatType: "テーブル席・テラス席",
    capacity: "中程度",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "普通",
    character: "モンスターハンター",
    kidsFriendly: "キッズメニューあり",
    mainMenu: [
      "限定コースターセット ¥3,500",
      "焚き火料理 ポーク ¥2,800",
      "焚き火料理 チキン ¥2,800"
    ],
    dessertMenu: [
      "オトモアイルーのチョコレートプリン マグカップ付き ¥1,600",
      "ラバラ・バリナサワーチェリー＆ホワイトムース ¥1,000"
    ],
    kidsMenu: ["サポート部隊アイルー・キッズセット ¥1,400"],
    collab: "モンスターハンター ワイルズ",
    collabMenu: ["限定コースターセット ¥3,500", "オトモアイルーのチョコレートプリン マグカップ付き ¥1,600"],
    features: "モンスターハンターの世界観を再現した創作料理。ゲームファンに人気。",
    foodCategories: ["ステーキ・肉料理", "デザート・スイーツ"]
  },
  {
    id: "studiostars",
    name: "スタジオ・スターズ・レストラン",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/studio-stars-restaurant",
    area: "ハリウッドエリア",
    areaId: "hollywood",
    genre: "プレート料理・カレー・グラタン",
    budget: "¥2,200〜¥2,600",
    budgetMin: 2200,
    seatType: "テーブル席・テラス席",
    capacity: "多い",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ",
    crowdLevel: "普通",
    character: null,
    kidsMenu: ["スタジオ・スターズ・キッズセット ¥1,000"],
    collab: "25周年スペシャル",
    collabMenu: ["25周年スペシャルプレート ¥25,000（4名様分）", "25周年アニバーサリー・ドリンクカップ ¥1,800"],
    kidsFriendly: "キッズメニューあり（¥1,000）、ハイチェア完備、デザート充実",
    mainMenu: [
      "BBQポークリブ&フライドチキン・プレート ¥2,600",
      "BLTバーガー・プレート ¥2,500",
      "チキンレッグカレー・プレート ¥2,500",
      "クラムチャウダーグラタン・プレート ¥2,200"
    ],
    dessertMenu: [
      "NYチーズケーキ・レモン&スモア ¥900",
      "スタジオ・スターズ レモンチェリーパイ ¥900"
    ],
    features: "プレート料理やデザートが充実。25周年スペシャルメニュー展開中。",
    foodCategories: ["ハンバーガー", "カレー", "デザート・スイーツ"]
  },
  {
    id: "beverly",
    name: "ビバリーヒルズ・ブランジェリー",
    url: "https://www.usj.co.jp/web/ja/jp/restaurants/beverly-hills-boulangerie",
    area: "ハリウッドエリア",
    areaId: "hollywood",
    genre: "ベーカリー・カフェ",
    budget: "¥1,800〜¥2,100",
    budgetMin: 1800,
    seatType: "テーブル席・テラス席",
    capacity: "中程度",
    peakTime: "11:00〜13:30",
    recommendedTime: "10:30がおすすめ。席を確保してから並ぶと効率的",
    crowdLevel: "穴場",
    character: null,
    collab: "呪術廻戦",
    collabMenu: [
      "呪術高専1年のサンドウィッチセット ¥2,100",
      "夏油傑のムース～チョコレート&オレンジ～ ¥1,000",
      "五条悟のムース～ヨーグルト&ブルーベリー～ ¥1,000",
      "呪術高専のグレープフルーツ・レモネード ¥800"
    ],
    kidsMenu: null,
    kidsFriendly: "パンは小さい子にも食べさせやすい、テイクアウト可",
    mainMenu: [
      "呪術高専1年のサンドウィッチセット ¥2,100",
      "こんがりチーズのチキングラタンホットサンドセット ¥1,900",
      "彩り野菜のミックスサンドウィッチセット ¥1,800"
    ],
    dessertMenu: [
      "夏油傑のムース～チョコレート&オレンジ～ ¥1,000",
      "五条悟のムース～ヨーグルト&ブルーベリー～ ¥1,000"
    ],
    features: "パン・サンドイッチ・スイーツが揃うベーカリーカフェ。軽食やおやつ休憩に便利な穴場。入り口左にテイクアウトもあり。",
    foodCategories: ["軽食", "デザート・スイーツ"]
  }
];

// フード分類の定義（ピザとパスタを分離）
const FOOD_CATEGORIES = [
  { id: "burger", label: "ハンバーガー", icon: "🍔" },
  { id: "pizza", label: "ピザ", icon: "🍕" },
  { id: "pasta", label: "パスタ", icon: "🍝" },
  { id: "steak", label: "ステーキ・肉料理", icon: "🥩" },
  { id: "japanese", label: "和食（うどん・天ぷら）", icon: "🍜" },
  { id: "chinese", label: "中華", icon: "🥟" },
  { id: "british", label: "イギリス料理", icon: "🐟" },
  { id: "curry", label: "カレー", icon: "🍛" },
  { id: "dessert", label: "デザート・スイーツ", icon: "🍰" },
  { id: "light", label: "軽め（パン・サンド）", icon: "🥪" },
  { id: "any", label: "なんでもOK", icon: "✨" }
];

// フード分類のマッピング
const FOOD_CATEGORY_MAP = {
  "ハンバーガー": "burger",
  "ピザ": "pizza",
  "パスタ": "pasta",
  "ステーキ・肉料理": "steak",
  "和食": "japanese",
  "中華": "chinese",
  "イギリス料理": "british",
  "カレー": "curry",
  "デザート・スイーツ": "dessert",
  "軽食": "light"
};

// キャラクター分類の定義
const CHARACTERS = [
  { id: "mario", label: "マリオ", icon: "🍄" },
  { id: "harrypotter", label: "ハリー・ポッター", icon: "⚡" },
  { id: "minion", label: "ミニオン", icon: "🍌" },
  { id: "snoopy", label: "スヌーピー", icon: "🐶" },
  { id: "dinosaur", label: "恐竜（ジュラシック）", icon: "🦕" },
  { id: "monsterhunter", label: "モンスターハンター", icon: "⚔️" },
  { id: "jaws", label: "ジョーズ", icon: "🦈" },
  { id: "none", label: "特にない", icon: "🍽️" }
];

// キャラクターマッピング
const CHARACTER_MAP = {
  "マリオ": "mario",
  "ハリー・ポッター": "harrypotter",
  "ミニオン": "minion",
  "スヌーピー": "snoopy",
  "恐竜（ジュラシック・パーク）": "dinosaur",
  "モンスターハンター": "monsterhunter",
  "ジョーズ": "jaws"
};

// エリア分類の定義
const AREAS = [
  { id: "hollywood", label: "ハリウッド付近", icon: "🎬" },
  { id: "newyork_sf", label: "ニューヨーク〜サンフランシスコ", icon: "🏙️" },
  { id: "nintendo", label: "ニンテンドーワールド", icon: "🎮" },
  { id: "harrypotter", label: "ハリー・ポッターエリア", icon: "🧙" },
  { id: "wonderland_jurassic", label: "ワンダーランド〜ジュラシック", icon: "🎠" },
  { id: "anywhere", label: "決まってない", icon: "🗺️" }
];

// エリアのグループマッピング
const AREA_GROUP_MAP = {
  "hollywood": ["hollywood"],
  "newyork_sf": ["newyork", "sanfrancisco"],
  "nintendo": ["nintendo"],
  "harrypotter": ["harrypotter"],
  "wonderland_jurassic": ["wonderland", "jurassic", "lostworld", "amity"],
  "anywhere": []
};

// 時間帯の定義
const TIME_SLOTS = [
  { id: "morning", label: "朝〜午前中（〜11:00）", icon: "🌅" },
  { id: "lunch", label: "ランチ（11:00〜14:00）", icon: "☀️" },
  { id: "afternoon", label: "遅めランチ / おやつ（14:00〜16:00）", icon: "🍵" },
  { id: "dinner", label: "ディナー（16:00〜閉園）", icon: "🌙" }
];

// 重視ポイントの定義
const PRIORITIES = [
  { id: "avoid_crowd", label: "混雑を避けたい", icon: "🚶" },
  { id: "kids", label: "子どもが喜ぶ", icon: "👶" },
  { id: "atmosphere", label: "映え・世界観重視", icon: "📸" },
  { id: "cospa", label: "コスパ重視", icon: "💰" },
  { id: "relax", label: "ゆっくり座りたい", icon: "🪑" }
];
