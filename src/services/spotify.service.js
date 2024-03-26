
// JUST WROTE THIS HERE, NEEDS WORK
async function getProfile() {
    const accessToken = getAccessToken();
  
    if (!accessToken) {
      console.error('Access token not found');
      return;
    }
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
  
      const data = await response.json();
      console.log(data); // Process the profile data as needed
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
  