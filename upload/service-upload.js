const safeImg = async function(fileData, res) {
  if (!fileData) res.send("Ошибка при загрузке файла")
  else res.send({ message: "Файл загружен", fileName: fileData.filename })
}

const safeMultipleImg = async function(fileData, res) {    
  if (!fileData || !fileData.length) res.send("Ошибка при загрузке файла")
  else {
    let arrayFilesNames = []    
  for(let i = 0; i<fileData.length; i++) {
    arrayFilesNames = arrayFilesNames.concat(fileData[i].filename)    
  }  
  res.send({ message: "Массив из файлов загружен", fileNames: arrayFilesNames })
  }  
}


module.exports = { safeImg, safeMultipleImg }
