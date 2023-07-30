const router = require('express').Router();
const QuoteModel = require('../models/quoteList.model');
const post = require('../post');




// insert
router.route('/dataEverytime').post(async (req,res) => {
 
  const status = req.body.card;

  var newActivity;
  var temp;
  for (var i = post.length - 1; i > 0; i--) 
  {
  var j = Math.floor(Math.random() * (i + 1));
  temp = post[i];
  post[i] = post[j];
  post[j] = temp;
  }

  await QuoteModel.find().deleteMany({});

  if(status)
  {
   
    let randomIndex = Math.floor(Math.random() * (post.length - 1));
  post.push(post[randomIndex]);
  }

  

  for(var i=0;i<post.length;i++)
{

// create a new Activity object
 newActivity = new QuoteModel({
  quote : post[i].quote,
  source: post[i].source,
  citation:post[i].citation,
  image : post[i].image,
  year:post[i].year
});

// save the new object (newActivity)
await newActivity.save();
}
  
  QuoteModel.find()
    .then((activities) => res.json(activities))
    .catch((err) => res.status(400).json('Error: '+err));
   
  });




// delete by Id
router.route('/delete/:id').delete(async (req, res) => {
  console.log('delete logged');
  
await QuoteModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Activity deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));    
});



// search
router.route('/search').post( async (req,res) => {
  let name = req.body.authorName;
  let response = false;
QuoteModel.find().then((quotes) => {
  for(var i=0;i<quotes.length; i++)
  {

   if(quotes[i].source == name)
   { 
    console.log(" AuthorName found Matched :"+quotes[i].source);
    response = true;  
     break;
   }
 
  }
  res.send(response);
  
})


});



// update
router.route('/update/:id').post(async (req, res) => {
  console.log(req.params.id);
await  QuoteModel.findById(req.params.id)
    .then((activityforedit) => {
      activityforedit.activity = req.body.activity;
      activityforedit
        .save()
        .then(() => res.json('Activity updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});




module.exports = router;
