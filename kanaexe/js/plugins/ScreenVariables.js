/*=============================================================================
 * Screen Variables
 *=============================================================================*/

 /*:
 * @plugindesc v1.04 Show Text on your screen.
 * <ScreenVariables>
 * @author Krimer
 *
 * @param Variable Number
 * @desc Number of variable where your text data saved
 * @default 0
 *
 * @param Auto-Refresh
 * @desc Text auto-refresh. true or false
 * @default false
 *
 * @help
 *
 * Available script calls:
 * 'Key' - Is text identifier, provide access to each text separately.
 * 'visibility' - text visibility, On(true)\Off(false)
 * this.addVarHudText('Key','your text',Х,Y,visibility) - add text to your screen.
 * Example: this.addVarHudText('test','Text Check',66,66,true)
 * 
 * this.textVarTurnOn('Key') - Change text visibility on true, using text key
 * this.textVarTurnOff('Key') - Change text visibility on false, using text key
 * this.textVarSetXY('Key',Х,Y) - Change Х & Y for text using text key.
 * this.textVarGetX('Key') - Get current Х of the text using text key.
 * this.textVarGetY('Key') - Get current Y of the text using text key.
 * this.changeVarText('Key', 'your text') - Change text using text key.
 * this.showAllVarText() - Change all texts visibility on true
 * this.hideAllVarText() - Change all texts visibility on false
 * this.showVarWindow() - Show all texts, doesn't change visibility setting on text.
 * this.hideVarWindow() - Hide all texts, doesn't change visibility setting on text.
 * this.deleteVar() - Delete text using text key.
 * this.varHudRefresh() - Manual refresh for all texts.
 * 
 * =============================================================================
 * Text support some standard special characters:
 * \\V[n] - Will be replaced with the value of the nth variable.
 * \\N[n] - Will be replaced with the name of the nth actor.
 * \\P[n] - Will be replaced by the name of the nth (arranged order) party member.
 * \\G - Will be replaced by the currency unit.
 * \\C[n] - Draw the subsequent text in the nth color. 
 * \\I[n] - Draws the nth icon.
 * \\{ - Increases the text by 1 step.
 * \\} - Decreases the text by 1 step.
 * Double slash is necessary
 * =============================================================================
 * 
 */
 

