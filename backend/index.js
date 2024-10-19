const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const port = 4000;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser =require('cookie-parser');
const path = require('path');
const multer = require('multer');
const categoryModel =require("../backend/models/category")
const chefModel =require("../backend/models/chef")
const reviewModel = require('../backend/models/review')
const foodModel = require('../backend/models/food')
const orderModel = require ('../backend/models/order')
const paymentModel =require('../backend/models/payment')
const User = require('../backend/models/user')
const Cart = require('../backend/models/order')
const http = require('http');
const socketIo = require('socket.io');
const razorpay = require("razorpay");
const Razorpay = require('razorpay');
const { log } = require('console');
const userModel = require('../backend/models/user');
require("dotenv").config()
// const stripe = require('stripe')('sk_test_51PHRE5F5USFgoNnq6I1X5UFzOi9YpoL3HNYs7DNNDbNTNXMC90V5bxOwoiHWwAwBRTM2cvXQ66gIW5liDrFb2ya000F28YLXov')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.use(express.urlencoded({extended: false }));


app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
const server = http.createServer(app);

// const io = socketIo(server, {
//   cors: {
//     origin: 'https://food-ordering-app-six-ivory.vercel.app/',
    
    
//    methods: ['GET', 'POST']
//   }
// });



const io = socketIo(server, {
  cors: {
    origin:process.env.REACT_APP_LOCAL_API ,
    
    
   methods: ['GET', 'POST']
  }
});


io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('orderStatusUpdate', (data) => {
    console.log('Order status updated:', data);
    io.emit('orderStatusUpdate', data); // Broadcast to all clients
  });
});

 const url = process.env.MONGODBURL
mongoose.connect(url)
.then(()=>{
    console.log('mongoose is connected');
})
.catch((err)=>{
    console.log(err);
    
})

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpaySecret = process.env.RAZORPAY_SECRET;

// Initialize Razorpay instance with key ID and secret
const razorpayInstance = new razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpaySecret
});

/////////////////LOGIN///////////

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
 
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
 
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); // Use await to ensure user is saved
    res.send('User registered successfully');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

