export const ProjectManager = {
  currentProject: null,

  create(name) {
    this.currentProject = {
      name,
      files: {},
      created: new Date().toISOString()
    };
    return ✅ Проект "${name}" создан.;
  },

  openFile(name) {
    if (!this.currentProject || !this.currentProject.files[name]) {
      return ⛔ Файл ${name} не найден.;
    }
    return this.currentProject.files[name];
  },

  saveFile(name, content) {
    if (!this.currentProject) return "⛔ Нет активного проекта.";
    this.currentProject.files[name] = content;
    return 💾 Файл ${name} сохранён.;
  }
};
