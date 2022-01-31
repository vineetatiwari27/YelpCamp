const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
  console.log('mongo connected')
}
const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i =0;i<300;i++ ){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
       const camp= new Campground({
           author:'61f44fe8350efdfbec904cc0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        price,
        geometry: {
          type: "Point",
          coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
          ]
      },
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum aut minima non, error doloribus, suscipit iusto exercitationem recusandae explicabo vel repellat at esse doloremque eveniet provident quaerat quas quod a. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos quaerat ad, provident impedit culpa nemo. Ea at quos architecto eveniet iste officia quo quisquam iusto incidunt vitae? Distinctio, eius ipsum?',
        images: [
          {
            url: 'https://res.cloudinary.com/djaeewrlp/image/upload/v1643646717/yelpCamp/qtpzt7pkkg62bid3uov7.jpg',
            filename: 'yelpCamp/qtpzt7pkkg62bid3uov7',
           
          },
          {
            url: 'https://res.cloudinary.com/djaeewrlp/image/upload/v1643646720/yelpCamp/ezdeyh7y6lba85fdk41j.jpg',
            filename: 'yelpCamp/ezdeyh7y6lba85fdk41j',
           
          }
        ]
        
       
    })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})