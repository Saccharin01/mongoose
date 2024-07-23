const mongoose = require("mongoose")
const url = 'mongodb://localhost:27017/ERP';
const dummyBook = require("./book.json")

mongoose.connect(url)
.then(()=>{
  console.log("check")
})

const BookSchema = new mongoose.Schema({
  id: {type : Number, unique: true, required : true},
  title : {type: String, required : true, unique : true},
  author : {type : String },
  publisher : {type : String},
  genre : {type : String},
  price : {type : Number},
  explantation : {type : String},
  stock : {type : Number}
})

const User = mongoose.model('book_info',BookSchema, 'book_info');

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
  // createDummyData(dummyBook);
});

const query = "라이트"

 const test = (query)=>{
  
   User.find({title : query})
    .then(users => {
      console.log('All user:', users);
    })
    .catch(err => {
      console.error('Error fetching users:', err);
    });

}

test(query)


const searchBooks = (query) => {
  const searchRegex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색
  User.find({ title: { $regex: searchRegex } })
    .then(books => {
      console.log('Found books:', books);
    })
    .catch(err => {
      console.error('Error fetching books:', err);
    });
}

searchBooks(query);


 const searchBooks = (modelName ,query) => {

  // let result

  const model = mongoose.model(modelName, BookSchema, modelName)
  const searchRegex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색
  
  model.find({ title: { $regex: searchRegex } })
    .then(data => {
      console.log('Found data:', data);
      return data
      // result = data
    })
    .catch(err => {
      console.error('Error fetching books:', err);


    });
    // return result
}

const test = searchBooks("book_info", "라이트")
console.log(test)



import mongoose from "mongoose";
import { BookSchema } from "./Schema";

const searchBooks = async (modelName , query)  => {
  const model = mongoose.model(modelName, BookSchema, modelName);
  const searchRegex = new RegExp(query, 'i'); // 대소문자 구분 없이 검색
  
  try {
    const data = await model.find({ title: { $regex: searchRegex } });
    console.log('Found data:', data);
    return data;
  } catch (err) {
    console.error('Error fetching books:', err);
    throw err; // 에러 발생 시 프로미스를 reject 상태로 만듭니다.
  }
};

const test = searchBooks("book_info","라이트")
console.log(test)
console.dir(test)