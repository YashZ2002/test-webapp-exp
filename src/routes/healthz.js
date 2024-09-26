import express from 'express';
import { checkConnection } from '../config/db.js';
const router = express.Router();



//check for payload 
const checkPayload = (req, res, next) => {
  if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
    return res.status(400).send(); // 400 Bad Request if payload or parameters exist 
  }
  next();
};


// Health check route (GET) with payload check
router.get('/healthz', checkPayload, async (req, res) => {
  const isHealthy = await checkConnection(); // Check if database connection is healthy
  
  if (isHealthy) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(200).send(); // 200 OK if connected to the database
  } else {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(503).send(); // 503 Service Unavailable if connection failed
  }
});




// POST route to add a new name
router.post('/name', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send(); // 400 Bad Request if 'name' is missing
  }
  
});

export default router;

