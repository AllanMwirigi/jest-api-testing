
const axios = require('axios');
require('dotenv').config();

// config defaults for axios
// axios.defaults.baseURL = `${process.env.API_URL}/bins`;
axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const postData = {
  author: 'Izuku Midoriya',
  text: 'United States of Smash was awesome, All Might',
  appropriate: true
};

let postId; // to store the id that will be received when a post is created
// will be used later

describe('API Tests', () => {
  // each test is wrapped inside a describe block so that they can run sequentially
  // describe blocks are executed synchronously while test blocks run asynchronously
  describe('Create Post', () => {
    test('Axios POST post data', async (done) => {
      try {
        const response = await axios.post('/posts', postData);
        const statusCode = response.status;
        postId = response.data.postId;
        expect(statusCode).toBe(201);
        expect(postId).not.toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('Get All Posts', () => {
    test('Axios GET', async (done) => {
      try {
        const response = await axios.get('/posts');
        expect(response.status).toBe(200);
        expect(response.data).not.toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('Get Post By Id', () => {
    test('Axios GET with ID', async (done) => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        expect(response.status).toBe(200);
        expect(response.data).not.toBeNull();
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('Update Post', () => {
    test('Axios PATCH', async (done) => {
      try {
        const data = {
          text: 'United States of Smash was awesome, All Might. Plus Ultra!'
        };
        const response = await axios.patch(`/posts/${postId}`, data);
        expect(response.status).toBe(200);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('Delete Post', () => {
    test('Axios DELETE', async (done) => {
      try {
        const response = await axios.delete(`/posts/${postId}`);
        expect(response.status).toBe(200);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
