$(document).ready(function () {
  // Setup - add a text input to each footer cell
  $("#table tfoot th").each(function () {
    var title = $(this).text();
    $(this).html('<input type="text" placeholder="Search: ' + title + '" />');
  });

  var table = $("#table").DataTable({
    responsive: true,
    data: data,
    columns: [
      { title: "Mainland Counterpart", data: "Mainland Counterpart" },
      {
        title: "Region",
        data: "Xinjiang Region",
        className: "dt-body-left",
      },
      {
        title: "Prioritized Industry",
        data: "Prioritized Industry",
        className: "dt-body-left",
      },
      {
        title: "Affiliated Pairing Companies",
        data: "Affiliated Pairing Companies",
        className: "dt-body-left",
      },
      {
        title: "Linked Infrastructure and Other Funded Projects",
        data: "Linked Infrastructure and Other Funded Projects",
        className: "dt-body-left",
      },
    ],
    paging: false,
    // scrollY: "400px",
    // scrollCollapse: true,
    searching: true,
    info: false,
    order: [],
    columnDefs: [
      {
        targets: [1, 2, 3, 4],
        orderable: false,
      },
    ],
    initComplete: function () {
      // Apply the search
      this.api()
        .columns()
        .every(function () {
          var that = this;

          $("input", this.footer()).on("keyup change clear", function () {
            console.log(this.value)
            if (that.search() !== this.value) {
              that.search(this.value).draw();
            }
          });
        });
    },
  });
});

