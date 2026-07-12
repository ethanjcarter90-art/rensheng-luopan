import React,{useEffect,useMemo,useState}from'react';
import{createRoot}from'react-dom/client';
import{ArrowRight,ArrowLeft,Compass,RotateCcw,Search,Check,ChevronRight}from'lucide-react';
import'./styles.css';
import'./open.css';
import'./city.css';
import'./city-result.css';
import'./personality.css';
import'./leisure.css';
import'./libraries.css';
import GrowthTests from'./GrowthTests.jsx';
import'./growth.css';
import'./cover.css';
import CosmicCover from'./CosmicCover.jsx';
import'./cover-switch.css';
import'./cover-interactions.css';
import'./cover-nav.css';
import CoverMenu from'./CoverMenu.jsx';
import'./ink-cover.css';
import'./global-ink-theme.css';
import'./ink-wave.css';
import WaveTitle from'./WaveTitle.jsx';
import'./hero-fix.css';

const dims=['分析','创造','沟通','实践','组织','关怀','领导','探索','稳定','影响'];
const abilityLibrary=[['逻辑分析','发现规律、拆解问题并根据证据推导结论'],['语言表达','通过写作、演讲和解释准确传递想法'],['创意想象','产生新点子并建立不同事物间的联系'],['组织执行','规划资源、管理进度并可靠完成任务'],['技术操作','学习工具、排查故障并完成实际制作'],['空间感知','理解地图、结构、比例、构图和方位'],['人际协作','理解他人、协调分歧并促进团队合作'],['领导推动','确定方向、配置资源并推动集体行动'],['快速学习','迅速理解陌生知识并根据反馈改进'],['身体协调','控制动作、节奏、力量和眼手配合']];
const thinkingLibrary=[['逻辑推演','用条件、步骤和一致性检查形成结论'],['直觉判断','借助经验和整体感受在信息不足时判断'],['系统思考','关注要素关系、反馈循环和长期影响'],['批判质疑','检查证据来源、偏见、漏洞和隐藏前提'],['发散联想','从多个方向产生想法并跨领域建立联系'],['务实验证','通过小实验、现实条件和实际结果检验'],['长期视角','观察趋势并衡量选择的长期后果'],['细节观察','留意容易被忽略的差异、错误和信号'],['自我反思','复盘判断过程并修正自身认知偏差'],['果断决策','在不确定中确定优先级并承担选择结果']];
const coreTypes=['逻辑分析','创意表达','人际沟通','动手实践','组织执行','助人关怀','领导决策','求知探索','稳定规范','社会影响','写作表达','公共服务','艺术审美','哲学思辨','技术创新','冒险开拓'];
const openQuestions=['如果不考虑收入、学历和他人的期待，你最想每天做什么样的工作？','一份理想工作最应该带给你什么？请写下你最看重的价值或感受。','请写出你曾经向往、好奇或愿意尝试的职业，也可以说明原因。'];
const tendencyKeywords={'写作表达':['写','文字','文学','小说','诗','编辑','出版','编剧'],'公共服务':['公务员','政府','社会','公共','人民','社区','政策','公益'],'艺术审美':['艺术','画','设计','审美','摄影','音乐','表演','雕塑'],'哲学思辨':['哲学','思想','人生','意义','伦理','逻辑','思考','真理'],'技术创新':['技术','编程','软件','人工智能','发明','工程','科技','实验'],'冒险开拓':['冒险','创业','探索','旅行','挑战','自由','未知','开拓']};
const questions=[
 {text:'遇到信息混乱的问题时，我会先核对事实、数据和因果关系。',dim:'分析'},
 {text:'阅读新闻或报告时，我能很快发现论证中的漏洞与矛盾。',dim:'分析'},
 {text:'面对多个可行方案，我喜欢建立标准并进行理性比较。',dim:'分析'},
 {text:'我享受用文字、画面、音乐或新点子表达独特感受。',dim:'创造'},
 {text:'没有现成答案时，我愿意尝试非传统的方法。',dim:'创造'},
 {text:'我会留意生活中的审美、故事与细节，并产生创作冲动。',dim:'创造'},
 {text:'即使面对陌生人，我也能自然地展开交谈并理解对方需求。',dim:'沟通'},
 {text:'出现意见分歧时，我通常能把复杂立场解释清楚。',dim:'沟通'},
 {text:'演讲、采访、谈判或教学等表达场景会激发我的状态。',dim:'沟通'},
 {text:'比起长时间讨论，我更愿意亲手操作设备、材料或工具。',dim:'实践'},
 {text:'在户外、实验室、工厂、厨房或现场工作对我有吸引力。',dim:'实践'},
 {text:'东西损坏或流程卡住时，我会主动排查并把它修好。',dim:'实践'},
 {text:'同时有多项任务时，我会自然地制定计划、排序和跟进。',dim:'组织'},
 {text:'我喜欢把文件、账目、日程或资源整理得准确有序。',dim:'组织'},
 {text:'临近截止日期且压力增大时，我仍能按步骤稳定推进。',dim:'组织'},
 {text:'当别人焦虑、受伤或迷茫时，我愿意耐心倾听和支持。',dim:'关怀'},
 {text:'如果工作能改善人的健康、教育或生活处境，我会更有动力。',dim:'关怀'},
 {text:'我能注意到儿童、老人、患者或弱势群体未说出口的需要。',dim:'关怀'},
 {text:'团队缺少方向时，我愿意做决定并承担结果。',dim:'领导'},
 {text:'我敢于协调不同利益、分配资源并推动集体行动。',dim:'领导'},
 {text:'承担管理责任、制定规则或参与公共决策对我有吸引力。',dim:'领导'},
 {text:'我经常追问自然、社会、意识或人生问题背后的根本原理。',dim:'探索'},
 {text:'为了弄懂感兴趣的主题，我愿意长期阅读、观察或做实验。',dim:'探索'},
 {text:'跨学科学习、接触陌生文化或研究未知领域会让我兴奋。',dim:'探索'},
 {text:'我更偏爱职责清楚、标准明确且收入相对可预期的工作。',dim:'稳定'},
 {text:'我愿意在一个专业或组织中长期积累，而非频繁更换方向。',dim:'稳定'},
 {text:'遵守制度、保持准确和降低风险通常比追求刺激更重要。',dim:'稳定'},
 {text:'我希望作品、观点或行动能影响公众并推动社会变化。',dim:'影响'},
 {text:'面对不公平或公共议题，我愿意表达立场并争取改进。',dim:'影响'},
 {text:'获得认可、代表群体发声或留下长期文化价值会激励我。',dim:'影响'}
];
const fields=['人工智能','数据科学','软件工程','网络安全','产品管理','用户体验','游戏开发','工业设计','建筑','城市规划','机械工程','电子工程','新能源','环境保护','生物医药','临床医疗','心理健康','教育','法律','金融','会计审计','市场营销','品牌公关','新闻媒体','影视制作','出版文学','公共行政','政治治理','国际事务','社会服务','农业科技','食品餐饮','体育运动','音乐表演','视觉艺术','哲学人文','历史考古','语言翻译','数学统计','物理天文','化学材料','地球科学','交通航空','航海海洋','物流供应链','零售电商','酒店旅游','人力资源','房地产','科学研究'];
const roles=['研究员','专业顾问','项目经理','策划师','分析师','培训师','运营主管','技术专家'];
const special={
 '出版文学':['小说作家','诗人','编剧','散文作家','文学编辑','出版人','文案作者','文学评论家'],
 '公共行政':['公务员','行政管理人员','政策研究员','公共事务专员','政务服务人员','政府文秘','社区治理专员','公共项目主管'],
 '政治治理':['政府官员','政策制定者','议员助理','政治学家','政府顾问','公共领导者','选举事务专员','廉政监察员'],
 '视觉艺术':['画家','雕塑家','插画家','装置艺术家','摄影艺术家','艺术策展人','美术指导','艺术评论家'],
 '哲学人文':['哲学家','伦理学研究者','逻辑学家','美学研究者','宗教学者','文化研究学者','大学哲学教师','人文评论家'],
 '新闻媒体':['记者','新闻编辑','调查记者','主持人','摄影记者','新媒体主编','时事评论员','纪录片记者'],
 '国际事务':['外交官','国际组织官员','国际关系学者','领事事务专员','国际援助项目官','地缘政治分析师','外事翻译','国际谈判代表'],
 '社会服务':['社会工作者','公益项目经理','社区工作者','慈善筹款人','社会政策研究员','志愿者协调员','救助站工作人员','社会企业家']
};
const careers=fields.flatMap((f,fi)=>(special[f]||roles.map(r=>`${f}${r}`)).map((name,ri)=>{
 const seed=fi*7+ri*13; const scores=Object.fromEntries(dims.map((d,k)=>[d,2+((seed+k*5)%9)]));
 scores[dims[fi%10]]=10;scores[dims[(fi+ri+3)%10]]=9;
 const tendencies=[coreTypes[fi%10],coreTypes[10+(fi+ri)%6],coreTypes[(fi+ri*3+4)%10]];
 return{name,field:f,scores,tendencies:[...new Set(tendencies)].slice(0,3),desc:`在${f}领域运用${dims[fi%10]}与${dims[(fi+ri+3)%10]}能力，持续解决真实问题。`}
}));
const labels=['非常不符合','不太符合','不确定','比较符合','非常符合'];
const cityDims=['低成本','温暖气候','大城市','文化生活','亲近自然','公共交通','慢节奏','安全稳定','国际化','社交活力'];
const cityQuestions=[
 ['我愿意用更少的生活开支换取更宽松的日常。','低成本'],['住房性价比会显著影响我对一座城市的选择。','低成本'],['比起高收入机会，我更重视日常消费压力较小。','低成本'],
 ['我喜欢阳光充足、冬季温和的地方。','温暖气候'],['炎热天气对我的影响小于寒冷天气。','温暖气候'],['如果一年大部分时间可以户外活动，我会更幸福。','温暖气候'],
 ['摩天楼、密集商业和丰富机会会让我兴奋。','大城市'],['我能接受拥挤与噪声，以换取更多资源。','大城市'],['我希望生活在具有全国或全球影响力的大都市。','大城市'],
 ['博物馆、剧院、书店和历史街区对我很重要。','文化生活'],['我喜欢一座城市拥有鲜明的建筑、艺术和传统。','文化生活'],['周末参加展览、演出或文化活动是理想生活的一部分。','文化生活'],
 ['我希望从家出发不久就能到山、海、森林或湖泊。','亲近自然'],['清洁空气和开阔空间比购物便利更重要。','亲近自然'],['徒步、滑雪、冲浪或露营会经常出现在我的生活中。','亲近自然'],
 ['我希望不买车也能方便地工作和生活。','公共交通'],['轨道交通、步行友好和骑行条件会影响我的幸福感。','公共交通'],['我能接受较小居住空间，以换取高效通勤。','公共交通'],
 ['我不喜欢长期加班和凡事争先的城市氛围。','慢节奏'],['在咖啡馆、公园或家中慢慢度过下午很吸引我。','慢节奏'],['我更看重生活平衡，而不是最快的职业晋升。','慢节奏'],
 ['治安、医疗和公共服务的可靠性让我安心。','安全稳定'],['我喜欢规则明确、环境整洁且秩序稳定的城市。','安全稳定'],['即使生活略显平淡，我也愿意选择更安全可预期的地方。','安全稳定'],
 ['我希望经常接触不同国家、语言和文化背景的人。','国际化'],['国际航班、跨国企业与全球化社区对我很重要。','国际化'],['生活在外来人口很多的城市会让我感到自在。','国际化'],
 ['我喜欢夜生活、节庆、聚会和结识新朋友。','社交活力'],['一座城市的人是否热情开放会影响我的归属感。','社交活力'],['我希望下班后仍有很多餐饮、娱乐和社交选择。','社交活力']
].map(([text,dim])=>({text,dim}));
const cityOpenQuestions=['请描述你理想的一天：天气、通勤、住房、周边环境和休闲方式是什么样？','一座城市有哪些特点是你最不能接受的？','有没有你特别想生活的城市或地区？请写出名称和原因。'];
const cityOpenKeywords={'低成本':['便宜','低消费','房价','省钱','性价比'],'温暖气候':['温暖','阳光','不冷','海边','热'],'大城市':['大城市','繁华','机会','都市','高楼'],'文化生活':['文化','艺术','历史','博物馆','演出'],'亲近自然':['自然','山','海','森林','湖','户外'],'公共交通':['地铁','公交','步行','骑行','通勤'],'慢节奏':['慢','悠闲','安静','轻松','平衡'],'安全稳定':['安全','治安','医疗','稳定','秩序'],'国际化':['国际','多元','外国','语言','全球'],'社交活力':['热闹','夜生活','社交','朋友','聚会']};
const cityGroups={
 '中国':['北京','上海','广州','深圳','杭州','成都','重庆','南京','苏州','武汉','西安','天津','长沙','青岛','厦门','昆明','大理','三亚','海口','福州','泉州','宁波','无锡','珠海','佛山','东莞','郑州','济南','烟台','威海','沈阳','大连','哈尔滨','长春','石家庄','太原','合肥','南昌','南宁','贵阳','兰州','银川','西宁','乌鲁木齐','拉萨','呼和浩特','桂林','扬州','绍兴','香港','澳门','台北','洛阳','开封','徐州','常州','镇江','嘉兴','湖州','金华','温州','台州','舟山','景德镇','赣州','宜昌','襄阳','岳阳','张家界','衡阳','芜湖','黄山','淄博','潍坊','临沂','秦皇岛','唐山','保定','包头','鄂尔多斯'],
 '欧洲':['伦敦','巴黎','柏林','罗马','马德里','巴塞罗那','里斯本','波尔图','阿姆斯特丹','鹿特丹','布鲁塞尔','维也纳','苏黎世','日内瓦','慕尼黑','汉堡','法兰克福','哥本哈根','斯德哥尔摩','奥斯陆','赫尔辛基','雷克雅未克','都柏林','爱丁堡','曼彻斯特','米兰','佛罗伦萨','威尼斯','那不勒斯','雅典','布拉格','布达佩斯','华沙','克拉科夫','卢布尔雅那','萨格勒布','贝尔格莱德','塔林','里加','维尔纽斯','卢森堡','安特卫普','里昂','尼斯','马赛','塞维利亚','瓦伦西亚','萨尔茨堡','因斯布鲁克','伯尔尼'],
 '美洲':['纽约','洛杉矶','旧金山','芝加哥','波士顿','西雅图','华盛顿','迈阿密','奥斯汀','丹佛','波特兰','圣迭戈','费城','新奥尔良','火奴鲁鲁','多伦多','温哥华','蒙特利尔','渥太华','卡尔加里','魁北克城','墨西哥城','瓜达拉哈拉','坎昆','哈瓦那','圣何塞','巴拿马城','波哥大','麦德林','基多','利马','库斯科','圣地亚哥','布宜诺斯艾利斯','蒙得维的亚','里约热内卢','圣保罗','巴西利亚','萨尔瓦多','累西腓','贝洛奥里藏特','卡塔赫纳','安提瓜','拿骚','金斯敦','圣胡安','亚松森','拉巴斯','马瑙斯','乌斯怀亚'],
 '其他地区':['东京','大阪','京都','札幌','福冈','首尔','釜山','新加坡','吉隆坡','曼谷','清迈','普吉','河内','胡志明市','岘港','雅加达','巴厘岛登巴萨','马尼拉','宿务','金边','暹粒','万象','德里','孟买','班加罗尔','加尔各答','科伦坡','加德满都','迪拜','阿布扎比','多哈','利雅得','特拉维夫','伊斯坦布尔','开普敦','约翰内斯堡','内罗毕','开罗','马拉喀什','卡萨布兰卡','突尼斯','阿克拉','达累斯萨拉姆','拉各斯','悉尼','墨尔本','布里斯班','珀斯','奥克兰','惠灵顿']
};
const cityTags={
 expensive:'北京 上海 深圳 香港 澳门 伦敦 巴黎 苏黎世 日内瓦 阿姆斯特丹 哥本哈根 奥斯陆 雷克雅未克 都柏林 卢森堡 纽约 洛杉矶 旧金山 波士顿 西雅图 华盛顿 迈阿密 火奴鲁鲁 多伦多 温哥华 新加坡 东京 首尔 悉尼 墨尔本 迪拜 特拉维夫',
 affordable:'重庆 长沙 昆明 大理 贵阳 南宁 兰州 银川 西宁 洛阳 开封 徐州 景德镇 赣州 宜昌 襄阳 岳阳 衡阳 芜湖 淄博 临沂 包头 哈尔滨 长春 乌鲁木齐 拉萨 波尔图 布达佩斯 克拉科夫 贝尔格莱德 里加 维尔纽斯 塞维利亚 墨西哥城 瓜达拉哈拉 麦德林 基多 利马 拉巴斯 亚松森 清迈 河内 岘港 金边 万象 加德满都 开罗 马拉喀什 突尼斯 内罗毕',
 warm:'广州 深圳 厦门 三亚 海口 福州 泉州 珠海 佛山 东莞 南宁 香港 澳门 台北 迈阿密 圣迭戈 火奴鲁鲁 坎昆 哈瓦那 圣何塞 巴拿马城 卡塔赫纳 里约热内卢 萨尔瓦多 累西腓 圣胡安 拿骚 曼谷 清迈 普吉 胡志明市 岘港 雅加达 登巴萨 马尼拉 宿务 新加坡 吉隆坡 金边 科伦坡 迪拜 阿布扎比 多哈 开普敦 悉尼 布里斯班 珀斯',
 megacity:'北京 上海 广州 深圳 成都 重庆 武汉 香港 伦敦 巴黎 柏林 马德里 罗马 莫斯科 纽约 洛杉矶 芝加哥 多伦多 墨西哥城 圣保罗 里约热内卢 布宜诺斯艾利斯 东京 大阪 首尔 新加坡 曼谷 雅加达 马尼拉 德里 孟买 班加罗尔 开罗 伊斯坦布尔 悉尼 墨尔本',
 culture:'北京 上海 南京 西安 苏州 杭州 成都 洛阳 开封 泉州 扬州 绍兴 景德镇 拉萨 香港 台北 伦敦 巴黎 柏林 罗马 马德里 巴塞罗那 维也纳 布拉格 布达佩斯 佛罗伦萨 威尼斯 雅典 爱丁堡 都柏林 克拉科夫 纽约 波士顿 新奥尔良 墨西哥城 哈瓦那 布宜诺斯艾利斯 利马 库斯科 京都 东京 首尔 新加坡 曼谷 河内 金边 德里 伊斯坦布尔 开罗 马拉喀什 墨尔本',
 nature:'昆明 大理 三亚 青岛 厦门 桂林 张家界 黄山 舟山 威海 烟台 拉萨 西宁 乌鲁木齐 雷克雅未克 奥斯陆 因斯布鲁克 伯尔尼 尼斯 爱丁堡 温哥华 西雅图 丹佛 波特兰 火奴鲁鲁 卡尔加里 魁北克城 坎昆 基多 库斯科 圣地亚哥 里约热内卢 乌斯怀亚 札幌 福冈 清迈 普吉 岘港 巴厘岛登巴萨 加德满都 开普敦 悉尼 布里斯班 珀斯 奥克兰 惠灵顿',
 transit:'北京 上海 广州 深圳 杭州 南京 武汉 香港 台北 伦敦 巴黎 柏林 马德里 巴塞罗那 阿姆斯特丹 维也纳 苏黎世 慕尼黑 哥本哈根 斯德哥尔摩 奥斯陆 赫尔辛基 米兰 布拉格 纽约 芝加哥 波士顿 华盛顿 多伦多 蒙特利尔 墨西哥城 圣地亚哥 东京 大阪 京都 首尔 新加坡 香港',
 slow:'大理 厦门 泉州 威海 桂林 扬州 绍兴 舟山 黄山 丽江 波尔图 佛罗伦萨 塞维利亚 瓦伦西亚 萨尔茨堡 伯尔尼 魁北克城 新奥尔良 库斯科 蒙得维的亚 清迈 岘港 巴厘岛登巴萨 暹粒 万象 科伦坡 加德满都 马拉喀什 开普敦 惠灵顿',
 safe:'新加坡 东京 大阪 京都 札幌 首尔 苏黎世 日内瓦 维也纳 哥本哈根 斯德哥尔摩 奥斯陆 赫尔辛基 雷克雅未克 慕尼黑 阿姆斯特丹 卢森堡 伯尔尼 新加坡 香港 澳门 台北 杭州 苏州 厦门 威海 青岛 悉尼 墨尔本 奥克兰 惠灵顿 多伦多 渥太华',
 international:'北京 上海 广州 深圳 香港 台北 伦敦 巴黎 柏林 阿姆斯特丹 布鲁塞尔 日内瓦 苏黎世 法兰克福 哥本哈根 都柏林 纽约 洛杉矶 旧金山 芝加哥 多伦多 温哥华 蒙特利尔 迈阿密 墨西哥城 圣保罗 布宜诺斯艾利斯 东京 首尔 新加坡 吉隆坡 曼谷 迪拜 多哈 伊斯坦布尔 开普敦 悉尼 墨尔本 奥克兰',
 social:'成都 重庆 长沙 广州 上海 香港 西安 武汉 伦敦 巴黎 马德里 巴塞罗那 柏林 罗马 阿姆斯特丹 都柏林 曼彻斯特 米兰 那不勒斯 塞维利亚 纽约 洛杉矶 芝加哥 迈阿密 奥斯汀 新奥尔良 蒙特利尔 墨西哥城 哈瓦那 麦德林 布宜诺斯艾利斯 里约热内卢 圣保罗 曼谷 首尔 东京 新加坡 胡志明市 马尼拉 孟买 伊斯坦布尔 开普敦 悉尼 墨尔本'
};
const hasTag=(tag,name)=>cityTags[tag].split(' ').includes(name);
const cityImageLock=name=>[...name].reduce((sum,ch)=>(sum*31+ch.charCodeAt(0))%99999,17);
const cityImageUrl=name=>`https://loremflickr.com/1600/900/${encodeURIComponent(name)},landmark,monument,architecture/all?lock=${cityImageLock(name)}`;
const cities=Object.entries(cityGroups).flatMap(([region,names])=>names.map(name=>{const scores=Object.fromEntries(cityDims.map(d=>[d,5]));scores['低成本']=hasTag('expensive',name)?1:hasTag('affordable',name)?9:5;scores['温暖气候']=hasTag('warm',name)?9:['欧洲','中国'].includes(region)?4:6;scores['大城市']=hasTag('megacity',name)?9:5;scores['文化生活']=hasTag('culture',name)?9:5;scores['亲近自然']=hasTag('nature',name)?9:4;scores['公共交通']=hasTag('transit',name)?9:5;scores['慢节奏']=hasTag('slow',name)?9:hasTag('megacity',name)?2:5;scores['安全稳定']=hasTag('safe',name)?9:5;scores['国际化']=hasTag('international',name)?9:4;scores['社交活力']=hasTag('social',name)?9:5;return{name,region,scores,traits:cityDims.slice().sort((a,b)=>scores[b]-scores[a]).slice(0,3)}}));
const personalityDims=['外向','共情','理性','开放','自律','冒险','独立','乐观','敏感','坚定'];
const personalityQuestions=[
 ['参加多人活动通常会让我充满能量。','外向'],['我愿意主动认识陌生人并开启话题。','外向'],['有想法时，我更喜欢说出来与人讨论。','外向'],
 ['朋友情绪低落时，我能很快察觉。','共情'],['做决定前，我会认真考虑它对他人的影响。','共情'],['即使观点不同，我也愿意理解对方的经历。','共情'],
 ['遇到冲突时，我倾向于先分析事实和因果。','理性'],['重要决定中，证据通常比直觉更能说服我。','理性'],['我喜欢把复杂问题整理成清晰的结构。','理性'],
 ['不同文化、观念和生活方式会激发我的好奇心。','开放'],['我愿意改变旧观点，只要新解释更有道理。','开放'],['艺术、哲学或新奇想法容易吸引我。','开放'],
 ['即使没有人监督，我也会完成计划。','自律'],['我习惯提前安排时间并遵守承诺。','自律'],['长期目标需要重复努力时，我仍能坚持。','自律'],
 ['未知旅程和有挑战的新体验让我兴奋。','冒险'],['机会出现时，我有时愿意先行动再完善计划。','冒险'],['适度风险比一成不变更有吸引力。','冒险'],
 ['我需要稳定的独处时间来恢复精力。','独立'],['即使别人不赞同，我也能坚持自己的判断。','独立'],['我不希望亲密关系占据全部个人空间。','独立'],
 ['事情不顺时，我仍能看到改善的可能。','乐观'],['我容易用幽默化解尴尬和压力。','乐观'],['我通常相信大多数人怀有善意。','乐观'],
 ['声音、语气、环境和细微变化容易影响我。','敏感'],['我会反复思考自己或别人说过的话。','敏感'],['电影、音乐或故事常让我产生强烈感受。','敏感'],
 ['需要拒绝别人时，我能清楚表达边界。','坚定'],['团队犹豫时，我愿意做出明确选择。','坚定'],['面对质疑，我能平静而直接地维护立场。','坚定']
].map(([text,dim])=>({text,dim}));
const personalityOpenQuestions=['别人通常怎样评价你？你认同其中哪些部分？','在友情中，你最需要对方提供什么，又最不能接受什么？','描述一次让你感到真正舒服、被理解或充满力量的相处经历。'];
const archetypes=['温暖联结者','冷静思考者','自由探索者','可靠守护者','热情行动派','安静观察者','创意梦想家','坚定领导者','幽默调和者','细腻共鸣者'];
const variants=['晨光型','深海型','山林型','星火型','远航型'];
const personalityTypes=archetypes.flatMap((base,bi)=>variants.map((v,vi)=>{const seed=bi*13+vi*7;const scores=Object.fromEntries(personalityDims.map((d,k)=>[d,2+((seed+k*3)%9)]));scores[personalityDims[bi]]=10;scores[personalityDims[(bi+vi+3)%10]]=9;return{name:`${v}${base}`,scores,traits:personalityDims.slice().sort((a,b)=>scores[b]-scores[a]).slice(0,3)}}));
const friendBases=['真诚倾听者','稳定陪伴者','快乐分享者','理性参谋者','勇敢同行者','温柔鼓励者','边界尊重者','好奇启发者','可靠合作者','坦率提醒者'];
const friendTypes=friendBases.flatMap((base,bi)=>variants.map((v,vi)=>{const seed=bi*9+vi*11;const scores=Object.fromEntries(personalityDims.map((d,k)=>[d,2+((seed+k*5)%9)]));scores[personalityDims[(bi+2)%10]]=10;scores[personalityDims[(bi+vi+6)%10]]=9;return{name:`${v}${base}`,scores,traits:personalityDims.slice().sort((a,b)=>scores[b]-scores[a]).slice(0,3)}}));
const leisureDims=['重口刺激','清淡健康','精致审美','地方传统','国际风味','热闹社交','安静独处','户外运动','文化体验','新奇探索'];
const leisureQuestions=[
 ['辛辣、浓郁、炭烤或香料丰富的味道会让我食欲大开。','重口刺激'],['吃饭时，我喜欢有强烈记忆点的口感和香气。','重口刺激'],['火锅、烧烤或街头小吃比清淡套餐更吸引我。','重口刺激'],
 ['我会主动关注食材新鲜、营养搭配和身体负担。','清淡健康'],['天然原味、少油少糖的食物也能让我满足。','清淡健康'],['选择餐厅时，健康和卫生比网红热度更重要。','清淡健康'],
 ['菜品摆盘、空间设计和服务仪式感会影响体验。','精致审美'],['我愿意为细致烹饪和高品质食材支付更多。','精致审美'],['漂亮的甜点、咖啡馆或主题餐厅很吸引我。','精致审美'],
 ['家乡菜、老字号和代代相传的做法让我有亲切感。','地方传统'],['旅行时，我会优先寻找本地人常吃的传统食物。','地方传统'],['我喜欢了解一道菜背后的历史与节庆习俗。','地方传统'],
 ['我乐于尝试不同国家的菜系和用餐方式。','国际风味'],['寿司、意面、咖喱、塔可等异国风味常在我的选择中。','国际风味'],['融合料理和跨文化菜单会激发我的好奇心。','国际风味'],
 ['聚餐、音乐节、派对或多人游戏能让我放松。','热闹社交'],['我喜欢边吃边聊，和朋友共享不同菜品。','热闹社交'],['周末人多热闹的娱乐项目比独处更吸引我。','热闹社交'],
 ['独自看书、追剧、听音乐或玩单机游戏让我恢复精力。','安静独处'],['我偏爱不被打扰、可以自己掌控节奏的休闲时间。','安静独处'],['安静的小店或居家晚餐比大型聚会更舒服。','安静独处'],
 ['徒步、骑行、球类、水上活动或露营让我快乐。','户外运动'],['晴朗周末时，我更愿意出门活动而不是宅在家。','户外运动'],['能活动身体的娱乐通常比坐着观看更吸引我。','户外运动'],
 ['展览、戏剧、电影、音乐会或阅读是我重要的休闲方式。','文化体验'],['我喜欢娱乐内容带来思想、情感或审美触动。','文化体验'],['了解创作者和作品背景会提升我的体验。','文化体验'],
 ['新开餐厅、沉浸式活动或小众玩法让我跃跃欲试。','新奇探索'],['即使可能踩雷，我也愿意尝试没体验过的口味。','新奇探索'],['旅行或周末，我喜欢临时发现意料之外的去处。','新奇探索']
].map(([text,dim])=>({text,dim}));
const leisureOpenQuestions=['如果可以自由安排一顿完美的饭，你会吃什么、在哪里、和谁一起？','描述你最享受的一次娱乐或休闲经历，是什么让它特别？','最近最想尝试的美食、活动或旅行体验是什么？'];
const foodBases=['烟火街巷派','精致料理派','自然轻食派','家乡风味派','环球餐桌派','香辣冒险派','甜品咖啡派','海鲜鲜味派','深夜食堂派','创意融合派'];
const entertainmentBases=['户外探索家','文化漫游者','居家治愈派','派对社交家','影视故事迷','音乐现场派','运动挑战者','游戏世界客','旅行发现家','手作创造者'];
const foodTypes=foodBases.flatMap((base,bi)=>variants.map((v,vi)=>{const seed=bi*7+vi*13;const scores=Object.fromEntries(leisureDims.map((d,k)=>[d,2+((seed+k*5)%9)]));scores[leisureDims[bi]]=10;scores[leisureDims[(bi+vi+2)%10]]=9;return{name:`${v}${base}`,scores,traits:leisureDims.slice().sort((a,b)=>scores[b]-scores[a]).slice(0,3)}}));
const entertainmentTypes=entertainmentBases.flatMap((base,bi)=>variants.map((v,vi)=>{const seed=bi*11+vi*9;const scores=Object.fromEntries(leisureDims.map((d,k)=>[d,2+((seed+k*3)%9)]));scores[leisureDims[(bi+5)%10]]=10;scores[leisureDims[(bi+vi+7)%10]]=9;return{name:`${v}${base}`,scores,traits:leisureDims.slice().sort((a,b)=>scores[b]-scores[a]).slice(0,3)}}));

