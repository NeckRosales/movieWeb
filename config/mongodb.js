const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URI = 'mongodb+srv://nvivas:O7bcz5Yt6O30ykon@cluster0.c932ki4.mongodb.net/?retryWrites=true&w=majority'
    try {
        mongoose.connect(
            DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log("*** conexion a la base de datos exitosa ***");
        });
    } catch (err) {
        console.log("error: ", err);
    }
};

module.exports = dbConnect;