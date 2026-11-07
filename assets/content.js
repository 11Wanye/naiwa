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

  // 奶蛙是什么（待补充）
  intro: {
    title: "奶蛙是什么",
    status: "待补充",
    lead: "奶蛙简介：简史、起源、为什么成为梗，以及与奶龙的区别。",
    paragraphs: []
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
        text: "在第二个开学课堂二创视频中，黑板、老师和学生奶蛙共同构成了校园场景，两个奶蛙偷笑、憋笑，并在老师转头时假装认真听课，视频中还出现了“安迪”和“卡脚先”两个衍生语。这些画面、动作和声音是视频的外延意义（Denotation）；在内涵意义（Connotation）上，奶蛙想笑又努力装认真的表现，让人联想到课堂上的紧张感和同学之间的小默契，也让有类似经历的观众在角色身上看到自己的学生时代。“安迪”和“卡脚先”作为奶蛙相关的声音符号，与憋笑和大笑的动作结合，增加了视频的无厘头效果。熟悉这些声音的观众也可能由此认出奶蛙的网络梗，感受到一种共同的文化经验。"
      },
      {
        title: "我必须变得更强！",
        video: "assets/video/video-3.mp4",
        poster: "assets/video/video-3-poster.jpg",
        text: "在第三个真人模仿视频中，三个人类用捧腹、弯腰或仰头的动作模仿着奶蛙大笑，这是画面的外延意义（Denotation）；对熟悉原视频的观众来说，这些动作可能让人联想到奶蛙，也表现出创作者们对网络meme的参与和对共同笑点的分享，而动画角色和真人表演之间的外形反差也可能带来新的幽默感，这些都是内涵意义（Connotation）。"
      }
    ],
    conclusion: "三个视频都保留了奶蛙“笑到失控”这个稳定的核心符号：原视频建立了它，课堂二创把它和学生时代的憋笑经验连在一起，真人模仿则让观众亲身参与这个共同笑点。因此，奶蛙视频的情绪价值并不只来自好笑，而是来自观众在熟悉的符号里看到自己、并和他人分享同一种笑。",
    pending: [
      "“安迪”“卡脚先”的出处与含义待补充。"
    ]
  },

  // 四张表情包
  emoji: {
    title: "四张表情，四种回应",
    lead: "在这一部分，我们把重点放在静态表情包进入聊天之后的作用：人们会在什么情境下发送它，以及它能替用户表达什么。",
    mythTitle: "Myth（神话）：奶蛙如何形成共同的文化认知？",
    myth: [
      "在 Roland Barthes（罗兰·巴特）的符号学理论中，Myth 并不是传统意义上的神话故事，而是指一个已经形成的符号被再次赋予文化意义；当某种社会观念在反复传播中变得熟悉，它就可能被人们当作自然、理所当然的理解方式。",
      "奶蛙有一组相对稳定、容易辨认的视觉特征：黄色身体、绿色大眼睛、圆滚滚的身形和略显笨拙的姿态。与此同时，它又常常呈现出强烈、夸张的情绪。呆萌外形与情绪表现之间的反差，为奶蛙留下了鲜明的识别特点。",
      "当网友反复转发、改图和使用奶蛙时，这种反差逐渐变成一种熟悉的网络表达方式。看到奶蛙摆出战斗姿势，人们容易联想到逞强或准备接招；看到它捧腹大笑，可能会理解为开心、嘲笑或讽刺。这些联想并不是由单张图片自动决定的，而是在图像线索、文字提示、聊天关系和网络使用习惯共同作用下形成。",
      "因此，奶蛙的核心含义并非完全由每位用户临时决定。它先有容易辨认的形象特征和反差感，用户再结合自己的处境赋予具体情绪。经过重复使用，部分读法逐渐成为群体熟悉的文化认知。这就是奶蛙从一个卡通形象变成共享情绪符号的过程。"
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
    values: [
      { title: "降低表达成本", text: "在聊天中，用户不一定需要把情绪完整说出来。一张表情包可以快速传递态度，尤其适合回应那些不值得长篇解释、但又希望对方理解的日常情境。" },
      { title: "让情绪表达更间接，减少尴尬", text: "有些情绪不容易直接说出口，例如无语、委屈或疲惫。借助奶蛙夸张或呆萌的形象，用户可以把情绪包装成玩笑，既表达了真实感受，也避免让聊天气氛过于沉重。" },
      { title: "帮助获得共鸣，缓和社交氛围", text: "当对方能够识别这张图的常见含义时，表情包就成为双方共享的表达线索。例如，发送雨天流泪的奶蛙，可能是在暗示自己有些难过，也是在给朋友一个关心或安慰自己的机会。在轻松的互动中，用户能够感到自己的情绪被看见，而不必马上展开严肃谈话。" }
    ],
    summary: "四张图片呈现的情绪并不相同：扎马步偏向逞强和接招，捧腹大笑偏向开心或讽刺，“惊鸿一瞥”偏向震惊和失语，雨天流泪则偏向委屈、疲惫和自我调侃。它们共同说明，奶蛙并不只承担“搞笑”这一种功能。",
    conclusion: [
      "奶蛙表情包的价值不只是制造笑点。它以相对稳定的呆萌形象为基础，通过不同动作、表情和文字承载多种情绪。用户在共同文化认知的基础上，再把自己的具体经验带入图片，使它成为一种方便、间接而容易被理解的聊天语言。",
      "因此，奶蛙能够在日常交流中发挥情绪价值：它降低表达成本，让人们可以用玩笑的方式表达复杂感受，也为共鸣、安慰和缓和气氛创造机会。它不只是“好笑”，也是一种帮助人们处理和传递情绪的视觉符号。"
    ],
    pending: [
      "四张表情包的发布者与原始链接待补充。",
      "Barthes《Mythologies》的版本、页码等详细书目信息待补充。"
    ]
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

  // 期刊对照（待补充）
  journal: {
    title: "别人也研究过",
    status: "待补充",
    paperTitle: "", authors: "", citation: "", url: "",
    comparison: [
      { dimension: "研究对象", paper: "", naiwa: "" },
      { dimension: "研究方法", paper: "", naiwa: "" },
      { dimension: "情绪与文化意义", paper: "", naiwa: "" }
    ]
  },

  // 07 结语（highlights 里的词会变成金色）
  closing: {
    kicker: "07 · 结语",
    title: "一整天的情绪，同一只蛙",
    conclusion: "奶蛙的情绪价值不只是我们自己给它的。它本身就有一个稳定的核心，就是那张「笑到失控」「明明没事却在逞强」的脸。我们再把自己的尴尬、无语和委屈叠到这张脸上。一只蛙替我们把说不出口的话说了出来，于是我们在它身上认出了自己。",
    highlights: ["笑到失控", "明明没事却在逞强", "于是我们在它身上认出了自己"],
    // 页面最底下的一行小字参考资料
    references: "参考：Barthes, Roland. Mythologies.（版本与页码待补充）"
  },

  // 08 小组成员与分工
  team: {
    kicker: "08 · 小组成员",
    title: "我们六个人",
    members: [
      { name: "刘牧雁", role: "项目引言与展示 PPT", detail: "提出研究问题：奶蛙的情绪价值从哪里来" },
      { name: "王琪", role: "理论框架", detail: "符号学的直接意指与含蓄意指、巴特的「神话」、后现代视角" },
      { name: "周嘉滢", role: "视频细读", detail: "分析三个奶蛙视频，归纳「笑到失控」这个稳定的核心符号" },
      { name: "杨琪", role: "表情包细读", detail: "分析四款奶蛙表情包怎么制造情绪价值" },
      { name: "林芷茵", role: "使用证据与网页策划", detail: "使用证据收集（评论区、线下校园、访谈），以及网页的整体叙事和策划" },
      { name: "徐紫嫣", role: "期刊文献", detail: "用学术研究支撑和对照本组的论点" }
    ]
  },

  // 最后一屏
  thanks: {
    line1: "THANK YOU",
    line2: "FOR WATCHING",
    image: "assets/img/s6-end.jpg"
  }
};
