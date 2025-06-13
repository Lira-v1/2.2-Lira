function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('transcript').textContent = 🔊 Вы сказали: "${transcript}";
    logMessage(🎤 Голосовой ввод: ${transcript});

    const command = interpretCommand(transcript);
    handleCommand(command);
  };

  recognition.onerror = (event) => {
    logMessage(⚠ Ошибка голосового ввода: ${event.error});
  };

  recognition.start();
}
