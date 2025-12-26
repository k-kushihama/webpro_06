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
    desc: ""
  },
  {
    id: 2,
    subject: "アジャイルワーク1",
    title: "結合課題",
    deadline: "2025-12-16",
    status: "進行中",
    desc: ""
  },
  {
    id: 3,
    subject: "データサイエンス",
    title: "最終レポート",
    deadline: "2025-12-23",
    status: "進行中",
    desc: ""
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
  }
];

const findIndexByIdSt = (id) => {
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
  const index = findIndexByIdSt(id);
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
  const index = findIndexByIdSt(id);
  if (index === -1) return res.redirect("/students");
  res.render("students_edit", { item: students[index] });
});

app.post("/students/:id/update", (req, res) => {
  const id = req.params.id;
  const index = findIndexByIdSt(id);

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
  const index = findIndexByIdSt(id);
  if (index !== -1) students.splice(index, 1);
  res.redirect("/students");
});

//404への対応． ---
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
