"use strict";

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); // フォームデータを解析
app.use(express.json()); // JSONデータを解析

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));


app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken2", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken2', display );
});

let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});


app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});

// ここから課題管理アプリケーション
let assignments = [
  {
    id: 1,
    subject: "Webプログラミング",
    title: "仕様書提出",
    deadline: "2025-12-28",
    status: "進行中",
    desc: "仕様書は，利用者向け，管理者向け，開発者向けの3部構成とします．3部を1つのPDFファイルにまとめて，下記ファイル名で提出してください．wpro2025.pdf，また，PDFの先頭に，Github上のリポジトリのURLを掲載しておいてください．"
  },
  {
    id: 2,
    subject: "アジャイルワーク1",
    title: "結合課題",
    deadline: "2025-12-16",
    status: "完了",
    desc: ""
  },
  {
    id: 3,
    subject: "データサイエンス",
    title: "最終レポート",
    deadline: "2025-12-23",
    status: "完了",
    desc: ""
  },
  {
    id: 4,
    subject: "グラフィックス",
    title: "Autodesk Maya実習（12/2）",
    deadline: "2025-12-08",
    status: "完了",
    desc: ""
  },
  {
    id: 5,
    subject: "英語表現基礎２aクラス",
    title: "レポート",
    deadline: "2025-12-11",
    status: "完了",
    desc: ""
  },
  {
    id: 6,
    subject: "フィジカルコンピューティング",
    title: "期末レポート",
    deadline: "2025-07-23",
    status: "完了",
    desc: ""
  },
  {
    id: 7,
    subject: "日本語表現法aクラス",
    title: "課題④",
    deadline: "2025-07-19",
    status: "完了",
    desc: ""
  },
  {
    id: 8,
    subject: "技術文章作成",
    title: "第9回目レポート",
    deadline: "2025-06-12",
    status: "完了",
    desc: "段落に何を記載するのかの概要を記述してtexファイルをコンパイルしてPDFファイルを提出せよ。"
  },
  {
    id: 9,
    subject: "論理回路",
    title: "20250611課題",
    deadline: "2025-06-11",
    status: "完了",
    desc: "講義スライドに示す課題に回答せよ．"
  },
  {
    id: 10,
    subject: "プログラミング言語",
    title: "文字を大きく表示するライブラリ[プログラムと機能証明報告書]",
    deadline: "2025-07-22",
    status: "完了",
    desc: "ファイル数が多くなるので，zipで圧縮し提出する．ファイル名はplang<学生番号>.zipとする．例：plang25G1999.zip"
  }
];


const findIndexByIdas = (id) => {
  return assignments.findIndex(item => item.id == id);
};

app.get("/assignments", (req, res) => {

  const sortedData = [...assignments].sort((a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
  });
  res.render("assignments", { data: sortedData });
});

app.get("/assignments/create", (req, res) => {
  res.render("assignments_create");
});

app.get("/assignments/:id", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdas(id);
  
  if (index === -1) return res.redirect("/assignments"); 
  
  res.render("assignments_detail", { item: assignments[index] });
});

app.post("/assignments", (req, res) => {

  const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
  
  const newItem = {
    id: newId,
    subject: req.body.subject,
    title: req.body.title,
    deadline: req.body.deadline,
    status: req.body.status || "未着手",
    desc: req.body.desc
  };

  assignments.push(newItem);
  res.redirect("/assignments");
});

app.get("/assignments/:id/edit", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdas(id);
  
  if (index === -1) return res.redirect("/assignments");

  res.render("assignments_edit", { item: assignments[index] });
});

app.post("/assignments/:id/update", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdas(id);

  if (index !== -1) {

    assignments[index] = {
      id: Number(id),
      subject: req.body.subject,
      title: req.body.title,
      deadline: req.body.deadline,
      status: req.body.status,
      desc: req.body.desc
    };
  }
  
  res.redirect("/assignments");
});

app.get("/assignments/:id/delete", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdas(id);

  if (index !== -1) {
    assignments.splice(index, 1);
  }
  
  res.redirect("/assignments");
});


// ここからお土産アプリケーション 

