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


// Cookie and Session
const cookieApp = require('cookie-parser');
const sessionApp = require('express-session');
const crypto = require('crypto');

app.use(cookieApp());

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


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'publics/imageProduct');
    },
    filename: function (req, file, cb) {
        let randomNumber = getRandomInt(1, 100000000);
        // Đổi tên file để tránh xung đột, ví dụ: timestamp-origName
        cb(null, randomNumber + Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ dest: 'publics' });
const uploads = multer({ storage: storage });
//==========================================//

//========== Paragraph =========//
const striptags = require('striptags');
const session = require('express-session');
app.locals.striptags = striptags;
 
 

// Account

const randomText = crypto.randomBytes(64).toString('hex');

console.log(randomText);
app.use(sessionApp({
    secret: randomText,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.use((req, res, next) => {
    if (req.session.admin) {
        res.locals.admin = req.session.admin;
    }
    next();
});

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});


function Login_userAccount(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/')
    }
    next();
}


function adminAccount(req, res, next) {
    if (!req.session.admin) {
        console.log("Errol Function");
        return res.redirect('/playstation/admin/login');
    }
    next();
}

// Login User ========================
// Cookie tựa như CCCD lưu trữ dữ liệu tại Client - Ví
//

// Session và Cookie: theo dõi danh tính của người dùng và phiên hoạt động của người dùng
/*
Session: Thông tin, lưu trữ tại Server.
Tựa như mã CCCD.
Truy vấn thông tin ở Server
 - Hoạt động:  

*/
// Loginn
app.get('/playstation/login', (req, res) => {
    if (req.session.user) {
        res.clearCookie('connect.sid');
    }
    res.render('userLogin', { data: 1 });
})

app.post('/playstation/login', (req, res) => {
    let conn = connection.create();
    conn.connect();
    var sql = 'SELECT * FROM users WHERE TAIKHOAN = ? OR EMAIL = ?';
    var params = [
        req.body.account,
        req.body.account
    ]
    var userAccount = req.body.account;
    conn.query(sql, params, (err, result) => {
        if (err) throw err;
        // console.log(result[0]);
        if (result[0] != undefined) {
            if (result[0].MATKHAU == req.body.password && result[0].TRANGTHAI == 1)
            {
                req.session.user = {
                    id: result[0].ID,
                    user: userAccount,
                    check: 1,
                    image: result[0].HINHNEN,
                    fullName : result[0].HOTEN
                }
                res.redirect('/');
            }
            else
            {
                res.render('userLogin', { data: 0 });
            }
        }
        else
            res.render('userLogin', { data: 0 });
    })
    conn.end();
})


app.get('/playstation/logout', (req, res) => {
    res.clearCookie('connect.sid');
    console.log("Get out of my account");
    res.redirect('/');
})


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


app.post('/test/noiDung/add', (req, res) => {
    // var conn = connection.create();
    // conn.connect();
    
    // console.log(JSON.stringify(noiDung));
    // var sql = "INSERT INTO news(noiDung) Value (?)";
    // conn.query(sql, JSON.stringify(noiDung) , (err, result) => {
    //     if (err) throw err;
    //     if (result.affectedRows > 0)
    // })
    res.redirect('/test/noiDung');
    
    // conn.end();
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
                console.log(clone_Json);
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

    // Account 
    if (req.session.user)
    {
        dataProduct.cookieAccount = 1;
        dataProduct.nameAccount = req.session.user;
        var params_account = [
            req.session.user.user,
            req.session.user.user
        ]
        conn.query("SELECT * FROM users WHERE EMAIL = ? OR TAIKHOAN = ?", params_account, (err, result) => {
            if (err) throw err;
            dataProduct.infoAccount = result[0];
        })
    }
    else
    {
        dataProduct.cookieAccount = 0; 
        console.log("Đăng nhập thất bại");
    }

    conn.query("Select gameproduct.* From gameproduct JOIN upcominggame ON gameproduct.ID = upcominggame.IDGAME", (err, result) => {
        if (err) {
            console.log("Lỗi bảng 6", err);
        }
        dataProduct.dataUC = result;
        res.render('home', { data: dataProduct });
        conn.end();
    })
})


// Create account
app.get('/playstation/create_account', (req, res) => {
    var arr_data = {};
    arr_data.checkPhone = 0;
    arr_data.checkMail = 0;
    arr_data.checkTK = 0;
    res.render('createAccount', {data: arr_data});
})

