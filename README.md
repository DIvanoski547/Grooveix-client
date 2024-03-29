# Grooveix

Grooveix is a music blog where you can see new album releases, current popular artists, view multpile music albums and review them. For future approach, this web app is meant to be a music album e-commerce.

## Description

- **Starter page**   as a non authenticated user you get to this page to either sign up or login if already a user on the page
- **Sign up**   for new users to create their user account
- **Log in**   for existing users to authenticate themselves
- **Log Out**   as an authenticated user you can logout and delete your token and go back to starter page
- **Add Album**   as an authenticated admin user you can create an album to the database
- **Edit Album**   as an authenticated admin user you can edit an album 
- **Delete album**   as an authenticated admin user you can delete an album 
- **View Album details**   as an authenticated user you can view album details
- **Add Review**   as an authenticated user you can add a review on a specific album
- **View reviews**   as an authenticated user you can see all the reviews for a specific user
- **View users**   as an authenticated admin user you can view a lit of all the users in the app
- **View popular artist**   as an authenticated user you can view a popular artist
- **Profile page**    as an authenticated user you can view your profile page
- **Roles**   admin user and client user, only admin can create/edit/delete albums or view all users on the platform
 
## Backlog

Well as said in the introduction the main idea was an music albums e-commerce, so many things stayed in the backlog:
- Veryfication via email after signing in to 
- Retrieve popular tracks from Spotify API
- Show preview of album's tracks from Spotify API
- Add albums to favourites
- Show favourite albums on profile page
- Add albums to shopping cart
- Complete purchase of items in your order
- Be able to edit or delete your own reviews as a client user
- Search page where you can sear by artist or album title and filter by album genre


# Client
## Routes
- "/" - gets to StarterPage
- "/login" - gets to LoginPage
- "/signup" - gets to SignupPage
- "/homepage" - gets to Homepage
- "/albums" - gets to AlbumsListPage
- "/albums/:albumId" - gets to AlbumDetailsPage
- "/albums/create-album" - gets to AlbumCreatePage
- "/albums/edit/:albumId" - gets to AlbumEditPage
- "/artists/:artistId" - gets to ArtistDetailsPage
- "/all-users" - gets to AllUsersPage

## Components
- AddReview
- AlbumCard
- Footer
- Navbar
- ReviewCard
- UserCard

## Pages
- LoginPage
- ProfilePage
- SignupPage
- AlbumCreatePage
- AlbumDetailsPage
- AlbumEditPage
- AlbumsListPage
- AllUsersPage
- ArtistDetailsPage
- Homepage
- StarterPage

## Middleware
- isAuthenticated
- isAdmin

## Services
### albums service
- uploadAlbumImage
- createAlbum
- getAllAlbums
- getAlbum
- updateAlbum
- deleteAlbum
  
### auth service
- login
- signup
- verify
  
### reviews service
- getReview
- addReview
- updateReview
- deleteReview
  
### users service
- uploadProfileImage
- getUsers
- getProfile
- updateProfile
- viewUser