let souvenirs = [
  {
    id: 1,
    name: "プレミアムバターサンド",
    origin: "北海道",
    category: "SWEETS",
    price: "1,200円",
    recommendation: "芳醇なバターの香りが，北の大地の記憶を呼び覚ます傑作です．",
    featured: true
  },
  {
    id: 2,
    name: "金沢の金箔カステラ",
    origin: "石川県",
    category: "TRADITIONAL",
    price: "2,500円",
    recommendation: "加賀百万石の伝統を纏った，しっとりとした気品溢れる味わい．",
    featured: false
  },
  {
    id: 3,
    name: "杜の都の月雫",
    origin: "宮城県",
    category: "SWEETS",
    price: "1,500円",
    recommendation: "ふんわりとしたカスタードが，杜の都の月明かりのように優しく口の中で溶けます．",
    featured: true
  },
  {
    id: 4,
    name: "東京ばな奈",
    origin: "東京都",
    category: "SWEETS",
    price: "1,100円",
    recommendation: "都会の洗練と懐かしさが共存する，東京を代表する永遠のスタンダードです．",
    featured: false
  },
  {
    id: 5,
    name: "駿河湾の職人パイ",
    origin: "静岡県",
    category: "SWEETS",
    price: "1,300円",
    recommendation: "職人の技が光る幾重もの層が，夜の団らんに華やかな彩りを添えます．",
    featured: false
  },
  {
    id: 6,
    name: "古都の夕映え八ツ橋",
    origin: "京都府",
    category: "TRADITIONAL",
    price: "1,000円",
    recommendation: "古都の静寂を写し取ったような，繊細なニッキの香りと柔らかな食感．",
    featured: true
  },
  {
    id: 7,
    name: "安芸の宮島もみじ",
    origin: "広島県",
    category: "SWEETS",
    price: "1,200円",
    recommendation: "厳島神社の紅葉を模した，しっとりとした生地と上品な餡の調和．",
    featured: false
  },
  {
    id: 8,
    name: "博多通りもん",
    origin: "福岡県",
    category: "SWEETS",
    price: "1,400円",
    recommendation: "和洋が融合したミルク餡が，博多の活気と温もりを伝える至高の逸品．",
    featured: true
  },
  {
    id: 9,
    name: "琉球王朝の琥珀菓子",
    origin: "沖縄県",
    category: "TRADITIONAL",
    price: "800円",
    recommendation: "太陽の恵みを感じる素朴な味わいに，琉球の歴史が息づいています．",
    featured: false
  },
  {
    id: 10,
    name: "尾張の黄金海老煎",
    origin: "愛知県",
    category: "SAVORY",
    price: "1,600円",
    recommendation: "厳選された海老の旨味が凝縮された，五感を刺激する芳醇な磯の香り．",
    featured: false
  }
];

const findIndexByIdso = (id) => {
  return souvenirs.findIndex(item => item.id == id);
};

app.get("/souvenirs", (req, res) => {
  const selectedOrigin = req.query.origin || "すべて";
  
  let filteredData = (selectedOrigin === "すべて") 
    ? souvenirs 
    : souvenirs.filter(s => s.origin === selectedOrigin);

  const sortedData = [...filteredData].sort((a, b) => b.featured - a.featured);
  
  const origins = ["すべて", ...new Set(souvenirs.map(s => s.origin))];

  res.render("souvenirs", { 
    data: sortedData, 
    origins: origins, 
    selectedOrigin: selectedOrigin 
  });
});

app.get("/souvenirs/create", (req, res) => {
  res.render("souvenirs_create");
});

app.get("/souvenirs/:id", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdso(id);
  if (index === -1) return res.redirect("/souvenirs"); 
  res.render("souvenirs_detail", { item: souvenirs[index] });
});

app.post("/souvenirs", (req, res) => {
  const newId = souvenirs.length > 0 ? Math.max(...souvenirs.map(s => s.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name: req.body.name,
    origin: req.body.origin,
    category: req.body.category,
    price: req.body.price,
    recommendation: req.body.recommendation,
    featured: req.body.featured === "on"
  };
  souvenirs.push(newItem);
  res.redirect("/souvenirs");
});

app.get("/souvenirs/:id/edit", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdso(id);
  if (index === -1) return res.redirect("/souvenirs");
  res.render("souvenirs_edit", { item: souvenirs[index] });
});

