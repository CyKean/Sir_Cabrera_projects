const express = require('express')
const bodyParser = require('body-parser');
// const fs = require('fs');
const mongoose = require('mongoose');
const songRoutes = require('./router/songs');
const albumRoutes = require('./router/albumRoute');


const app = express()

mongoose.connect('mongodb://localhost:27017/musicplayer' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('partials'));
app.use('/', songRoutes); 
app.use(albumRoutes);

// const fs = require('fs');
// const path = require('path');
// const Song = require('./models/Song'); // Import your Song model

// // Path to your music folder (adjust the path based on your project structure)
// const musicDir = path.join(__dirname, 'public', 'music');

// // Read songs from the folder
// fs.readdir(musicDir, (err, files) => {
//   if (err) {
//     console.error('Error reading music folder:', err);
//     return;
//   }

//   files.forEach(async (file) => {
//     const filePath = path.join('music', file); // Store relative path

//     // Check if the song already exists in the database to avoid duplicates
//     const existingSong = await Song.findOne({ filePath });
    
//     if (!existingSong) {
//       // Create a new song document and save it to the database
//       const newSong = new Song({
//         title: path.basename(file, path.extname(file)), // Use the file name (without extension) as title
//         artist: 'Unknown Artist', // You can update this later with the actual artist
//         album: null, // No album initially, can be updated later
//         duration: 0, // Set a default duration, or update later
//         filePath: filePath, // Store the relative file path
//       });

//       try {
//         await newSong.save();
//         console.log(`Saved song: ${newSong.title}`);
//       } catch (saveError) {
//         console.error('Error saving song:', saveError);
//       }
//     } else {
//       console.log(`Song already exists: ${existingSong.title}`);
//     }
//   });
// });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})