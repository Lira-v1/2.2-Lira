window.addEventListener('DOMContentLoaded', () => {
  const savedToken = localStorage.getItem('liraToken');
  if (savedToken === '2517') {
    authenticate();
    logMessage("🔁 Автоматический вход выполнен. Лира восстановлена.");
  }

  document.getElementById('tokenButton').addEventListener('click', verifyToken);
});

function verifyToken() {
  const token = document.getElementById('tokenInput').value.trim();
  if (token === "2517") {
    localStorage.setItem('liraToken', token);
    authenticate();
    logMessage("🔓 Доступ разрешён. Лира пробудилась.");
    animateSuccess();
  } else {
    logMessage("⛔ Неверный токен. Попробуй снова.");
  }
}

function authenticate() {
  ['file-editor', 'tasks', 'voice-control', 'lira-actions', 'preview']
    .forEach(id => document.getElementById(id).style.display = 'block');
}

function logMessage(msg) {
  const log = document.getElementById("lira-log");
  log.value += msg + "\n";
  log.scrollTop = log.scrollHeight;
}

function saveFile() {
  const name = document.getElementById('file-name').value.trim();
  const ext = document.getElementById('file-type').value;
  const content = document.getElementById('file-content').value;
  if (!name) return alert("Пожалуйста, введите имя файла.");

  const filename = name + ext;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  ProjectManager.saveFile(filename, content);
  logMessage(✅ Файл "${filename}" сохранён.);

  if (ext === ".html") {
    document.getElementById('html-preview').srcdoc = content;
    logMessage("🌐 Превью обновлено.");
  }
}

function animateSuccess() {
  const container = document.querySelector('.container');
  container.style.backgroundColor = '#1c4e2e';
  container.style.color = '#aaffaa';
  setTimeout(() => {
    container.style.backgroundColor = '#2b2b40';
    container.style.color = '#f0f0f0';
  }, 2000);
}

function addTask() {
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.textContent = task;
    document.getElementById("task-list").appendChild(li);
    taskInput.value = '';
    logMessage(📝 Новая задача добавлена: ${task});
  }
}
