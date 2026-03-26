// ===== 故事資料 =====
const storyData = {
  // ===== 起始節點 =====
  start: {
    chapter: '序章',
    text: `期末考前最後一晚，你獨自坐在學校圖書館三樓的角落。

窗外的月光灑在書頁上，時鐘的秒針聲格外清晰。你抬頭看了一眼牆上的鐘——午夜十二點整。

突然，三樓最深處的書架間，傳來了「咚⋯⋯咚⋯⋯咚⋯⋯」的敲擊聲。

圖書館裡，應該只剩你一個人才對。`,
    choices: [
      { text: '放下筆，走向書架深處查看', next: 'node_investigate' },
      { text: '假裝沒聽到，繼續埋頭讀書', next: 'node_ignore' },
      { text: '收拾東西，準備離開圖書館', next: 'node_leave' }
    ]
  },

  // ===== 節點：調查書架 =====
  node_investigate: {
    chapter: '第一章：書架迷宮',
    text: `你鼓起勇氣，沿著書架之間的走道前進。走廊的日光燈不知何時變成了忽明忽暗的微光。

越往深處走，書架似乎越來越高，快要觸及天花板。書架上的書本也越來越舊。

你在最深處發現了一本散發著微弱紫光的皮革手札。封面上用燙金字寫著：

「致深夜的訪客——請翻開此書，但請做好準備。」

手札旁邊的地板上，有一道隱約可見的裂縫，似乎通往地下。`,
    choices: [
      { text: '打開那本發光的手札', next: 'node_open_book' },
      { text: '忽略手札，沿地板裂縫往下探索', next: 'node_underground' },
      { text: '覺得不對勁，轉身快步離開', next: 'node_escape_hallway' }
    ]
  },

  // ===== 節點：假裝沒聽到 =====
  node_ignore: {
    chapter: '第一章：桌上的紙條',
    text: `你深吸一口氣，把注意力拉回課本上。

但不到三分鐘，圖書館的燈全部熄滅了。黑暗中，只剩手機螢幕的微光照亮你的臉。

你正要站起來時，發現桌上多了一張你從未見過的紙條。紙條上用工整的字跡寫著：

「你聽到了，對吧？別怕。
　回答我的問題，你就能離開。
　問題：什麼東西，白天看不見你，晚上卻與你形影不離？」

紙條的背面還畫著一個箭頭，指向圖書館的出口方向。`,
    choices: [
      { text: '思考後在紙條上寫下「影子」', next: 'node_riddle_shadow' },
      { text: '不理紙條，循箭頭方向往出口走', next: 'node_follow_arrow' }
    ]
  },

  // ===== 節點：嘗試離開 =====
  node_leave: {
    chapter: '第一章：鎖住的門',
    text: `你快速收拾書包，起身走向樓梯。

但當你拉動三樓的防火門時，門紋風不動。推、拉、踢——完全打不開。

你掏出手機想打電話求救，卻發現手機訊號全無。螢幕上反覆顯示同一則通知：

「圖書館閉館時間：永遠。」

身後傳來輕柔的腳步聲，伴隨著細微的呢喃。回頭望去，走廊盡頭有個白色的輪廓，像是——一個穿著制服的學生？`,
    choices: [
      { text: '鼓起勇氣走向那個白色身影', next: 'node_approach_ghost' },
      { text: '躲到服務台後面藏起來', next: 'node_hide' }
    ]
  },

  // ===== 節點：打開手札 =====
  node_open_book: {
    chapter: '第二章：手札的秘密',
    text: `你翻開手札，書頁自動翻到中間。上面密密麻麻寫著一個學生的日記。

日期是二十年前。日記的主人叫做「林書瑤」，是這所學校的學生。她在日記裡寫道：

「我太喜歡圖書館了，所以我許了一個願望——希望能永遠待在這裡。沒想到，願望成真了⋯⋯」

最後一頁，字跡變得潦草：

「如果有人找到這本日記，請幫我完成一件事：把這本手札放回一樓大廳的還書箱。這樣，我就能離開了⋯⋯你也是。」

你注意到書的扉頁上還貼著一張泛黃的書籤，寫著一串圖書編號。`,
    choices: [
      { text: '帶著手札前往一樓大廳還書箱', next: 'node_return_book' },
      { text: '先查查書籤上的圖書編號代表什麼', next: 'node_check_code' }
    ]
  },

  // ===== 節點：地下通道 =====
  node_underground: {
    chapter: '第二章：地下迴廊',
    text: `你蹲下來，用力扳開地板上的裂縫。下面是一條窄小的石砌階梯，通往黑暗的地下。

手機的手電筒照亮了石壁。牆上刻著一行行的字：

「第 312 位訪客。」
「第 313 位訪客。」
「⋯⋯」

最後一行刻著：「第 999 位訪客——恭喜，你是最後一位。」

走到階梯盡頭，你看到兩扇門。左邊的門上寫著「記憶」，右邊的門上寫著「遺忘」。

兩扇門中間的牆壁上刻著：「選擇你願意留下的。」`,
    choices: [
      { text: '推開左邊的門——「記憶」', next: 'ending_guardian' },
      { text: '推開右邊的門——「遺忘」', next: 'ending_escape' }
    ]
  },

  // ===== 節點：逃跑走廊 =====
  node_escape_hallway: {
    chapter: '第二章：無盡的走廊',
    text: `你轉身快步離開，但書架間的走道似乎比來時更長了。

每走幾步，頭頂的日光燈就會閃爍一下。你越走越快，書架兩側的書本開始自動從架上滑落。

終於，你看到前方有一扇發光的門。門上貼著一張便利貼：

「跑得夠快了嗎？試試回頭看看。」

你能聽到身後越來越近的呢喃聲⋯⋯`,
    choices: [
      { text: '拒絕回頭，用力推開發光的門', next: 'ending_escape' },
      { text: '停下腳步，深呼吸後慢慢回頭', next: 'node_look_back' }
    ]
  },

  // ===== 節點：回答影子 =====
  node_riddle_shadow: {
    chapter: '第二章：正確答案',
    text: `你拿起桌上的筆，在紙條的空白處寫下「影子」兩個字。

紙條上的字跡緩緩發出微光，然後重新排列成新的訊息：

「答對了。你是聰明的那種人。」

「我叫林書瑤，二十年前的學生。我被困在這裡很久了。」

「既然你這麼聰明，我再問你一個：你願意幫我離開嗎？方法很簡單——把我留在三樓深處的手札，放回一樓的還書箱就好。」

「或者⋯⋯你也可以選擇直接離開。門已經為你打開了。」

你回頭看，果然，通往樓梯的門現在微微敞開，外面透進來月光。`,
    choices: [
      { text: '前往三樓深處找手札，幫助林書瑤', next: 'node_return_book' },
      { text: '抓起書包衝向已經打開的門', next: 'ending_escape' }
    ]
  },

  // ===== 節點：循箭頭走 =====
  node_follow_arrow: {
    chapter: '第二章：螢光指引',
    text: `你無視紙條上的謎語，循著箭頭的方向走去。

走到一半，你發現地板上開始出現淡淡的螢光腳印，一步一步引導著你。腳印的大小看起來像是⋯⋯一個女學生的。

螢光腳印帶你走到了圖書館的視聽室門口。透過門上的小窗可以看到，視聽室裡的老舊電視機正在播放書面——

畫面裡是一個穿著制服的女孩，對著鏡頭微笑。畫面下方的字幕寫著：

「你終於來了。請進。」`,
    choices: [
      { text: '推門走進視聽室', next: 'node_approach_ghost' },
      { text: '太詭異了，找其他出路', next: 'node_escape_hallway' }
    ]
  },

  // ===== 節點：靠近幽靈 =====
  node_approach_ghost: {
    chapter: '第三章：圖書管理員',
    text: `走近後，你看清了那個身影——一個梳著馬尾、穿著舊式校服的女生。她的輪廓微微透明，但表情很溫柔。

「你好，」她對你微微鞠躬，「我是林書瑤，這座圖書館的⋯⋯嗯，非官方管理員。」

「二十年前，我在這裡許了個傻願望，結果就出不去了。」她無奈地笑了笑。

「其實只要把我的手札放回一樓的還書箱就好，但是⋯⋯我自己碰不到實體的東西。」

「你願意幫我嗎？手札在三樓最深處的書架上。」

「當然，如果你只想離開，我也可以幫你開門。只是⋯⋯我可能要再等下一個人了。」`,
    choices: [
      { text: '「我幫妳！帶我去找手札。」', next: 'node_return_book' },
      { text: '「抱歉⋯⋯我只想離開。」', next: 'ending_escape' }
    ]
  },

  // ===== 節點：躲藏 =====
  node_hide: {
    chapter: '第二章：服務台下的發現',
    text: `你蹲到服務台後面，把自己縮成一團。心臟跳得飛快。

過了好幾分鐘，腳步聲消失了。你鬆了一口氣，卻注意到服務台下方的抽屜微微發光。

你拉開抽屜，發現裡面放著一本舊舊的圖書借閱記錄簿。最後一筆記錄停在二十年前：

　借書人：林書瑤
　書名：《如何永遠留在最喜歡的地方》
　借出日期：2006年6月15日
　歸還日期：（空白）

記錄簿下面壓著一把古銅色的鑰匙，鑰匙上刻著「還書箱」三個字。`,
    choices: [
      { text: '帶著鑰匙，去一樓找還書箱', next: 'node_return_book' },
      { text: '留在服務台，等到天亮再說', next: 'ending_trapped' }
    ]
  },

  // ===== 節點：還書 =====
  node_return_book: {
    chapter: '第三章：歸還',
    text: `你帶著手札（或者懷著那個念頭），一路來到一樓大廳。

月光穿過玻璃天花板灑落下來。還書箱靜靜地立在大廳中央，上面積了一層薄薄的灰。

當你把手札放入還書箱的瞬間，整座圖書館的燈同時亮了起來——溫暖的暖黃色光。

林書瑤出現在你面前，她的身影不再透明了。她看著自己的雙手，眼眶微微泛紅。

「謝謝你⋯⋯」她的聲音帶著哽咽，「二十年了，終於有人幫我還書了。」

「作為感謝，我想告訴你一個秘密⋯⋯」

她微微一笑，手指向圖書館深處的某個方向。`,
    choices: [
      { text: '「什麼秘密？我想知道。」', next: 'ending_guardian' },
      { text: '「不用了，能幫到你就好。我要回去繼續念書了。」', next: 'ending_good' }
    ]
  },

  // ===== 節點：查圖書編號 =====
  node_check_code: {
    chapter: '第二章：隱藏的書架',
    text: `你仔細看了看書籤上的編號——「B3-X-000」。

這不像正常的圖書分類號。你試著在附近的書架上找，結果在最角落的一個書架背面發現了一個和編號相同的小門。

門後是一個不大的密室，牆上貼滿了手寫的便利貼和照片。便利貼上記錄著各種日期和短句：

「今天又有人來了，可惜他太害怕就跑了。」
「第 500 天。好想吃紅豆麵包。」
「如果有人能幫我把手札還回去就好了⋯⋯」

密室中間的桌上放著一杯早已乾涸的奶茶，旁邊壓著一張字條：

「這裡是我的秘密基地。如果你找到了這裡，代表你是個好奇又勇敢的人。請幫我一個忙好嗎？」`,
    choices: [
      { text: '帶著手札下樓去還書箱', next: 'node_return_book' },
      { text: '坐下來仔細閱讀所有便利貼', next: 'ending_guardian' }
    ]
  },

  // ===== 節點：回頭看 =====
  node_look_back: {
    chapter: '第三章：真相',
    text: `你停下來，緩緩轉頭。

身後站著的是林書瑤。她看起來一點也不可怕——一個普普通通的女學生，只是臉色有點蒼白。

「你沒有跑，」她輕聲說，看起來有點驚訝，「大部分人到這一步都會直接衝出去的。」

「其實那些怪聲、閃爍的燈，都是因為我⋯⋯唯一能做的事就是弄出一點動靜，希望有人能注意到。」

「我只是想請人幫我還一本書而已。」她不好意思地低下頭。

「你⋯⋯願意聽我說嗎？」`,
    choices: [
      { text: '「當然願意。告訴我怎麼幫你。」', next: 'node_return_book' },
      { text: '「先讓我消化一下⋯⋯你是幽靈？！」', next: 'ending_good' }
    ]
  },

  // ===== 結局 =====
  ending_guardian: {
    chapter: '結局',
    isEnding: true,
    endingType: 'good',
    icon: '📖',
    title: '午夜圖書館守護者',
    text: `林書瑤帶你走到圖書館最深處，推開了一扇你從未注意過的門。

門後是一個小小的閱覽室，溫暖的光線從復古的檯燈中溢出。書架上擺滿了各種珍貴的絕版書籍。

「這是圖書館的心臟，」她微笑著說，「只有真正熱愛書的人才能看到這個房間。」

從此以後，每到深夜，你都會來到圖書館。在那個只屬於你和林書瑤的閱覽室裡，你們一起讀書、聊天。

她負責整理那些沒人看的書，你負責偶爾帶瓶奶茶來。

圖書館的夜晚，再也不孤單了。`,
    statsLabel: '真正的結局'
  },

  ending_good: {
    chapter: '結局',
    isEnding: true,
    endingType: 'good',
    icon: '🌙',
    title: '月光下的告別',
    text: `手札放回還書箱後，林書瑤的身影開始慢慢發光。

「二十年了，」她微笑著，眼淚無聲地滑落，「終於可以畢業了。」

她向你深深鞠了一躬，然後化成無數光點，像螢火蟲一樣飄散在月光中。

圖書館的門「喀」一聲打開了。外面是微亮的天空，清晨的第一道陽光正從地平線升起。

你走出圖書館，回頭望了一眼。彷彿看到三樓的窗戶後面，有個身影在對你揮手。

隔天，你在圖書館的留言板上看到一張新的紙條：

「謝謝你。——圖書館最後的夜班管理員」`,
    statsLabel: '溫暖的結局'
  },

  ending_escape: {
    chapter: '結局',
    isEnding: true,
    endingType: 'neutral',
    icon: '🏃',
    title: '黎明的脫逃者',
    text: `你拼命跑向大門。門在你觸碰的瞬間自動打開。

外面的空氣冰涼而新鮮，你大口喘著氣。城市的路燈亮著橘色的光，夜色正在褪去。

你跑到校門口才敢停下來。回頭望去，圖書館安安靜靜的，像什麼都沒發生過。

但從那天起，你再也不敢一個人去圖書館了。

而且奇怪的是——你總覺得，每次經過圖書館門口，三樓的燈都會閃一下。

好像有人在跟你打招呼。

你假裝沒看見。`,
    statsLabel: '逃離的結局'
  },

  ending_trapped: {
    chapter: '結局',
    isEnding: true,
    endingType: 'bad',
    icon: '📚',
    title: '永恆的讀者',
    text: `你蜷縮在服務台後面，告訴自己天亮就沒事了。

但天一直沒有亮。

你看了看手機——時間永遠停在午夜十二點。電量永遠顯示 87%。

圖書館的燈亮了、暗了、又亮了。日復一日，你開始習慣這裡的節奏。

既然出不去，那就看書吧。反正書架上的書多得看不完。

你後來在服務台下面發現了林書瑤留下的奶茶——神奇的是，奶茶居然還是溫的。

「歡迎加入，」一個聲音在耳邊輕輕說，「我一個人待了二十年，終於有伴了。」

十年後的某個夜裡，又有一個學生獨自來到圖書館。你敲了敲書架——

「咚⋯⋯咚⋯⋯咚⋯⋯」`,
    statsLabel: '輪迴的結局'
  }
};