app.post("/souvenirs/:id/update", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdso(id);
  if (index !== -1) {
    souvenirs[index] = {
      id: Number(id),
      name: req.body.name,
      origin: req.body.origin,
      category: req.body.category,
      price: req.body.price,
      recommendation: req.body.recommendation,
      featured: req.body.featured === "on"
    };
  }
  res.redirect("/souvenirs");
});

app.get("/souvenirs/:id/delete", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdso(id);
  if (index !== -1) {
    souvenirs.splice(index, 1);
  }
  res.redirect("/souvenirs");
});

// ここから生徒管理アプリケーション

let students = [
  {
    id: 1,
    name: "佐藤 結衣",
    schoolLevel: "高校生",
    grade: "2年生",
    schedules: [
      { day: "月曜日", time: "18:00" },
      { day: "水曜日", time: "19:30" }
    ],
    subjects: ["数学", "英語"],
    isHighPriority: true,
    memo: "定期テスト対策を重点的に実施中．"
  },
  {
    id: 2,
    name: "田中 海斗",
    schoolLevel: "中学生",
    grade: "3年生",
    schedules: [
      { day: "火曜日", time: "19:00" },
      { day: "金曜日", time: "18:30" }
    ],
    subjects: ["理科", "社会"],
    isHighPriority: true,
    memo: "志望校合格に向けた過去問演習に注力．苦手な物理分野の克服が鍵となる．"
  },
  {
    id: 3,
    name: "鈴木 陽菜",
    schoolLevel: "小学生",
    grade: "6年生",
    schedules: [
      { day: "木曜日", time: "17:00" }
    ],
    subjects: ["算数", "英語"],
    isHighPriority: false,
    memo: "中学入学準備コース．英検5級合格を目標とし，自信を深めるスモールステップを導入．"
  },
  {
    id: 4,
    name: "高橋 蓮",
    schoolLevel: "高校生",
    grade: "3年生",
    schedules: [
      { day: "月曜日", time: "20:00" },
      { day: "木曜日", time: "20:00" },
      { day: "土曜日", time: "14:00" }
    ],
    subjects: ["物理", "化学", "数学Ⅲ"],
    isHighPriority: true,
    memo: "難関国立大志望．演習の解答速度向上を目指し，ピーク・エンドの法則に基づき終盤に得意問題を配置．"
  },
  {
    id: 5,
    name: "伊藤 芽依",
    schoolLevel: "中学生",
    grade: "1年生",
    schedules: [
      { day: "水曜日", time: "18:00" }
    ],
    subjects: ["国語"],
    isHighPriority: false,
    memo: "読解力の基礎固め．ポジティブなフィードバックを増やし，学習への心理的安全性を確保中．"
  },
  {
    id: 6,
    name: "渡辺 陸",
    schoolLevel: "高校生",
    grade: "1年生",
    schedules: [
      { day: "火曜日", time: "19:30" },
      { day: "金曜日", time: "19:30" }
    ],
    subjects: ["情報I", "数学"],
    isHighPriority: false,
    memo: "プログラミングに関心が高い．論理的思考を数学の証明問題に応用するアプローチを実施．"
  },
  {
    id: 7,
    name: "山本 結愛",
    schoolLevel: "小学生",
    grade: "4年生",
    schedules: [
      { day: "月曜日", time: "16:30" }
    ],
    subjects: ["算数"],
    isHighPriority: false,
    memo: "計算ミスを減らすためのルーチン化を指導．進捗の可視化で自己効力感を高める．"
  },
  {
    id: 8,
    name: "中村 蒼空",
    schoolLevel: "高校生",
    grade: "2年生",
    schedules: [
      { day: "水曜日", time: "20:00" },
      { day: "土曜日", time: "16:00" }
    ],
    subjects: ["英語", "世界史探究"],
    isHighPriority: false,
    memo: "語彙力の定着に間隔反復（SRS）の概念を導入．長期記憶への移行を促す学習スケジュール．"
  },
  {
    id: 9,
    name: "小林 美緒",
    schoolLevel: "中学生",
    grade: "2年生",
    schedules: [
      { day: "木曜日", time: "18:30" },
      { day: "日曜日", time: "10:00" }
    ],
    subjects: ["数学", "英語"],
    isHighPriority: true,
    memo: "中間テストでの得点20%アップを達成．現状維持バイアスを打破し，応用問題に挑戦中．"
  },
  {
    id: 10,
    name: "加藤 春樹",
    schoolLevel: "高校生",
    grade: "3年生",
    schedules: [
      { day: "火曜日", time: "20:30" },
      { day: "金曜日", time: "20:30" }
    ],
    subjects: ["現代文", "言語文化"],
    isHighPriority: true,
    memo: "記述対策の最終仕上げ．文章構成の「型」を習得させ，認知負荷を低減する解答法を伝授．"
  }
];