app.post('/playstation/create_account', (req, res) => {
    let conn = connection.create();
    conn.connect();
    var arr_data = {};
    var bool_check = true;
    var sql_check = "SELECT * FROM users WHERE SDT = ? OR TAIKHOAN = ? OR EMAIL = ?";
    var params_check = [
        req.body.phoneNumber,
        req.body.username,
        req.body.email
    ];

    conn.query(sql_check, params_check, (err, result) => {
        if (err) throw err;
        result.forEach(item => {
            if (item.SDT == req.body.phoneNumber) {
                arr_data.checkPhone = 1;
                bool_check = false;
                // console.log("Trùng 1");
            }

            if (item.TAIKHOAN == req.body.username) {
                arr_data.checkTK = 1;
                bool_check = false;
                // console.log("Trùng 2");
                
            }

            if (item.EMAIL == req.body.email) {
                arr_data.checkMail = 1;
                bool_check = false;
                // console.log("Trùng 3");
            }
        })

        if (bool_check == true) {
            var imgDefault = 'user-image.png';
            var statusDefault = 1;
            var sql = 'INSERT INTO users(TAIKHOAN,MATKHAU,HOTEN,SDT,EMAIL,TRANGTHAI,HINHNEN) VALUE(?,?,?,?,?,?,?)';
            var params = [
                req.body.username,
                req.body.pass,
                req.body.fullName,
                req.body.phoneNumber,
                req.body.email,
                statusDefault,
                imgDefault
            ]
            console.log(params);
            conn.query(sql, params, (err, result) => {
                if (err) {
                    conn.end();
                    return;
                }
                console.log(sql);
                if (result.affectedRows > 0) {
                    res.redirect('/playstation/login');
                }
            })

        }
        else
        {
            res.render('createAccount', { data: arr_data })
            conn.end();
        }

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
     
    if (req.session.user) {
        dataProduct.cookieAccount = 1;
        dataProduct.nameAccount = req.session.user;
        var params_account = [
            req.session.user.user,
            req.session.user.user
        ]
        conn.query("SELECT * FROM users WHERE EMAIL = ? OR TAIKHOAN = ?", params_account, (err, result) => {
            if (err) throw err;
            dataProduct.infoAccount = result[0];
        })
    }
    else {
        dataProduct.cookieAccount = 0;
        console.log("Đăng nhập thất bại");
    }

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


// ======================== Details ==========================//
app.get('/playstation/game/details/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var dataProduct = {};
    if (!req.session.user) {
        res.redirect(`/playstation/login`)
    }

    var params = req.params.id;
    conn.query("Select * From gameproduct Where ID = ?", params, (err, result) => {
        if (err) throw err;
        dataProduct.details = result[0];
        res.render('gameDetails', { data: dataProduct });
    })
    conn.end();
})


app.get('/playstation/devices/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var arrDevieces = {};
    if (!req.session.user)
    {
        res.redirect('/playstation/login');
    }
    conn.query("Select * From devices Where ID = ?", req.params.id, (err, result) => {
        if (err) throw err;
        arrDevieces.info = result[0];
        arrDevieces.imgInfo = JSON.parse(result[0].CHITIETANH);
        // console.log(arrDevieces.imgInfo.imgDetails[0]);
        // console.log(arrDevieces.imgInfo.img);
        res.render('devieceDetails', { data: arrDevieces });
    })
    conn.end();
})

app.get('/playstation/admin/devices/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var arrDevieces = {};
    
    conn.query("Select * From devices Where ID = ?", req.params.id, (err, result) => {
        if (err) throw err;
        arrDevieces.info = result[0];
        arrDevieces.imgInfo = JSON.parse(result[0].CHITIETANH);
        // console.log(arrDevieces.imgInfo.imgDetails[0]);
        // console.log(arrDevieces.imgInfo.img);
        res.render('devieceDetails', { data: arrDevieces });
    })
    conn.end();
})




// ========================= Add to Cart ================================//
app.post('/playstation/game/details/addToCart', (req, res) => {
    var conn = connection.create();
    conn.connect();
    // Variable
    var status = '0';
    var quantity = 1;

    var sql_check_Cart = "Select COUNT(*) as Count FROM cart WHERE userID = ?";
    // -------------------- 
    conn.query(sql_check_Cart, req.body.idUser, (err, result) => {
        if (result[0].Count == 0) {
            console.log("BẮT ĐIỀU KIỆN");

            // -------------Create Cart for User 
            conn.query("Insert INTO cart (userID) Value(?)", req.body.idUser, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {

                    // --------------------
                    conn.query("SELECT * FROM cart WHERE userID = ?", req.body.idUser, (err, result) => {
                        if (err) throw err;
                        
                        var sql_Cart_Item = "INSERT INTO cart_item (iDCart, game_ID, quantity, price, status) Value(?,?,?,?,?)";
                        var params_Cart_Item = [
                                    result[0].ID,
                                    req.body.idGame,
                                    quantity,
                                    req.body.price,
                                    status
                                ]
                        
                        conn.query(sql_Cart_Item, params_Cart_Item, (err, result) => {
                            if (err) throw err;
                            if (result.affectedRows > 0) {
                                console.log("Add thành công");
                                res.redirect('/');
                            }
                        })
                        
                    })
                }
            })
        }
        else
        {
            // --------------------
            conn.query("SELECT * FROM cart WHERE userID = ?", req.body.idUser, (err, result) => {
                if (err) throw err;

                var sql_Cart_Item = "INSERT INTO cart_item (iDCart, game_ID, quantity, price, status) Value(?,?,?,?,?)";
                var params_Cart_Item = [
                    result[0].ID,
                    req.body.idGame,
                    quantity,
                    req.body.price,
                    status
                ]

                conn.query(sql_Cart_Item, params_Cart_Item, (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows > 0) {
                        console.log("Add thành công k cần Tạo Cart");
                        res.redirect('/');
                    }
                })

            })
        }
    })
})