// ===== 全域狀態 =====
let currentNode = 'start';
let choiceCount = 0;
let visitedNodes = [];
let typewriterTimer = null;

// ===== 總節點數（用於進度條） =====
const totalStoryNodes = Object.keys(storyData).filter(k => !storyData[k].isEnding).length;

// ===== Canvas 背景粒子效果 =====
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.3 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.pulse += 0.02;
      this.opacity = (Math.sin(this.pulse) * 0.15) + 0.2;
      if (this.y < -10 || this.x < -10 || this.x > w + 10) this.reset();
      if (this.y < -10) { this.y = h + 10; }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(123, 104, 238, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((w * h) / 15000), 80);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  animate();
}

// ===== 畫面切換 =====
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  target.classList.remove('fade-in');
  void target.offsetWidth; // reflow
  target.classList.add('active', 'fade-in');
}

// ===== 打字機效果 =====
function typewriter(element, text, callback) {
  if (typewriterTimer) clearInterval(typewriterTimer);
  element.innerHTML = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  element.appendChild(cursor);

  const speed = 28; // ms per character

  typewriterTimer = setInterval(() => {
    if (i < text.length) {
      // 在 cursor 前插入文字
      const char = text[i];
      if (char === '\n') {
        element.insertBefore(document.createElement('br'), cursor);
      } else {
        element.insertBefore(document.createTextNode(char), cursor);
      }
      i++;
    } else {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
      cursor.remove();
      if (callback) callback();
    }
  }, speed);

  // 點擊可跳過打字機效果
  element.style.cursor = 'pointer';
  const skipHandler = () => {
    if (typewriterTimer) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
      element.innerHTML = text.replace(/\n/g, '<br>');
      if (callback) callback();
    }
    element.removeEventListener('click', skipHandler);
    element.style.cursor = 'default';
  };
  element.addEventListener('click', skipHandler);
}

