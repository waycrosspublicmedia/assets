(function() {
  var alias_Scene_Splash_start = Scene_Splash.prototype.start;
  Scene_Splash.prototype.start = function() {
    alias_Scene_Splash_start.call(this);
    
    var bgm = {
      name: '魔法の杖',
      volume: 90,
      pitch: 100,
      pan: 0
    };
    
    AudioManager.playBgm(bgm);
  };

  Scene_Title.prototype.playTitleMusic = function() {
    AudioManager.stopBgs();
    AudioManager.stopMe();
  }; 
})();
