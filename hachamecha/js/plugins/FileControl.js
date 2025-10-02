/*:
 * @plugindesc A plugin to create and delete files in a specific directory.
 * @help
 * Plugin Commands:
 *   CreateFile filename content   - Creates a text file with the given content
 *   DeleteFile filename           - Deletes the specified file
 *   CreateImage filename base64   - Creates an image file from a Base64 string
 */

(function() {
  const fs = require("fs");
  const path = require("path");

  const baseDir = path.join(path.dirname(process.mainModule.filename), "files");

  if (!fs.existsSync(baseDir)) {
    try {
      fs.mkdirSync(baseDir);
      console.log(`Directory created: ${baseDir}`);
    } catch (error) {
      console.error(`Failed to create directory: ${error}`);
    }
  } else {
    console.log(`Directory already exists: ${baseDir}`);
  }

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

if (command === "CreateFile") {
  const filename = args[0] || "default.txt";
  const content = args.slice(1).join(" ").replace(/\\n/g, "\n") || "Default content.";
  const filePath = path.join(baseDir, filename);

  try {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`File created: ${filePath}`);
  } catch (error) {
    console.error(`Error creating file: ${error}`);
  }
}

    if (command === "DeleteFile") {
      const filename = args[0] || "default.txt";
      const filePath = path.join(baseDir, filename);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`File deleted: ${filePath}`);
        } else {
          console.log(`File not found: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error deleting file: ${error}`);
      }
    }

    if (command === "CreateImage") {
      const filename = args[0] || "default.png";
      const base64Data = args.slice(1).join("");
      const imagePath = path.join(baseDir, filename);
      
      try {
        const imageBuffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(imagePath, imageBuffer);
        console.log(`Image created: ${imagePath}`);
      } catch (error) {
        console.error(`Error creating image file: ${error}`);
      }
    }
  };
})();