class Window_MenuCommand < Window_Command
 
  alias hml_add_original_commands_old add_original_commands
  def add_original_commands
    hml_add_original_commands_old
    add_command("Load", :load, load_possible)
  end
 
  def load_possible
    DataManager.save_file_exists?
  end
 
end

class Scene_Menu < Scene_MenuBase
 
  alias hml_create_command_window_old create_command_window
  def create_command_window
    hml_create_command_window_old
    @command_window.set_handler(:load, method(:command_load))
  end
 
  def command_load
    SceneManager.call(Scene_Load)
  end
 
end