// 花卉数据
const flowersData = {
  玫瑰: {
    name: "玫瑰",
    scientificName: "Rosa rugosa",
    family: "蔷薇科 蔷薇属",
    bloomingPeriod: "5-9月",
    origin: "中国、日本、朝鲜",
    flowerLanguage: "爱情、美丽、尊敬",
    tags: ["木本植物", "观赏花卉", "喜阳"],
    intro: `玫瑰是蔷薇科蔷薇属落叶灌木，原产于中国，现广泛分布于世界各地。玫瑰茎直立，高可达2米，茎上有密集的锐刺，叶片为羽状复叶，小叶5-9片，边缘有尖锐锯齿。
    玫瑰花色丰富，常见的有红色、粉色、白色、黄色等，花型优美，香气浓郁，是著名的观赏花卉，也是爱情的象征。玫瑰的果实为蔷薇果，成熟时呈红色或橙色，可食用，含有丰富的维生素C。
    玫瑰不仅具有极高的观赏价值，还具有一定的药用价值，其花可入药，具有理气解郁、活血散瘀的功效。此外，玫瑰还可用于提取精油，制作香水、化妆品等。`,
    care: {
      light: "玫瑰是喜阳植物，每天需要至少6小时的充足光照。光照不足会导致植株徒长，开花减少，香气变淡。建议种植在庭院或阳台等光照充足的地方。",
      water: "玫瑰喜湿润，但不耐涝。浇水应遵循“见干见湿”的原则，即土壤表面干燥后再浇水，浇则浇透。夏季高温时可适当增加浇水频率，冬季则应减少浇水，避免土壤积水导致烂根。",
      fertilizer: "玫瑰喜肥，生长期应定期施肥。春季发芽后可施一次氮肥，促进枝叶生长；花期前应施磷钾肥，促进花芽分化和开花；花后可施一次复合肥，补充养分。施肥时应注意薄肥勤施，避免肥料过浓烧伤根系。",
      pruning: "玫瑰花期后应及时修剪，剪去残花和枯枝，促进新枝萌发。冬季休眠期可进行重剪，剪去老枝、弱枝和病枝，保持植株通风透光，减少病虫害发生。"
    },
    disease: [
      {
        name: "白粉病",
        symptom: "叶片上出现白色粉末状斑点，逐渐扩大，严重时整个叶片布满白粉，叶片发黄脱落。",
        prevention: "加强通风透光，避免植株过于密集；发病初期可喷洒多菌灵或甲基托布津溶液，每隔7-10天喷一次，连续喷2-3次。"
      },
      {
        name: "黑斑病",
        symptom: "叶片上出现黑色圆形斑点，周围有黄色晕圈，严重时叶片大量脱落，影响植株生长。",
        prevention: "及时清除病叶，集中烧毁；发病初期可喷洒波尔多液或百菌清溶液，每隔7-10天喷一次，连续喷2-3次。"
      }
    ],
    images: [
      "https://img95.699pic.com/photo/60063/2006.jpg_wh860.jpg",
      "https://img95.699pic.com/photo/60046/6702.jpg_wh860.jpg",
      "https://img95.699pic.com/photo/60063/6401.jpg_wh860.jpg"

    ]
  },
  百合: {
    name: "百合",
    scientificName: "Lilium brownii var. viridulum",
    family: "百合科 百合属",
    bloomingPeriod: "6-8月",
    origin: "中国、日本、朝鲜半岛",
    flowerLanguage: "纯洁、高雅、祝福",
    tags: ["球根植物", "观赏花卉", "喜半阴"],
    intro: "百合是百合科百合属多年生草本球根植物，株高可达1米以上。鳞茎球形，由多数肉质鳞片组成。叶片互生，披针形至椭圆状披针形，全缘。花大而美丽，单生或成总状花序，花色丰富，有白、黄、粉、红等多种颜色，花型多样，有些品种具有芳香。百合不仅是著名的观赏花卉，其鳞茎还可食用和药用，具有润肺止咳、清心安神的功效。",
    care: {
      light: "百合喜半阴环境，忌强光直射。生长期需要充足的散射光，光照过强易导致叶片灼伤，光照不足则开花不良。",
      water: "百合喜湿润，但怕积水。生长期应保持土壤湿润，花期前后需水量较大，花后逐渐减少浇水。鳞茎休眠期保持土壤微干。",
      fertilizer: "百合喜肥，定植时可施足基肥，生长期每隔2-3周施一次稀薄液肥，花期前增施磷钾肥，促进开花。",
      pruning: "花后及时剪去花茎，减少养分消耗，有利于鳞茎的发育。"
    },
    disease: [
      {
        name: "根腐病",
        symptom: "鳞茎腐烂，叶片发黄枯萎，植株倒伏。",
        prevention: "选择排水良好的土壤，避免积水；发病初期可施用多菌灵等杀菌剂。"
      },
      {
        name: "蚜虫",
        symptom: "聚集在嫩梢和叶片上，吸食汁液，导致叶片卷曲变形。",
        prevention: "可用肥皂水或清水冲洗叶片；严重时可喷洒吡虫啉等杀虫剂。"
      }
    ],
    images: [
      "https://t3.focus-img.cn/sh740wsh/zx/duplication/9aec104f-1380-4425-a5c6-bc03000c4332.JPEG",
      "https://photo-static-api.fotomore.com/creative/vcg/veer/612/veer-101804271.jpg",
      "https://ts2.tc.mm.bing.net/th/id/OIP-C.C8OlV1Zrc_XTh2eA4XKp2wHaE8?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  多肉植物: {
    name: "多肉植物",
    scientificName: "Succulent plants",
    family: "多个科属",
    bloomingPeriod: "因品种而异",
    origin: "世界各地，以干旱地区为主",
    flowerLanguage: "坚强、可爱、独特",
    tags: ["多肉植物", "观赏植物", "耐旱"],
    intro: "多肉植物是指植物的根、茎、叶三种营养器官中的一种或几种退化变得肥厚多汁，用来贮藏水分的植物。它们分布于多个科属，形态各异，品种繁多，目前已知的多肉植物超过10000种。多肉植物具有很强的适应性和耐旱性，生长速度较慢，形态奇特，观赏价值高，是近年来非常流行的室内观赏植物。它们不仅易于养护，还能净化空气，适合忙碌的都市人群种植。",
    care: {
      light: "大多数多肉植物喜充足阳光，光照不足会导致徒长，株型松散。但夏季高温时需适当遮阴，避免叶片灼伤。",
      water: "多肉植物耐旱怕涝，浇水应遵循“干透浇透”的原则。生长期可适当增加浇水，休眠期则减少浇水甚至停止浇水。",
      fertilizer: "多肉植物对肥料需求不高，生长期每月施一次稀薄的多肉专用肥即可，冬季停止施肥。",
      pruning: "平时可修剪杂乱的枝条和枯叶，保持株型美观。有些品种可通过修剪促进分枝，形成更丰满的株型。"
    },
    disease: [
      {
        name: "黑腐病",
        symptom: "植株基部腐烂发黑，叶片变软脱落。",
        prevention: "避免土壤积水，保持通风良好；发病初期及时切除腐烂部分，消毒后重新栽种。"
      },
      {
        name: "介壳虫",
        symptom: "叶片上出现白色小虫子，吸食汁液，分泌蜜露。",
        prevention: "加强通风，少量时可用牙签剔除；严重时可喷洒杀扑磷等杀虫剂。"
      }
    ],
    images: [
      "https://ts1.tc.mm.bing.net/th/id/R-C.54b2c66098e73577562f9a8cf4cf1e47?rik=lCaZ9Zw7dhGCDA&riu=http%3a%2f%2fwww.1818hm.com%2ffile%2fupload%2f201508%2f29%2f09-26-26-29-5.jpg&ehk=qgdd7ph8xpWyIq78ZJwJJWJi%2ftDEHowUechAJkSboXg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
      "https://ts4.tc.mm.bing.net/th/id/OIP-C.IBgaZ8UpsQFSw8nRaweAoQHaD4?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://img.shetu66.com/2024/04/24/171395364312771271.png"
    ]
  },
  薰衣草: {
    name: "薰衣草",
    scientificName: "Lavandula angustifolia",
    family: "唇形科 薰衣草属",
    bloomingPeriod: "6-8月",
    origin: "地中海沿岸",
    flowerLanguage: "等待爱情、浪漫、纯洁",
    tags: ["草本植物", "芳香植物", "喜阳"],
    intro: "薰衣草是唇形科薰衣草属多年生草本或半灌木植物，株高30-60厘米。叶片细长，呈灰绿色，表面有绒毛。花茎直立，顶生穗状花序，花小而密集，呈蓝紫色或紫色，具有浓郁的芳香。薰衣草不仅是著名的观赏植物，其花可提取精油，具有镇静安神、舒缓情绪的功效，广泛用于香水、化妆品和芳香疗法中。在园艺中，薰衣草还是很好的蜜源植物和驱虫植物。",
    care: {
      light: "薰衣草是强阳性植物，需要充足的阳光，每天至少需要6小时以上的直射光，光照不足会导致生长不良，开花减少。",
      water: "薰衣草耐旱怕涝，喜干燥环境。浇水应遵循“宁干勿湿”的原则，土壤表面完全干燥后再浇水，避免根部积水。",
      fertilizer: "薰衣草对肥料要求不高，春季发芽后可施一次缓释肥，花期前增施磷钾肥，促进开花和香气浓郁。",
      pruning: "花后及时修剪花茎，可促进分枝，保持株型丰满。冬季来临前进行一次重剪，以利越冬。"
    },
    disease: [
      {
        name: "根腐病",
        symptom: "根部腐烂，植株萎蔫，叶片发黄脱落。",
        prevention: "选择排水良好的土壤，避免积水；控制浇水量，保持土壤适度干燥。"
      },
      {
        name: "红蜘蛛",
        symptom: "叶片背面出现细小黄点，严重时叶片枯黄脱落，有蛛网。",
        prevention: "保持通风良好，增加空气湿度；严重时可喷洒阿维菌素等杀虫剂。"
      }
    ],
    images: [
      "https://image.jiajiase.com/5390e656b6cac197e222d02dfcddbddc.jpg",
      "https://img95.699pic.com/photo/30506/5734.jpg_wh860.jpg",
      "https://img95.699pic.com/photo/50771/3182.jpg_wh860.jpg"

    ]
  },
  茉莉: {
    name: "茉莉",
    scientificName: "Jasminum sambac",
    family: "木犀科 茉莉属",
    bloomingPeriod: "5-10月",
    origin: "印度、巴基斯坦",
    flowerLanguage: "纯洁、质朴、尊敬",
    tags: ["木本植物", "芳香花卉", "喜温暖"],
    intro: "茉莉是木犀科茉莉属常绿灌木或藤本植物，株高可达1-3米。枝条细长，略呈藤本状。叶片对生，卵形或椭圆形，表面光亮。花白色，顶生或腋生，通常3-9朵成簇，香气清新浓郁，是著名的芳香花卉。茉莉花不仅具有极高的观赏价值，还可用于提取香精，制作茉莉花茶等。在我国南方地区广泛栽培，是常见的庭院和盆栽花卉。",
    care: {
      light: "茉莉是喜阳植物，需要充足的阳光，每天至少需要4-6小时的直射光，光照不足会导致枝叶徒长，开花减少，香气变淡。",
      water: "茉莉喜湿润，生长期应保持土壤湿润，但忌积水。夏季高温时需早晚浇水，并向叶面喷水增湿，冬季则减少浇水。",
      fertilizer: "茉莉喜肥，生长期每隔1-2周施一次稀薄液肥，花期前增施磷钾肥，促进开花。花后及时施肥，补充养分。",
      pruning: "花后及时剪去残花和过密枝条，促进新枝萌发。春季萌芽前进行一次重剪，保持株型通风透光。"
    },
    disease: [
      {
        name: "叶斑病",
        symptom: "叶片上出现褐色斑点，逐渐扩大，严重时叶片脱落。",
        prevention: "及时清除病叶，集中烧毁；发病初期可喷洒多菌灵或百菌清溶液。"
      },
      {
        name: "介壳虫",
        symptom: "叶片和枝条上出现白色介壳，吸食汁液，导致植株生长衰弱。",
        prevention: "少量时可用湿布擦拭；严重时可喷洒杀扑磷等杀虫剂。"
      }
    ],
    images: [
      "https://ts1.tc.mm.bing.net/th/id/R-C.82a759a4a95d886f9e0ec230a30c7a05?rik=D9fNFyQKMS7wjg&riu=http%3a%2f%2fimgs.bzw315.com%2fUploadFiles%2fVersion2%2f0%2f20160530%2f201605301607229532.png&ehk=nYXTPJ3Wdb2MiPo3ARoiBy4axp%2f7CjjONgSHM7sOjag%3d&risl=&pid=ImgRaw&r=0",
      "https://img95.699pic.com/photo/50250/7736.jpg_wh860.jpg",
      "https://ts1.tc.mm.bing.net/th/id/OIP-C.mj24yYbnsJT2d9UaJrJz7QHaFt?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"

    ]
  },
  月季: {
    name: "月季",
    scientificName: "Rosa chinensis",
    family: "蔷薇科 蔷薇属",
    bloomingPeriod: "4-10月",
    origin: "中国",
    flowerLanguage: "美丽长存、幸福爱情",
    tags: ["木本植物", "观赏花卉", "喜阳"],
    intro: "月季是蔷薇科蔷薇属常绿或半常绿灌木，株高可达1-2米。枝条粗壮，有短粗的钩状皮刺。叶片互生，小叶3-5片，边缘有尖锐锯齿，表面光亮。花单生或几朵集生，花色丰富，有红、粉、黄、白等多种颜色，花型多样，有些品种具有芳香。月季花期长，被誉为“花中皇后”，是我国十大名花之一，广泛用于园林绿化和家庭栽培。",
    care: {
      light: "月季是强阳性植物，需要充足的阳光，每天至少需要6小时以上的直射光，光照不足会导致开花减少，花色变淡。",
      water: "月季喜湿润，但怕积水。浇水应遵循“见干见湿”的原则，土壤表面干燥后再浇水，浇则浇透。夏季高温时需增加浇水次数，冬季减少浇水。",
      fertilizer: "月季喜肥，生长期应经常施肥，春季发芽后施氮肥为主的肥料，花期前增施磷钾肥，花后及时施肥补充养分。",
      pruning: "月季需要经常修剪，花后及时剪去残花，促进再次开花。冬季进行重剪，剪去老弱病枝，保持株型通风透光。"
    },
    disease: [
      {
        name: "黑斑病",
        symptom: "叶片上出现圆形黑色斑点，周围有黄色晕圈，严重时叶片脱落。",
        prevention: "及时清除病叶，集中烧毁；发病初期可喷洒波尔多液或百菌清溶液。"
      },
      {
        name: "蚜虫",
        symptom: "聚集在嫩梢和叶片背面，吸食汁液，导致叶片卷曲变形。",
        prevention: "可用清水冲洗或用肥皂水喷洒；严重时可喷洒吡虫啉等杀虫剂。"
      }
    ],
    images: [
    
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.JpphsMkiSVTQaQD_wS49XAHaF3?w=256&h=203&c=7&r=0&o=5&cb=ucfimgc2&dpr=2&pid=1.7",
      "https://ts1.tc.mm.bing.net/th/id/R-C.573a02e0f87605f15a995095503f6dc6?rik=divALy9tDnkZZw&riu=http%3a%2f%2fimgs.soufunimg.com%2fnewshezuo%2f201509%2f01%2f829%2f890b405d6925c06e3d1bd072c3041db9.jpeg&ehk=UhZ3h7s963TBLs9RmVQlqKAqUQEy9dp88fk9ar7iXVM%3d&risl=&pid=ImgRaw&r=0",
      "https://img.redocn.com/photo/20131020/Redocn_2013101818261367.jpg"
    ]
  }
};