////////////// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.findOne({ email });
 
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
 
      if (isPasswordValid) {
        const userResponse = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id
        };
        res.json(userResponse);
      } else {
        return res.status(400).json({ error: 'Incorrect password' });
      }
    } else {
      return res.status(400).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// app.get('/user/:id', async (req, res) => {
//   const userId = req.params.id;

//   try {
  
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const userData = {
//       name: user.name,
//       email: user.email
//     };

//     res.json(userData);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


  ////////////////////Category/////////////////////////////////////////////

  app.get('/categoryName', async (req, res) => {
    try {
      const categories = await categoryModel.find({}, 'category'); 
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/category', upload.single('image'), async (req, res) => {
    try {
      const { name,category } = req.body;
      const imagePath = req.file.path;
      const newCategory = await categoryModel.create({
        name,
        
        image: `/images/${path.basename(imagePath)}`, 
        category
      });
  
      res.status(201).json({ category: newCategory });
      console.log(newCategory);
  
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log(err);
    }
  });

  app.get('/getCategory', async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.json({ categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.delete("/deleteCategory/:id", (req, res) => {
    const { id } = req.params;
    categoryModel.findByIdAndDelete({ _id: id })
      .then((de) => {
        console.log(de);
        res.json(de)
      })
      .catch((err) => {
        console.log(err);
      })
  })

  app.get("/getProductCategory/:id", async (req, res) => {
    const { id } = req.params;
    await categoryModel.findById(id) 
      .then((category) => {
        res.json(category);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });

  app.put("/updateCategory/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name,category } = req.body;
    let image = req.file ? `/images/${req.file.filename}` : null; 
    try {
      const updatedCategory = await categoryModel.findByIdAndUpdate(id, { category, name, image }, { new: true });
      res.json(updatedCategory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// ////////////////////////////////CHEF/////////////////////////
app.get('/chefName', async (req, res) => {
  try {
    const chefs = await chefModel.find({}, 'chef'); 
    res.json(chefs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/chef', upload.single('image'), async (req, res) => {
  try {
    const {chefname ,description} = req.body;
    const imagePath = req.file.path;
    const newChef = await chefModel.create({
      chefname,
      
      image: `/images/${path.basename(imagePath)}`, 
      description
    });

    res.status(201).json({ chef: newChef });
    console.log(newChef);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

app.get('/getChef', async (req, res) => {
  try {
    const chefs = await chefModel.find();
    res.json({ chefs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteChef/:id", (req, res) => {
  const { id } = req.params;
  chefModel.findByIdAndDelete({ _id: id })
    .then((de) => {
      console.log(de);
      res.json(de)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get("/getUserChef/:id", async (req, res) => {
  const { id } = req.params;
  await chefModel.findById(id) 
    .then((chef) => {
      res.json(chef);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/updateChef/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { chefname,description } = req.body;
  let image = req.file ? `/images/${req.file.filename}` : null; // Update the image path if a new image is uploaded
  try {
    const updatedChef = await chefModel.findByIdAndUpdate(id, { chefname,image,description }, { new: true });
    res.json(updatedChef);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
////////////////////////////FOOD////////////////////////////////

app.get('/foodName', async (req, res) => {
  try {
    
    const foods = await foodModel.find({}, 'foodname'); // Retrieve only the department field
    console.log("Foods fetched:", foods); // Log the fetched foods
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/food', upload.single('image'), async (req, res) => {
  try {
    const { foodname,description,price,category,availability} = req.body;
    const imagePath = req.file.path;
    const newFood = await foodModel.create({
      foodname,
      description,
      image: `/images/${path.basename(imagePath)}`, // Save the image path relative to the public/images directory
      price,
      category,
      availability
    });

    res.status(201).json({ food: newFood });
    console.log(newFood);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

app.get('/getFood', async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ foods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deleteFood/:id", (req, res) => {
  const { id } = req.params;
  foodModel.findByIdAndDelete({ _id: id })
    .then((de) => {
      console.log(de);
      res.json(de)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get("/getUserFood/:id", async (req, res) => {
  const { id } = req.params;
  await foodModel.findById(id) // Assuming Department is your Mongoose model
    .then((food) => {
      res.json(food);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.put("/updateFood/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { foodname,description,price,category,availability } = req.body;
  let image = req.file ? `/images/${req.file.filename}` : null; // Update the image path if a new image is uploaded
  try {
    const updatedFood = await foodModel.findByIdAndUpdate(id, { foodname,description, image,price,category,availability }, { new: true });
    res.json(updatedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///////////////////////////////REVIEW/////////////////////////////
app.get('/reviewName', async (req, res) => {
  try {
    const reviews = await reviewModel.find({}, 'review'); // Retrieve only the department field
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/review', upload.single('image'), async (req, res) => {
  try {
    const {customer ,description} = req.body;
    const imagePath = req.file.path;
    const newCustomer = await reviewModel.create({
      customer,
      
      image: `/images/${path.basename(imagePath)}`, 
      description
    });

    res.status(201).json({ customer : newCustomer });
    console.log(newCustomer);

  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

app.get('/getReview', async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//////////////////Payment//////////////////
app.post('/payment', async (req, res) => {
  try {
    const { name, address, total, place } = req.body;
    const newPayment = await paymentModel.create({
      name,
      address,
      total,
      place,
    });

    res.status(201).json({ payment: newPayment });
    console.log(newPayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});


app.get('/paymentdetails',async(req,res)=>{
  try{
    const payments = await paymentModel.find()
    res.json({payments});
  } catch (error){
    res.status(500).json({ error: error.message });
  }
})

////////////////ORDERS ADMIN/USER////////////////

app.get('/getOrderHistory/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json(user.userCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.get('/user/:id', async (req, res) => {
//   try {
//       const user = await userModel.findById(req.params.id);
//       res.json(user);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });
app.get('/user/:id', async (req, res) => {
  try {
      const user = await userModel.findById(req.params.id);
      if (user) {
          res.json({
              name: user.name,
              userCollection: user.userCollection,
              cart: user.cart
          });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});




  

  app.post('/addToCart/:id', async (req, res) => {
    try {
        const { userId, foodname, image, category, description, price } = req.body;
        const cartItem = new Cart({ userId, foodname, image, category, description, price });
        await cartItem.save();

        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.userCollection.push(req.body);
        await user.save();
        res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
});






app.delete('/removeFromCart/:id/:itemId', async (req, res) => {
  try {
  const userId = req.params.id;
  const itemId = req.params.itemId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.userCollection.findIndex(item => item._id == itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    user.userCollection.splice(itemIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
});


   


app.get('/cartData/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate('cart.cartId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ cartItems: user.userCollection, userName: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



//////Admin Order SIde//////////
const Order = mongoose.model('Order', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  status: String
}));

app.get('/orderHistory', async (req, res) => {
  try {
    const orderHistory = await Order.find().populate('userId').populate('foodId');
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/updateOrderStatus/:userId', async (req, res) => {
  const { userId } = req.params;
  const { foodId, status } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orderIndex = user.userCollection.findIndex(order => order._id.toString() === foodId);
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    user.userCollection[orderIndex].status = status;
    await user.save();

    io.emit('orderStatusUpdate', { userId, foodId, status });

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('orderStatusUpdate', (data) => {
    io.to(data.userId).emit('statusUpdate', data);
  });
});


///////////////////////////////////////////////////////
app.post('/orderPay', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency,
      receipt,
    };
    const order = await razorpayInstance.orders.create(options);
    if (!order) {
      return res.status(500).send('Error creating order');
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// /////////////////////

// Example using Express.js
app.post('/cancelOrder/:userId/:foodId', async (req, res) => {
  const { userId, foodId } = req.params;
  try {
    console.log(`Attempting to cancel order for userId: ${userId}, foodId: ${foodId}`);
    const order = await Order.findOneAndUpdate(
      { userId, _id: foodId },
      { status: 'Cancelled' },
      { new: true }
    );
    if (order) {
      res.status(200).json({ message: 'Order cancelled successfully', order });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ error: 'Error cancelling order' });
  }
});





server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});