// ===== 更新進度條 =====
function updateProgress() {
  const fill = document.getElementById('progress-fill');
  const pct = Math.min((visitedNodes.length / totalStoryNodes) * 100, 100);
  fill.style.width = pct + '%';
}

// ===== 顯示選項 =====
function showChoices(choices) {
  const container = document.getElementById('choices-container');
  container.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];

  choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn choice-appear';
    btn.style.animationDelay = `${idx * 0.12}s`;
    btn.innerHTML = `
      <span class="choice-icon">${labels[idx]}</span>
      <span class="choice-text">${choice.text}</span>
    `;
    btn.addEventListener('click', () => makeChoice(choice.next));
    container.appendChild(btn);
  });
}

// ===== 進入故事節點 =====
function goToNode(nodeId) {
  currentNode = nodeId;
  if (!visitedNodes.includes(nodeId)) visitedNodes.push(nodeId);

  const node = storyData[nodeId];

  if (node.isEnding) {
    showEnding(node);
    return;
  }

  showScreen('story-screen');
  document.getElementById('chapter-label').textContent = node.chapter;
  updateProgress();

  // 隱藏選項直到打字完成
  document.getElementById('choices-container').innerHTML = '';

  typewriter(document.getElementById('story-text'), node.text, () => {
    showChoices(node.choices);
  });
}

