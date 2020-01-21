const safeImg = async function(filedata, res) {
  if (!filedata) res.send("Ошибка при загрузке файла")
  else res.send("Файл загружен")
}

module.exports = safeImg
