var express = require('express');
var router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//Added to favorites
router.put('/add/:uId', asyncHandler(async(req,res) => {
    const {uId} = req.params;

    const data = {
        // $set: {'favorites': req.body._id },
        $push: { favorites: req.body._id },
    }

    const user = await User.findById(uId)
    .then(user => {
        if(user){
            const alreadyAdded = user.favorites.find(u => u.toString() === req.body._id.toString())
            if(alreadyAdded){
                res.status(400).send({msg:"Already added as favorite!"}) 
            }else{
            User.findOneAndUpdate({ _id: uId },
              data,
                 { new:true},
                function(err, doc){
                    if (err){
                      console.log(err);
                      return res.send({
                        success: false,
                        message: 'Error somewhere!'
                      });
                    }
                    return res.send({
                      success: true,
                      usersFavorite: doc,
                      favoriteCourse:doc.favorites,
                      message: 'Added!'

                    });
                  });
                }

        }else{
            res.json({msg:"Already added!"})
        }
    })

    //  2. The 2nd method, doing the same action as the 1st one,
    //  excpet this one is a POST request

    // const user = await User.findById(cId);
    // if(user){
    //     const alreadyAdded = users.favorites.find(u => u.toString() === req.body._id.toString())
    //     if(alreadyAdded) {
    //         res.status(400)
    //         throw new Error("Already added to favorites")
    //     }

    //     let favorite = true;
    //     user.favorite = favorite;
    //     user.favorites.push(req.body._id);
    //     console.log('ccccdd ' + course.favorite);
    //     const favorites = await course.save();
    //     res.status(201).json({message:"User added Successfully!",
    //                           favorites: favorites})
    // }else{
    //     res.status(404)
    //     throw new Error("Course not found")
    //    }

}))

//Remove from favorites
router.put('/remove/:uId', async (req, res) => {
	const { uId } = req.params;

	const data = {
		$pull: { favorites: req.body._id },
	};

	const user = await User.findById(uId).then((user) => {
		const foundId = user.favorites.find((u) => u.toString() === req.body._id.toString());
		if (user && foundId) {
			User.findOneAndUpdate({ _id: uId }, data, { new: true }, function (err, doc) {
				if (err) {
					console.log(err);
					return res.send({
						success: false,
						message: 'Error somewhere!',
					});
				}
				return res.send({
					success: true,
					usersFavorite: doc,
					favoriteCourse: doc.favorites,
          message: 'Removed from favorites!',
				});
			});
		} else {
			res.json({ msg: 'Already removed!' });
		}
	});
	console.log('cc ' + user);
	// res.send(course);
});

//Get all user's favorites
router.get('/:uId/getAll', async (req, res) => {
  const {uId} = req.params;

  try{
  const user = await User.findById(uId);

  res.send({
    mesage: 'User favorites',
    userFavorites: user.favorites
  })
  }catch (err) {
    console.log({
      error: err
    })
  }

})


module.exports = router;