function App(){
 const[showCover,setShowCover]=useState(true);
 const[cosmicCover,setCosmicCover]=useState(false);
 const[coverMenu,setCoverMenu]=useState(null);
 const[screen,setScreen]=useState('home'),[idx,setIdx]=useState(0),[answers,setAnswers]=useState(Array(30).fill(null)),[openAnswers,setOpenAnswers]=useState(['','','']),[filter,setFilter]=useState('');
 const[cityIdx,setCityIdx]=useState(0),[cityAnswers,setCityAnswers]=useState(Array(30).fill(null)),[cityOpenAnswers,setCityOpenAnswers]=useState(['','','']);
 const[cityPhoto,setCityPhoto]=useState('');
 const[personalityIdx,setPersonalityIdx]=useState(0),[personalityAnswers,setPersonalityAnswers]=useState(Array(30).fill(null)),[personalityOpenAnswers,setPersonalityOpenAnswers]=useState(['','','']);
 const[leisureIdx,setLeisureIdx]=useState(0),[leisureAnswers,setLeisureAnswers]=useState(Array(30).fill(null)),[leisureOpenAnswers,setLeisureOpenAnswers]=useState(['','','']);
 const answer=v=>{const a=[...answers];a[idx]=v;setAnswers(a);if(idx<29)setTimeout(()=>setIdx(idx+1),120);else setScreen('open')};
 const openText=openAnswers.join('');
 const results=useMemo(()=>{const user=Object.fromEntries(dims.map(d=>[d,0]));questions.forEach((q,i)=>user[q.dim]+=(answers[i]??2)+1);return careers.map(c=>{let dist=0;dims.forEach(d=>{const u=user[d]/15*10;dist+=Math.pow(u-c.scores[d],2)});let bonus=0;const direct=`${c.name}${c.field}`;if(openText&&direct.split('').some((_,i)=>openText.includes(direct.slice(i,i+2))))bonus+=5;Object.entries(tendencyKeywords).forEach(([type,words])=>{if(c.tendencies.includes(type)&&words.some(w=>openText.includes(w)))bonus+=3});return{...c,match:Math.min(99,Math.max(55,Math.round(100-Math.sqrt(dist)*4.2+bonus)))}}).sort((a,b)=>b.match-a.match)},[answers,openText]);
 const traits=useMemo(()=>{const x=Object.fromEntries(dims.map(d=>[d,0]));questions.forEach((q,i)=>x[q.dim]+=(answers[i]??2)+1);return Object.entries(x).sort((a,b)=>b[1]-a[1])},[answers]);
 const cityOpenText=cityOpenAnswers.join('');
 const cityResults=useMemo(()=>{const user=Object.fromEntries(cityDims.map(d=>[d,0]));cityQuestions.forEach((q,i)=>user[q.dim]+=(cityAnswers[i]??2)+1);Object.entries(cityOpenKeywords).forEach(([d,words])=>{user[d]+=words.filter(w=>cityOpenText.includes(w)).length*.7});return cities.map(c=>{let dist=0;cityDims.forEach(d=>{const u=Math.min(10,user[d]/15*10);dist+=Math.pow(u-c.scores[d],2)});let bonus=cityOpenText.includes(c.name)?10:0;return{...c,match:Math.min(99,Math.max(52,Math.round(100-Math.sqrt(dist)*4+bonus)))}}).sort((a,b)=>b.match-a.match)},[cityAnswers,cityOpenText]);
 const cityAnswer=v=>{const a=[...cityAnswers];a[cityIdx]=v;setCityAnswers(a);if(cityIdx<29)setTimeout(()=>setCityIdx(cityIdx+1),120);else setScreen('city-open')};
 useEffect(()=>{if(screen!=='city-result'||!cityResults[0])return;const name=cityResults[0].name;const fallback=`https://picsum.photos/seed/${encodeURIComponent(name+'-landmark')}/1600/900`;setCityPhoto(fallback);fetch(`https://zh.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`).then(r=>r.ok?r.json():Promise.reject()).then(data=>setCityPhoto(data.originalimage?.source||data.thumbnail?.source||fallback)).catch(()=>setCityPhoto(fallback))},[screen,cityResults]);
 const personalityProfile=useMemo(()=>{const user=Object.fromEntries(personalityDims.map(d=>[d,0]));personalityQuestions.forEach((q,i)=>user[q.dim]+=(personalityAnswers[i]??2)+1);return user},[personalityAnswers]);
 const personalityResults=useMemo(()=>personalityTypes.map(t=>{let dist=0;personalityDims.forEach(d=>dist+=Math.pow(personalityProfile[d]/15*10-t.scores[d],2));return{...t,match:Math.max(55,Math.round(100-Math.sqrt(dist)*4.2))}}).sort((a,b)=>b.match-a.match),[personalityProfile]);
 const friendResults=useMemo(()=>friendTypes.map(t=>{let dist=0;personalityDims.forEach(d=>{const mine=personalityProfile[d]/15*10;const desired=['共情','乐观','坚定'].includes(d)?Math.max(mine,7):10-mine*.35;dist+=Math.pow(desired-t.scores[d],2)});return{...t,match:Math.max(55,Math.round(100-Math.sqrt(dist)*3.6))}}).sort((a,b)=>b.match-a.match),[personalityProfile]);
 const personalityAnswer=v=>{const a=[...personalityAnswers];a[personalityIdx]=v;setPersonalityAnswers(a);if(personalityIdx<29)setTimeout(()=>setPersonalityIdx(personalityIdx+1),120);else setScreen('personality-open')};
 const leisureProfile=useMemo(()=>{const user=Object.fromEntries(leisureDims.map(d=>[d,0]));leisureQuestions.forEach((q,i)=>user[q.dim]+=(leisureAnswers[i]??2)+1);return user},[leisureAnswers]);
 const foodResults=useMemo(()=>foodTypes.map(t=>{let dist=0;leisureDims.forEach(d=>dist+=Math.pow(leisureProfile[d]/15*10-t.scores[d],2));return{...t,match:Math.max(55,Math.round(100-Math.sqrt(dist)*4))}}).sort((a,b)=>b.match-a.match),[leisureProfile]);
 const entertainmentResults=useMemo(()=>entertainmentTypes.map(t=>{let dist=0;leisureDims.forEach(d=>dist+=Math.pow(leisureProfile[d]/15*10-t.scores[d],2));return{...t,match:Math.max(55,Math.round(100-Math.sqrt(dist)*4))}}).sort((a,b)=>b.match-a.match),[leisureProfile]);
 const leisureAnswer=v=>{const a=[...leisureAnswers];a[leisureIdx]=v;setLeisureAnswers(a);if(leisureIdx<29)setTimeout(()=>setLeisureIdx(leisureIdx+1),120);else setScreen('leisure-open')};
 const startCareer=()=>{setScreen('home')};const startCity=()=>{setScreen('city-home')};const startPersonality=()=>{setScreen('personality-home')};const startLeisure=()=>{setScreen('leisure-home')};
 const restart=()=>{setAnswers(Array(30).fill(null));setOpenAnswers(['','','']);setIdx(0);setScreen('home')};
 if(showCover&&cosmicCover)return <CosmicCover onBack={()=>setCosmicCover(false)} onEnter={()=>{setShowCover(false);setCosmicCover(false)}}/>;
 if(showCover)return <main className="cover"><header><div className="wordmark"><Compass/>人生罗盘</div><nav className="coverNav"><button onClick={()=>setCoverMenu(coverMenu==='about'?null:'about')}>关于罗盘</button><button onClick={()=>setCoverMenu(coverMenu==='modules'?null:'modules')}>六大板块</button><button onClick={()=>setCoverMenu(coverMenu==='method'?null:'method')}>使用方法</button><button className="coverLogin" onClick={()=>setCoverMenu(coverMenu==='login'?null:'login')}>登录</button></nav></header><CoverMenu menu={coverMenu} onClose={()=>setCoverMenu(null)} onNavigate={target=>{setScreen(target);setCoverMenu(null);setShowCover(false)}}/><section className="coverBody"><div className="coverCopy"><p>从理解自己开始，找到更适合你的生活方向</p><WaveTitle/><p>通过职业、城市、性格、朋友、美食娱乐、能力特长与思维方式测评，绘制一份属于你的探索地图。</p><button className="primary" onClick={()=>setShowCover(false)}>进入人生罗盘<ArrowRight/></button></div><div className="coverModules">{[['01','职业方向','400种职业','home'],['02','生活城市','230座城市','city-home'],['03','性格与朋友','100种关系角色','personality-home'],['04','美食与娱乐','100种快乐方式','leisure-home'],['05','能力特长','10类核心能力','ability'],['06','思维方式','10种思考路径','thinking']].map(([n,t,s,target])=><article key={n} role="button" tabIndex="0" onClick={()=>{setScreen(target);setShowCover(false)}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){setScreen(target);setShowCover(false)}}}><em>{n}</em><div><b>{t}</b><span>{s}</span></div><ChevronRight/></article>)}</div></section><footer><span>使用方法：选择一个板块，完成30道量表题与3道开放题，查看你的个人结果。</span><span>结果用于自我探索，而非限制你的可能</span></footer></main>;
 return <main><header><button className="wordmark" onClick={()=>setShowCover(true)}><Compass/>人生罗盘</button><div className="testSwitch"><button className={!['city','personality','leisure','ability','thinking'].some(x=>screen.startsWith(x))?'activeTest':''} onClick={startCareer}>职业</button><button className={screen.startsWith('city')?'activeTest':''} onClick={startCity}>城市</button><button className={screen.startsWith('personality')?'activeTest':''} onClick={startPersonality}>性格朋友</button><button className={screen.startsWith('leisure')?'activeTest':''} onClick={startLeisure}>美食娱乐</button><button className={screen==='ability'?'activeTest':''} onClick={()=>setScreen('ability')}>能力特长</button><button className={screen==='thinking'?'activeTest':''} onClick={()=>setScreen('thinking')}>思维方式</button></div><div className="libraryNav"><button onClick={()=>setScreen('catalog')}>职业库</button><button onClick={()=>setScreen('city-library')}>城市库</button><button onClick={()=>setScreen('personality-library')}>性格库</button><button onClick={()=>setScreen('leisure-library')}>美食娱乐库</button><button onClick={()=>setScreen('ability-library')}>能力库</button><button onClick={()=>setScreen('thinking-library')}>思维库</button></div></header>
 {screen==='home'&&<section className="hero"><div><h1>不是给你贴标签，<br/>而是帮你找到<br/><em>值得走的方向。</em></h1><p>从兴趣、能力、价值观、工作环境与压力反应出发，在 400 种职业中找到与你更契合的选择。约需 5 分钟。</p><button className="primary" onClick={()=>setScreen('quiz')}>开始测评 <ArrowRight/></button><small>30道题互不重复，请凭第一感觉作答</small></div><div className="orbit"><span>分析</span><span>创造</span><span>沟通</span><span>实践</span><span>探索</span><Compass/></div></section>}
 {screen==='quiz'&&<section className="quizPage"><div className="progress"><div style={{width:`${(idx+1)/30*100}%`}}/><span>{String(idx+1).padStart(2,'0')} / 30</span></div><article><p>这句话与你有多相符？</p><h2>{questions[idx].text}</h2><div className="scale">{labels.map((l,i)=><button key={l} className={answers[idx]===i?'selected':''} onClick={()=>answer(i)}><i>{i+1}</i><span>{l}</span></button>)}</div><nav><button disabled={idx===0} onClick={()=>setIdx(idx-1)}><ArrowLeft/>上一题</button><span>{questions[idx].dim}倾向</span><button disabled={idx===29||answers[idx]===null} onClick={()=>setIdx(idx+1)}>下一题<ArrowRight/></button></nav></article></section>}
 {screen==='open'&&<section className="openPage"><div className="openHead"><p>最后一步</p><h1>用自己的话，告诉我们你想走向哪里。</h1><span>开放题没有标准答案；你的关键词会用于调整职业推荐。</span></div>{openQuestions.map((q,i)=><label key={q}><b>0{i+1}</b><span>{q}</span><textarea value={openAnswers[i]} onChange={e=>{const next=[...openAnswers];next[i]=e.target.value;setOpenAnswers(next)}} placeholder="写下你的想法（可简短回答）" maxLength="300"/></label>)}<div className="openActions"><button onClick={()=>{setIdx(29);setScreen('quiz')}}><ArrowLeft/>返回上一题</button><button className="primary" onClick={()=>setScreen('result')}>查看职业结果<ArrowRight/></button></div></section>}
 {screen==='result'&&<section className="results"><div className="resultHero"><div><p>最适合你的职业</p><h1>{results[0].name}</h1><p>{results[0].desc}</p></div><strong>{results[0].match}<small>%</small><span>匹配度</span></strong></div><div className="resultGrid"><section><h2>你的优势画像</h2>{traits.slice(0,5).map(([d,v])=><div className="trait" key={d}><span>{d}</span><i><b style={{width:`${v/15*100}%`}}/></i><em>{Math.round(v/15*100)}</em></div>)}</section><section><h2>其他高匹配职业</h2>{results.slice(1,6).map((r,i)=><div className="careerRow" key={r.name}><em>0{i+2}</em><span><b>{r.name}</b><small>{r.field}</small></span><strong>{r.match}%</strong></div>)}</section></div><div className="actions"><button onClick={()=>setScreen('catalog')}>浏览全部 400 种职业</button><button onClick={restart}><RotateCcw/>重新测评</button></div><p className="disclaimer">本测评用于职业探索与自我反思，不替代专业职业咨询。</p></section>}
 {screen==='catalog'&&<section className="catalog"><div className="catalogHead"><div><p>职业库</p><h1>400 种可能，等你探索</h1></div><label><Search/><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="搜索职业或领域"/></label></div><div className="catalogGrid">{careers.filter(c=>c.name.includes(filter)||c.field.includes(filter)).map(c=><article key={c.name}><small>{c.field}</small><h3>{c.name}</h3><p>{c.desc}</p><span><Check/>核心倾向：{c.tendencies.join(' · ')}</span></article>)}</div></section>}
 {screen==='city-library'&&<section className="catalog libraryPage"><div className="catalogHead"><div><p>城市库</p><h1>230 座生活坐标</h1></div><label><Search/><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="搜索城市或地区"/></label></div>{Object.keys(cityGroups).map(region=><section className="librarySection" key={region}><h2>{region}<small>{cityGroups[region].length} 座</small></h2><div className="catalogGrid">{cities.filter(c=>c.region===region&&(c.name.includes(filter)||c.region.includes(filter))).map(c=><article key={c.name}><small>{c.region}</small><h3>{c.name}</h3><p>适合偏好 {c.traits.join('、')} 的生活方式。</p><span><Check/>城市特征：{c.traits.join(' · ')}</span></article>)}</div></section>)}</section>}
 {screen==='personality-library'&&<section className="catalog libraryPage"><div className="catalogHead"><div><p>性格与朋友库</p><h1>100 种关系角色</h1></div><label><Search/><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="搜索类型或特征"/></label></div><section className="librarySection"><h2>个人性格<small>50 种</small></h2><div className="catalogGrid">{personalityTypes.filter(t=>t.name.includes(filter)||t.traits.some(x=>x.includes(filter))).map(t=><article key={t.name}><small>个人性格</small><h3>{t.name}</h3><p>在不同场景中呈现 {t.traits.join('、')} 等特征。</p><span><Check/>核心特征：{t.traits.join(' · ')}</span></article>)}</div></section><section className="librarySection"><h2>朋友性格<small>50 种</small></h2><div className="catalogGrid">{friendTypes.filter(t=>t.name.includes(filter)||t.traits.some(x=>x.includes(filter))).map(t=><article key={t.name}><small>朋友类型</small><h3>{t.name}</h3><p>能在关系中带来 {t.traits.join('、')} 的相处体验。</p><span><Check/>关系特征：{t.traits.join(' · ')}</span></article>)}</div></section></section>}
 {screen==='leisure-library'&&<section className="catalog libraryPage"><div className="catalogHead"><div><p>美食与娱乐库</p><h1>100 种快乐方式</h1></div><label><Search/><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="搜索类型或偏好"/></label></div><section className="librarySection"><h2>美食偏好<small>50 种</small></h2><div className="catalogGrid">{foodTypes.filter(t=>t.name.includes(filter)||t.traits.some(x=>x.includes(filter))).map(t=><article key={t.name}><small>美食类型</small><h3>{t.name}</h3><p>偏爱 {t.traits.join('、')} 的用餐体验。</p><span><Check/>核心偏好：{t.traits.join(' · ')}</span></article>)}</div></section><section className="librarySection"><h2>娱乐方式<small>50 种</small></h2><div className="catalogGrid">{entertainmentTypes.filter(t=>t.name.includes(filter)||t.traits.some(x=>x.includes(filter))).map(t=><article key={t.name}><small>娱乐类型</small><h3>{t.name}</h3><p>从 {t.traits.join('、')} 中获得放松和快乐。</p><span><Check/>核心偏好：{t.traits.join(' · ')}</span></article>)}</div></section></section>}
 {screen==='city-home'&&<section className="cityHero"><div><p>找到更适合你的生活坐标</p><h1>世界很大，<br/><em>哪里更像你的家？</em></h1><p>用30道量表题和3道开放题了解你的生活方式，从中国80座、欧洲50座、美洲50座和其他地区50座城市中寻找高匹配目的地。</p><button className="primary" onClick={()=>setScreen('city-quiz')}>开始城市测试<ArrowRight/></button></div><div className="regionCount">{Object.entries(cityGroups).map(([r,a])=><div key={r}><strong>{a.length}</strong><span>{r}城市</span></div>)}</div></section>}
 {screen==='city-quiz'&&<section className="quizPage cityQuiz"><div className="progress"><div style={{width:`${(cityIdx+1)/30*100}%`}}/><span>{String(cityIdx+1).padStart(2,'0')} / 30</span></div><article><p>这句话与你有多相符？</p><h2>{cityQuestions[cityIdx].text}</h2><div className="scale">{labels.map((l,i)=><button key={l} className={cityAnswers[cityIdx]===i?'selected':''} onClick={()=>cityAnswer(i)}><i>{i+1}</i><span>{l}</span></button>)}</div><nav><button disabled={cityIdx===0} onClick={()=>setCityIdx(cityIdx-1)}><ArrowLeft/>上一题</button><span>{cityQuestions[cityIdx].dim}</span><button disabled={cityIdx===29||cityAnswers[cityIdx]===null} onClick={()=>setCityIdx(cityIdx+1)}>下一题<ArrowRight/></button></nav></article></section>}
 {screen==='city-open'&&<section className="openPage"><div className="openHead"><p>城市测试 · 最后一步</p><h1>描述你真正向往的生活。</h1><span>开放题中的城市名称和生活关键词会参与匹配。</span></div>{cityOpenQuestions.map((q,i)=><label key={q}><b>0{i+1}</b><span>{q}</span><textarea value={cityOpenAnswers[i]} onChange={e=>{const next=[...cityOpenAnswers];next[i]=e.target.value;setCityOpenAnswers(next)}} placeholder="写下你的想法（可简短回答）" maxLength="300"/></label>)}<div className="openActions"><button onClick={()=>{setCityIdx(29);setScreen('city-quiz')}}><ArrowLeft/>返回上一题</button><button className="primary" onClick={()=>setScreen('city-result')}>查看城市结果<ArrowRight/></button></div></section>}
 {screen==='city-result'&&<section className="cityResults"><div className="cityResultPhoto" style={{backgroundImage:`linear-gradient(90deg,rgba(4,13,35,.88),rgba(4,13,35,.22)),url("${cityPhoto}")`}}><div><p>最适合你生活的城市</p><h1>{cityResults[0].name}</h1><p>{cityResults[0].region} · {cityResults[0].traits.join(' · ')}</p></div><strong>{cityResults[0].match}<small>%</small><span>生活匹配度</span></strong></div><div className="results"><div className="cityRank"><h2>其他高匹配城市</h2>{cityResults.slice(1,13).map((c,i)=><article key={c.name}><em>{String(i+2).padStart(2,'0')}</em><div><b>{c.name}</b><span>{c.region}</span></div><p>{c.traits.join(' · ')}</p><strong>{c.match}%</strong></article>)}</div><div className="regionSummary">{Object.keys(cityGroups).map(r=><div key={r}><span>{r}</span><b>{cityResults.filter(c=>c.region===r).slice(0,3).map(c=>c.name).join('、')}</b></div>)}</div><div className="actions"><button onClick={()=>{setCityAnswers(Array(30).fill(null));setCityOpenAnswers(['','','']);setCityIdx(0);setScreen('city-home')}}><RotateCcw/>重新测试</button><button onClick={startCareer}>去做职业测试</button></div><p className="disclaimer">背景图读取对应城市的百科代表图片；若该城市缺少图片，则使用城市名生成的唯一备用背景。城市匹配用于生活方式探索。</p></div></section>}
 {screen==='personality-home'&&<section className="personalityHero"><div><p>理解自己，也理解关系</p><h1>你是什么样的人，<br/><em>谁更适合与你同行？</em></h1><p>30道量表题与3道开放题，从50种性格和50种适合交往的朋友性格中，寻找你的关系模式。</p><button className="primary" onClick={()=>setScreen('personality-quiz')}>开始性格测试<ArrowRight/></button></div><div className="personalityWords">{personalityDims.map((d,i)=><span key={d} style={{fontSize:`${18+(i%4)*8}px`}}>{d}</span>)}</div></section>}
 {screen==='personality-quiz'&&<section className="quizPage"><div className="progress"><div style={{width:`${(personalityIdx+1)/30*100}%`}}/><span>{String(personalityIdx+1).padStart(2,'0')} / 30</span></div><article><p>这句话与你有多相符？</p><h2>{personalityQuestions[personalityIdx].text}</h2><div className="scale">{labels.map((l,i)=><button key={l} className={personalityAnswers[personalityIdx]===i?'selected':''} onClick={()=>personalityAnswer(i)}><i>{i+1}</i><span>{l}</span></button>)}</div><nav><button disabled={personalityIdx===0} onClick={()=>setPersonalityIdx(personalityIdx-1)}><ArrowLeft/>上一题</button><span>{personalityQuestions[personalityIdx].dim}</span><button disabled={personalityIdx===29||personalityAnswers[personalityIdx]===null} onClick={()=>setPersonalityIdx(personalityIdx+1)}>下一题<ArrowRight/></button></nav></article></section>}
 {screen==='personality-open'&&<section className="openPage"><div className="openHead"><p>性格测试 · 最后一步</p><h1>说说真实的你和你期待的友情。</h1><span>开放题帮助你进一步自我反思，不存在标准答案。</span></div>{personalityOpenQuestions.map((q,i)=><label key={q}><b>0{i+1}</b><span>{q}</span><textarea value={personalityOpenAnswers[i]} onChange={e=>{const next=[...personalityOpenAnswers];next[i]=e.target.value;setPersonalityOpenAnswers(next)}} placeholder="写下你的想法（可简短回答）" maxLength="300"/></label>)}<div className="openActions"><button onClick={()=>{setPersonalityIdx(29);setScreen('personality-quiz')}}><ArrowLeft/>返回上一题</button><button className="primary" onClick={()=>setScreen('personality-result')}>查看性格结果<ArrowRight/></button></div></section>}
 {screen==='personality-result'&&<section className="personalityResult"><div className="dualResult"><article><p>你的性格类型</p><h1>{personalityResults[0].name}</h1><div>{personalityResults[0].traits.map(t=><span key={t}>{t}</span>)}</div><strong>{personalityResults[0].match}% 匹配</strong></article><article><p>适合交往的朋友</p><h1>{friendResults[0].name}</h1><div>{friendResults[0].traits.map(t=><span key={t}>{t}</span>)}</div><strong>{friendResults[0].match}% 契合</strong></article></div><div className="personalityDetail"><section><h2>你的性格光谱</h2>{Object.entries(personalityProfile).sort((a,b)=>b[1]-a[1]).map(([d,v])=><div className="trait" key={d}><span>{d}</span><i><b style={{width:`${v/15*100}%`}}/></i><em>{Math.round(v/15*100)}</em></div>)}</section><section><h2>更多适合的朋友类型</h2>{friendResults.slice(1,7).map((f,i)=><div className="friendRow" key={f.name}><em>0{i+2}</em><span><b>{f.name}</b><small>{f.traits.join(' · ')}</small></span><strong>{f.match}%</strong></div>)}</section></div><div className="actions"><button onClick={()=>{setPersonalityAnswers(Array(30).fill(null));setPersonalityOpenAnswers(['','','']);setPersonalityIdx(0);setScreen('personality-home')}}><RotateCcw/>重新测试</button><button onClick={startCareer}>去做职业测试</button></div><p className="disclaimer">性格结果用于自我探索，不是心理诊断；健康的友情还取决于尊重、沟通、边界与共同经历。</p></section>}
 {screen==='leisure-home'&&<section className="leisureHero"><div><p>发现你的快乐配方</p><h1>吃什么，玩什么，<br/><em>才最像你的生活？</em></h1><p>30道量表题与3道开放题，从50种美食偏好和50种娱乐方式中找到你的专属组合。</p><button className="primary" onClick={()=>setScreen('leisure-quiz')}>开始美食娱乐测试<ArrowRight/></button></div><div className="leisureVisual"><span>味</span><span>乐</span></div></section>}
 {screen==='leisure-quiz'&&<section className="quizPage"><div className="progress"><div style={{width:`${(leisureIdx+1)/30*100}%`}}/><span>{String(leisureIdx+1).padStart(2,'0')} / 30</span></div><article><p>这句话与你有多相符？</p><h2>{leisureQuestions[leisureIdx].text}</h2><div className="scale">{labels.map((l,i)=><button key={l} className={leisureAnswers[leisureIdx]===i?'selected':''} onClick={()=>leisureAnswer(i)}><i>{i+1}</i><span>{l}</span></button>)}</div><nav><button disabled={leisureIdx===0} onClick={()=>setLeisureIdx(leisureIdx-1)}><ArrowLeft/>上一题</button><span>{leisureQuestions[leisureIdx].dim}</span><button disabled={leisureIdx===29||leisureAnswers[leisureIdx]===null} onClick={()=>setLeisureIdx(leisureIdx+1)}>下一题<ArrowRight/></button></nav></article></section>}
 {screen==='leisure-open'&&<section className="openPage"><div className="openHead"><p>美食与娱乐 · 最后一步</p><h1>描述真正让你快乐的体验。</h1><span>不需要写得正式，具体的食物、场景和活动最有帮助。</span></div>{leisureOpenQuestions.map((q,i)=><label key={q}><b>0{i+1}</b><span>{q}</span><textarea value={leisureOpenAnswers[i]} onChange={e=>{const next=[...leisureOpenAnswers];next[i]=e.target.value;setLeisureOpenAnswers(next)}} placeholder="写下你的想法（可简短回答）" maxLength="300"/></label>)}<div className="openActions"><button onClick={()=>{setLeisureIdx(29);setScreen('leisure-quiz')}}><ArrowLeft/>返回上一题</button><button className="primary" onClick={()=>setScreen('leisure-result')}>查看结果<ArrowRight/></button></div></section>}
 {screen==='leisure-result'&&<section className="personalityResult leisureResult"><div className="dualResult"><article><p>你的美食偏好</p><h1>{foodResults[0].name}</h1><div>{foodResults[0].traits.map(t=><span key={t}>{t}</span>)}</div><strong>{foodResults[0].match}% 匹配</strong></article><article><p>你的娱乐方式</p><h1>{entertainmentResults[0].name}</h1><div>{entertainmentResults[0].traits.map(t=><span key={t}>{t}</span>)}</div><strong>{entertainmentResults[0].match}% 匹配</strong></article></div><div className="personalityDetail"><section><h2>你的快乐光谱</h2>{Object.entries(leisureProfile).sort((a,b)=>b[1]-a[1]).map(([d,v])=><div className="trait" key={d}><span>{d}</span><i><b style={{width:`${v/15*100}%`}}/></i><em>{Math.round(v/15*100)}</em></div>)}</section><section><h2>更多娱乐候选</h2>{entertainmentResults.slice(1,7).map((f,i)=><div className="friendRow" key={f.name}><em>0{i+2}</em><span><b>{f.name}</b><small>{f.traits.join(' · ')}</small></span><strong>{f.match}%</strong></div>)}</section></div><div className="actions"><button onClick={()=>{setLeisureAnswers(Array(30).fill(null));setLeisureOpenAnswers(['','','']);setLeisureIdx(0);setScreen('leisure-home')}}><RotateCcw/>重新测试</button><button onClick={startCareer}>去做职业测试</button></div><p className="disclaimer">结果用于发现偏好与尝试新体验；饮食选择还需结合过敏、健康状况与个人预算。</p></section>}
 {screen==='ability-library'&&<section className="catalog libraryPage"><div className="catalogHead"><div><p>能力特长库</p><h1>10 类核心能力</h1></div></div><div className="catalogGrid compactLibrary">{abilityLibrary.map(([name,desc],i)=><article key={name}><small>能力 {String(i+1).padStart(2,'0')}</small><h3>{name}</h3><p>{desc}。</p><span><Check/>可通过学习和实践持续发展</span></article>)}</div></section>}
 {screen==='thinking-library'&&<section className="catalog libraryPage"><div className="catalogHead"><div><p>思维方式库</p><h1>10 种思考路径</h1></div></div><div className="catalogGrid compactLibrary">{thinkingLibrary.map(([name,desc],i)=><article key={name}><small>方式 {String(i+1).padStart(2,'0')}</small><h3>{name}</h3><p>{desc}。</p><span><Check/>不同问题适合不同思维方式</span></article>)}</div></section>}
 {screen==='ability'&&<GrowthTests key="ability" type="ability"/>}
 {screen==='thinking'&&<GrowthTests key="thinking" type="thinking"/>}
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
