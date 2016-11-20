var config = {
    // 并发控制数量
    concurrency : 5,

    // 爬取网页数量（分页数目）
    fetchPages : 10,

    // 爬取电影分类
    fetchCategory : "动画",

    // 设置延时, 每隔一段时间爬取一次
    delay : 1000

}

module.exports = config;