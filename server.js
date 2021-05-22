const express = require('express');
const app = express();
const port = 4000;
const multer = require('multer');

app.get('/', (req, res) => {
    res.send('hello people');
});

//for uploading single file
// const upload = multer({ dest: 'uploads/' });
// app.post('/singleFileUpload', upload.single('profile'), (req, res) => {
//     try {
//         res.send(req.file);
//     } catch (error) {
//         res.send(400);
//     }
// });

//for uploading bulk files 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploadedFiles');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// max limit can be set here 4 ,if no limit remove 4 
app.post('/bulk', upload.array('profiles', 4), (req, res) => {
    try {
        res.send(req.files);
    } catch (error) {
        console.log(error);
        res.send(400);
    }
});

app.listen(4000, () => {
    console.log('listening to the port:' + port);
});