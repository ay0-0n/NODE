const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const e = require('express');
const app = express();
const port = process.env.PORT || 3000;


//middleware
app.use(cors({
    origin: ['http://localhost:5173','https://node-93afa.web.app','https://node-93afa.firebaseapp.com'],
    credentials: true
}
));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
        req.user = user;
        next();
    });
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b6ckjyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const cokkieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"? true: false,
    sameSite: process.env.NODE_ENV === "production"? "none":"strict"
}
async function run() {
    try {
  
    const UserCollection = client.db("node").collection("users");
    const BlogCollection = client.db("node").collection("blogs");
    const WishlistCollection = client.db("node").collection("wishlist");
    const CommentCollection = client.db("node").collection("comments");

    app.post('/users', async (req, res) => {
        const newUser = req.body;
        cursor = await UserCollection.find({ email: newUser.email }).toArray();
        if (cursor.length == 0) {
            const result = await UserCollection.insertOne(newUser);
            res.send(result);
        }
    });

    app.post('/add-blog', async (req, res) => {
        const newBlog = req.body
        const result = await BlogCollection.insertOne(newBlog);
        res.send(result);
    });

    app.get('/blogs', async (req, res) => {
        const result = await BlogCollection.find({}).toArray();
        res.send(result);
    });
    
    app.get('/user/:email', async (req, res) => {
        const email = req.params.email;
        const result = await UserCollection.findOne({ "email" : email });
        res.send(result);
    });
    
    app.post('/wishlist/:blogID/:email', async (req, res) => {
        const blogId = req.params.blogID;
        const email = req.params.email;

        try {
            const existingUser = await WishlistCollection.findOne({ email: email });
    
            if (!existingUser) {
                await WishlistCollection.insertOne({ email: email, wishlist: [blogId] });
            } else {
                await WishlistCollection.updateOne({ email: email }, { $addToSet: { wishlist: blogId } });
            }
            res.status(200).send('Added to wishlist successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

    app.patch('/wishlist/:blogID/:email', async (req, res) => {
        const blogId = req.params.blogID;
        const email = req.params.email;

        try {
            await WishlistCollection.updateOne(
                { email: email },
                { $pull: { wishlist: blogId } }
            );
            res.status(200).send('Removed from wishlist successfully');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });

    app.get('/wishlist/:email',verifyToken, async (req, res) => {
        const email = req.params.email;
        if (req.user.email !== email) {
            return res.status(401).send('Unauthorized');
        }
        const userWishlist = await WishlistCollection.findOne({ email : email });
        
        const blogs = userWishlist?.wishlist
        
        res.send(blogs); 
    });
    
    app.get('/blogs/:id', async (req, res) => {
        try {
            const id = (req.params.id).trim();
            const blog = await BlogCollection.findOne({ _id: new ObjectId(id) });
            
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
    
            res.send(blog);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.patch('/update-blog/:id', async (req, res) => {
        const id = req.params.id;
        const updatedBlog = req.body;
        const result = await BlogCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedBlog });
        res.send(result);
    });

    app.post('/add-comment', async (req, res) => {
        const newComment = req.body;
        const result = await CommentCollection.insertOne(newComment);
        res.send(result);
    })

    app.get('/comments/:blogID', async (req, res) => {
        const blogID = req.params.blogID;
        try {
            const comments = await CommentCollection.find({ blogId: blogID }).toArray();
            res.send(comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).send({ error: 'Failed to fetch comments' });
        }
    });
    app.get('/allblogs', async (req, res) => {
        try {
            let query = {};
            if (req.query.category) {
                query.category = req.query.category;
            }
            if (req.query.search) {
                query.title = { $regex: new RegExp(req.query.search, 'i') };
            }
            const blogs = await BlogCollection.find(query).toArray();
            res.json(blogs);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });


    
    

    app.post('/jwt', async (req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, cokkieOptions);
        res.send('Token sent');
    })

    app.post('/logout', async (req, res) => {
        res.clearCookie('token',{...cokkieOptions, maxAge: 0}).send({success: true});
    });

        
    

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello NODE!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});