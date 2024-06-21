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
const { log } = require('console');
const e = require('express');
const upload = multer({ dest: 'publics' });
//=============================//

//========== Paragraph =========//
const striptags = require('striptags');
app.locals.striptags = striptags;

 
// ======== Test ===========// 
app.get('/test/noiDung', (req, res) => {
    var conn = connection.create();
    var arrData = {};
    conn.connect();
    var sql = "Select * FROM news WHERE ID = 4";
    conn.query(sql, (err, result) => {
        var new_J = {"image":'GOD.jpg'};
        var del_J = { "image": '2.jpg' };

        arrData.list = result[0];
        // Parse 
        arrData.image = JSON.parse(result[0].noiDung); 
        // cl_json.book[0] = new_J;
        
        // cl_json.book.splice(del_J, 1);

        if (err) throw err;
        res.render('news',{data: arrData})
    })
    conn.end();
})

app.post('/test/noiDung', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var noiDung = {
        "book": [
            { "image": req.body.content }
        ]
    };

    console.log(JSON.stringify(noiDung));
    var sql = "INSERT INTO news(noiDung) Value (?)";
    conn.query(sql, JSON.stringify(noiDung) , (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0)
            res.redirect('/test/noiDung');
    })
    
    conn.end();
})

// ===========================================
/* 
    B1: Select dữ liệu nội dung
    B2: lấy nội dung chuyển Parse
    B3: Thay đổi - Xóa --> nội dung -> Replace
    B4: Chuyển nội dung thành Text
    B5: Update nội dung
*/

/*
    B3: Push vào mảng

*/

// ===========================================

app.post('/test/noiDung/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var sql = "UPDATE news SET noiDung = ? WHERE ID = ? ";
    let params = []
    
        // conn.query(sql, params, (err, result) => {
        //     if (err) throw err;
        //     if (result.affectedRows > 0) {
        //         res.redirect('/test/noiDung')
        //     }
    // })
    
    var sql_1 = "SELECT NOIDUNG FROM news WHERE ID = ?";
    conn.query(sql_1, req.params.id, (err, result) => {
        if (err) throw err;
        var clone_Json = JSON.parse(result[0].NOIDUNG);
        
        // forEach
        clone_Json.book.forEach((item,index) => {
            // Replace
            if (index == req.body.location && req.body.del == undefined) {
                clone_Json.book[index] = { "image": req.body.text };
                var new_Json = JSON.stringify(clone_Json);
                params = [
                    new_Json,
                    req.params.id
                ];
            }   
 
            // Delete
            if (index == req.body.del && req.body.location == undefined) {
                clone_Json.book.splice(req.body.del, 1);
                var new_Json = JSON.stringify(clone_Json);
                params = [
                    new_Json,
                    req.params.id
                ]; 
            }    
        })

        
        // Add
        if (req.body.add == 'btn_Add') {
            clone_Json.book.push({ "image": req.body.cnt });
            var new_Json = JSON.stringify(clone_Json);
            console.log("Z: " + new_Json);
            params = [
                new_Json,
                req.params.id
            ];

        }

        conn.query(sql, params, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.redirect('/test/noiDung');
                conn.end();
            }
        })  
        
    })
})