(function() {
	var parameters = $plugins.filter(function(p) {return p.description.contains('<ScreenVariables>');})[0].parameters;
	var dVariableNumber = Number(parameters['Variable Number'] || 0);
	var dAtoRefresh = eval(String(parameters['Auto-Refresh']));
	
	/*=============== Window_Variable ===============*/
	function Window_Variable() {
		this.initialize.apply(this, arguments);
	}

	Window_Variable.prototype = Object.create(Window_Base.prototype);
	Window_Variable.prototype.constructor = Window_Variable;

	Window_Variable.prototype.initialize = function(x, y) {
		var width = Graphics.width + this.standardPadding() * 2
		var height = Graphics.height + this.standardPadding() * 2;
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.refresh();
	};

	Window_Variable.prototype.standardPadding = function() {
		return 0;
	};
	
	Window_Variable.prototype.refresh = function() {
		this.contents.clear();
		for(var key in $gameVariables._data[dVariableNumber]){
			var hudObj = $gameVariables._data[dVariableNumber][key];
			if (hudObj.visible === true){
				this.drawTextEx(hudObj.hudText, hudObj.x, hudObj.y);
			}
		}
	};	
	/*=============== Window_Variable end ===============*/
	
	/*=============== Game_Interpreter ===============*/
	Game_Interpreter.prototype.isRefreshAvailable = function() {
		return ((typeof SceneManager._scene._variableWindow != "undefined") && (SceneManager._scene._varWindowAutoRefresh === false))
	};
	
	Game_Interpreter.prototype.isHudCreated = function() {
		return ((typeof SceneManager._scene._variableWindow != "undefined") && (typeof $gameVariables._data[dVariableNumber] === 'object'))
	};

	Game_Interpreter.prototype.addVarHudText = function() {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		var args = arguments;
		$gameVariables._data[dVariableNumber][args[0]] = {hudText:args[1], x:args[2], y:args[3], visible:args[4]};
		if (this.isRefreshAvailable()){
			this.varHudRefresh()
		}
	};

	Game_Interpreter.prototype.textVarTurnOn = function(key) {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		var args = arguments;
		$gameVariables._data[dVariableNumber][String(key)].visible = true;
		if (this.isRefreshAvailable()){
			this.varHudRefresh()
		}
	};

	Game_Interpreter.prototype.textVarTurnOff = function(key) {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		var args = arguments;
		$gameVariables._data[dVariableNumber][String(key)].visible = false;
		if (this.isRefreshAvailable()){
			this.varHudRefresh()
		}
	};

	Game_Interpreter.prototype.textVarSetXY = function(key, valueX, valueY) {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		var valueX = Number(valueX) || 0;
		var valueY = Number(valueY) || 0;
		$gameVariables._data[dVariableNumber][String(key)].x = valueX;
		$gameVariables._data[dVariableNumber][String(key)].y = valueY;
		if (this.isRefreshAvailable()){
			this.varHudRefresh()
		}
	};

	Game_Interpreter.prototype.textVarGetX = function(key) {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		return $gameVariables._data[dVariableNumber][String(key)].x;
	};

	Game_Interpreter.prototype.textVarGetY = function(key) {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		return $gameVariables._data[dVariableNumber][String(key)].y;
	};
	
	Game_Interpreter.prototype.changeVarText = function(key, textValue) {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		$gameVariables._data[dVariableNumber][String(key)].hudText = textValue;
		if (this.isRefreshAvailable()){
			this.varHudRefresh()
		}
	};

	Game_Interpreter.prototype.showAllVarText = function() {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		for(var key in $gameVariables._data[dVariableNumber]){
			var hudObj = $gameVariables._data[dVariableNumber][key];
			hudObj.visible = true;
		}
		if (this.isRefreshAvailable()){
			this.varHudRefresh()
		}
	};

	Game_Interpreter.prototype.hideAllVarText = function() {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		for(var key in $gameVariables._data[dVariableNumber]){
			var hudObj = $gameVariables._data[dVariableNumber][key];
			hudObj.visible = false;
		}
		if (this.isRefreshAvailable()){
			this.varHudRefresh()
		}
	};
	
	Game_Interpreter.prototype.hideVarWindow = function() {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		if (typeof SceneManager._scene._variableWindow != "undefined"){
			SceneManager._scene._variableWindow.hide();
		}
	};
	
	Game_Interpreter.prototype.showVarWindow = function() {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		if (typeof SceneManager._scene._variableWindow != "undefined"){
			SceneManager._scene._variableWindow.show();
		}
	};
	
	Game_Interpreter.prototype.deleteVar = function(key) {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		delete $gameVariables._data[dVariableNumber][String(key)]
	};
	
	Game_Interpreter.prototype.varHudRefresh = function() {
		if (!this.isHudCreated()){
			$gameVariables._data[dVariableNumber] = {};
		}
		SceneManager._scene.refreshVarWindow()
	};	
	/*=============== Game_Interpreter end ===============*/
	
	Scene_Base.prototype.createVarLayer = function() {
		var width = Graphics.boxWidth;
		var height = Graphics.boxHeight;
		var x = (Graphics.width - width) / 2;
		var y = (Graphics.height - height) / 2;
		this._varLayer = new WindowLayer();
		this._varLayer.move(x, y, width, height);
		this.addChild(this._varLayer);
	};
	
	/*=============== Scene_Map ===============*/
	DVarHud_Scene_Map_initialize = Scene_Map.prototype.initialize;
	Scene_Map.prototype.initialize = function() {
		DVarHud_Scene_Map_initialize.call(this);
		this._varWindowAutoRefresh = dAtoRefresh;
	};

	
	Scene_Map.prototype.createDisplayObjects = function() {
		this.createSpriteset();
		this.createMapNameWindow();
		this.createVarLayer();
		this.createWindowLayer();
		this.createAllWindows();
	};
	
	DVarHud_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function() {
		this.createVariableWindow();
		DVarHud_Scene_Map_createAllWindows.call(this);
	};

	Scene_Map.prototype.createVariableWindow = function() {
		this._variableWindow = new Window_Variable();
		this._variableWindow.setBackgroundType(2)
		this._varLayer.addChild(this._variableWindow);
	};

	Scene_Map.prototype.refreshVarWindow = function() {
		if (typeof this._variableWindow != "undefined"){
			this._variableWindow.refresh();
		}	
	};

	DVarHud_Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function() {
		DVarHud_Scene_Map_update.call(this);
		if (this._varWindowAutoRefresh == true){
			this._variableWindow.refresh();
		}
	};
	
	DVarHud_Scene_Map_terminate = Scene_Map.prototype.terminate;
	Scene_Map.prototype.terminate = function() {
    DVarHud_Scene_Map_terminate.call(this);
    this.removeChild(this._varLayer);
	};
	/*=============== Scene_Map end ===============*/
	
	DVarHud_DataManager_setupNewGame = DataManager.setupNewGame
	DataManager.setupNewGame = function() {
		DVarHud_DataManager_setupNewGame.call(this);
		$gameVariables._data[dVariableNumber] = {};
	};
})();