import axios from 'axios';

axios.get('/api.php')
  .then(response => {
    // Process the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });