var _cheerio = require('cheerio');
var _superagent = require('superagent');
var _url = require('url');
var _async = require('async');

var _config = require('./config.js')

function startFetchPage(link, callback) {

    _superagent.get(link)
        .end(function (err, res) {
            if (err) console.log(err);

            console.log("开始爬取网页: ", link);
            var $ = _cheerio.load(res.text);
            // 保存每一页的爬取列表
            var result = [];

            $('.article .item .pl2').each(function (idx, element) {

                var href = $(element).children('a').attr('href');
                var title = $(element).children('a').text().trim();
                title = title.substr(0, title.indexOf('\n'));
                var rating = $(element).children('div').children('.rating_nums').text();

                var movie = {
                    href: href,
                    title: title,
                    rating: rating
                }
                console.log(movie);

                result.push(movie);

            });
            callback(null, result);

        })
}

var rootUrls = [];

for (var i = 0; i < _config.fetchPages; i++) {
    // 爬取豆瓣动画分类下的电影
    // start=0 表示从第一页开始爬取，第二页是start=20，以此类推
    var rootUrl = "https://movie.douban.com/tag/" + encodeURI(_config.fetchCategory) + "?start=" + (20 * i) + "&type=T";
    rootUrls.push(rootUrl);
}

console.log("开始准备爬取网页资源:")
console.log(rootUrls);
console.log("资源已准备好, 开始爬取网页......");

// 通过async模块进行并发控制
_async.mapLimit(rootUrls, _config.concurrency, function (rootUrl, callback) {

    setTimeout(startFetchPage(rootUrl, callback), _config.delay);
}, function(err, results) {
    console.log("爬取完成! 结果: ")
    console.log(results);
});


