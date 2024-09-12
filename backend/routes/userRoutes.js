

import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { isAuth, isAdmin, generateToken, baseUrl, mailgun } from '../utils.js';

const userRouter = express.Router();





userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get('/by-gender-pref', expressAsyncHandler(async (req, res) => {
  try {
    const { genderPref = '' } = req.query;
    
    // Validate input
    if (!genderPref) {
      return res.status(400).send({ message: 'Gender preference is required' });
    }

    const validGenders = ['male', 'female']; // Ensure this matches your schema's constraints

    if (!validGenders.includes(genderPref)) {
      return res.status(400).send({ message: 'Invalid gender preference' });
    }

    const filters = { gender_pref: genderPref };
    const users = await User.find(filters);

    res.status(200).send(users);
  } catch (error) {
    console.error('Error fetching users by gender preference:', error);
    res.status(500).send({ message: 'Error fetching users', error: error.message });
  }
}));

userRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      if (user.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      user.reviews.push(review);
      user.numReviews = user.reviews.length;
      user.rating =
        user.reviews.reduce((a, c) => c.rating + a, 0) /
        user.reviews.length;
      const updatedUser = await user.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedUser.reviews[updatedUser.reviews.length - 1],
        numReviews: user.numReviews,
        rating: user.rating,
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);






const PAGE_SIZE = 10;  // Define PAGE_SIZE if not already defined



userRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    try {
      // Extract query parameters with defaults
      const {
        pageSize = PAGE_SIZE,
        page = 1,
        category = '',
        size = '',
        body = '',
        province = '',
        city = '',
        country = '',
        personality = '',
        age = '',
        rating = '',
        order = '',
        query: searchQuery = '',
        genderPref = ''  // New query parameter for gender preference
      } = req.query;

      // Construct the filters based on query parameters
      const filters = {
        gender_pref: genderPref,  // Filter by gender preference
        ...searchQuery && searchQuery !== 'all' ? { name: { $regex: searchQuery, $options: 'i' } } : {},
        ...category && category !== 'all' ? { category } : {},
        ...province && province !== 'all' ? { province } : {},
        ...size && size !== 'all' ? { size } : {},
        ...body && body !== 'all' ? { body } : {},
        ...city && city !== 'all' ? { city } : {},
        ...country && country !== 'all' ? { country } : {},
        ...personality && personality !== 'all' ? { personality } : {},
        ...rating && rating !== 'all' ? { rating: { $gte: Number(rating) } } : {},
        ...age && age !== 'all' ? {
          age: {
            $gte: Number(age.split('-')[0]),
            $lte: Number(age.split('-')[1])
          }
        } : {}
      };

      // Determine sorting order
      const sortOrder = {
        featured: { featured: -1 },
        lowest: { age: 1 },
        highest: { age: -1 },
        toprated: { rating: -1 },
        newest: { createdAt: -1 }
      }[order] || { _id: -1 };

      // Fetch filtered users with sorting and pagination
      const users = await User.find(filters)
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(Number(pageSize));

      // Fetch total count of users
      const countUsers = await User.countDocuments(filters);

      // Aggregation pipeline to get counts for each filter category
      const aggregationPipeline = [
        { $match: filters },
        {
          $facet: {
            categoryCounts: [
              { $group: { _id: '$category', count: { $sum: 1 } } }
            ],
            sizeCounts: [
              { $group: { _id: '$size', count: { $sum: 1 } } }
            ],
            bodyCounts: [
              { $group: { _id: '$body', count: { $sum: 1 } } }
            ],
            provinceCounts: [
              { $group: { _id: '$province', count: { $sum: 1 } } }
            ],
            cityCounts: [
              { $group: { _id: '$city', count: { $sum: 1 } } }
            ],
            countryCounts: [
              { $group: { _id: '$country', count: { $sum: 1 } } }
            ],
            personalityCounts: [
              { $group: { _id: '$personality', count: { $sum: 1 } } }
            ]
          }
        },
        {
          $project: {
            categoryCounts: { $arrayToObject: { $map: { input: "$categoryCounts", as: "item", in: { k: { $toString: "$$item._id" }, v: "$$item.count" } } } },
            sizeCounts: { $arrayToObject: { $map: { input: "$sizeCounts", as: "item", in: { k: { $toString: "$$item._id" }, v: "$$item.count" } } } },
            bodyCounts: { $arrayToObject: { $map: { input: "$bodyCounts", as: "item", in: { k: { $toString: "$$item._id" }, v: "$$item.count" } } } },
            provinceCounts: { $arrayToObject: { $map: { input: "$provinceCounts", as: "item", in: { k: { $toString: "$$item._id" }, v: "$$item.count" } } } },
            cityCounts: { $arrayToObject: { $map: { input: "$cityCounts", as: "item", in: { k: { $toString: "$$item._id" }, v: "$$item.count" } } } },
            countryCounts: { $arrayToObject: { $map: { input: "$countryCounts", as: "item", in: { k: { $toString: "$$item._id" }, v: "$$item.count" } } } },
            personalityCounts: { $arrayToObject: { $map: { input: "$personalityCounts", as: "item", in: { k: { $toString: "$$item._id" }, v: "$$item.count" } } } }
          }
        }
      ];

      // Execute aggregation pipeline
      const [counts] = await User.aggregate(aggregationPipeline);

      // Send response
      res.send({
        users,
        countUsers,
        categoryCounts: counts.categoryCounts || {},
        sizeCounts: counts.sizeCounts || {},
        bodyCounts: counts.bodyCounts || {},
        provinceCounts: counts.provinceCounts || {},
        cityCounts: counts.cityCounts || {},
        countryCounts: counts.countryCounts || {},
        personalityCounts: counts.personalityCounts || {},
        page,
        pages: Math.ceil(countUsers / pageSize),
      });
    } catch (error) {
      // Handle errors
      res.status(500).send({ message: 'Error fetching users', error: error.message });
    }
  })
);





userRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await User.find().distinct('category');
    res.send(categories);
  })
);

userRouter.get(
  '/provinces',
  expressAsyncHandler(async (req, res) => {
    const provinces = await User.find().distinct('province');
    res.send(provinces);
  })
);

userRouter.get(
  '/countries',
  expressAsyncHandler(async (req, res) => {
    const countries = await User.find().distinct('country');
    res.send(countries);
  })
);

userRouter.get(
  '/cities',
  expressAsyncHandler(async (req, res) => {
    const cities = await User.find().distinct('city');
    res.send(cities);
  })
);

userRouter.get(
  '/sizes',
  expressAsyncHandler(async (req, res) => {
    const sizes = await User.find().distinct('size');
    res.send(sizes);
  })
);

userRouter.get(
  '/bodies',
  expressAsyncHandler(async (req, res) => {
    const bodies = await User.find().distinct('body');
    res.send(bodies);
  })
);

userRouter.get(
  '/personalities',
  expressAsyncHandler(async (req, res) => {
    const personalities = await User.find().distinct('personality');
    res.send(personalities);
  })
);








userRouter.get(
    '/:id',
    isAuth,
    
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

userRouter.post( 
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Invalid email or password' });
    })
  );
  
  userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
      const newUser = new User({
        name: req.body.name,
        slug: req.body.slug,
        gender: req.body.gender,
        gender_pref: req.body.gender_pref,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        slug: user.slug,
        gender: user.gender,
        gender_pref: user.gender_pref,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    })
  );

  userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        user.slug = req.body.slug || user.slug;
        user.gender = req.body.gender || user.gender;
        user.gender_pref = req.body.gender_pref || user.gender_pref;
        user.category = req.body.category || user.category;
        user.size = req.body.size || user.size;
        user.body = req.body.body || user.body;
        user.age = req.body.age || user.age;
        user.province = req.body.province || user.province;
        user.city = req.body.city || user.city;
        user.country = req.body.country || user.country;
        user.image_1 = req.body.image_1 || user.image_1;
        user.image_2 = req.body.image_2 || user.image_2;
        user.image_3 = req.body.image_3 || user.image_3;
        user.image_4 = req.body.image_4 || user.image_4;
        user.image_5 = req.body.image_5 || user.image_5;
        user.banner = req.body.banner || user.banner;
        user.image = req.body.image || user.image;
        user.phone = req.body.phone || user.phone;
        user.whatsapp = req.body.whatsapp || user.whatsapp;
        user.instagram = req.body.instagram || user.instagram;
        user.link = req.body.link || user.link;
        user.high_school = req.body.high_school || user.high_school;
        user.primary_school = req.body.primary_school || user.primary_school;
        user.college = req.body.college || user.college;
        user.personality = req.body.personality || user.personality;
        user.mindset = req.body.mindset || user.mindset;
        user.about_me = req.body.about_me || user.about_me;


        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
  
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,

          slug: updatedUser.slug,
        gender: updatedUser.gender,
        gender_pref: updatedUser.gender_pref,
        category: updatedUser.category,
        size: updatedUser.size,
        body: updatedUser.body,
        age: updatedUser.age,
        province: updatedUser.province,
        city: updatedUser.city,
        country: updatedUser.country,
        image_1: updatedUser.image_1,
        image_2: updatedUser.image_2,
        image_3: updatedUser.image_3,
        image_4: updatedUser.image_4,
        image_5: updatedUser.image_5,
        image: updatedUser.image,
        banner: updatedUser.banner,
        phone: updatedUser.phone,
        whatsapp: updatedUser.whatsapp,
        instagram: updatedUser.instagram,
        link: updatedUser.link,
        high_school: updatedUser.high_school,
        primary_school: updatedUser.primary_school,
        college: updatedUser.college,
        personality: updatedUser.personality,
        mindset: updatedUser.mindset,
        about_me: updatedUser.about_me,
       

          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
  );

  userRouter.get('/slug/:slug', async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  });



export default userRouter;
