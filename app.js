// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');
const http = require('http');

//Print Error Messages
function printError(error){
  console.error(error.message);
}


//Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
    //connect to API URL(https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (response) => {
      if (response.statusCode === 200) {
        // Read the data
        let body = "";
        response.on('data', (data) => {
          body += data.toString();
        });

        response.on('end', () => {
          try{
            // Parse the data
            const profile = JSON.parse(body);
            // Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch(error){
            printError(error);
          }
        });
      } else {
          const message =`There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
      }
    }).on('error', printError);
  } catch (error) {
    printError(error);
  }
}



const users = process.argv.slice(2);
  users.forEach(username => {
    getProfile(username);
  });
//could also just be users.forEach(getProfile);
