import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    console.log("test test");
    
      res.json(null);
});

export default router;