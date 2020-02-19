const Photo = require("../photos/model-photos")

const addPhotos = async function(body) {
  // console.log(body)
  const photo = new Photo(body)
  try {
    await photo.save()
  } catch (e) {
    console.log(e)
  }
  return { photo }
}

const safeImg = async function(fileData, res) {
  if (!fileData) res.send("Ошибка при загрузке файла")
  else res.send({ message: "Файл загружен", fileName: fileData.filename })  
}

const safeMultipleImg = async function(arrayFiles, query, res) {   
  try {    
    if (!query.idUser || !query.idAlbum || !arrayFiles.length) res.send("Ошибка при загрузке файла")
    else {
      let arrayPhotos = []    
    for(let i = 0; i<arrayFiles.length; i++) {
      const photo = {
        name: arrayFiles[i].filename,
        url: arrayFiles[i].filename,
        ownerUser: query.idUser,
        ownerAlbum: query.idAlbum
      }      
      arrayPhotos = arrayPhotos.concat(photo)    
    }    
     await Photo.insertMany(arrayPhotos)
     return { message: "Файл загружен", arrayPhotos }   
    }  
  } catch (e) {
    console.log(e)
  } 
}



module.exports = { safeImg, safeMultipleImg }
