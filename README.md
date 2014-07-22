pomelo-cocos2d-js-demo
======================

cocos2d-js 是整合了 cocos2d-html5 和 cocos2d-jsb，可以方便的开发部署到各种设备环境中  
pomelo-cocos2d-js 则是对 pomelo-client-websocket 和 pomelo-cocos2d-jsb 的整合  

本文以cocos code ide为开发环境说明如何搭建 pomelo 与 cocos2d-js 的开发环境  

1：下载 cocos code ide
[cocos code ide](http://cocos2d-x.org/download)  

2：下载 cocos2d-js 配置cocos code ide  
[cocos code ide](http://cocos2d-x.org/download)  
[cocos_code_ide环境配置](http://www.cocos2d-x.org/wiki/Cocos_Code_IDE)  

3：新建 cocos javascript project  
![](http://ww2.sinaimg.cn/large/b7bc844fgw1eildsxbuytj21150mr77g.jpg)  

这个时候，可以点击 build runtime 按钮，看是否能够成功编译    
可以选择 win32 runtime（本文演示的是win32） 或者 android runtime  
![](http://ww2.sinaimg.cn/large/b7bc844fgw1eile2xa0tfj213g0n3dk7.jpg)  

4：下载 pomelo-cocos2d-js  
在项目根路径下面执行  
```
git clone https://github.com/Netease/pomelo-cocos2d-js.git --recursive
```

5：cocos2d-html5 环境搭建  
修改index.html  
```
<script src="frameworks/cocos2d-html5/CCBoot.js"></script>
<script src="pomelo-cocos2d-js/html5/build/build.js"></script>
<script type="text/javascript">
    require('boot');
</script> 
<script src="main.js"></script>
```

6：cocos2d-jsb 环境搭建  
修改main.js  
```
cc.game.onStart = function() {
	if (cc.sys.isNative === true) {
		require('pomelo-cocos2d-js/index.js');
	}

	cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
	// load resources
	cc.LoaderScene.preload(g_resources, function() {
		cc.director.runScene(new HelloWorldScene());
	}, this);
};
cc.game.run();
```

7：测试chat
修改app.js，添加  
```
var pomeloChat = function() {
	var pomelo = window.pomelo;

	var route = 'gate.gateHandler.queryEntry';
	var uid = "uid";
	var rid = "rid";
	var username = "username";

	pomelo.init({
		host: "127.0.0.1",
		port: 3014,
		log: true
	}, function() {
		pomelo.request(route, {
			uid: uid
		}, function(data) {
			pomelo.disconnect();
			pomelo.init({
				host: data.host,
				port: data.port,
				log: true
			}, function() {
				var route = "connector.entryHandler.enter";
				pomelo.request(route, {
					username: username,
					rid: rid
				}, function(data) {
					cc.log(JSON.stringify(data));
					chatSend();
				});
			});
		});
	});

	function chatSend() {
		var route = "chat.chatHandler.send";
		var target = "*";
		var msg = "msg"
			pomelo.request(route, {
				rid: rid,
				content: msg,
				from: username,
				target: target
			}, function(data) {
				cc.log(JSON.stringify(data));
			});
	}
}

```

然后在 HelloWorldLayer 的 ctor 里面添加  
```
pomeloChat();
```

8：本地把chatofpomelo-websocket跑起来  

9：分别在jsb环境和html5环境测试  
![](http://ww4.sinaimg.cn/large/b7bc844fgw1eiljhnslqnj20xr0o5juk.jpg)  
![](http://ww3.sinaimg.cn/large/b7bc844fgw1eiljjbcz8xj21020jjjvv.jpg)


注意：该项目只做代码相关演示, cocos2d-js 相关库并没有上传
项目下载  
```
git clone https://github.com/pomelonode/pomelo-cocos2d-js-demo.git --recursive
```