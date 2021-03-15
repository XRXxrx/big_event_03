$(function() {
    //登陆注册页面的切换
    $('#link-reg').click(function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').click(function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 表单规则校验
    // console.log(layui);
    let form = layui.form;
    form.verify({

        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(val) {
            // 通过形参拿到的是再次确认密码框中的内容
            console.log(val);
            let pwd = $('.reg-box input[name=password]').val();
            console.log(pwd);
            if (pwd !== val) {
                return '两次密码不一致！'
            }
        }
    });


    //注册ajax
    // $('.layui-btn').click(function(e) {
    //         e.preventDefault();
    //     })
    //利用表单提交事件,语义化更强
    let layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        //阻止默认提交跳转
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                // console.log(res);
                //失败处理
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                //成功处理
                layer.msg('注册成功，请登录!', {
                    icon: 6
                });
                //跳转登录
                $('#link-login').click();
                //重置表单
                // $('#form_reg').reset();
                //$('#form_reg')拿到的是一个伪数组
                $('#form_reg')[0].reset();
            }
        })
    });

    //登录ajax
    $('#form_login').on('submit', function(e) {
        //阻止默认提交跳转
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                //失败处理
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                };
                //成功处理
                layer.msg('登录成功!', {
                    icon: 6
                });
                //保存令牌至本地
                localStorage.setItem('token', res.token);
                //跳转主页
                location.href = '/index.html';
            }
        })
    });
});