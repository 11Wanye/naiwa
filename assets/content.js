/* =====================================================================
   以蛙之名呼唤我 ｜ 全站唯一的文字编辑文件
   ---------------------------------------------------------------------
   ● 只改引号 "..." 里面的字，不要删逗号、括号和引号。
   ● 改完保存，回到浏览器刷新 index.html 就能看到效果。
   ● <em>…</em> 包住的字会变成金色渐变；<br> 是换行。
   ● 图片路径都相对 index.html，例如 "assets/img/s1-wake.jpg"。
   ● 空字符串 "" 表示内容还没交，网页会自动显示「待补充」。
   ===================================================================== */
window.NAIWA = {

  /* ---------- 全站信息 ---------- */
  site: {
    title: "以蛙之名呼唤我",
    subtitle: "那些说不出口的情绪，奶蛙替我们说了",
    course: "CUS6032",
    courseFull: "CUS6032 · 数字时代的文化研究",
    moreLink: "资料与成员"
  },

  /* ---------- 聊天动画节奏（单位：秒，数字越大越慢） ---------- */
  rhythm: {
    gap: 1.5,        // 两条消息之间的间隔
    typing: 0.8,     // 对方「正在输入…」三个点显示多久
    perChar: 0.04,   // 长消息每多一个字，多停留多少秒（方便读完）
    firstAt: 0.9,    // 聊天窗飞出来后，第一条消息出现的时间
    hold: 1.8        // 最后一条消息发完后，停留多久再收起
  },

  /* ---------- 一天的七幕（从上到下就是网页的顺序） ----------
     time：右上角时钟显示的时间；label：时钟下面的小字
     kicker：标题上方的小字；title：大标题；sub：标题下的说明
     eng：背后描边的大英文；foot：左下角提示；pct：右下角奶蛙化进度
     image：背景图；alt：图片说明（给读屏软件用）
     focus：手机竖屏时画面对准的位置（0 最左，1 最右）；afterFocus：变身后那张图的对准位置
     transition：滑到下一幕的转场方式（zoom 推近 / wipe 横扫 / pan 平移 / iris 圆形展开 / dark 暗场 / dawn 亮场）
  */
  scenes: [
    {
      id: "cover", time: "07:59", label: "清晨",
      kicker: "CUS6032 · 数字时代的文化研究",
      title: "以<em>蛙</em>之名|呼唤我",
      sub: "那些说不出口的情绪，<br>奶蛙替我们说了。",
      eng: "In the Name<br>of Naiwa",
      foot: "向下滑动，开始这一天", pct: "",
      image: "assets/img/s0-cover.jpg",
      cutoutBg: "assets/img/s0-cover-bg.jpg",
      cutout: "assets/img/s0-cover-girl.webp",
      alt: "羊毛毡女生伸出手，身后墙上是奶蛙的影子",
      focus: 0.74, transition: "zoom"
    },
    {
      id: "wake", time: "08:00", label: "起床",
      kicker: "08:00 · 第一幕",
      title: "起床，<br>先刷一会儿<em>手机</em>",
      sub: "早上 8 点，我刷到一只黄黄的蛙在狂笑。<br>它长得有点丑，但我也跟着笑出声了。",
      eng: "Morning",
      foot: "向下滑动", pct: "奶蛙化 0%",
      image: "assets/img/s1-wake.jpg",
      alt: "女生窝在被子里刷手机，嘴角上扬",
      focus: 0.69, transition: "wipe"
    },
    {
      id: "class", time: "10:00", label: "上课",
      kicker: "10:00 · 第二幕",
      title: "老师转头，<br>我们拼命<em>憋笑</em>",
      sub: "上课时，同桌给我看了一个视频。<br>老师一转头，我们俩就像那两只奶蛙，拼命憋笑。",
      eng: "Class",
      foot: "向下滑动", pct: "奶蛙化 20%",
      image: "assets/img/s2-class.jpg",
      alt: "女生和同桌捂嘴憋笑，头上冒出奶蛙眼睛",
      focus: 0.62, transition: "pan"
    },
    {
      id: "ddl", time: "12:00", label: "午休",
      kicker: "12:00 · 第三幕",
      title: "五个 DDL，<br>先扎好<em>马步</em>",
      sub: "中午打开 DDL 清单，五个作业排着队。<br>行吧，来一个打一个。",
      eng: "Deadline",
      foot: "向下滑动", pct: "奶蛙化 50%",
      image: "assets/img/s3-ddl.jpg",
      alt: "半奶蛙化的女生对着电脑上的 DDL 清单扎马步、伸掌招架",
      focus: 0.60, transition: "iris"
    },
    {
      id: "everyone", type: "chat", time: "16:00", label: "放学",
      kicker: "16:00 · 第四幕",
      title: "原来，<br>大家都是<em>奶蛙</em>",
      sub: "下午 4 点，我发现不只是我。",
      eng: "Everyone",
      foot: "聊天正在发生 · 继续滑动可跳过", footAfter: "向下滑动",
      pct: "奶蛙化 0%", pctAfter: "全员奶蛙化 · 100%",
      image: "assets/img/s4-before.jpg",
      alt: "戴耳机打游戏的男生、看手机的女主和两位职场人",
      after: "assets/img/s4-after.jpg",
      afterAlt: "同一画面，四个人的皮肤变成奶蛙黄、眼睛变成奶蛙眼",
      steps: ["01　开黑群", "02　男朋友", "03　同事", "04　全员奶蛙化"],
      endnote: "04 / 全员奶蛙化",
      focus: 0.62, transition: "dark",
      /* 每段聊天：title 聊天窗标题；tag 人物标签；
         side："me" 是自己发的（绿色，右边），"" 是对方发的（白色，左边）
         text 文字消息；sticker 表情包图片；name 群聊里对方的名字 */
      chats: [
        {
          title: "开黑群 · 4", tag: "打游戏的男生",
          tagAt: [710, 205], spotAt: [700, 450], from: [760, 580], yaw: -30,
          messages: [
            { side: "me", text: "@阿杰 快点上号啊 就差你了" },
            { side: "", name: "阿杰", text: "在外面 还没回家" },
            { side: "me", sticker: "assets/stickers/d-03.webp", alt: "惊鸿一瞥奶蛙表情" }
          ]
        },
        {
          title: "男朋友", tag: "女主和男朋友",
          tagAt: [920, 170], spotAt: [990, 480], from: [980, 465], yaw: -38,
          messages: [
            { side: "me", text: "宝宝" },
            { side: "me", text: "我发现我变心了" },
            { side: "", sticker: "assets/stickers/s-baotou.png", alt: "奶蛙抱头表情" },
            { side: "me", text: "我变得比以前更爱你了" },
            { side: "", sticker: "assets/stickers/s-zhandou.png", alt: "奶蛙切换战斗模式表情" },
            { side: "", text: "又想买什么东西了" }
          ]
        },
        {
          title: "同事", tag: "职场两人",
          tagAt: [1205, 640], spotAt: [1270, 450], spotW: 320, from: [1220, 440], yaw: -44,
          messages: [
            { side: "", text: "我真受不了了 见太奶了" },
            { side: "", text: "开会的时候 老板在说话" },
            { side: "", text: "我手机不小心点到视频号" },
            { side: "", text: "爆大声" },
            { side: "me", sticker: "assets/stickers/d-02.webp", alt: "奶蛙捧腹大笑表情" },
            { side: "me", text: "然后呢 没被骂？" }
          ]
        }
      ]
    },
    {
      id: "night", type: "chat", time: "23:00", label: "深夜",
      kicker: "23:00 · 第五幕",
      title: "今天<br>有点<em>撑不住</em>",
      sub: "作业好多，不会写。<br>妈妈刚好发来消息。",
      eng: "Midnight",
      foot: "和妈妈聊天 · 继续滑动可跳过", footAfter: "向下滑动",
      pct: "奶蛙化 0%", pctAfter: "奶蛙化 100%",
      image: "assets/img/s5-before.jpg",
      alt: "雨夜，女生坐在床上看手机，旁边堆着书和作业",
      after: "assets/img/s5-after.jpg",
      afterAlt: "同一个雨夜房间，女生变成了一只黄色的奶蛙",
      steps: [],
      endnote: "05 / 奶蛙化 100%",
      focus: 0.70, afterFocus: 0.70, transition: "dawn",
      chats: [
        {
          title: "妈妈", tag: "女主和妈妈",
          tagAt: [1150, 165], spotAt: [1010, 420], spotW: 320, from: [880, 430], yaw: -34,
          messages: [
            { side: "", text: "宝贝女儿，你在干嘛？在香港过得怎么样啊？" },
            { side: "me", text: "嗯，还行吧。" },
            { side: "", text: "这么晚了早点睡啊，妈妈没有陪着你你一定要多吃点，不要怕没钱。" },
            { side: "", transfer: "¥2000.00", transferNote: "请收款" },
            { side: "me", text: "我怎么可能不照顾好自己，呜呜呜谢谢老妈" },
            { side: "me", sticker: "assets/stickers/s-cry.jpg", alt: "奶蛙流泪表情", big: true }
          ]
        }
      ]
    },
    {
      id: "ending", time: "00:00", label: "结尾",
      kicker: "00:00 · 尾声",
      title: "我为什么<br>想变成<em>奶蛙</em>？",
      sub: "我不是真的想变成一只蛙。<br>我只是需要一个替我说出情绪的样子。",
      quote: "那些说不出口的情绪，奶蛙替我们说了。",
      eng: "Epilogue",
      foot: "继续向下 · 资料与成员", pct: "",
      image: "assets/img/s6-end.jpg",
      alt: "女生笑着抱住奶蛙玩偶",
      focus: 0.64
    }
  ],

  /* =====================================================================
     以下是故事结束后的资料区（普通滚动）。
     status 写 "待补充" 会显示金色的「待补充」标签。
     ===================================================================== */

  // 奶蛙是什么（A 刘牧雁）
  intro: {
    title: "奶蛙是什么",
    status: "",
    lead: "",
    paragraphs: [],
    blocks: [
      { title: "奶蛙从哪里来？", paragraphs: [
        "奶蛙的「母体」是 2019 年诞生的儿童 3D 动画形象「奶龙」。",
        "2024 年，一位网友用 AI 生成奶龙头像时，因为模型理解出错，把奶龙的身体和青蛙的特征混在了一起，生成了一个肚子膨大、四肢纤细、长着绿色眼睛的奇怪形象，网友叫它「奶蛙」。",
        "之后，一段直播连麦里的魔性笑声被剪进了奶蛙二创，标志性的「奶蛙笑」从此出现。",
        "2026 年初，奶蛙的鬼畜、AI 二创和魔改短剧开始刷屏，相关话题在多个平台的累计播放量达到数亿次。同年 3 月，奶龙官方发出提示，呼吁大家不要丑化形象，但奶蛙的热度没有降下来。"
      ], figures: [
        { group: ["assets/img/a/A_image3.png", "assets/img/a/A_image4.png", "assets/img/a/A_image5-redacted.png"], caption: "抖音、快手、小红书『奶蛙』话题页截图" },
        { src: "assets/img/a/A_image2-masked.png", caption: "直播截图，来源：网络流传片段" },
        { src: "assets/img/a/A_image6-notice.png", caption: "奶龙官方相关提示截图" }
      ] },
      { title: "奶蛙不是奶龙", paragraphs: [
        "奶龙是官方为儿童打造的可爱恐龙，身体圆润柔软。奶蛙没有官方设定，是一个梨形身体、细手细脚的抽象形象，靠「捧腹狂笑」走红。",
        "没有官方设定，不等于没有含义。膨大的肚子、细细的手脚、失控又硬撑的笑，再加上魔性的笑声，这些稳定的特征就是奶蛙的核心，网友的各种二创都是在这个核心上叠加出来的。"
      ] },
      { title: "为什么它能装下我们的情绪？", points: [
        { title: "一张图顶一段话", text: "尴尬、无语、哭笑不得这些说不清的情绪，发一张奶蛙就够了，懂的人自然懂。" },
        { title: "人人都能改，但都保留那张脸", text: "奶蛙没有版权设定，谁都可以二创，但改来改去，大家保留的始终是那张「笑到失控」的脸。" },
        { title: "大家一起造出来的", text: "奶蛙的生命力很大程度来自网友的集体创作。表情包、名画恶搞、现实场景 P 图，每个人都是它的「生产者」。" },
        { title: "从线上走到线下", text: "2026 年下半年起，内地和香港多所高校陆续出现学生自发放置的奶蛙立牌（见第 4 屏），又通过社交平台传回线上。" }
      ] }
    ]
  },

  // 理论（待补充）
  theory: {
    title: "我们用什么理论看奶蛙",
    status: "待补充",
    cards: [
      { title: "符号学", hint: "能指和所指、外延和内涵", text: "" },
      { title: "Myth", hint: "“呆萌加强烈情绪”的反差怎么变成了常识", text: "" },
      { title: "后现代", hint: "荒诞、戏谑、解构", text: "" }
    ]
  },

  // 三个视频（视频文件在 assets/video/）
  videos: {
    title: "三个视频，一种笑",
    intro: "从我们学的符号学的角度分析，三个奶蛙视频中的笑声、表情和动作都可以被视为传递意义的符号。视频都保留了奶蛙的标志性笑声和动作，同时通过不同的场景和表演方式添加新的含义。",
    items: [
      {
        title: "奶蛙捧腹大笑（原视频）",
        video: "assets/video/video-1.mp4",
        poster: "assets/video/video-1-poster.jpg",
        text: "首先，在第一个奶蛙经典捧腹大笑的视频中，映入眼帘的奶蛙，有着黄色、圆滚滚的身体和夸张的五官；在我看来，它的外形有些丑怪。接着它张大嘴、眯起眼睛、捧着肚子，并在后面躺到地上，这些是画面呈现的外延意义（Denotation）；这种外形配上张嘴狂笑的表情和魔性的笑声，让角色呈现出荒诞、滑稽的感觉，让观众联想到“笑到停不下来”的强烈情绪，并产生幽默效果，这属于内涵意义（Connotation）。这个视频是奶蛙最基础，最火的视频。至此，奶蛙的笑声和捧腹动作也因此成为容易辨认和模仿的表达元素。"
      },
      {
        title: "奶娃就这样和同桌上课",
        video: "assets/video/video-2.mp4",
        poster: "assets/video/video-2-poster.jpg",
        text: "在第二个开学课堂二创视频中，黑板、老师和学生奶蛙共同构成了校园场景，两个奶蛙偷笑、憋笑，并在老师转头时假装认真听课，这些画面和动作是视频的外延意义（Denotation）；在内涵意义（Connotation）上，奶蛙想笑又努力装认真的表现，让人联想到课堂上的紧张感和同学之间的小默契，也让观众在角色身上看到自己的学生时代。憋笑和大笑的动作结合，增加了视频的无厘头效果。熟悉奶蛙笑声的观众也可能由此认出奶蛙的网络梗，感受到一种共同的文化经验。"
      },
      {
        title: "真人模仿视频",
        video: "assets/video/video-3.mp4",
        poster: "assets/video/video-3-poster.jpg",
        text: "在第三个真人模仿视频中，三个人类用捧腹、弯腰或仰头的动作模仿着奶蛙大笑，这是画面的外延意义（Denotation）；对熟悉原视频的观众来说，这些动作可能让人联想到奶蛙，也表现出创作者们对网络meme的参与和对共同笑点的分享，而动画角色和真人表演之间的外形反差也可能带来新的幽默感，这些都是内涵意义（Connotation）。"
      }
    ],
    conclusion: "三个视频都保留了奶蛙“笑到失控”这个稳定的核心符号：原视频建立了它，课堂二创把它和学生时代的憋笑经验连在一起，真人模仿则让观众亲身参与这个共同笑点。因此，奶蛙视频的情绪价值并不只来自好笑，而是来自观众在熟悉的符号里看到自己、并和他人分享同一种笑。",
    pending: [],
    sources: [
      { label: "视频 1：奶蛙捧腹大笑（原视频）", url: "https://youtube.com/shorts/vNjrMPydWZc" },
      { label: "视频 2：奶娃就这样和同桌上课（抖音）", url: "https://v.douyin.com/uX8iyT-s1sk/" },
      { label: "视频 3：真人模仿视频（抖音）", url: "https://www.douyin.com/search/%E6%B3%BD%E5%87%AF%E5%A5%B6%E8%9B%99?aid=ea92a625-c97b-4a47-8c6e-0008dad774be&modal_id=7700199686909807779&type=video" }
    ]
  },

  // 四张表情包
  emoji: {
    title: "四张表情，四种回应",
    lead: "在这一部分，我们把重点放在静态表情包进入聊天之后的作用：人们会在什么情境下发送它，以及它能替用户表达什么。",
    mythTitle: "共同文化认知：奶蛙怎样被大家读懂",
    myth: [
      "奶蛙有一组比较容易辨认的视觉特征：黄色身体、绿色大眼睛、圆滚滚的身形，以及略显笨拙的姿态。与此同时，它的动作和表情往往比较夸张。呆萌的外形与强烈的情绪表现形成反差，让奶蛙在不同表情包中仍保留相对鲜明的形象特点。",
      "在网络传播和日常聊天中，用户会结合图片中的动作、文字和具体语境理解奶蛙。例如，看到它摆出战斗姿势，可能会联想到逞强或准备接招；看到它捧腹大笑，则可能理解为开心、嘲笑，也可能是在表达讽刺。同一张图片在不同聊天关系和语境中，含义也可能有所变化。",
      "因此，分析奶蛙表情包时，既要注意它相对稳定的外形和动作线索，也要考虑用户发送图片时的具体情境。经过反复使用，一些常见的理解方式逐渐为网友熟悉，使奶蛙成为日常聊天中可以被识别和借用的情绪表达符号。",
      "奶蛙先有容易辨认的形象特征和反差感，用户再结合自己的处境赋予具体情绪。经过重复使用，部分读法逐渐成为群体熟悉的文化认知。这就是奶蛙从一个卡通形象变成共享情绪符号的过程。"
    ],
    items: [
      {
        title: "扎马步的奶蛙", emotion: "逞强、自信与接招", image: "assets/evidence/d-01.webp",
        denotation: "一只黄色、圆滚滚的奶蛙张开双腿，摆出类似武术的战斗姿势。",
        connotation: "它的身体看起来笨拙，姿势却十分认真，因此容易让人联想到“准备好了”“放马过来”或故作强势。",
        usage: "朋友互相调侃、开玩笑地接受挑战，或想表现自己不服输时，可以发送这张图。它传达的通常不是严肃威胁，而是一种带有玩笑感的逞强。"
      },
      {
        title: "捧腹大笑的奶蛙", emotion: "开心、嘲笑与讽刺", image: "assets/evidence/d-02.webp",
        denotation: "奶蛙闭着眼睛、张大嘴巴，双手捂住肚子，呈现出大笑的状态。",
        connotation: "它可以表示真的觉得好笑，也可以带有幸灾乐祸、嘲笑或“这也太离谱了”的讽刺意味。",
        usage: "当朋友讲了一件荒唐的事，或聊天中出现令人哭笑不得的情况时，这张图可以代替一段解释。发送者借夸张的大笑表达态度，同时保留玩笑的余地。"
      },
      {
        title: "“惊鸿一瞥”的奶蛙", emotion: "惊讶、愣住与反讽", image: "assets/evidence/d-03.webp",
        denotation: "一只黄色奶蛙突出绿色眼睛，表情显得呆滞，图片配有“惊鸿一瞥”的文字。",
        connotation: "“惊鸿一瞥”原本带有优美、诗意的意味；与奶蛙呆滞的眼神放在一起后，文字和图像产生反差，容易被读成震惊、看傻了，或带有反讽意味的赞美。",
        usage: "看到意料之外的消息、奇怪的行为，或遇到让人一时不知道如何回应的内容时，可以用它表达“我看到了，但我有点说不出话”。"
      },
      {
        title: "雨天流泪的奶蛙", emotion: "委屈、疲惫与自我调侃", image: "assets/evidence/d-04.webp",
        denotation: "奶蛙坐在雨天的车里，低头看着一本写有“成为一只平静的龙，要流多少眼泪”的书，眼角带泪，神情低落。",
        connotation: "雨景、眼泪、低头阅读的姿态，以及书上的文字共同营造出一种安静而压抑的氛围。它可以让人联想到表面想保持平静、内心却有些受伤的状态，也带有把难过说得轻一点的自我调侃。",
        usage: "当用户感到委屈、疲惫、情绪低落，或不想直接解释发生了什么时，可以发送这张图。它表达的未必是严重的悲伤，也可能只是“今天有点撑不住”“我懂，但我先不说了”，并给对方留下回应和安慰的空间。"
      }
    ],
    values: [{"title": "降低表达成本", "text": "在聊天中，用户不一定每次都需要把情绪完整地说出来。一张表情包可以简短地传递态度，尤其适合回应那些不需要长篇解释、但又希望对方理解的日常情境。"}, {"title": "让情绪表达更间接，减少尴尬", "text": "有些感受不容易直接说出口，例如无语、委屈或疲惫。借助奶蛙夸张或呆萌的形象，用户可以用相对轻松的方式表达这些感受，减少直接倾诉时可能出现的尴尬，也让聊天气氛不至于过于沉重。"}, {"title": "帮助获得共鸣，缓和社交氛围", "text": "当聊天双方熟悉某张表情包的常见读法时，它可以成为一种互动线索。例如，发送雨天流泪的奶蛙，可能是在暗示自己有些难过，也为朋友询问近况或表达安慰提供一个入口。不过，对方是否能准确理解，仍取决于双方的关系和具体语境。"}],
    summary: "四张图片呈现出不同的情绪倾向：扎马步的奶蛙偏向逞强和接招，捧腹大笑的奶蛙可以表达开心或讽刺，“惊鸿一瞥”的奶蛙偏向惊讶和一时语塞，雨天流泪的奶蛙则更接近委屈、疲惫和自我调侃。由此可见，奶蛙表情包并不只用于制造笑点，也可以承载不同程度的情绪表达。",
    conclusion: ["奶蛙表情包的意义不只在于制造笑点。它以相对容易辨认的形象为基础，通过不同动作、表情和文字呈现多种情绪。用户会结合自己的处境和聊天语境理解这些图像，使它们成为日常交流中一种简短而灵活的表达方式。", "从这四张表情包可以看出，奶蛙能够在日常聊天中发挥一定的情绪价值：它让态度更容易传达，也让委屈、疲惫或无语等感受可以通过较轻松的方式表达。同时，表情包还可能为朋友之间的回应、共鸣和安慰创造机会。它不只是“好笑”，也可以成为人们传递情绪的一种视觉语言。", "至于这些常见读法如何进一步形成文化意义，以及其中哪些观念可能在传播中变得理所当然，将由 B 部分结合 Myth 理论和后现代主义继续分析；视频中的笑声、动作和二创传播则由 C 部分展开。"],
    sources: [{"label": "图一 扎马步的奶蛙 · 小红书 @akane_Aki", "url": "https://www.xiaohongshu.com/discovery/item/69dbebf7000000002102c3ec?source=webshare&xhsshare=pc_web&xsec_token=AB-gxJ4rwJnWjssb9Qjkun-Ry9-hmY0JFc07PFTK22_qY=&xsec_source=pc_share"}, {"label": "图二 捧腹大笑的奶蛙 · 小红书 @Shea《奶蛙到底在笑什么》", "url": "https://www.xiaohongshu.com/discovery/item/6ae296bb000000003601ab7c?source=webshare&xhsshare=pc_web&xsec_token=ABOLA3g-cfkdDerCkc--Jc6y0xZByXO-3HoCGGCZpzfBM=&xsec_source=pc_share"}, {"label": "图三 “惊鸿一瞥”的奶蛙 · 小红书 @云舒云卷《3D奶蛙审美积累》", "url": "https://www.xiaohongshu.com/discovery/item/6aa8f97a0000000028031722?source=webshare&xhsshare=pc_web&xsec_token=ABHQtP1U1PcjkGFiSzyX_l6Vd_ihx9lmmTNI6ksoQ0-Dk=&xsec_source=pc_share"}, {"label": "图四 雨天流泪的奶蛙 · 小红书 @Bojack🐗《成为一个平静的龙,需要掉许多眼泪》", "url": "https://www.xiaohongshu.com/discovery/item/6a06eecf000000003502e4f3?source=webshare&xhsshare=pc_web&xsec_token=ABKSYYW0a82wbk1REqyy0lHc3qgqSpTM5-XM2NcPJQIi4=&xsec_source=pc_share"}],
    pending: []
  },

  // 使用场景与证据
  evidence: {
    title: "朋友、恋人、同事，用的是同一只蛙",
    lead: "第四幕的三段聊天里，三种关系、三种情绪，用的都是奶蛙表情包。",
    scenes: [
      { relation: "朋友之间", feeling: "无语", sticker: "assets/stickers/d-03.webp", name: "惊鸿一瞥",
        text: "被放鸽子的不满不用打字吐槽，一眼就够，也不伤和气。" },
      { relation: "恋人之间", feeling: "调侃", sticker: "assets/stickers/s-zhandou.png", name: "切换战斗模式",
        text: "不用正经回“我也爱你”，用调侃接住甜言蜜语，亲密又不肉麻。" },
      { relation: "同事之间", feeling: "嘲笑", sticker: "assets/stickers/d-02.webp", name: "捧腹大笑",
        text: "把朋友的社死变成两个人一起笑的事，笑完马上追问，嘲笑里也带着关心。" }
    ],
    comments: [
      { text: "不敢笑，学生时代真经历过", likes: "9300 赞", screenshot: "", note: "见下方「评论与弹幕」截图" },
      { text: "其实奶蛙一直都是平常现实中那些我们看不见的人和事……是因为现实中真有和奶蛙一样的人😭", likes: "1107 赞", screenshot: "", note: "见下方「评论与弹幕」截图" }
    ],
    /* 图片列表：每一项 { src: "图片路径", caption: "图片下面的小字" }。
       新图片放进 assets/uploads/，再照着下面的格式加一行（注意行尾的英文逗号）。
       列表为空 [] 时网页显示「待补充」。 */
    chatShotsTitle: "聊天里的奶蛙",
    chatShots: [
      { src: "assets/uploads/chat-02-game-group.jpg", caption: "开黑群：叫人上号，对方回一张打球的奶蛙，再收到一张「惊鸿一瞥」" },
      { src: "assets/uploads/chat-05-boyfriend.jpg", caption: "情侣之间：「我发现我变心了」，回一张抱头奶蛙和「切换战斗模式」" },
      { src: "assets/uploads/chat-03-coworker-meeting.jpg", caption: "同事之间：开会时视频号爆大声，回一张捧腹大笑的奶蛙" },
      { src: "assets/uploads/chat-04-friends-late.jpg", caption: "朋友之间：「又熬到这么晚了」，回一张「惊鸿一瞥」" },
      { src: "assets/uploads/chat-01-coworker-miss.jpg", caption: "同事之间：「我明天不想去上班」，用奶蛙表情说舍不得" }
    ],
    offlineTitle: "线下的奶蛙",
    offlineLead: "从街头到校园：香港七所高校里都拍到了奶蛙。",
    offline: [
      { src: "assets/uploads/offline-01-lemon-tea.jpg", caption: "柠檬茶店门口的奶蛙立牌" },
      { src: "assets/uploads/offline-02-car-sticker.jpg", caption: "车尾贴纸「惊鸿一瞥」" },
      { src: "assets/uploads/offline-03-canteen-fruit.jpg", caption: "食堂水果摊的奶蛙立牌和奶蛙脸西瓜" },
      { src: "assets/uploads/offline-04-eduhk-balcony.jpg", caption: "香港教育大学 EdUHK · 阳台" },
      { src: "assets/uploads/offline-12-eduhk-711.jpg", caption: "香港教育大学 EdUHK · 7-Eleven 上方" },
      { src: "assets/uploads/offline-10-xhs-eduhk.jpg", caption: "小红书帖子「港教大奶娃」：关注领奶蛙贴纸和徽章" },
      { src: "assets/uploads/offline-05-polyu.jpg", caption: "香港理工大学 PolyU" },
      { src: "assets/uploads/offline-06-cityu.jpg", caption: "香港城市大学 CityU" },
      { src: "assets/uploads/offline-07-hkust.jpg", caption: "香港科技大学 HKUST" },
      { src: "assets/uploads/offline-08-cuhk.jpg", caption: "香港中文大学 CUHK" },
      { src: "assets/uploads/offline-09-hku.jpg", caption: "香港大学 HKU" },
      { src: "assets/uploads/offline-11-hkbu-70.jpg", caption: "香港浸会大学 HKBU · 70 周年校庆" }
    ],
    commentsTitle: "评论与弹幕",
    commentImages: [
      { src: "assets/uploads/comment-08-class.jpg", caption: "奶蛙上课视频（4641 条评论）：「不敢笑，学生时代真经历过」9300 赞" },
      { src: "assets/uploads/comment-04-nanjing.jpg", caption: "南京传媒学院定位视频（3.3 万评论）：「检测到奶蛙被欺负，呼叫全网奶家军」6.7 万赞；「其实奶蛙一直都是平常现实中那些我们看不见的人和事…」" },
      { src: "assets/uploads/comment-03-grandma.jpg", caption: "奶蛙外婆视频（2.5 万条评论）：「全网最尊重奶娃之人」21.6 万赞；「边看评论边掉眼泪」" },
      { src: "assets/uploads/comment-05-rain.jpg", caption: "雨中奶蛙救赎（1.4 万评论）：「这个奶娃的救赎拍成真人版的话…」4.8 万赞" },
      { src: "assets/uploads/comment-07-coffee.jpg", caption: "冲咖啡视频（1.2 万评论）：「这要死不活的表情笑死我了」9.5 万赞；「忙活半天喝杯热水」" },
      { src: "assets/uploads/comment-02-renaissance.jpg", caption: "文艺复兴合集（9224 条评论）：「这期真有教育意义 我第一次知道了名画背后的故事」7.0 万赞" },
      { src: "assets/uploads/comment-01-mabu.jpg", caption: "奶蛙大笑突然严肃 / 模仿马步视频（1782 条评论）：「难得刷到一个做对的，其他人的都不握拳」" },
      { src: "assets/uploads/comment-06-guard.jpg", caption: "奶蛙立牌被保安搬走（1400 条评论）：「保安想要就自己买啊」2.0 万赞" }
    ],
    interviews: [
      "我一般在需要回复别人消息的时候会使用奶蛙的表情包，因为我觉得这样会很风趣幽默"
    ],
    // 访谈截图：问题是「你一般什么时候发奶蛙」
    interviewImages: [
      { src: "assets/uploads/interview-01.jpg", caption: "想让气氛活跃起来的时候发，或者大家都发了就跟着发" },
      { src: "assets/uploads/interview-02.jpg", caption: "有别人发的时候跟风发；觉得它丑萌，很搞笑" },
      { src: "assets/uploads/interview-03.jpg", caption: "想开怀大笑的时候" }
    ]
  },

  // F 期刊对照（徐紫嫣定稿）
  journal: {
    title: "别人也研究过",
    member: "徐紫嫣",
    paperTitle: "Youth culture of self-mockery: bodily memes and economies of affect in China’s online space",
    paperZh: "青年自嘲文化：中国网络空间中的身体 Meme 与情感经济",
    authors: "Peng (2026)",
    citation: "Peng, J. (2026). Youth culture of self-mockery: bodily memes and economies of affect in China’s online space. Chinese Journal of Communication, 19(3), 330-346.",
    blocks: [
      { title: "一、从“内敛自嘲”到“外放狂笑”", paras: [
        "Peng撰写的论文《Youth culture of self-mockery: bodily memes and economies of affect in China’s online space》（青年自嘲文化：中国网络空间中的身体Meme与情感经济），研究了中国青年是如何通过“身体Meme”（bodily memes）来进行情感表达的。Peng梳理了近十年来从“屌丝”、“丧”到“躺平”的文化演变，并借用了Ahmed的“情感经济”（affective economy）概念，指出Meme是情感的黏合剂：“memes function as the abstraction and medium of affects or, in Ahmed’s words, ‘sticky signs’ binding subjects together” (Peng, 2026, p. 332)。在聊天中发奶蛙，是为了把双方的情绪连接起来。",
        "更重要的是，Peng指出用户在传播Meme时，并非被动接受，而是通过将个人的生活语境加入共享的模板中，来主动“表演”情绪：“Users perform emotions by adding shared memetic templates with varied individual contexts, connecting individuals with shared experiences and fostering collective identities and communities” (Peng, 2026, p. 332)。",
        "在仔细阅读Peng的研究后，我发现了一个非常有趣的对照点。Peng研究的“自嘲文化”，如“葛优瘫”、“咸鱼”、“躺平”，其核心是“内敛的消解”，年轻人在面对过度竞争时，通过自我降级、展示疲态来被动抵抗。但我们组研究的奶蛙，展现的却是一种“外放的狂欢”。朋友约打游戏被放鸽子时回一张「惊鸿一瞥」，朋友开会社死时先回「捧腹大笑」再追问关心，情侣说甜言蜜语时用「切换战斗模式」调侃回去。奶蛙的情绪更多是“我笑死”、“我准备好了”，即使是累和委屈，也常常用硬撑和搞笑的方式表达出来。不过它们底层逻辑一致，奶蛙同样是一个典型的“身体Meme”，人们利用奶蛙夸张的身体姿态作为共享模板，来与他人完成社交连接。",
        "如果说“自嘲Meme”是青年在压力下的“向内收缩”，那么“奶蛙Meme”就是青年在压力下的“向外释放”。但在情感经济的运作机制下，它们都是高度符号化、被自然化、且极具后现代解构色彩的文化产物。"
      ] },
      { title: "二、总结", paras: [
        "综上所述，奶蛙的情绪价值不是凭空产生的，而是有着清晰的逻辑。奶蛙通过极简的视觉符号，实现“外延到内涵”的秒懂，降低了沟通成本；部分二创可以用拼贴（pastiche）来理解：它们用荒诞和无厘头冲淡了沉重的生活压力，但荒诞始终叠在「笑到失控」这一稳定核心之上。它也是中国青年利用“身体Meme”进行情感经济运作的典型案例，只不过它提供了一种与“丧文化”不同的、更具外放和社交属性的解压模板。"
      ] }
    ],
    contrast: [
      { label: "自嘲 Meme", eg: "葛优瘫 · 咸鱼 · 躺平", line: "向内收缩：自我降级、展示疲态" },
      { label: "奶蛙 Meme", eg: "惊鸿一瞥 · 捧腹大笑 · 切换战斗模式", line: "向外释放：我笑死、我准备好了" }
    ]
  },

  // 07 结语（highlights 里的词会变成金色）
  closing: {
    kicker: "07 · 结语",
    title: "一整天的情绪，同一只蛙",
    conclusion: "奶蛙的情绪价值不只是我们自己给它的。它本身就有一个稳定的核心，就是那张「笑到失控」「明明没事却在逞强」的脸。我们再把自己的尴尬、无语和委屈叠到这张脸上。一只蛙替我们把说不出口的话说了出来，于是我们在它身上认出了自己。",
    highlights: ["笑到失控", "明明没事却在逞强", "于是我们在它身上认出了自己"],
    // 页面最底下的一行小字参考资料
    references: "参考：Barthes, Roland. Mythologies.（版本与页码待补充）；Peng, J. (2026). Youth culture of self-mockery: bodily memes and economies of affect in China’s online space. Chinese Journal of Communication, 19(3), 330-346."
  },

  // 08 小组成员与分工
  team: {
    kicker: "08 · 小组成员",
    title: "我们六个人",
    members: [
      { name: "刘牧雁", role: "项目引言与展示 PPT", detail: "提出研究问题：奶蛙的情绪价值从哪里来" },
      { name: "王琪", role: "理论框架", detail: "符号学的直接意指与含蓄意指、巴特的「神话」、后现代视角" },
      { name: "周嘉滢", role: "视频细读", detail: "分析三个奶蛙视频，归纳「笑到失控」这个稳定的核心符号" },
      { name: "杨琦", role: "表情包细读", detail: "分析四款奶蛙表情包怎么制造情绪价值" },
      { name: "林芷茵", role: "使用证据与网页策划", detail: "使用证据收集（评论区、线下校园、访谈），以及网页的整体叙事和策划" },
      { name: "徐紫嫣", role: "期刊文献", detail: "用学术研究支撑和对照本组的论点" }
    ]
  },

  // 最后一屏
  thanks: {
    line1: "THANK YOU",
    line2: "FOR WATCHING",
    image: "assets/img/s6-end.jpg",
    disclaimer: "本网站为 CUS6032 课程作业，所引截图和视频仅用于学术评论与分析，版权归原作者所有；部分个人信息已作匿名处理。"
  }
};
