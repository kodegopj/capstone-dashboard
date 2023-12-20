import mongoose from 'mongoose';

export default function connectToDB(url) {
    mongoose.connect(url).then((res) => console.log("Connected to DB"))
}