app.post('/playstation/devices/details/addToCart', (req, res) => {
    var conn = connection.create();
    conn.connect();
    // Variable
    var status = '0';
    var quantity = 1;

    var sql_check_Cart = "Select COUNT(*) as Count FROM cart WHERE userID = ?";
    // -------------------- 
    conn.query(sql_check_Cart, req.body.idUser, (err, result) => {
        if (result[0].Count == 0) {
            console.log("BẮT ĐIỀU KIỆN");

            // -------------Create Cart for User 
            conn.query("Insert INTO cart (userID) Value(?)", req.body.idUser, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {

                    // --------------------
                    conn.query("SELECT * FROM cart WHERE userID = ?", req.body.idUser, (err, result) => {
                        if (err) throw err;
                        
                        var sql_Cart_Item = "INSERT INTO cart_item (iDCart, devices_ID, quantity, price, status) Value(?,?,?,?,?)";
                        var params_Cart_Item = [
                            result[0].ID,
                            req.body.devicesID,
                            quantity,
                            req.body.price,
                            status
                        ]; 
                        
                        conn.query(sql_Cart_Item, params_Cart_Item, (err, result) => {
                            if (err) throw err;
                            if (result.affectedRows > 0) {
                                console.log("Add thành công");
                                res.redirect('/');
                            }
                        })
                        
                    })
                }
            })
        }
        else
        {
            // --------------------
            conn.query("SELECT * FROM cart WHERE userID = ?", req.body.idUser, (err, result) => {
                if (err) throw err;

                var sql_Cart_Item = "INSERT INTO cart_item (iDCart, devices_ID, quantity, price, status) Value(?,?,?,?,?)";
                var params_Cart_Item = [
                    result[0].ID,
                    req.body.devicesID,
                    quantity,
                    req.body.price,
                    status
                ]

                conn.query(sql_Cart_Item, params_Cart_Item, (err, result) => {
                    if (err) throw err;
                    if (result.affectedRows > 0) {
                        console.log("Add thành công k cần Tạo Cart");
                        res.redirect('/');
                    }
                })

            })
        }
    })
})







// Delete Item in Table Cart_Item

app.post('/playstation/Cart/deleteItem/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();

    var sql = `DELETE FROM cart_item WHERE ID = ${req.params.id}`;

    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        if (result.affectedRows > 0) {
            res.redirect(`/playstation/userAccount/cart/${req.body.userID}`);
        }
        else
            res.redirect(`/playstation/userAccount/cart/${req.body.userID}`);
    })

    conn.end();
})


