export function renderPreview(fileName, content) {
  const previewArea = document.getElementById("preview-area");
  previewArea.innerHTML = "";

  const ext = fileName.split('.').pop().toLowerCase();

  if (ext === "html") {
    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "400px";
    iframe.srcdoc = content;
    previewArea.appendChild(iframe);
    logMessage("🔍 HTML-превью обновлено.");
  } else if (ext === "json") {
    try {
      const obj = JSON.parse(content);
      previewArea.textContent = JSON.stringify(obj, null, 2);
    } catch (e) {
      previewArea.textContent = "❌ Ошибка парсинга JSON.";
    }
  } else if (ext === "md") {
    previewArea.innerHTML = marked.parse(content);
  } else {
    previewArea.textContent = content;
  }
}
