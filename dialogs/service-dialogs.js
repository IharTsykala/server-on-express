const mongoose = require("mongoose")
const Dialog = require("./model-dialogs")
const ObjectId = mongoose.Types.ObjectId

class ServiceDialog {
  constructor() {}

  getAllDialogs = async function() {
    try {
      return await Dialog.find({})
    } catch (e) {
      console.log(e)
    }
  }

  getAllDialogsByIdUser = async function(idLogInUser) {
    try {      
      return await Dialog.aggregate([
        {
          $match: {            
              members: {  
                $all: [ObjectId(idLogInUser)] 
                }          
          }
        }
        ,
        {
          $addFields: {
           
            members: {   
              $filter: {
                input: "$members",
               as: "membersFilter",
                cond: {                 
                    $ne: ['$$membersFilter', ObjectId(idLogInUser)]                         
                }
              }               
            }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "_id",
            as: "members"
          }
        },
        {        
          $unwind: "$members"        
        },
        {
          $addFields: {
            members : '$members.login'            
          }  
        }          

      ])      
    } catch (e) {
      console.log(e)
    }
  }

  addDialog = async function(body) {
    try {
      const dialog = new Dialog(body)
      // console.log(await dialog.save())
      return await dialog.save()
    } catch (e) {
      console.log(e)
    }
  }

  updateDialogById = async function(id, body) {
    try {
      // console.log(body)
      return await User.findByIdAndUpdate(id, body)
    } catch (e) {
      console.log(e)
    }
  }

  deleteDialogById = async function(id) {
    try {
      if (await fs.pathExists(`public/images/users/${id}`)) {
        await fs.remove(`public/images/users/${id}`)
      }
      return await Dialog.deleteOne({ _id: id })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ServiceDialog
