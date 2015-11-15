var bookApp, _gallery;
bookApp = angular.module('bookApp', ['fullPage.js']);

bookApp.controller('MainController', ['$scope', MainController]);

function MainController($scope){
  $scope.fpConfig = {
    sectionsColor: [],
    anchors: ['mean', 'wince'],
    menu: "#menu",
    scrollingSpeed: 400
  };
  $scope.bookInfo = [
    {
      name: 'MEAN Web 开发',
      nameEn: 'MEAN Web Development',
      cover: './imgs/mean-cover.png',
      publishTime: '2015-8',
      backgroundColor: "#CF000F",
      publisher: [{name: '人民邮电出版社', website: 'http://www.ptpress.com.cn/Book.aspx?id=41592'}, {name: '图灵文化', website: 'http://www.ituring.com.cn/book/1536'}, {name: "PACKT", website: "https://www.packtpub.com/web-development/mean-web-development"}],
      author: [{name: 'Amos Q. Haviv', website: 'http://www.amoshaviv.com/'}],
      translator: [{name: '陈世帝', website: 'http://chensd.com'}],
      bigCover: 'http://7te9fe.com1.z0.glb.clouddn.com/books_mean_bigcover.jpg',
      bigCover: './imgs/mean_bigcover.jpg',
      desc: '介绍如何利用 MongoDB / Express / AngularJS / Node.js 来进行 JavaScript Web全栈开发，包括构建普通的Web应用，进行实时通信，以及 JavaScript 应用的测试等。',
      links: [{name: "京东", website: "http://search.jd.com/search?keyword=%B3%C2%CA%C0%B5%DB&ev=&psort=2&book=y"}, {name: "当当网", website: "http://product.dangdang.com/23746907.html"}, {name: "电子书", website: "http://www.ituring.com.cn/book/1536"}]
    },
    {
      name: 'Windows CE 嵌入式系统开发从基础到实践',
      nameEn: 'MEAN Web Development',
      cover: './imgs/wince-cover.jpg',
      publishTime: '2008-3',
      backgroundColor: "#F39C12",
      publisher: [{name: '电子工业出版社', website: 'http://www.phei.com.cn/'}, {name: '博文视点', website: 'http://www.broadview.com.cn/#book/bookdetail/bookDetailAll.jsp?book_id=c8255f09-41dd-4614-89de-1c388dce4c62&isbn=978-7-121-05971-1'}],
      author: [{name: '薛大龙'}, {name: '陈世帝', website: 'http://chensd.com'}, {name: "王韵"}],
      bigCover: 'http://7te9fe.com1.z0.glb.clouddn.com/books_wince_bigcover.jpg',
      desc: "介绍 Windows CE、C#、.NET Compact Framework 的基本知识。",
      links: [{name: "希赛网在线阅读", website: "http://www.educity.cn/jiaocheng/zt123.html"}]
    }
  ];
  $scope.current = 0;
}