// Show Cart
app.get('/playstation/userAccount/cart/:id', (req, res) => {
    if (!req.session.user) {
        res.redirect('/playstation/login')
    }
    var conn = connection.create();
    conn.connect();

    conn.query('SELECT ID FROM Cart WHERE userID = ?',req.params.id, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const cartId = result[0].ID;
            console.log(result[0]);
            // Truy vấn các mục trong giỏ hàng 
            const query = `
        SELECT ci.id, ci.quantity, ci.price, ci.status, 
               g.tenGame, g.theLoai, g.hinhNen, g.gia AS game_gia, g.moTa AS game_moTa, g.ngayRaMat,
               d.TENSP, d.NSX, d.GIATIEN, d.MOTA AS device_moTa, d.HINHANH, d.CHITIETANH, d.SOLUONG, d.NGAYSX, d.BAOHANH
        FROM cart_item ci
        LEFT JOIN gameproduct g ON ci.game_id = g.id
        LEFT JOIN devices d ON ci.devices_ID = d.id
        WHERE ci.iDCart = ?
      `;

            conn.query(query, cartId, (err, results) => {
                if (err) throw err;

                // Xử lý và gửi dữ liệu
                const cartItems = results.map(item => ({
                    // ID cart_item
                    id: item.id,
                    name: item.tenGame || item.TENSP, // Lấy tên từ bảng tương ứng
                    category: item.theLoai || null,
                    image: item.hinhNen || item.HINHANH,
                    price: item.price,
                    description: item.game_moTa || item.device_moTa,
                    releaseDate: item.ngayRaMat || null,
                    manufacturer: item.NSX || null,
                    detailedImage: item.CHITIETANH || null,
                    quantityInStock: item.SOLUONG || null,
                    manufactureDate: item.NGAYSX || null,
                    warranty: item.BAOHANH || null,
                    cartQuantity: item.quantity,
                    status: item.status,
                    product_type: item.tenGame ? 'game' : 'devices' // Xác định loại sản phẩm
                }));

                console.log(cartItems.length);
                res.render('userCart', { data: cartItems });
            });
        }
        conn.end();
    })
})




// ==================================================//
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


//======================= Admin =========================//
//Code here....
// Login Admin
app.get('/playstation/admin/login', (req, res) => {
    res.render('loginAdmin',{data: 1});
})

 

app.post('/playstation/admin/login', (req, res) => {
    var conn = connection.create();
    conn.connect();
    console.log(req.body);
    var sql = "SELECT * FROM adminaccount WHERE EMAIL = ?";
    conn.query(sql, req.body.email, (err, result) => {
        if (err) throw err; 

        if (req.body.password == result[0].MATKHAU)
        {
            // set session
            req.session.admin = { 
                username: req.body.email,
                fullname: result[0].HOTEN
            };
            console.log(req.session.admin);
            res.redirect('/playstation/admin');
        }
        else
        { 
            console.log("Thất bại");
            res.render('loginAdmin', { data: 0 });            
        } 
    })
    conn.end();
}) 

// Logout
app.post('/playstation/admin/logout', (req, res) => {
    // res.clearCookie('connect.sid');
    delete req.session.admin;
})


// Home
app.get('/playstation/admin',adminAccount, (req, res) => {
    var conn = connection.create();
    conn.connect();
    if (req.session.admin) {
        conn.query("SELECT * FROM adminaccount WHERE EMAIL = ?", req.session.admin.username, (err, result) => {
            if (err) throw err;
            res.render('adminManager', { data: result[0] });
        })
    }
    else
    {
        res.redirect('/playstation/admin/login');    
    }
    conn.end();
})
 
