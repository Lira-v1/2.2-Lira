import { ProjectManager } from './project-manager.js';
import { deployToGitHub } from './deploy.js';

export function interpretCommand(input) {
  const cmd = input.toLowerCase();

  if (cmd.includes("создай проект")) {
    const name = cmd.split("создай проект")[1].trim();
    return { action: "create_project", name };
  } else if (cmd.includes("открой файл")) {
    const file = cmd.split("открой файл")[1].trim();
    return { action: "open_file", file };
  } else if (cmd.includes("перепиши")) {
    return { action: "edit_file", style: cmd };
  } else if (cmd.includes("выложи")) {
    return { action: "deploy" };
  } else {
    return { action: "unknown", raw: input };
  }
}

export function handleCommand(command) {
  switch (command.action) {
    case "create_project":
      logMessage(ProjectManager.create(command.name));
      break;
    case "open_file":
      logMessage(ProjectManager.openFile(command.file));
      break;
    case "edit_file":
      logMessage(✍ Команда редактирования получена: "${command.style}");
      break;
    case "deploy":
      deployToGitHub();
      break;
    default:
      logMessage(❓ Неизвестная команда: ${command.raw});
      break;
  }
}
