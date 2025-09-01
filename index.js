const express = require('express');
const path = require('path');
const multer = require('multer');

// const upload = multer({ dest: 'uploads/' })

const app = express();
PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/')
})

app.get('/', (req, res) => {
    return res.render("homepage");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});