//------------- List Game ---------------//
app.get('/playstation/admin/gameManagement', adminAccount , (req, res) => {
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
app.get('/playstation/admin/gameManagement/:id',adminAccount, (req, res) => {
    
    var conn = connection.create();
    conn.connect();
    var params = req.params.id;
    conn.query("Select * From gameproduct Where ID = ?", params, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
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
app.get('/playstation/admin/newReleases', adminAccount, (req, res) => {
    
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
app.get('/playstation/admin/gamecomingsoon', adminAccount, (req, res) => {
    
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
            if (result.affectedRows > 0)
            {
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
app.get('/playstation/admin/devices', adminAccount, (req, res) => {
    
    var conn = connection.create();
    conn.connect();
    conn.query("Select * From devices", (err, result) => {
        if (err) throw err;
        res.render('devicesManagement', { data: result });
    })
    conn.end();
})

// JSON
app.get('/playstation/admin/deviceManagement/:id', adminAccount, (req, res) => {
    
    var conn = connection.create();
    conn.connect();
    conn.query("Select * From devices Where ID = ?", req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
        // console.log(result[0]);
    })

    conn.end();
})


const multipleUpload = upload.fields([
    { name: 'image', maxCount: 1 },       // Để xử lý ảnh đại diện
    { name: 'images', maxCount: 10 }      // Để xử lý ảnh chi tiết
]);

app.post('/playstation/admin/devices', multipleUpload, (req, res) => {
    var conn = connection.create();

    // Add file image
    const imagePath = path.join(__dirname, 'publics/imageProduct');
    if (req.files && req.files.image) {
        const mainImage = req.files.image[0];
        fs.renameSync(mainImage.path, path.join(imagePath, mainImage.originalname));

        req.files.images.forEach(item => {
            fs.renameSync(item.path, path.join(imagePath, item.originalname));
        })
    }
    
    // JSON
    var test = {
        "imgDetails": []
    };
    req.files.images.forEach(item => {
        test.imgDetails.push(
            { "image": item.originalname }
        )
    })
 
    // Time unit
    var timeUnit = req.body.timeUnit;
    console.log(timeUnit);

    // Params 
    conn.connect(); 
    var params = [
        req.body.name,
        req.body.producer,
        req.body.price,
        req.body.description,
        req.files.image[0].originalname,
        JSON.stringify(test),
        req.body.quantity,
        req.body.date,
        req.body.warranty + " " + timeUnit,
    ]
    var sql_1 = "INSERT INTO devices(TENSP,NSX,GIATIEN,MOTA,HINHANH,CHITIETANH,SOLUONG,NGAYSX,BAOHANH) VALUE(?,?,?,?,?,?,?,?,?)";
    conn.query(sql_1, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/playstation/admin/devices')
        }
    })
    conn.end();
})


app.post('/playstation/admin/devices/update',multipleUpload, (req, res) => {
    var conn = connection.create();
    conn.connect();
    var sql;
    var params = [];

    // Lấy đường dẫn lưu file ảnh
    var pathImg = path.join(__dirname, '/publics/imageProduct');
    
    if (req.files && req.files.image && req.files.images) {
        console.log("All");
        // Add just 1 image
        var imgM = req.files.image[0];
        fs.renameSync(imgM.path, path.join(pathImg, imgM.originalname));

        // Add array images
        req.files.images.forEach(item => {
            fs.renameSync(item.path, path.join(pathImg, item.originalname));
        })

        var arr_imageDeviceDetails = {
            "imgDetails": []
        }

        req.files.images.forEach(item => {
            arr_imageDeviceDetails.imgDetails.push(
                {
                    "image": item.originalname
                }
            );
        })

        // Full
        sql = `UPDATE devices 
                    SET TENSP = ?, NSX = ?, GIATIEN = ?,
                    MOTA = ?, HINHANH = ?,CHITIETANH = ?,
                    SOLUONG = ?, NGAYSX = ?, BAOHANH = ?
                    WHERE ID = ?`
        
        params = [
            req.body.name,
            req.body.producer,
            req.body.price,
            req.body.description,
            req.files.image[0].originalname,
            JSON.stringify(arr_imageDeviceDetails),
            req.body.quantity,
            req.body.date,
            req.body.warranty + " " + req.body.timeUnit,
            req.body.idDevice
        ]
        // Update Full
    }
    else if(req.files.image && !req.files.images)
    {   

        sql = `UPDATE devices SET TENSP = ?, NSX = ?, GIATIEN = ?,MOTA = ?, HINHANH = ?,SOLUONG = ?, NGAYSX = ?, BAOHANH = ? WHERE ID = ?`
        params = [
            req.body.name,
            req.body.producer,
            req.body.price,
            req.body.description,
            req.files.image[0].originalname,
            req.body.quantity,
            req.body.date,
            req.body.warranty + " " + req.body.timeUnit,
            req.body.idDevice
        ]
    }
    else if (!req.files.image && req.files.images) {
        var arr_imageDeviceDetails = {
            "imgDetails": []
        }

        req.files.images.forEach(item => {
            arr_imageDeviceDetails.imgDetails.push(
                {"image":item.originalname}
            );
        })

        console.log("Nothing 1.2");
        sql = `UPDATE devices SET TENSP = ?, NSX = ?, GIATIEN = ?,MOTA = ?, CHITIETANH = ? ,SOLUONG = ?, NGAYSX = ?, BAOHANH = ? WHERE ID = ?`
        params = [
            req.body.name,
            req.body.producer,
            req.body.price,
            req.body.description,
            JSON.stringify(arr_imageDeviceDetails),
            req.body.quantity,
            req.body.date,
            req.body.warranty + " " + req.body.timeUnit,
            req.body.idDevice
        ]
    }
    else {
        console.log("Nothing All");
        sql = `UPDATE devices 
                    SET TENSP = ?, NSX = ?, GIATIEN = ?,
                    MOTA = ?,SOLUONG = ?, NGAYSX = ?, BAOHANH = ?
                    WHERE ID = ?`

        params = [
            req.body.name,
            req.body.producer,
            req.body.price,
            req.body.description,
            req.body.quantity,
            req.body.date,
            req.body.warranty + " " + req.body.timeUnit,
            req.body.idDevice
        ]
    }

    conn.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/playstation/admin/devices');
        }
    })
    conn.end();
})

 
// ============
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
// User Account
app.get('/playstation/admin/userAccount', adminAccount, (req, res) => {
    
    var conn = connection.create();
    conn.connect();
    var sql = "Select * FROM users";
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.render('userAccountManager', { data: result });
    })

    conn.end();
})
 
app.post('/playstation/admin/userAccount/changeStatus/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var sql = "Update users SET TRANGTHAI = ? WHERE ID = ?";
    var params = [
        req.body.type_Status,
        req.params.id
    ]
    conn.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/playstation/admin/userAccount')
        }
        else
        {
            res.redirect('/playstation/admin/userAccount')
        }
    })
    conn.end();
})


