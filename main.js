cc.game.onStart = function() {
	if (cc.sys.isNative === true) {
		require('pomelo-cocos2d-jsb/index.js');
	}

	cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(true);
	// load resources
	cc.LoaderScene.preload(g_resources, function() {
		cc.director.runScene(new HelloWorldScene());
	}, this);
};
cc.game.run();