import express from 'express';
import { dirname } from 'path'; //gives the path of the directory
import { fileURLToPath } from 'url'; //gives the path of the file in the directory
import multer from 'multer';
const port = 3000;
const upload = multer({ dest: 'uploads/' }); //specify  destination to store files when we upload.
const app = express();

const __dirname = dirname(fileURLToPath(
    import.meta.url));
console.log(__dirname);

app.use(express.static("uploads")); //to display images.

app.get('/', (req, res) => res.sendFile("./views/index.html", { root: __dirname }));

app.post("/upload-profile-pic", upload.single('profile_pic'), (req, res) => {
    console.log(req.file);
    if (!req.file) return res.send('PLEASE UPLOAD SOMETHING');
    console.log(req.file);
    res.send(
        `<h2>Here is the picture:</h2><img src="${req.file.filename}" alt="something" width='500px'/>`
    );
});
//single multer seraches for the filename
//single multer looks like const single=(name)=>return function(req,res,next){};It returns again a function.

app.listen(port, () => console.log(`Server is running on ${port}`));