app.post('/playstation/admin/userAccount/delete/:id', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var sql = "DELETE FROM users WHERE ID = ?";
    
    conn.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/playstation/admin/userAccount')
        }
        else
        {
            res.redirect('/playstation/admin/userAccount')
        }
    })
    conn.end();
})


app.get('/playstation/userAccount/:id', (req, res) => {
    if (!req.session.user)
    {
        res.redirect('/')
    }
    var conn = connection.create();
    conn.connect();
    var arr_data = {};
    arr_data.confirm = 0;
    arr_data.checkPass = 0;
    var sql = "SELECT * FROM users WHERE ID = ?";
    conn.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        arr_data.info = result[0];
        res.render('userDetails', { data: arr_data });
    })
})
    
// Replace / Change
app.post('/playstation/userAccount', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var arr_data = {};
    arr_data.confirm = 1;
    arr_data.checkPass = 0;

    var sql = "UPDATE users SET HOTEN = ?,EMAIL = ?,SDT = ? WHERE ID = ?";
    var params = [
        req.body.fullName,
        req.body.email,
        req.body.phoneNumber,
        req.body.id
    ]
    conn.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            console.log("Change");  
        }
        else
        {
            arr_data.confirm = 0;
        }
    })

    conn.query('SELECT * FROM users WHERE ID = ?', req.body.id, (err, result) => {
        if (err) return;
            arr_data.info = result[0];
            res.render('userDetails', { data: arr_data })
            conn.end();
    })
})
 

app.post('/playstation/userAccount/changePassword', (req, res) => {
    var conn = connection.create();
    conn.connect();
    var arr_data = {};
    conn.query("SELECT * FROM users WHERE ID = ?", req.body.btn_ID, (err, result) => {
        if (err) throw err;
        arr_data.info = result[0];
        if (req.body.current_pass == result[0].MATKHAU)
        {
            var sql = "UPDATE users SET MATKHAU = ? WHERE ID = ?";
            var params =
                [
                    req.body.new_password,
                    req.body.btn_ID
                ]
            conn.query(sql, params, (err, result) => {
                console.log("1");
                if (err) throw err;
                if (result.affectedRows > 0)
                {
                    res.redirect(`/playstation/userAccount/${req.body.btn_ID}`);
                }
                else
                {
                    res.redirect(`/playstation/userAccount/${req.body.btn_ID}`);
                }
                conn.end();
            })
        }
        //  
        else
        {
            arr_data.checkPass = 1;
            res.render('userDetails',{data: arr_data})
        }
    })
})



// ================================//
app.listen(post, () => {
    console.log("Success");
})