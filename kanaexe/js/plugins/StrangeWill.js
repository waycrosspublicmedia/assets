(function(configManager, storageManager, input) {
    const configFileExists = storageManager.exists(-1);
    if(!configFileExists) {
        configManager.bgmVolume = 20;
        configManager.bgsVolume = 20;
        configManager.meVolume = 20;
        configManager.seVolume = 20;
        configManager.masterVolume = 20;
        configManager.alwaysDash = true;
        configManager.keyMapper = JSON.parse(JSON.stringify(configManager.wasdMap));      
        input.keyMapper = configManager.keyMapper;
        configManager.save();
    }
})(ConfigManager, StorageManager, Input);