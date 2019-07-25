const express = require('express');
const app = express();

let server = app.listen(3000, function() {
	let host = server.address().address;
	let port = server.address().port;
	console.log('Your App is running at localhost:' + port);
});

// app.get('/', function(req, res) {
// 	res.send('Hello World!');
// });


function getCookie(res) {
	superagent.post('http://www.study119.com/index.php?m=member&c=index&a=login')
		.type('form')
		.send({
			username: 13527729121,
			password: 'soul1234',
			ismima: 1
		})
		.end(function(err, res) {
			if (err) {
				handleErr(err.message);
				return;
			}
			cookie = res.header['set-cookie']; //从response中得到cookie
			// emitter.emit("setCookeie");
			getData();
		})
}

getCookie();


const superagent = require('superagent');

let hotNews = []; // 热点新闻
let localNews = []; // 本地新闻

/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
function getData() {
	// superagent.get('https://kaoshi.study119.com/paper_browse/78#qu_0_6').end((err, res) => {
	superagent.get('http://news.baidu.com/').end((err, res) => {
		if (err) {
			// 如果访问失败或者出错，会这行这里
			console.log(`热点新闻抓取失败 - ${err}`);
		} else {
			// 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
			// 抓取热点新闻数据
			hotNews = getHotNews(res);
		}
	});
}



const cheerio = require('cheerio');

let getHotNews = (res) => {
	let hotNews = [];
	// 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中。

	/* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
	   以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
	 */
	let $ = cheerio.load(res.text);
	console.log(res);
	
	// console.log($('div#pane-news ul li a'));

	// 找到目标数据所在的页面元素，获取数据
	$('div.test_content_nr ul li').each((idx, ele) => {
	// $('div#pane-news ul li a').each((idx, ele) => {
		// cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
		// 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素

		// console.log(ele);

		// let news = {
		// 	title: $(ele).text(), // 获取新闻标题
		// 	href: $(ele).attr('href') // 获取新闻网页链接
		// };
		hotNews.push(news) // 存入最终结果数组
	});
	return hotNews
};



app.get('/', async (req, res, next) => {
	res.send(hotNews);
});