const findIndexByIdst = (id) => {
  return students.findIndex(item => item.id == id);
};

app.get("/students", (req, res) => {
  const { level, grade } = req.query;
  
  let filteredData = students;
  if (level && level !== "すべて") filteredData = filteredData.filter(s => s.schoolLevel === level);
  if (grade && grade !== "すべて") filteredData = filteredData.filter(s => s.grade === grade);

  const sortedData = [...filteredData].sort((a, b) => b.isHighPriority - a.isHighPriority);
  
  const levels = ["すべて", "小学生", "中学生", "高校生"];
  const grades = ["すべて", "1年生", "2年生", "3年生", "4年生", "5年生", "6年生"];

  res.render("students", { 
    data: sortedData, 
    levels, 
    grades, 
    selectedLevel: level || "すべて",
    selectedGrade: grade || "すべて"
  });
});

app.get("/students/create", (req, res) => {
  res.render("students_create");
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdst(id);
  if (index === -1) return res.redirect("/students"); 
  res.render("students_detail", { item: students[index] });
});

const ensureArray = (input) => {
  if (!input) return [];
  return Array.isArray(input) ? input : [input];
};

app.post("/students", (req, res) => {
  const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  
  const days = ensureArray(req.body.day);
  const times = ensureArray(req.body.time);
  
  const newItem = {
    id: newId,
    name: req.body.name,
    schoolLevel: req.body.schoolLevel,
    grade: req.body.grade,
    schedules: days.map((d, i) => ({ day: d, time: times[i] })),
    subjects: ensureArray(req.body.subjects),
    isHighPriority: req.body.isHighPriority === "on",
    memo: req.body.memo
  };

  students.push(newItem);
  res.redirect("/students");
});

app.get("/students/:id/edit", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdst(id);
  if (index === -1) return res.redirect("/students");
  res.render("students_edit", { item: students[index] });
});

app.post("/students/:id/update", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdst(id);

  if (index !== -1) {
    const days = ensureArray(req.body.day);
    const times = ensureArray(req.body.time);

    students[index] = {
      id: Number(id),
      name: req.body.name,
      schoolLevel: req.body.schoolLevel,
      grade: req.body.grade,
      schedules: days.map((d, i) => ({ day: d, time: times[i] })),
      subjects: ensureArray(req.body.subjects),
      isHighPriority: req.body.isHighPriority === "on",
      memo: req.body.memo
    };
  }
  res.redirect("/students/" + id);
});

app.get("/students/:id/delete", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdst(id);
  if (index !== -1) students.splice(index, 1);
  res.redirect("/students");
});

//404への対応．
app.use((req, res) => {
  const path = req.path;

  if (path.startsWith("/assignments/")) {
    res.redirect("/assignments");
  } 
  else if (path.startsWith("/souvenirs/")) {
    res.redirect("/souvenirs");
  } 
  else if (path.startsWith("/students/")) {
    res.redirect("/students");
  } 
  else {
    res.render("index");
  }
});


app.listen(8080, () => console.log("server running at http://localhost:8080!"));
