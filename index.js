const express = require('express');
const app = express();
const post = 1234;
const path = require('path');
app.use(express.static(path.join(__dirname, 'publics')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mysql = require('mysql')
const connection = require('./connection');



// ----------- request name trong thẻ input  ---------------//
var bodyParser = require('body-parser');
const { Cipher } = require('crypto');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//========== Image =============//
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'publics' });
//=============================//

//=========== Home ============//
app.get('/', (req, res) => {
    // res.render('home.html')
    let dataProduct = {};
    let conn = connection.create(undefined, undefined, undefined, 'playstation');
    conn.connect();

    conn.query("Select * From gameproduct", (err, result) => {
        if (err) {
            console.log("Lỗi bảng 1", err);
        }
        dataProduct.dataGame = result;
    })
// 
    conn.query("Select gameproduct.* From gameproduct JOIN populargame ON gameproduct.ID = populargame.IDGAME ", (err, result) => {
        if (err)
        {
            console.log("Lỗi bảng 2", err);
        }
        dataProduct.dataPopular = result;
    })

    conn.query("Select * FROM tintuc Where TRANGTHAI = 1", (err, result) => {
        if (err)
            console.log("Lỗi bảng 3");
        dataProduct.news = result;
    });

    conn.query("Select tintuc.* FROM tintuc JOIN popularnews ON popularnews.IDNEWS = tintuc.ID", (err, result) => {
        if (err) console.log("Lỗi bảng 4");
            dataProduct.pNews = result;
    })

    conn.query("Select * FROM devices", (err, result) => {
        if (err) console.log("Lỗi bảng 5");
        dataProduct.devices = result;
    })

    conn.query("Select gameproduct.* From gameproduct JOIN upcominggame ON gameproduct.ID = upcominggame.IDGAME", (err, result) => {
        if (err)
        {
            console.log("Lỗi bảng 6", err);
        }
        dataProduct.dataUC = result;
        res.render('home', { data: dataProduct });
        conn.end();
    })
})
//=============================
app.get('/game', (req, res) => {

    let conn = connection.create(undefined, undefined, undefined, 'playstation');
    conn.connect();

    let dataProduct = {};

    conn.query("Select * From gameproduct", (err, result) => {
        if (err) {
            console.log("Lỗi bảng 1", err);
        }
        dataProduct.game = result;
        // 
    })

    conn.query("Select Distinct theLoai From gameproduct", (err, result) => {
        if (err) throw err;
        dataProduct.category = result;

        res.render('game',{data: dataProduct}); 
        conn.end();
    })
})


app.post('/game', (req, res) => {
    let conn = connection.create(undefined, undefined, undefined, 'playstation');
    var string = "";
    var whereSQL = "";
    conn.connect();
    var sql = "";
    var dataProduct = {};

    console.log(req.body.category)

    if (!req.body.category) {
        sql = "Select * From gameproduct";
    }
    else if (typeof req.body.category === 'string')
    {
        sql = "Select * From gameproduct where theLoai = '" + req.body.category + "' ";
    }
    else
    {
        req.body.category.forEach(item => {
            string += " theLoai = " + '"'+item+'"' + " OR ";
        });
        whereSQL = string;
        sql = "Select * From gameproduct Where " + whereSQL + "theLoai = ''";
    }
    console.log(sql);
    conn.query(sql, (err, result) => {
        if (err)
            return;
        dataProduct.game = result;
    })

    conn.query("Select Distinct theLoai From gameproduct", (err, result) => {
        if (err)
            return;
        dataProduct.category = result;
        res.render('game', { data: dataProduct });
        conn.end();
    })

})

//--------- News ----------//
//Code here...
app.get('/news', (req, res) => {
    let conn = connection.create(undefined, undefined, undefined, 'playstation');
    conn.connect();

    var sql = "Select * From tintuc";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('news', { data: result[0] });
    })

    conn.end();
})


