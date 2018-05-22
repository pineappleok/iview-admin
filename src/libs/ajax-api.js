/* 接口api统一管理 */
// 接口
const ajaxUrl = {
    feedBack: '/app/all/index/get_articles.json', // 运维管理-APP管理-获取反馈信息列表
    dailyData: '/s/read/get_news_express_list.json', // 快报内容（好像无效了）  
}
// 返回模块
export default ajaxUrl;