// 公共路径
let baseURL = 'http://api-breakingnews-web.itheima.net';
// ajax方法
// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
$.ajaxPrefilter(function(option) {
    // console.log(option);
    option.url = baseURL + option.url;
})