// =========================//


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
        if (err) {
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
        if (err) {
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

        res.render('game', { data: dataProduct });
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
    else if (typeof req.body.category === 'string') {
        sql = "Select * From gameproduct where theLoai = '" + req.body.category + "' ";
    }
    else {
        req.body.category.forEach(item => {
            string += " theLoai = " + '"' + item + '"' + " OR ";
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
app.get('/playstation/admin', (req, res) => {
    res.render('adminManager');
})

//------------- List Game ---------------//
app.get('/playstation/admin/gameManagement', (req, res) => {
    var conn = connection.create();

    var dataProduct = {};

    conn.connect();
    conn.query("Select * From gameproduct", (err, result) => {
        if (err) return;
        dataProduct.game = result;
    })
 
    conn.query("Select DISTINCT theLoai FROM gameproduct", (err, result) => {
        if (err) return;
        dataProduct.category = result;
        res.render('gameManagement', { data: dataProduct });
    });
    
    conn.end();
})

// JSON ----------------------------
app.get('/playstation/admin/gameManagement/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var params = req.params.id;
    conn.query("Select * From gameproduct Where ID = ?", params, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    })
    conn.end();
})

// ======================== Details ==========================//
app.get('/playstation/game/details/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var params = req.params.id;
    conn.query("Select * From gameproduct Where ID = ?", params, (err, result) => {
        if (err) throw err;
        res.render('gameDetails', { data: result[0] });
    })
    conn.end();
})


app.post('/playstation/admin/gameManagement', upload.single('image'), (req, res) => {
    // type Button
    var typeButton = req.body.btn_type;

    var idMax = 0;
    var conn = connection.create();
    conn.connect();
    var sql_MaxID = "Select MAX(ID)+1 as ID FROM gameproduct";
    conn.query(sql_MaxID, (err, result) => {
        if (err) console.log("Lỗi lấy Max ID");
        idMax = result[0].ID;

        if (typeButton == 'formAdd') {
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
            conn.query(sql, params, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.redirect('/playstation/admin/gameManagement');
                    conn.end();
                }
            });
        }

        // Form change
        if (typeButton == 'formChange') {
            
            if (!req.file)
            {
                var sql_change = "UPDATE gameproduct SET tenGame = ?,theLoai = ?,gia = ?,moTa = ?, ngayRaMat = ? Where ID = ?";
                var params_Change = [
                    req.body.name,
                    req.body.category,
                    req.body.price,
                    req.body.description,
                    req.body.dateProduct,
                    req.body.idGame,
                ] 
            }
            else
            {
                const imagePath = path.join(__dirname, 'publics/imageGame');
                //Image will move into imagePath.
                fs.renameSync(req.file.path, path.join(imagePath, req.file.originalname));
                
                var sql_change = "UPDATE gameproduct SET tenGame = ?,theLoai = ?,hinhNen = ?,gia = ?,moTa = ?, ngayRaMat = ? Where ID = ?";
                var params_Change = [
                    req.body.name,
                    req.body.category,
                    req.file.originalname,
                    req.body.price,
                    req.body.description,
                    req.body.dateProduct,
                    req.body.idGame,
                ]
            }
            conn.query(sql_change, params_Change, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.redirect('/playstation/admin/gameManagement');
                    conn.end();
                }
            });
        }
    })
    // -------------------
})


app.post('/playstation/admin/gameManagement/addTable/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();

    var typeF = req.body.typeForm;

    if (typeF == 'new-release') {
        console.log("upcominggame");
        var sql_1 = "Insert INTO populargame(IDGAME) VALUE(?)";
        conn.query(sql_1, req.params.id, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0)
                res.redirect('/playstation/admin/gameManagement')
        })
    }

    if (typeF == 'coming-soon') {
        console.log("populargame");
        var sql_2 = "Insert INTO upcominggame(IDGAME) VALUE(?)";
        console.log(sql_2);
        conn.query(sql_2, req.params.id, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0)
                res.redirect('/playstation/admin/gameManagement')
 
        })
    }
    conn.end();
})


app.post('/playstation/admin/gameManagement/delete/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var sql = "DELETE FROM gameproduct where ID = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0)
            res.redirect('/playstation/admin/gameManagement');
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

// Delete 1 in 2 talbe
app.post('/playstation/admin/showGame/delete/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var typeF = req.body.typeForm;
    var params = req.params.id;
    if (typeF == 'Game Coming Soon') {
        var sql_1 = "Delete FROM upcominggame WHERE IDGAME = ?";
        conn.query(sql_1, params, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.redirect('/playstation/admin/gamecomingsoon');
            }
        })
    }
    if (typeF == "Game New Releases") {
        var sql_2 = "Delete FROM populargame WHERE IDGAME = ?";
        conn.query(sql_2, params, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.redirect('/playstation/admin/newReleases');
            }
        })
    }
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

app.post('/playstation/admin/devices',upload.single('image'), (req, res) => {
    var conn = connection.create();
    const imagePath = path.join(__dirname, 'publics/imageProduct');
    //Image will move into imagePath...
    fs.renameSync(req.file.path, path.join(imagePath, req.file.originalname));

    conn.connect();
    var params = [
        req.body.name,
        req.body.producer,
        req.body.price,
        req.body.description,
        req.file.originalname,
        req.body.quantity,
        req.body.warranty,
    ]
    var sql_1 = "INSERT INTO devices(TENSP,NSX,GIATIEN,MOTA,HINHANH,SOLUONG,BAOHANH) VALUE(?,?,?,?,?,?,?)";
    conn.query(sql_1, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/playstation/admin/devices')
        }
    })
    conn.end(); 
})

app.post('/playstation/admin/devices/delete/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var sql = "DELETE FROM devices WHERE ID = ? ";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/playstation/admin/devices');
        }
    })
    conn.end();
})
//================================//




app.listen(post, () => {
    console.log("Success");
})