app.post('/news', (req, res) => {
    let conn = connection.create(undefined, undefined, undefined, 'playstation');
    conn.connect();
    var sql = "UPDATE tintuc SET NOIDUNG = ? Where ID = 1";
    var params = [req.body.content];
    conn.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0)
            res.redirect('/news');    
    })
    
    conn.end();
})
//=========================//   
app.get('/news/test', (req, res) => {
    let conn = connection.create(undefined, undefined, undefined, 'playstation');
    conn.connect();

    var sql = "Select * From devices where ID = 2";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        // res.render('test', { data: result[0].NOIDUNG });

        console.log(result[0].MAUSP);
        
        res.render('test', { data: result[0] })
    })
    conn.end();
})


//============ Admin ==============//
//Code here....
// Home
app.get('/playstation/admin',(req, res)=> {
    res.render('adminManager'); 
})

//------------- List Game ---------------//
app.get('/playstation/admin/gameManagement', (req, res) => {
    var conn = connection.create();
    conn.connect();
    conn.query("Select * From gameproduct", (err, result) => {
        if (err) throw err;
        res.render('gameManagement', { data: result });
    })
    conn.end();
})


app.post('/playstation/admin/gameManagement',upload.single('image'), (req, res) => {
    var idMax = 0;
    var conn = connection.create();
    conn.connect();
    var sql_MaxID = "Select MAX(ID)+1 as ID FROM gameproduct";
    conn.query(sql_MaxID, (err, result) => {
        if (err) console.log("Lỗi lấy Max ID");
            idMax = result[0].ID;
            // if (idMax == null)
            //     id = 0
        // Image
        // Creat path of Image
        const imagePath = path.join(__dirname, 'publics/imageGame');

        //Image will move into imagePath.
        fs.renameSync(req.file.path, path.join(imagePath, req.file.originalname));
        var sql = "INSERT INTO gameproduct(ID,tenGame, theLoai, hinhNen, gia, moTa, ngayRaMat) VALUE (?,?,?,?,?,?,?)";
        var params = [
            idMax,
            req.body.name,
            req.body.category,
            req.file.originalname,
            req.body.price,
            req.body.description,
            req.body.date
        ]
        conn.query(sql,params,(err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.redirect('/playstation/admin/gameManagement');
                conn.end();
            }
        });
    })

})

app.post('/playstation/admin/gameManagement/delete/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var sql = "DELETE FROM gameproduct where ID = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0)
            res.redirect('/playstation/admin/gameManagement')
    })
    conn.end();
})

//----------- New releases ---------//
app.get('/playstation/admin/newReleases', (req, res) => {
    var arrData = {};
    arrData.name = "Game New Releases";
    var conn = connection.create();
    conn.connect();
    conn.query("Select gameproduct.* From gameproduct JOIN populargame ON populargame.IDGAME = gameproduct.ID", (err, result) => {
        if (err) throw err;
        arrData.data = result;
        res.render('showGame', { arr: arrData });
    });
    conn.end();
})

//---------- Game coming Soon ----------//
app.get('/playstation/admin/gamecomingsoon', (req, res) => {
    var arrData = {};
    arrData.name = "Game Coming Soon";
    var conn = connection.create();
    conn.connect();
    conn.query("Select gameproduct.* From gameproduct JOIN upcominggame ON upcominggame.IDGAME = gameproduct.ID", (err, result) => {
        if (err) throw err;
        arrData.data = result;
        res.render('showGame', { arr: arrData });
    });
    conn.end();
})

//=================================//


//---------- Devices ----------//
//Code here...
app.get('/playstation/admin/devices', (req, res) => {
    var conn = connection.create();
    conn.connect();
    conn.query("Select * From devices", (err, result) => {
        if (err) throw err;
        res.render('devicesManagement', { data: result });
    })
    conn.end();

})
//============================//

app.listen(post, () => {
    console.log("Success");
})