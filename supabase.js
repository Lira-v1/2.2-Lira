const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_KEY = 'your-public-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function uploadFileToSupabase(fileName, content) {
  const { data, error } = await supabase.storage
    .from('lira-storage')
    .upload(fileName, new Blob([content]), {
      contentType: 'text/plain',
      upsert: true
    });

  if (error) {
    console.error('Ошибка Supabase:', error.message);
    return ⛔ Не удалось загрузить файл: ${error.message};
  }

  return ☁ Файл "${fileName}" загружен в облако.;
}

export async function listFilesFromSupabase() {
  const { data, error } = await supabase.storage.from('lira-storage').list();
  return error ? [] : data;
}
