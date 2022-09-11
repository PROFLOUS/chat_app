const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const friendSchema = new Schema({
  userIds:[ObjectId]
});

//find isExists two userId
friendSchema.statics.existsByIds = async(userId1, userId2) =>{
  const isExists = await Friend.findOne({
    userIds:{ $all:[userId1, userId2]}
  });
  if(isExists) return true;
  return false;
}

//check userId
friendSchema.statics.checkByIds = async (userId1,userId2,message = 'Friend') => {
  const isExists = await Friend.findOne({
      userIds: { $all: [userId1, userId2] },
  });

  if (!isExists) throw new NotFoundError(message);
};

friendSchema.statics.deleteByIds = async (userId1,userId2,message = 'Friend') => {
  const rs = await Friend.deleteOne({
      userIds: { $all: [userId1, userId2] },
  });

  const { deletedCount } = rs;
  if (deletedCount === 0) throw new NotFoundError(message);
};



const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;