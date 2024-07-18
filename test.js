const {MongoClient} = require('mongodb')







const mongoose = require("mongoose")
const url = 'mongodb://localhost:27017/TestDataBase3';

mongoose.connect(url)
.then(()=>{
  console.log("check")
})
// 스키마 정의
const userSchema = new mongoose.Schema({
  name: {type : String, required : true, unique : true},
  age: Number,
  email: String
});

// 모델 생성
const User = mongoose.model('UserTESTEntry', userSchema);

// 더미 데이터 생성 함수
async function createDummyData(userTestEntry) {
  try {
    await User.insertMany(userTestEntry);
    console.log('Dummy data inserted successfully');
  } catch (err) {
    console.error('Error inserting dummy data:', err);
  }
}

// MongoDB 연결 성공 시 더미 데이터 생성
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  createDummyData();
});


User.find({})
  .then(users => {
    console.log('All user:', users);
  })
  .catch(err => {
    console.error('Error fetching users:', err);
  });