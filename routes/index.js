var express = require('express');
var router = express.Router();
var multer = require('multer');
var db = 'mongodb+srv://ducthinh18122002:nU7aXJdn!_X45MQ@cluster0.bs5ca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const {ObjectId: ObejectID} = require("mongodb");
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra")
});
var listimage = new mongoose.Schema({
  name: 'string',
  content : 'string',
  date : 'string',
  linkanh : 'string'
});

var HinhAnh = mongoose.model('hinhanhs', listimage);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/addimg', function(req, res, next) {
  res.render('addimg', { title: 'Thêm Ảnh',message:'' });
});
router.get('/listimg',function (req,res) {
  HinhAnh.find({}, function (err, data){
    res.render('listimg', {title: 'Danh sách hình ảnh',data: data});
  })
})
router.get('/listimgres',function (rep,res) {
  HinhAnh.find({},function (err,data) {
    res.send(data)

  })
});
router.post('/addimg', function (request, response){
  var name= request.body.name;
  var content = request.body.content;
  var date = request.body.date;
  var linkanh = request.body.linkanh;


  const data = new HinhAnh({
    name: name,
    content: content,
    date: date,
    linkanh: linkanh
  });

  data.save(function (error){
    var mes;
    if (error == null){
      console.log('Thêm thành công')
    }else mes = error
    response.render('addimg', {message: mes});
  })
});

router.post('/updateimg', function (request, response){
  let ObejectID = require('mongodb').ObjectId;
  var id = request.body.id;
  var name= request.body.name;
  var content = request.body.content;
  var date = request.body.date;
  var linkanh = request.body.linkanh;
  HinhAnh.updateOne({_id :  ObejectID(id)}, {name:name,content:content,date:date,linkanh:linkanh}, function (err){
    if(err) throw err;
    console.log('Sửa thành công'+ObejectID(id));
  })
});

router.post('/delete', function (request, response){
  let ObejectID = require('mongodb').ObjectId;
  var id = request.body.id;
  HinhAnh.deleteOne({_id :  ObejectID(id)}, function (err){
    if(err) throw err;
    console.log('Xóa thành công'+ObejectID(id));
  });
});
router.get('/updateimg', function(req, res, next) {
  res.render('updateimg' );
});

router.post('/updateanh', function(req, res, next) {
  var idupdate = req.body.idupdate;
  HinhAnh.find({_id : idupdate}, function (err, data){
    res.render('updateimg', {title: 'Sửa Ảnh',message:'',data: data});
  })
});
module.exports = router;
