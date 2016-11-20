# node-spider

基于nodejs的一个简单爬虫，爬取豆瓣电影分类下的电影列表

#### 使用

```shell
git clone https://github.com/yankwan/node-spider.git
```

```shell
cd node-spider
npm install
node spider.js
```

#### 配置

config.js中配置了简单的基本信息，根据需要修改

```javascript
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
```

