const safeImg = async function(filedata, res) {
  if (!filedata) res.send("Ошибка при загрузке файла")
  else res.send({ message: "Файл загружен", fileName: filedata.filename })
}

module.exports = safeImg