const data = [
  {
    "Mainland Counterpart": "Beijing",
    "Xinjiang Region":
      "Hetian City; Hotan County; Moyu County; Luopu County; and Xinjiang Production and ConstructionCorps",
    "Prioritized Industry": "Agriculture; Textile",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="https://web.archive.org/web/20200825002614/http%3A%2F%2Fwww.agri.cn%2FV20%2FZX%2Fqgxxlb_1%2Fbj%2F201809%2Ft20180905_6239285.htm">Byte Dance;</a> Saikesan Garment Processing Factory; Haidian District Federation of Trade Unions; Beijing Aopen EducationCompany (北京奥鹏教育公司) ; Bank of Beijing Zongguancun Branch; <a target="_blank"  href="https://zhuanlan.zhihu.com/p/137801686">Beijing Benlai Life Group; Huatian Group; Tianheng Group; Beijing  Jiankun Group; Beijing Xinfadi Group; Beicai Group Beijing Xingfugou;</a> Shuoneng Group; <a target="_blank"  href="http://city.sina.com.cn/focus/t/2018-06-25/detail-iheirxyf5092832.shtml">Qiushi Shuangjiu Textile Company;  Zhennan Jujube Company;</a> <a target="_blank" href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Xinjiang Jinghe Textile; 62 enterprises including Beijing Textile Holdings and Beijing Qiushi Agriculture have been settled in Hotan.</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="https://www.hts.gov.cn/zhaoshangyinzi/show.php?itemid=62">Hotan District Beijing Industrial Park;</a> <a  target="_blank" href="https://udn.com/news/story/7333/4428903">Beijing Industrial Park of Luopu County;</a> <a  target="_blank" href="http://city.sina.com.cn/focus/t/2018-06-25/detail-iheirxyf5092832.shtml">Pimo Beijing  Industrial Park in Kunyu City; Beijing Chaoyang Balizhuang No. 3 Secondary School;</a> <a target="_blank" href="http://www.gov.cn/xinwen/2018-05/07/content_5288855.htm">Beijing has helped the Hotan area build or renovate more than 270 school buildings;  ​​Hotan National Agricultural Science and Technology Park; 224th Regiment Secondary School of the 14th Division of the Xinjiang Production and Construction Corps</a>',
  },
  {
    "Mainland Counterpart": "Shanghai",
    "Xinjiang Region":
      "Bachu County; Shache County; Zepu County; and Yecheng County in Kashgar; Karamay",
    "Prioritized Industry":
      'Science  and Technology; Substantial Textile Activity; Tourism;',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.sstec.org.cn/index.php?s=/home/page/view/category/13827.html,%20http://www.agri.cn/V20/SHXX/llzy/201606/t20160608_5165113.htm">Cathay  Biotechnology (上海凯赛生物科技有限公司);</a> <a target="_blank"  href="https://sjt.fujian.gov.cn/zwgk/gsgg/sjjggg/202001/t20200113_5179183.htm">Hehong Clothing Co. Ltd.; Xinaota  Shoes Co. Ltd; Xinjiang Dushanzi Tianli High-tech Co. Ltd. Xinjiang Tianhong Industrial Co. Ltd. (新疆天虹实业有限公司).;  Xinjiang Lande Fine Petrochemicals Co. Ltd (新疆蓝德精细石油化工股); Shanghai Xingke Industrial Co. Ltd. (上海星科实业有限公司);</a> Karamay Tianli Henghua Petrochemical Co. (克拉玛依市天利恒华石化有限公司);Xinjiang Tianli High-tch Petrochemical Co. Ltd.(新疆天利高新石化股份有限公司); <a target="_blank" href="http://www.xj.gov.cn/info/10658/69311.htm">Yuexing Group; SAIC Group;  Shanghai Bruilding Materials; Shanghai Pharmaceuticals;</a> <a target="_blank"  href="http://www.ctnews.com.cn/art/2019/12/26/art_118_59918.html">China Railway Shanghai Bureau Group; Shanghai  Railway International Tourism Group</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank" href="https://www.sohu.com/a/354268059_260616">Affiliated with  Dushanzi District; Tianli Industrial Chemical Park; Yecheng Shanghai Industrial Park (叶城县上海产业园); </a>Sache CountyVocational and Technical School (莎车县职业技术学校); Shache County Modern <a target="_blank"  href="http://www.shtong.gov.cn/dfz_web/DFZ/Info?idnode=174877&amp;tableName=userobject1a&amp;id=237978">Agriculture  Demonstration Park (莎车县现代农业示范园); </a><br> <a target="_blank"  href="http://www.shtong.gov.cn/dfz_web/DFZ/Info?idnode=174877&amp;tableName=userobject1a&amp;id=237978">Sache County  Southern Teaching Park (莎车县城南教学园区); Bachu County Citizen’s Home (巴楚县市民之家等</a>); China National Petroleum CorporationDushanzi Petrochemical Company (中国石油天然气股份有限公司独山子石化分公司);',
  },
  {
    "Mainland Counterpart": "Guangdong Province",
    "Xinjiang Region":
      "Shukang County; Jiashi County; and the Corps of Agriculture",
    "Prioritized Industry":
      "Textile and agricultural aid; Substantial electronics activity",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://hrss.gd.gov.cn/jyzl/ywzt/ldhz/content/post_1310093.html">CISCO Electronics; Jicheng Electronics;  Guangxin Textile; Free Trade Zone Warehouse; GAC Group Passenger Vehicle Co. Ltd</a>.; <a target="_blank"  href="http://finance.sina.com.cn/money/future/agri/2017-06-26/doc-ifyhmpew3502069.shtml">Dongshi Group; Yichun Group  and Tumushuk Xingfang Company; Dongchunxing Company (Dongshi Group Holdings);</a> <a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Enke Electronics;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank" href ="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Jiashi Industrial Park; Guangdong Textile and Garment Industrial Park;</a> Jiashi County Vocational and TechnicalSchool; Caohu Guangdong Textile and Garment Industrial Park; <a target="_blank"  href="http://finance.sina.com.cn/money/future/agri/2017-06-26/doc-ifyhmpew3502069.shtml">Kashgar (Guangdong) Textile  and Garment Industrial Park; XPCC Caohu Industrial Park;</a> <a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Fuxian Industry and Trade Park; Xingye  Small and Medium Enterprise Incubation Base</a>',
  },
  {
    "Mainland Counterpart": "Shenzhen",
    "Xinjiang Region": "Kashgar City; Tashkurgan County",
    "Prioritized Industry": "Agriculture; Textile",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.gov.cn/xinwen/2018-11/20/content_5342107.htm">Xinjiang Miracle Garment Co. Ltd;</a> <a  target="_blank" href="https://news.rednet.cn/content/2018/07/27/4788009.html">Shenzhen Hezhengyuan Group; Taxian  Jinfuyuan Garment Factory</a> <a target="_blank" href="http://www.ce.cn/xwzx/gnsz/gdxw/201806/17/t20180617_29459026.shtml">Shenzhen Guangtieqing International Travel Service Co., Ltd.; Shenzhen Tourism Association;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.gov.cn/xinwen/2018-11/20/content_5342107.htm">Developing Kashgar Economic Development Zone;  Shenzhen Industrial Park of the Kashgar Economic Development Zone;</a> <a target="_blank"  href="https://www.sohu.com/a/415031856_123753">more than 70 "satellite factories" in Shenzhen Industrial Park; Shenzhen-Cameroon Science and Technology Innovation Service Center; Shenzhen-Kazakhstan Science and Technology Innovation Service Center; Gucheng Maker Space; Xinjiang Beidou Double innovation base; Kashgar University-Huawei Innovation Center; From 2010 to 2020, Shenzhen has invested a total of 12.3 billion yuan in aid to Xinjiang, driving more than 1,000 incubating enterprises, driving more than 10 billion yuan in industries</a>',
  },
  {
    "Mainland Counterpart": "Tianjin",
    "Xinjiang Region": "Minfeng; Cele and Yutian counties in Hetian",
    "Prioritized Industry": "Agriculture",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.xj.xinhuanet.com/2019-10/11/c_1125091621.htm">Xinjiang Shuyiya Textile Co. Ltd.; Tianjin Xinyatu  Clothing Co. Ltd.; Tianjin Zangyuan Carpet Co. Ltd.; 11th Division Li Garment Technology Co. Ltd.; Xinjiang Meiyuda  Carpet Co. Ltd.; Jianzi Group Shili Clo Tianjin Food Group thing Technology Co. Ltd.;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.xdz.gov.cn/Topics/cxtczt/20140217/content.jsp?urltype=news.NewsContentUrl&amp;wbtreeid=20387&amp;wbnewsid=175323">Cele  County Vocational and Technical School;</a> <a target="_blank"  href="http://www.xj.xinhuanet.com/2019-10/11/c_1125091621.htm">11th Division Corps New Building Materials Industrial  Park and Tianjin Wuqing Development Zone;</a>',
  },
  {
    "Mainland Counterpart": "Liaoning Province",
    "Xinjiang Region": "Tacheng area; 8th and 9th division of XPCC",
    "Prioritized Industry":
      "“Industrialization;” Science and Technology; Substantial agricultural activity; “Electric PowerAid”",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2016/1228/c186332-29526508.htm">Liaoning Tiefa Group; Liaoning Tianxin Company;  Liaoning Fuxin Xinyida Company; China Hualu Group; and Shenyang Mingchen Company; Xinjiang Yumin Tianding Safflower  Oil Co.;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="https://web.archive.org/web/20200821044940/http:/www.cac.gov.cn/2015-12/01/c_1117322476.htm">Alibaba helped  create the “Alibaba·Tacheng Industrial Belt”</a>',
  },
  {
    "Mainland Counterpart": "Zhejiang Province",
    "Xinjiang Region":
      "Supporting the 1 city and 8 counties of the Aksu area and the Alar City of the Xinjiang Productionand Construction Corps",
    "Prioritized Industry": "Textile and agricultural aid",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://yj.zjol.com.cn/yjyw/201811/t20181109_8704224.shtml">Xinjiang Tianshan Hengrui Textile; Zhongpu  Satellite Factory; Zhejiang Zhongpu Group; Awati Textile and Garment Satellite Industrial Park; Aksu Industrial Park;  Xinjiang Ruyi Textile and Garment Co.; Xinjiang Qianhai Cotton Textile Company; Huafu Group; Aksu Zhejiang Fruit  Industry Co. Ltd; Kuche Siqi Garment Co.; Xinjiang Grain Yijia Agricultural Co.; Xinjiang Keliwei Clothing Co; Nurbach  Township Satellite Factory; Xinjiang Norton Garment Co; Wushi County Silk Road Technology Socks; Alar City Xingmeida  Printing and Dyeing Co.; Xinhe County Dupai Clothing Co;</a> <a target="_blank" href="http://xj.people.com.cn/n2/2017/0714/c186332-30473397.html">Awati County Grezi Knitting Co., Ltd. invested by Zhejiang Qimeng Knitting Co., Ltd.; Zhejiang Shenghong Garment Co., Ltd.</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank" href="https://yj.zjol.com.cn/yjyw/201808/t20180825_8100907.shtml">Aksu Industrial Park; Zhejiang Industrial Park; Zhejiang Secondary School;  Hangzhou Avenue; Ningbo New Village; Wenzhou Road Pedestrian Street; Jieliya Xinjiang Project; Jiaxing Kindergarten; Anji Middle School; Wenzhou Outpatient Building; Aksu College of Education; Zhenhai Secondary School; Zhejiang Aksu Export Industrial Cooperation Park; Huafu Aksu Lvshang Textile Town·China Textile Commodity Center;</a>',
  },
  {
    "Mainland Counterpart": "Jilin Province",
    "Xinjiang Region":
      "Altay City; Habahe County; Burqin County and Jimunai County in Altay Region",
    "Prioritized Industry": "Agriculture; Medicine; Tourism",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://jl.cri.cn/2019-01-18/78307e2e-2d2b-b621-cdc0-e01234122f06.html">Jilin Northeast Asia Publishing and Media Group; Jilin Publishing Group; "China National Geographic" magazine; </a> <a target="_blank"  href="http://jl.cri.cn/2019-01-18/78307e2e-2d2b-b621-cdc0-e01234122f06.html">Xinjiang Altay Prefectural Committee Propaganda Department; Department of Industrial Information Technology of Jilin Province; School of Physical Education of Jilin University; Jilin University of Finance and Economics; Jilin University of Agriculture; </a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.xj.chinanews.com/yuanjiang/2019-05-08/detail-ifzhxsav0018853.shtml">Building 8,297 residential houses for locals; Changchun New Area donated 1 million yuan for the Jimunai Border Cooperation Zone to enhance its anti-terrorism and stability maintenance capabilities; Haba River Modern Agriculture and Animal Husbandry Introduction and Breeding Technology Demonstration Base; Invested 126 million yuan in aid to Xinjiang, implemented 56 education aid projects in Xinjiang, and supported the infrastructure construction of regional vocational education parks and the "Jilin School" of Altay No. 3 Middle School</a> <a target="_blank" href="http://jl.cri.cn/2019-01-18/78307e2e-2d2b-b621-cdc0-e01234122f06.html">Altay Region Party Building Library; </a>',
  },
  {
    "Mainland Counterpart": "Jiangxi Province",
    "Xinjiang Region": "Akto County; Kyzyl Sukhorke Autonomous Prefecture",
    "Prioritized Industry": "Agriculture; Mining",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://cpc.people.com.cn/BIG5/n1/2019/0716/c64387-31236390.html">Xinjiang Jiangxi Chamber of Commerce;  Xianglong Stationery;</a> <a target="_blank"  href="http://www.sasac.gov.cn/n2588025/n2588124/c4061068/content.html">China Metallurgical Changtian International  Engineering Co. Ltd.;</a> <a target="_blank" href="http://jx.ifeng.com/a/20170206/5365679_0.shtml">Jiangxi Dacheng  State-owned Assets Co. Ltd.;</a> <a target="_blank"  href="http://www.chinaxinjiang.cn/dizhou/14/201807/t20180712_568026.htm">Kaixin Pharmaceutical; Kezhou Hospital of  Traditional Chinese Medicine; Xinjiang Boge Electronic New Material Co. Ltd.; Xinchang Electronics Co. Ltd. Xiamen  Guoding Investment Co. Ltd.; Jiujiang Huafu Fashion Co. Ltd.;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://cpc.people.com.cn/BIG5/n1/2019/0716/c64387-31236390.html">Cedar Middle School; Xiaobaiyang Bilingual  Primary School; Fifth Kindergarten; and County People\'s Hospital; Akto (Jiangxi) Industrial Park; Akto Modern  Agriculture Demonstration Park;</a> <a target="_blank"  href="http://www.sasac.gov.cn/n2588025/n2588124/c4061068/content.html">Heavy Industry Park of Atushi City</a> <a target="_blank" href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtmlhttp://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Since the launch of the new round of counterpart assistance to Xinjiang, Jiangxi Province has designated Nanchang and Jiujiang as demonstration sites for the employment of ethnic minorities and college students in the recipient areas of Jiangxi</a>',
  },
  {
    "Mainland Counterpart": "Heilongjiang Province",
    "Xinjiang Region":
      "Fuhai County; Fuyun County; Qinghe County and Xinjiang Corps Division 10 in Altay Prefecture",
    "Prioritized Industry":
      '<a target="_blank"  href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">Agriculture; Medicinal Production (specific  directive from Heilongjiang’s Qinghe Sub-Command for Aid to Xinjiang)</a>',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1212/c393172-33627040.html">Qiqihar Heilong International Ice and Snow  Equipment Co., Ltd.;</a> <a target="_blank"  href="http://www.hlj.chinanews.com/hljnews/2019/0111/41772.html">Heilongjiang Xinmeng Breeding Co. Ltd.; Beidahuang  Group; Heilongjiang Chiteng Co. Ltd.; Tianjin Tianxiang Aquatic Products Co. Ltd.; Howden Holdings; Heilongjiang  Xinmeng Breeding Co. Ltd.; Zhongrui Animal Husbandry; Heilongjiang Shengyu Wood Industry set up Xinjiang Shennong  Beiwei Fungus Industry Co. Ltd.; Heilongjiang Chiteng Co. Ltd.; Dalian Nongchang International Trade Co. Ltd.;  Heilongjiang Xingsheng Guojian Import and Export Trade Co. Ltd.; Heilongjiang Academy of Agricultural Sciences;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1212/c393172-33627040.html">Fuhai County Industrial Park;</a> <a  target="_blank" href="http://www.hlj.chinanews.com/hljnews/2019/0111/41772.html">Longjiang Facility Agriculture  Base of the Tenth Division and the 183rd Regiment;</a>',
  },
  {
    "Mainland Counterpart": "Anhui Province",
    "Xinjiang Region": "Pisan County; Wada area",
    "Prioritized Industry": "Agriculture; Tourism; Textile",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.ctnews.com.cn/art/2019/12/26/art_118_59918.html">Anhui Global Cultural Tourism Group Co.; Ltd.;  Anhui Shanghai Railway International Tourism Company;</a> <a target="_blank"  href="http://www.ahgykg.com/anhuinews_display.asp?id=5978">Chaohu Youngor Color Spinning Technology Company; Anhui  Huaibei Huafu Mélange Co.; Ltd.;</a> <a target="_blank" href="https://kknews.cc/other/lnjplnb.html">Hetian Conch  Profile Co.; Ltd.;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.ahgykg.com/anhuinews_display.asp?id=5978">Azawu River Modern Agricultural Industry Integration  Demonstration Park;</a> <a target="_blank" href="https://kknews.cc/other/lnjplnb.html">Anhui Conch Industrial  Park; Pishan County People\'s Hospital;</a>',
  },
  {
    "Mainland Counterpart": "Henan Province",
    "Xinjiang Region":
      "Counterpart support for the Hami area; the 13th Division of the Corps",
    "Prioritized Industry": "Agriculture; Energy; Mining;",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://m.xinhuanet.com/2017-08/14/c_1121479379.htm">Xinjiang Singing Fruit Food Co. Ltd.; Henan Haoxiangyou  Zao Industry Co. Ltd;</a> <a target="_blank" href="http://m.xinhuanet.com/2017-08/14/c_1121479379.htm">Sinopharm  Group and Zhengzhou Coal Mining Machinery; Xuchang Xu Ji; GCL New Energy ; Sanquan; Tuoren; CITIC Heavy Industry;  National Optoelectronics; Lingrui; Huahuaniu; Xu Ji Wind Power Technology Company and Henan GCL New Energy Investment  Co. Ltd.;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.xj.chinanews.com/yuanjiang/2020-04-15/detail-ifzvhxku1032653.shtml">Water Source Confluence  Project; the 13th Division Cultural and Sports Activity Center; the Zhongyuan Ward Building;</a> <a target="_blank"  href="http://m.xinhuanet.com/2017-08/14/c_1121479379.htm">Hami City High-tech Development Zone; “Xinjiang Power  Transmission” strategy—the Hami-Zhengzhou ±800 kV UHV DC transmission project; Hami Central Hospital;</a>',
  },
  {
    "Mainland Counterpart": "Jiangsu Province",
    "Xinjiang Region":
      "Atushi City; Wuqia County; Ishiha Kazakh Autonomous Prefecture Huocheng County; Agricultural FourDivision 66 Group; Yining County; Chabuchaer Xibo Autonomous County",
    "Prioritized Industry": "Agriculture; Textile",
    "Affiliated Pairing Companies":
      '<a target="_blank" href="http://djh.168tex.com/2017-07-14/929866.html">Jiangsu  Lianfa Textile;</a> <a target="_blank" href="http://www.js.xinhuanet.com/2019-12/12/c_1125340400.htm">Jiangsu  Ocean and Fisheries Bureau; Yili Yueran Ecological Agriculture Co., Ltd.; Xuzhou Tianhong; Jiangsu Jinsheng; Shandong  Baizheng;</a> <a target="_blank" href="http://www.gov.cn/xinwen/2015-07/14/content_2896229.htm">Xinjiang Hongdou  Garment Co., Ltd.; Zhenfa Solar Photovoltaic Power Generation; Jinmay Petrochemical Industry;</a> <a target="_blank"  href="http://jsnews.jschina.com.cn/jsyw/201712/t20171218_1275122.shtml">Xinjiang Jinzhiyuan Biotechnology Co. Ltd.;  Xinjiang Huadong Prefabricated House Co. Ltd.; Jiangsu Ninghang Expressway Co. Ltd.;</a> <a target="_blank"  href="http://jsnews.jschina.com.cn/zt2020/ztgk/202006/t20200604_2565829.shtml">Kunshan AB Group; Shiming Technology;  and Duowei Sports;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.js.xinhuanet.com/2019-12/12/c_1125340400.htm">Linzi Primary School; the crab and crayfish breeding  base in Kan Township; Yining County Textiles and Garment Industrial Park;</a> <a target="_blank"  href="http://internal.dbw.cn/system/2019/12/31/058311365.shtml">Kezhou Vocational and Technical School;</a> <a  target="_blank" href="http://www.gov.cn/xinwen/2015-07/14/content_2896229.htm">Nantong Agricultural and Sideline  Products Logistics Center; Yili Technician Training College; Jiangsu Yancheng Technician College;</a> <a  target="_blank" href="http://jsnews.jschina.com.cn/jsyw/201712/t20171218_1275122.shtml">Aheqi Wuxi Light  Industrial Park; Changzhou Industrial Park of Wuqia County; Atushi Kunshan Industrial Park; Wuqia Changzhou Industrial  Park;</a> <a target="_blank" href="http://jsnews.jschina.com.cn/zt2020/ztgk/202006/t20200604_2565829.shtml">Artush  City Vocational Education School; Kezhou No. 2 Middle School; Atushi No. 1 Middle School; Niluke Middle School;  Kunshan Yucai School in Atushi City; The Kunshan Industrial Park Electronic Assembly Park; the Atushi Small and Micro  Enterprise Park Textile and Garment Processing Park;</a> <a target="_blank"  href="https://perma.cc/L78U-YSLA">Weaving Industrial Park and the Home Textile and Garment Industrial Park</a>',
  },
  {
    "Mainland Counterpart": "Fujian Province",
    "Xinjiang Region":
      "The six counties of Changji City; Manas County; Hutubi County; Qitai County; Jimsar County and MuleiCounty in Changji Hui Autonomous Prefecture",
    "Prioritized Industry":
      'Agriculture; Coal; Electricity; Chemical; <a target="_blank"  href="https://sjt.fujian.gov.cn/zwgk/gsgg/sjjggg/202001/t20200113_5179183.htm">Equipment Manufacturing</a> <a  target="_blank" href="#_msocom_3">[MS3]</a> ; Textile; “Electric Power Aid” (specific directive)',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/BIG5/n2/2019/1126/c186332-33578710.html">Hengan (Changji) Paper Co.; Ltd. and Xinjiang  Xinlv Aluminum Co.; Ltd.; Fujian Hengan Group Co.; Ltd. and Hengan (China) Investment Co.; Ltd.;</a> <a  target="_blank" href="http://fjnews.fjsen.com/2019-11/05/content_30045270.htm">Fujian Disabled Welfare Foundation;  Fujian Hongxing Erke Sporting Goods Co.; Ltd.;</a> <a target="_blank" href="https://web.archive.org/web/20201005235446/http://web.archive.org/screenshot/http://www.xj.xinhuanet.com/zt/2020-01/05/c_1125423288.htm">Xinjiang Huarong E-commerce Co., Ltd.; Xinjiang Hualin Agricultural Technology Development Co., Ltd; Xinjiang Minxin Iron and Steel Group Minhang Special Steel Co., Ltd.; Xinjiang Dushi Tourism Co., Ltd. Fujian Civil Defense Office;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank" href="https://web.archive.org/web/20201005235446/http://web.archive.org/screenshot/http://www.xj.xinhuanet.com/zt/2020-01/05/c_1125423288.htm">Changji High-tech Zone; In 2018, the Changji Agricultural Park and the Zhejiang Chamber of Commerce were promoted to jointly build the "Fujian and Zhejiang Industrial Park", and introduced 18 companies to the park in Fujian and Zhejiang through the "Park in the Park" investment model, with an investment of nearly 2.2 billion yuan; from 2017 to the present, Fujian Province has funded 127 tribal real estate aid projects in Xinjiang; </a>',
  },
  {
    "Mainland Counterpart": "Hubei Province",
    "Xinjiang Region":
      "Bole City; Jinghe County; Wenquan County of Bortala Mongolian Autonomous Prefecture and XinjiangProduction and Construction Corps Agricultural Fifth Division",
    "Prioritized Industry": "“Electric Power Aid” (specific directive)",
    "Affiliated Pairing Companies":
      '<a target="_blank" href="https://web.archive.org/web/20201006000451/http://xj.people.com.cn/n2/2019/0924/c389986-33384343.html">Shihezi Army Reclamation; Art Museum of Hubei Provincial Chinese Painting Academy; Enshi University; Jinghe County Chuxin Agricultural Development Co., Ltd.; Bozhou Tianlai Fragrant Niu Company; Hubei Provincial Radio and Television Station; </a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank" href="https://web.archive.org/web/20201006000451/http://xj.people.com.cn/n2/2019/0924/c389986-33384343.html">From 2017 to 2019, 169 aid projects have been implemented and 1.497 billion yuan has been invested in aid to Xinjiang; Eighty Eighth Regiment School of the Fifth Division of the Corps; Bole City Hospital of Integrated Traditional Chinese and Western Medicine; Underground Passage Project between the North and South of Alashankou Comprehensive Bonded Zone; Jinghe Housing and Enriching People Project; Corps Fifth Division Shuanghe City Fourth Hall Center; Shuanghe City Hospital Complex Building; Corps Fifth Division Eighth The 14th Regiment Eyuan Staff Training Center; Bortala Vocational and Technical College (Bozhou Branch of Wuhan Vocational and Technical College); Wuhan Vocational and Technical College; "Hundred People Knot Project" aiming to create marriages between cadres and ethnic minorities;</a>',
  },
  {
    "Mainland Counterpart": "Shanxi Province",
    "Xinjiang Region":
      "Xinjiang Production and Construction Corps Agricultural Sixth Division Wujiaqu City; Changji HuiAutonomous Prefecture Fukang City",
    "Prioritized Industry":
      '<a target="_blank" href="https://www.china5e.com/news/news-147212-1.html">Agriculture;  Mining (Shanxi is the “Coal Capital” of China); Textile</a>',
    "Affiliated Pairing Companies":
      '<a target="_blank" href="https://www.china5e.com/news/news-147212-1.html">“80  Shanxi coal companies have settled in Xinjiang”</a> <a target="_blank" href="http://xj.people.com.cn/n2/2020/0103/c186332-33688019-4.html">Shanxi Provincial Department of Culture; Shanxi Opera Theater; Xinjiang Yuxin Culture Media Co., Ltd.; Shanxi Provincial Theater; Wujiaqu Cultural Center; Shanxi City Propaganda and Cultural System;</a> <a target="_blank" href="http://news.ts.cn/system/2020/01/10/036043429.shtml">Wujiaqu Xingsheng Investment Co., Ltd.; Henan Dayou Energy Co., Ltd.; Shanxi Pingyao Xingsheng Coal Chemical Co., Ltd.;</a> <a target="_blank" href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">Shanxi Academy of Agricultural Sciences;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank" href="https://www.china5e.com/news/news-147212-1.html">Wujiaqu  City Communist Youth League Farm Corps Modern Agricultural Park; Fukang City Jinshang Industrial Park; Fukang City  Ganhezi Town Research; Tianchi scenic spot; Xinjiang Tianshan Tianchi International Tourist Resort; Jinfu Tianshan  Tianchi Tourism and Cultural Industry Pioneer Park; 102 Group Facility Agriculture Project;</a> <a target="_blank"  href="http://xj.people.com.cn/n2/2020/0103/c186332-33688019-4.html">Wujiaqu Jinzhi Library;</a> <a target="_blank"  href="http://news.ts.cn/system/2020/01/10/036043429.shtml">Fangcaohu Farm Kindergarten; From 2011 to 2020, Shanxi Province has supported 134 projects in Wujiaqu City of the Sixth Division with a total investment of 3.125 billion yuan, of which Shanxi’s Xinjiang aid fund was 1.406 billion yuan;</a>',
  },
  {
    "Mainland Counterpart": "Hunan Province",
    "Xinjiang Region":
      "Hami area; Xinjiang Production and Construction Corps Agricultural 13th Division",
    "Prioritized Industry":
      'Agriculture; <a target="_blank"  href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">“Electric Power Aid”</a> (specific directive); <a  target="_blank" href="http://xj.people.com.cn/n2/2019/1118/c393132-33552256.html">Tourism</a>',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1118/c393132-33552256.html">Shuangfeng Agriculture Co., Ltd.; Turpan Shengyuan  Chaotianlong E-commerce Co., Ltd.; Hunan Chaotian Longjiao Spicy Food Co., Ltd.; Hunan Chaotian Longjiao Food Co.,  Ltd.;</a> <a target="_blank" href="http://www.hunan.gov.cn/hnszf/hnyw/tt/201807/t20180713_5051965.html">Tuan Putao  Huang Fruit Industry Company;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1118/c393132-33552256.html">Xinjiang Academy of Agricultural Sciences;  National E-commerce Industrial Park; Deyuan Winery; Xinjiang Turpan Tourism Promotion Service Center; Xinjiang Red  Army West Road Army’s Army Reclamation Museum; Xinjiang Corps Army Reclamation Museum in Shihezi City; Shuixian  Factory Brakebaishi Village of Xiaxiang; </a> <a target="_blank"  href="http://cpc.people.com.cn/BIG5/n1/2018/0713/c117005-30144563.html">Kanerjing Characteristic Town Project of  Yaer Village; County Youth Activity Center; Xiangshan Bilingual Kindergarten;</a> <a target="_blank"  href="https://hn.rednet.cn/content/2019/11/27/6263335.html">Memorial Park of the Red Army West Route Army in Hami  City;</a>',
  },
  {
    "Mainland Counterpart": "Shandong Province",
    "Xinjiang Region":
      "Shule County and Yingji in Kashgar Sha County; Megaiti County; Yuepuhu County",
    "Prioritized Industry":
      "Textiles; Equipment; Substantial medical related activity",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">Shule Ruyi Technology Textile Co., Ltd.; Zoucheng  Guosheng Garment Processing; Jinsheng Textile; Dongying Blu-ray Projects;</a> <a target="_blank"  href="http://www.worldmr.net/Exhibition/ForeCastList/Info/2018-06-29/228920.shtml">Zhaojin Mining Co., Ltd.;</a> <a  target="_blank" href="http://www.dzwww.com/2020/2020ksgmx/ttxw/202006/t20200623_6135828.htm">Shandong Provincial  Health Committee; Shandong Internet Media Group; Dazhong·Poster News; Second Hospital of Shandong University; Kashgar  District Health Committee; Yingji Sha County People\'s Government; Jining City Aid Work Headquarters for Xinjiang;  Shandong Qilu Pharmaceutical Group Co., Ltd.; Shijiazhuang Yiling Pharmaceutical Co., Ltd.; Shanxi Guangyuyuan  Sinopharm Co., Ltd.; Shandong</a> Xianda Health Industry Co., Ltd.; <a target="_blank"  href="http://www.tex-asia.com/news/201809/13/1408.html">ZTE Glove Company; Xinjiang Jifa Huahe Garment Co.,  Ltd.;</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.tex-asia.com/news/201809/13/1408.html">Yingjisha County Industrial Park; Yuepuhu County Industrial  Park; Shule Ruyi Technology Textile Industrial Park; Kashgar Qilu Ruyi Technology Textile Industrial Park; Yingji  Shaqilu Textile Industrial Park;</a>',
  },
  {
    "Mainland Counterpart": "Hebei Province",
    "Xinjiang Region":
      '<a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Xinjiang Bayingoleng Mongolian Autonomous  Prefecture Science and Technology Bureau; Xinjiang Production and Construction Corps; the 36th Regiment of the 1st  Division; and the 2nd Division and 3rd Regiment of Xinjiang Production and Construction Corps</a>',
    "Prioritized Industry": "Agriculture; Mining",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Hebei Green Ridge Fruit Industry Co.,  Ltd.;</a> <a target="_blank" href="http://stdaily.com/02/xinjiang/2019-07/09/content_776362.shtml">Xinjiang  Xingmei Mining Co., Ltd.; Energy Xingtai Mining Group Co.; Xinjiang Meike Investment Group; Jizhong Energy Group;  Xingkuang Group;</a> <a target="_blank"  href="http://www.xinjiang.gov.cn/xinjiang/dzdt/201912/09f5b8e1af3e4b269a1a9da446a95bc5.shtml">Yanqi Branch of  Chenguang Biotechnology Group;</a> <a target="_blank"  href="http://stdaily.com/02/xinjiang/2019-07/09/content_776362.shtml">Jizhong Energy Group</a>',
    "Linked Infrastructure and Other Funded Projects":
      '<a target="_blank"  href="http://www.xinjiang.gov.cn/xinjiang/dzdt/201912/09f5b8e1af3e4b269a1a9da446a95bc5.shtml">Yanqi Hebei Bazhou  Ecological Industrial Park; 53 of the first batch of listed aided construction projects and 23 key industrial aid  enterprises in Xinjiang.</a> <a target="_blank"  href="http://stdaily.com/02/xinjiang/2019-07/09/content_776362.shtml">Tashidian Coal Mine</a>',
  },
];