// ===== 選擇 =====
function makeChoice(nextNodeId) {
  choiceCount++;
  goToNode(nextNodeId);
}

// ===== 結局畫面 =====
function showEnding(node) {
  showScreen('ending-screen');

  document.getElementById('ending-icon').textContent = node.icon;
  document.getElementById('ending-title').textContent = node.title;

  const badgeClass = node.endingType === 'good' ? 'badge-good'
    : node.endingType === 'neutral' ? 'badge-neutral'
    : 'badge-bad';

  const endingText = document.getElementById('ending-text');
  endingText.innerHTML = '';

  // 添加結局類型標籤
  const badge = document.createElement('div');
  badge.className = `ending-type-badge ${badgeClass}`;
  badge.textContent = node.statsLabel;
  document.getElementById('ending-title').after(badge);

  typewriter(endingText, node.text, () => {
    // 顯示統計
    const stats = document.getElementById('ending-stats');
    stats.innerHTML = `
      <div class="stat-item">
        <span class="stat-value">${choiceCount}</span>
        <span class="stat-label">次選擇</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${visitedNodes.length}</span>
        <span class="stat-label">個場景</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${Object.keys(storyData).filter(k => storyData[k].isEnding).length}</span>
        <span class="stat-label">種結局</span>
      </div>
    `;
  });
}

// ===== 開始遊戲 =====
function startGame() {
  currentNode = 'start';
  choiceCount = 0;
  visitedNodes = [];
  goToNode('start');
}

// ===== 重新開始 =====
function restartGame() {
  // 清除可能殘留的 badge
  document.querySelectorAll('.ending-type-badge').forEach(el => el.remove());
  currentNode = 'start';
  choiceCount = 0;
  visitedNodes = [];
  showScreen('title-screen');
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
});
