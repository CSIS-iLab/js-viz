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
        title: "Linked Infrastructure Projects",
        data: "Linked Infrastructure Projects",
        className: "dt-body-left",
      },
    ],
    paging: false,
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
      '<a target="_blank"  href="https://web.archive.org/web/20200825002614/http%3A%2F%2Fwww.agri.cn%2FV20%2FZX%2Fqgxxlb_1%2Fbj%2F201809%2Ft20180905_6239285.htm">Byte  Dance</a>; Saikesan Garment Processing Factory; Haidian District Federation of Trade Unions; Beijing Aopen EducationCompany (北京奥鹏教育公司) ; Bank of Beijing Zongguancun Branch; <a target="_blank"  href="https://zhuanlan.zhihu.com/p/137801686">Beijing Benlai Life Group; Huatian Group; Tianheng Group; Beijing  Jiankun Group; Beijing Xinfadi Group; Beicai Group Beijing Xingfugou</a>; Shuoneng Group; <a target="_blank"  href="http://city.sina.com.cn/focus/t/2018-06-25/detail-iheirxyf5092832.shtml">Qiushi Shuangjiu Textile Company;  Zhennan Jujube Company;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="https://www.hts.gov.cn/zhaoshangyinzi/show.php?itemid=62">Hotan District Beijing Industrial Park</a>; <a  target="_blank" href="https://udn.com/news/story/7333/4428903">Beijing Industrial Park of Luopu County</a>; <a  target="_blank" href="http://city.sina.com.cn/focus/t/2018-06-25/detail-iheirxyf5092832.shtml">Pimo Beijing  Industrial Park in Kunyu City; Beijing Chaoyang Balizhuang No. 3 Secondary School;</a>',
  },
  {
    "Mainland Counterpart": "Shanghai",
    "Xinjiang Region":
      "Bachu County; Shache County; Zepu County; and Yecheng County in Kashgar; Karamay",
    "Prioritized Industry":
      '<a target="_blank"  href="http://www.sstec.org.cn/index.php?s=/home/page/view/category/13827.html,%20http://www.agri.cn/V20/SHXX/llzy/201606/t20160608_5165113.htm">Science  and Technology; Substantial Textile Activity; Tourism;</a>',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.sstec.org.cn/index.php?s=/home/page/view/category/13827.html,%20http://www.agri.cn/V20/SHXX/llzy/201606/t20160608_5165113.htm">Cathay  Biotechnology (上海凯赛生物科技有限公司);</a> <a target="_blank"  href="https://sjt.fujian.gov.cn/zwgk/gsgg/sjjggg/202001/t20200113_5179183.htm">Hehong Clothing Co. Ltd.; Xinaota  Shoes Co. Ltd; Xinjiang Dushanzi Tianli High-tech Co. Ltd. Xinjiang Tianhong Industrial Co. Ltd. (新疆天虹实业有限公司).;  Xinjiang Lande Fine Petrochemicals Co. Ltd (新疆蓝德精细石油化工股); Shanghai Xingke Industrial Co. Ltd. (上海星科实业有限公司)</a>;Karamay Tianli Henghua Petrochemical Co. (克拉玛依市天利恒华石化有限公司);Xinjiang Tianli High-tch Petrochemical Co. Ltd.(新疆天利高新石化股份有限公司); <a target="_blank" href="http://www.xj.gov.cn/info/10658/69311.htm">Yuexing Group; SAIC Group;  Shanghai Bruilding Materials; Shanghai Pharmaceuticals</a>; <a target="_blank"  href="http://www.ctnews.com.cn/art/2019/12/26/art_118_59918.html">China Railway Shanghai Bureau Group; Shanghai  Railway International Tourism Group</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank" href="https://www.sohu.com/a/354268059_260616">Affiliated with  Dushanzi District; Tianli Industrial Chemical Park; Yecheng Shanghai Industrial Park (叶城县上海产业园); </a>Sache CountyVocational and Technical School (莎车县职业技术学校); Shache County Modern <a target="_blank"  href="http://www.shtong.gov.cn/dfz_web/DFZ/Info?idnode=174877&amp;tableName=userobject1a&amp;id=237978">Agriculture  Demonstration Park (莎车县现代农业示范园); </a><br> <a target="_blank"  href="http://www.shtong.gov.cn/dfz_web/DFZ/Info?idnode=174877&amp;tableName=userobject1a&amp;id=237978">Sache County  Southern Teaching Park (莎车县城南教学园区); Bachu County Citizen’s Home (巴楚县市民之家等</a>); China National Petroleum CorporationDushanzi Petrochemical Company (中国石油天然气股份有限公司独山子石化分公司);',
  },
  {
    "Mainland Counterpart": "Guangdong Province",
    "Xinjiang Region":
      "Shukang County; Jiashi County; and the Corps of Agriculture",
    "Prioritized Industry":
      "Textile and agricultural aid; Substantial electronics activity",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://hrss.gd.gov.cn/jyzl/ywzt/ldhz/content/post_1310093.html">CISCO Electronics; Jicheng Electronics;  Guangxin Textile; Free Trade Zone Warehouse; GAC Group Passenger Vehicle Co. Ltd</a>.; <a target="_blank"  href="http://finance.sina.com.cn/money/future/agri/2017-06-26/doc-ifyhmpew3502069.shtml">Dongshi Group; Yichun Group  and Tumushuk Xingfang Company; Dongchunxing Company (Dongshi Group Holdings)</a>; <a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Enke Electronics;</a>',
    "Linked Infrastructure Projects":
      'Affiliated with Jiashi Industrial Park; Jiashi County Vocational and TechnicalSchool; Caohu Guangdong Textile and Garment Industrial Park; <a target="_blank"  href="http://finance.sina.com.cn/money/future/agri/2017-06-26/doc-ifyhmpew3502069.shtml">Kashgar (Guangdong) Textile  and Garment Industrial Park; XPCC Caohu Industrial Park</a>; <a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Fuxian Industry and Trade Park; Xingye  Small and Medium Enterprise Incubation Base</a>',
  },
  {
    "Mainland Counterpart": "Shenzhen",
    "Xinjiang Region": "Kashgar City; Tashkurgan County",
    "Prioritized Industry": "Agriculture; Textile",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.gov.cn/xinwen/2018-11/20/content_5342107.htm">Xinjiang Miracle Garment Co. Ltd;</a> <a  target="_blank" href="https://news.rednet.cn/content/2018/07/27/4788009.html">Shenzhen Hezhengyuan Group; Taxian  Jinfuyuan Garment Factory</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://www.gov.cn/xinwen/2018-11/20/content_5342107.htm">Developing Kashgar Economic Development Zone;  Shenzhen Industrial Park of the Kashgar Economic Development Zone;</a> <a target="_blank"  href="https://news.rednet.cn/content/2018/07/27/4788009.html">Textile Industrial Park of Tashkurgan Tajik Autonomous  County;</a>',
  },
  {
    "Mainland Counterpart": "Tianjin",
    "Xinjiang Region": "Minfeng; Cele and Yutian counties in Hetian",
    "Prioritized Industry": "Agriculture",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.xj.xinhuanet.com/2019-10/11/c_1125091621.htm">Xinjiang Shuyiya Textile Co. Ltd.; Tianjin Xinyatu  Clothing Co. Ltd.; Tianjin Zangyuan Carpet Co. Ltd.; 11th Division Li Garment Technology Co. Ltd.; Xinjiang Meiyuda  Carpet Co. Ltd.; Jianzi Group Shili Clo Tianjin Food Group thing Technology Co. Ltd.;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://www.xdz.gov.cn/Topics/cxtczt/20140217/content.jsp?urltype=news.NewsContentUrl&amp;wbtreeid=20387&amp;wbnewsid=175323">Cele  County Vocational and Technical School;</a> <a target="_blank"  href="http://www.xj.xinhuanet.com/2019-10/11/c_1125091621.htm">11th Division Corps New Building Materials Industrial  Park and Tianjin Wuqing Development Zone</a>;',
  },
  {
    "Mainland Counterpart": "Liaoning Province",
    "Xinjiang Region": "Tacheng area; 8th and 9th division of XPCC",
    "Prioritized Industry":
      "“Industrialization;” Science and Technology; Substantial agricultural activity; “Electric PowerAid”",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2016/1228/c186332-29526508.htm">Liaoning Tiefa Group; Liaoning Tianxin Company;  Liaoning Fuxin Xinyida Company; China Hualu Group; and Shenyang Mingchen Company; Xinjiang Yumin Tianding Safflower  Oil Co.;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="https://web.archive.org/web/20200821044940/http:/www.cac.gov.cn/2015-12/01/c_1117322476.htm">Alibaba helped  create the “Alibaba·Tacheng Industrial Belt”</a>',
  },
  {
    "Mainland Counterpart": "Zhejiang Province",
    "Xinjiang Region":
      "Supporting the 1 city and 8 counties of the Aksu area and the Alar City of the Xinjiang Productionand Construction Corps",
    "Prioritized Industry": "Textile and agricultural aid",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://yj.zjol.com.cn/yjyw/201811/t20181109_8704224.shtml">Xinjiang Tianshan Hengrui Textile; Zhongpu  Satellite Factory; Zhejiang Zhongpu Group; Awati Textile and Garment Satellite Industrial Park; Aksu Industrial Park;  Xinjiang Ruyi Textile and Garment Co.; Xinjiang Qianhai Cotton Textile Company; Huafu Group; Aksu Zhejiang Fruit  Industry Co. Ltd; Kuche Siqi Garment Co.; Xinjiang Grain Yijia Agricultural Co.; Xinjiang Keliwei Clothing Co; Nurbach  Township Satellite Factory; Xinjiang Norton Garment Co; Wushi County Silk Road Technology Socks; Alar City Xingmeida  Printing and Dyeing Co.; Xinhe County Dupai Clothing Co;</a>',
    "Linked Infrastructure Projects":
      "Funded construction of Aksu Industrial Park; Alar Industrial Park",
  },
  {
    "Mainland Counterpart": "Jilin Province",
    "Xinjiang Region":
      "Altay City; Habahe County; Burqin County and Jimunai County in Altay Region",
    "Prioritized Industry": "Agriculture; Medicine; Tourism",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://jldrc.jl.gov.cn/jgcs/dqc/yjdt/201601/t20160106_5227256.html">Changchun FAW-Volkswagen Co.; Ltd.  (长春一汽大众有限公司); Changchun Haoyue Halal Meat Co.; Ltd</a>.; (2015) <a target="_blank"  href="http://jldrc.jl.gov.cn/jgcs/dqc/yjdt/201510/t20151023_5227249.html">Xinji International Trade Co.; Ltd.;  Xinjiang Ashele Copper Co.; Ltd.; Xinjiang Kangyuan Biotechnology Co.; Ltd.;</a> <a target="_blank"  href="http://jl.cri.cn/2019-01-18/78307e2e-2d2b-b621-cdc0-e01234122f06.html">Jilin Northeast Asia Publishing and  Media Group; Jilin Publishing Group; "China National Geographic" magazine;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">Altay Vocational and Technical College; Altay City  Teacher Training Complex; Altay City Honggun Town Boarding School</a>; (2015) <a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Jiangxi New Village; Akto County Small and  Micro Business Incubation Park; Jiangxi Industrial Park;</a> <a target="_blank"  href="http://jldrc.jl.gov.cn/jgcs/dqc/yjdt/201510/t20151023_5227249.html">Jilin New Village of Qibal Township;  Habahe County People\'s Hospital; Habahe Middle School; and Habahe County Experimental Station of Altai District; Jilin  Academy of Agricultural Sciences</a>',
  },
  {
    "Mainland Counterpart": "Jiangxi Province",
    "Xinjiang Region": "Akto County; Kyzyl Sukhorke Autonomous Prefecture",
    "Prioritized Industry": "Agriculture; Mining",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://cpc.people.com.cn/BIG5/n1/2019/0716/c64387-31236390.html">Xinjiang Jiangxi Chamber of Commerce;  Xianglong Stationery;</a> <a target="_blank"  href="http://www.sasac.gov.cn/n2588025/n2588124/c4061068/content.html">China Metallurgical Changtian International  Engineering Co. Ltd.;</a> <a target="_blank" href="http://jx.ifeng.com/a/20170206/5365679_0.shtml">Jiangxi Dacheng  State-owned Assets Co. Ltd.;</a> <a target="_blank"  href="http://www.chinaxinjiang.cn/dizhou/14/201807/t20180712_568026.htm">Kaixin Pharmaceutical; Kezhou Hospital of  Traditional Chinese Medicine; Xinjiang Boge Electronic New Material Co. Ltd.; Xinchang Electronics Co. Ltd. Xiamen  Guoding Investment Co. Ltd.; Jiujiang Huafu Fashion Co. Ltd.;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://cpc.people.com.cn/BIG5/n1/2019/0716/c64387-31236390.html">Cedar Middle School; Xiaobaiyang Bilingual  Primary School; Fifth Kindergarten; and County People\'s Hospital; Akto (Jiangxi) Industrial Park; Akto Modern  Agriculture Demonstration Park</a>; <a target="_blank"  href="http://www.sasac.gov.cn/n2588025/n2588124/c4061068/content.html">Heavy Industry Park of Atushi City</a>',
  },
  {
    "Mainland Counterpart": "Heilongjiang Province",
    "Xinjiang Region":
      "Fuhai County; Fuyun County; Qinghe County and Xinjiang Corps Division 10 in Altay Prefecture",
    "Prioritized Industry":
      '<a target="_blank"  href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">Agriculture; Medicinal Production (specific  directive from Heilongjiang’s Qinghe Sub-Command for Aid to Xinjiang)</a>',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1212/c393172-33627040.html">Qiqihar Heilong International Ice and Snow  Equipment Co., Ltd.</a>; <a target="_blank"  href="http://www.hlj.chinanews.com/hljnews/2019/0111/41772.html">Heilongjiang Xinmeng Breeding Co. Ltd.; Beidahuang  Group; Heilongjiang Chiteng Co. Ltd.; Tianjin Tianxiang Aquatic Products Co. Ltd.; Howden Holdings; Heilongjiang  Xinmeng Breeding Co. Ltd.; Zhongrui Animal Husbandry; Heilongjiang Shengyu Wood Industry set up Xinjiang Shennong  Beiwei Fungus Industry Co. Ltd.; Heilongjiang Chiteng Co. Ltd.; Dalian Nongchang International Trade Co. Ltd.;  Heilongjiang Xingsheng Guojian Import and Export Trade Co. Ltd.; Heilongjiang Academy of Agricultural Sciences;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1212/c393172-33627040.html">Fuhai County Industrial Park</a>; <a  target="_blank" href="http://www.hlj.chinanews.com/hljnews/2019/0111/41772.html">Longjiang Facility Agriculture  Base of the Tenth Division and the 183rd Regiment;</a>',
  },
  {
    "Mainland Counterpart": "Anhui Province",
    "Xinjiang Region": "Pisan County; Wada area",
    "Prioritized Industry": "Agriculture; Tourism; Textile",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.ctnews.com.cn/art/2019/12/26/art_118_59918.html">Anhui Global Cultural Tourism Group Co.; Ltd.;  Anhui Shanghai Railway International Tourism Company</a>; <a target="_blank"  href="http://www.ahgykg.com/anhuinews_display.asp?id=5978">Chaohu Youngor Color Spinning Technology Company; Anhui  Huaibei Huafu Mélange Co.; Ltd.</a>; <a target="_blank" href="https://kknews.cc/other/lnjplnb.html">Hetian Conch  Profile Co.; Ltd.;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://www.ahgykg.com/anhuinews_display.asp?id=5978">Azawu River Modern Agricultural Industry Integration  Demonstration Park;</a> <a target="_blank" href="https://kknews.cc/other/lnjplnb.html">Anhui Conch Industrial  Park; Pishan County People\'s Hospital;</a>',
  },
  {
    "Mainland Counterpart": "Henan Province",
    "Xinjiang Region":
      "Counterpart support for the Hami area; the 13th Division of the Corps",
    "Prioritized Industry": "Agriculture; Energy; Mining;",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://m.xinhuanet.com/2017-08/14/c_1121479379.htm">Xinjiang Singing Fruit Food Co. Ltd.; Henan Haoxiangyou  Zao Industry Co. Ltd;</a> <a target="_blank" href="http://m.xinhuanet.com/2017-08/14/c_1121479379.htm">Sinopharm  Group and Zhengzhou Coal Mining Machinery; Xuchang Xu Ji; GCL New Energy ; Sanquan; Tuoren; CITIC Heavy Industry;  National Optoelectronics; Lingrui; Huahuaniu; Xu Ji Wind Power Technology Company and Henan GCL New Energy Investment  Co. Ltd.;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://www.xj.chinanews.com/yuanjiang/2020-04-15/detail-ifzvhxku1032653.shtml">Water Source Confluence  Project; the 13th Division Cultural and Sports Activity Center; the Zhongyuan Ward Building</a>; <a target="_blank"  href="http://m.xinhuanet.com/2017-08/14/c_1121479379.htm">Hami City High-tech Development Zone; “Xinjiang Power  Transmission” strategy—the Hami-Zhengzhou ±800 kV UHV DC transmission project; Hami Central Hospital;</a>',
  },
  {
    "Mainland Counterpart": "Jiangsu Province",
    "Xinjiang Region":
      "Atushi City; Wuqia County; Ishiha Kazakh Autonomous Prefecture Huocheng County; Agricultural FourDivision 66 Group; Yining County; Chabuchaer Xibo Autonomous County",
    "Prioritized Industry": "Agriculture; Textile",
    "Affiliated Pairing Companies":
      '<a target="_blank" href="http://djh.168tex.com/2017-07-14/929866.html">Jiangsu  Lianfa Textile;</a> <a target="_blank" href="http://www.js.xinhuanet.com/2019-12/12/c_1125340400.htm">Jiangsu  Ocean and Fisheries Bureau; Yili Yueran Ecological Agriculture Co., Ltd.; Xuzhou Tianhong; Jiangsu Jinsheng; Shandong  Baizheng</a>; <a target="_blank" href="http://www.gov.cn/xinwen/2015-07/14/content_2896229.htm">Xinjiang Hongdou  Garment Co., Ltd.; Zhenfa Solar Photovoltaic Power Generation; Jinmay Petrochemical Industry;</a> <a target="_blank"  href="http://jsnews.jschina.com.cn/jsyw/201712/t20171218_1275122.shtml">Xinjiang Jinzhiyuan Biotechnology Co. Ltd.;  Xinjiang Huadong Prefabricated House Co. Ltd.; Jiangsu Ninghang Expressway Co. Ltd.;</a> <a target="_blank"  href="http://jsnews.jschina.com.cn/zt2020/ztgk/202006/t20200604_2565829.shtml">Kunshan AB Group; Shiming Technology;  and Duowei Sports;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://www.js.xinhuanet.com/2019-12/12/c_1125340400.htm">Linzi Primary School; the crab and crayfish breeding  base in Kan Township; Yining County Textiles and Garment Industrial Park</a>; <a target="_blank"  href="http://internal.dbw.cn/system/2019/12/31/058311365.shtml">Kezhou Vocational and Technical School</a><a  target="_blank" href="http://www.gov.cn/xinwen/2015-07/14/content_2896229.htm">; Nantong Agricultural and Sideline  Products Logistics Center; Yili Technician Training College; Jiangsu Yancheng Technician College;</a> <a  target="_blank" href="http://jsnews.jschina.com.cn/jsyw/201712/t20171218_1275122.shtml">Aheqi Wuxi Light  Industrial Park; Changzhou Industrial Park of Wuqia County; Atushi Kunshan Industrial Park; Wuqia Changzhou Industrial  Park</a>; <a target="_blank" href="http://jsnews.jschina.com.cn/zt2020/ztgk/202006/t20200604_2565829.shtml">Artush  City Vocational Education School; Kezhou No. 2 Middle School; Atushi No. 1 Middle School; Niluke Middle School;  Kunshan Yucai School in Atushi City; The Kunshan Industrial Park Electronic Assembly Park; the Atushi Small and Micro  Enterprise Park Textile and Garment Processing Park;</a> <a target="_blank"  href="https://perma.cc/L78U-YSLA">Weaving Industrial Park and the Home Textile and Garment Industrial Park</a>',
  },
  {
    "Mainland Counterpart": "Fujian Province",
    "Xinjiang Region":
      "The six counties of Changji City; Manas County; Hutubi County; Qitai County; Jimsar County and MuleiCounty in Changji Hui Autonomous Prefecture",
    "Prioritized Industry":
      'Agriculture; Coal; Electricity; Chemical; <a target="_blank"  href="https://sjt.fujian.gov.cn/zwgk/gsgg/sjjggg/202001/t20200113_5179183.htm">Equipment Manufacturing</a><a  target="_blank" href="#_msocom_3">[MS3]</a> ; Textile; “Electric Power Aid” (specific directive)',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/BIG5/n2/2019/1126/c186332-33578710.html">Hengan (Changji) Paper Co.; Ltd. and Xinjiang  Xinlv Aluminum Co.; Ltd.; Fujian Hengan Group Co.; Ltd. and Hengan (China) Investment Co.; Ltd.;</a> <a  target="_blank" href="http://fjnews.fjsen.com/2019-11/05/content_30045270.htm">Fujian Disabled Welfare Foundation;  Fujian Hongxing Erke Sporting Goods Co.; Ltd.</a>;',
    "Linked Infrastructure Projects":
      '<a target="_blank" href="http://www.cj.gov.cn/gk/fzgg/zcjgg/123583.htm">Changji  High-tech Technology Fujian Industrial Development Zone Industrial Park;</a>',
  },
  {
    "Mainland Counterpart": "Hubei Province",
    "Xinjiang Region":
      "Bole City; Jinghe County; Wenquan County of Bortala Mongolian Autonomous Prefecture and XinjiangProduction and Construction Corps Agricultural Fifth Division",
    "Prioritized Industry": "“Electric Power Aid” (specific directive)",
    "Affiliated Pairing Companies":
      '<a target="_blank" href="http://www.xjbl.gov.cn/info/1292/41339.htm">Alashankou  Wuhan Port Development Group Logistics Co., Ltd.; Puyao New Building Materials Co., Ltd.; Chuxing Energy; Puyao Glass;  Pingyun Automobile; Jiuzhoutong Pharmaceutical</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank" href="http://www.xjbl.gov.cn/info/1292/41339.htm">Funding  Jingchu Industrial Park Double Incubation Center; Wutai Industrial Park (or Hubei Industrial Park); Huanggang  Secondary School;</a>',
  },
  {
    "Mainland Counterpart": "Shanxi Province",
    "Xinjiang Region":
      "Xinjiang Production and Construction Corps Agricultural Sixth Division Wujiaqu City; Changji HuiAutonomous Prefecture Fukang City",
    "Prioritized Industry":
      '<a target="_blank" href="https://www.china5e.com/news/news-147212-1.html">Agriculture;  Mining (Shanxi is the “Coal Capital” of China); Textile</a>',
    "Affiliated Pairing Companies":
      '<a target="_blank" href="https://www.china5e.com/news/news-147212-1.html">“80  Shanxi coal companies have settled in Xinjiang”</a><br> <a target="_blank"  href="http://www.xjqt.gov.cn/news/gzyw/znyw/861122.htm">Shanxi Yangquan Coal. Xinjiang Guotai Xinhua Mining  Company</a>; <a target="_blank" href="https://www.china5e.com/news/news-147212-1.html">Lu\'an Mining; Shanxi Meijin  Group</a>; <a target="_blank" href="http://www.xjqt.gov.cn/news/gzyw/znyw/861122.htm">Shanxi Yangmei Group  Xinjiang Guotai Xinhua Mining Co., Ltd; Xinjiang Xinhua Cathay Pacific Mining Corporation; Shanxi Lu\'an Mining Group  combination; Shanxi Jinhui Energy Group; Shanxi Xinyou Group;</a> <a target="_blank"  href="http://www.xjbt.gov.cn/c/2020-06-12/7358537.shtml">Shanxi Pingyao Coal Chemical (Group) Co., Ltd.; Adassi  Fashion Co., Ltd.; Xinjiang Qinghu Jingao Investment Company; Meijing Coal Chemical Co., Ltd.; Shanxi Tianji Group  Jinjiang Chenghe Commercial Agricultural Development Co., Ltd.</a>;',
    "Linked Infrastructure Projects":
      '<a target="_blank" href="https://www.china5e.com/news/news-147212-1.html">Wujiaqu  City Communist Youth League Farm Corps Modern Agricultural Park; Fukang City Jinshang Industrial Park; Fukang City  Ganhezi Town Research; Tianchi scenic spot; Xinjiang Tianshan Tianchi International Tourist Resort; Jinfu Tianshan  Tianchi Tourism and Cultural Industry Pioneer Park; 102 Group Facility Agriculture Project;</a> <a target="_blank"  href="http://www.xjqt.gov.cn/news/gzyw/znyw/861122.htm">Zhundong Economic and Technological Development Zone; Shanxi  Yangquan Coal Yuanjiang project; Shanxi Industrial Park; Wujiaqu City’s Senior Activity Center; Junken Road Residents’  Comprehensive Service Center; </a> <a target="_blank"  href="http://www.xjbt.gov.cn/c/2020-06-12/7358537.shtml">Xinhu Farm; Beita Mountain Ranch; Sixth Normal Hospital;  Hongqi Farm; Qitai Farm; Xilin Road Community Kindergarten; Wujiaqu Economic and Technological Development Zone;  Shanxi Province T; ransformation Comprehensive Reform Demonstration Zone; Tsinghua Science and Technology Park</a>',
  },
  {
    "Mainland Counterpart": "Hunan Province",
    "Xinjiang Region":
      "Hami area; Xinjiang Production and Construction Corps Agricultural 13th Division",
    "Prioritized Industry":
      'Agriculture; <a target="_blank"  href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">“Electric Power Aid”</a> (specific directive); <a  target="_blank" href="http://xj.people.com.cn/n2/2019/1118/c393132-33552256.html">Tourism</a>',
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1118/c393132-33552256.html">Shuangfeng Agriculture Co., Ltd.; Turpan Shengyuan  Chaotianlong E-commerce Co., Ltd.; Hunan Chaotian Longjiao Spicy Food Co., Ltd.; Hunan Chaotian Longjiao Food Co.,  Ltd.;</a> <a target="_blank" href="http://www.hunan.gov.cn/hnszf/hnyw/tt/201807/t20180713_5051965.html">Tuan Putao  Huang Fruit Industry Company</a>;',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://xj.people.com.cn/n2/2019/1118/c393132-33552256.html">Xinjiang Academy of Agricultural Sciences;  National E-commerce Industrial Park; Deyuan Winery; Xinjiang Turpan Tourism Promotion Service Center; Xinjiang Red  Army West Road Army’s Army Reclamation Museum; Xinjiang Corps Army Reclamation Museum in Shihezi City; Shuixian  Factory Brakebaishi Village of Xiaxiang; </a> <a target="_blank"  href="http://cpc.people.com.cn/BIG5/n1/2018/0713/c117005-30144563.html">Kanerjing Characteristic Town Project of  Yaer Village; County Youth Activity Center; Xiangshan Bilingual Kindergarten;</a> <a target="_blank"  href="https://hn.rednet.cn/content/2019/11/27/6263335.html">Memorial Park of the Red Army West Route Army in Hami  City;</a>',
  },
  {
    "Mainland Counterpart": "Shandong Province",
    "Xinjiang Region":
      "Shule County and Yingji in Kashgar Sha County; Megaiti County; Yuepuhu County",
    "Prioritized Industry":
      "Textiles; Equipment; Substantial medical related activity",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://district.ce.cn/zg/201910/09/t20191009_33292457.shtml">Shule Ruyi Technology Textile Co., Ltd.; Zoucheng  Guosheng Garment Processing; Jinsheng Textile; Dongying Blu-ray Projects</a>; <a target="_blank"  href="http://www.worldmr.net/Exhibition/ForeCastList/Info/2018-06-29/228920.shtml">Zhaojin Mining Co., Ltd.</a>; <a  target="_blank" href="http://www.dzwww.com/2020/2020ksgmx/ttxw/202006/t20200623_6135828.htm">Shandong Provincial  Health Committee; Shandong Internet Media Group; Dazhong·Poster News; Second Hospital of Shandong University; Kashgar  District Health Committee; Yingji Sha County People\'s Government; Jining City Aid Work Headquarters for Xinjiang;  Shandong Qilu Pharmaceutical Group Co., Ltd.; Shijiazhuang Yiling Pharmaceutical Co., Ltd.; Shanxi Guangyuyuan  Sinopharm Co., Ltd.; Shandong</a> Xianda Health Industry Co., Ltd.; <a target="_blank"  href="http://www.tex-asia.com/news/201809/13/1408.html">ZTE Glove Company; Xinjiang Jifa Huahe Garment Co.,  Ltd.;</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://www.tex-asia.com/news/201809/13/1408.html">Yingjisha County Industrial Park; Yuepuhu County Industrial  Park; Shule Ruyi Technology Textile Industrial Park; Kashgar Qilu Ruyi Technology Textile Industrial Park; Yingji  Shaqilu Textile Industrial Park;</a>',
  },
  {
    "Mainland Counterpart": "Hebei Province",
    "Xinjiang Region":
      '<a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Xinjiang Bayingoleng Mongolian Autonomous  Prefecture Science and Technology Bureau; Xinjiang Production and Construction Corps; the 36th Regiment of the 1st  Division; and the 2nd Division and 3rd Regiment of Xinjiang Production and Construction Corps</a>',
    "Prioritized Industry": "Agriculture; Mining",
    "Affiliated Pairing Companies":
      '<a target="_blank"  href="http://www.ce.cn/xwzx/gnsz/gdxw/201707/13/t20170713_24182990.shtml">Hebei Green Ridge Fruit Industry Co.,  Ltd.</a>; <a target="_blank" href="http://stdaily.com/02/xinjiang/2019-07/09/content_776362.shtml">Xinjiang  Xingmei Mining Co., Ltd.; Energy Xingtai Mining Group Co.; Xinjiang Meike Investment Group; Jizhong Energy Group;  Xingkuang Group</a>; <a target="_blank"  href="http://www.xinjiang.gov.cn/xinjiang/dzdt/201912/09f5b8e1af3e4b269a1a9da446a95bc5.shtml">Yanqi Branch of  Chenguang Biotechnology Group</a>; <a target="_blank"  href="http://stdaily.com/02/xinjiang/2019-07/09/content_776362.shtml">Jizhong Energy Group</a>',
    "Linked Infrastructure Projects":
      '<a target="_blank"  href="http://www.xinjiang.gov.cn/xinjiang/dzdt/201912/09f5b8e1af3e4b269a1a9da446a95bc5.shtml">Yanqi Hebei Bazhou  Ecological Industrial Park; 53 of the first batch of listed aided construction projects and 23 key industrial aid  enterprises in Xinjiang.</a> <a target="_blank"  href="http://stdaily.com/02/xinjiang/2019-07/09/content_776362.shtml">Tashidian Coal Mine</a>',
  },
];
