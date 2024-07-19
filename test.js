const mongoose = require("mongoose")
const url = 'mongodb://localhost:27017/ERP';
const dummyBook = require("./book.json")

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("check")
})

const userSchema = new mongoose.Schema({
  _id: {type : Number, unique: true, required : true},
  title : {type: String, required : true, unique : true},
  author : {type : String },
  publisher : {type : String},
  genre : {type : String},
  price : {type : Number},
  explantation : {type : String},
  stock : {type : Number}
})

const User = mongoose.model('book_info',userSchema, 'book_info');

// 더미 데이터 생성 함수
async function createDummyData(incommingData) {
  try {
    await User.insertMany(incommingData);
    console.log('Dummy data inserted successfully');
  } catch (err) {
    console.error('Error inserting dummy data:', err);
  }
}


// MongoDB 연결 성공 시 더미 데이터 생성
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  createDummyData(dummyBook);
});


// User.find({type : String})
//   .then(users => {
//     console.log('All user:', users);
//   })
//   .catch(err => {
//     console.error('Error fetching users:', err);
//   });