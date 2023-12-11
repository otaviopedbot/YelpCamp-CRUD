const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6570b0b9c2fa89ae88e61c60',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora blanditiis magnam similique officiis laborum architecto dicta doloribus aspernatur dolorum ipsam, ut perferendis iste. Mollitia, rerum nemo nulla vel neque blanditiis.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/de1f3tu2z/image/upload/v1701979489/YelpCamp/un17scltgyjid3wvjwpk.jpg',
                  filename: 'YelpCamp/un17scltgyjid3wvjwpk',
                },
                {
                  url: 'https://res.cloudinary.com/de1f3tu2z/image/upload/v1701979490/YelpCamp/vmhzqj3mjzc3sji5qwqn.jpg',
                  filename: 'YelpCamp/vmhzqj3mjzc3sji5qwqn',
                },
                {
                  url: 'https://res.cloudinary.com/de1f3tu2z/image/upload/v1701979491/YelpCamp/unhpbjs7sjjlfr2rd4aa.jpg',
                  filename: 'YelpCamp/unhpbjs7sjjlfr2rd4aa',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})