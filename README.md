# ShareAPI-2.0
Plug and play sharing library

# Requirements
---
- PHP 5.5 +
- Composer (PHP Package Manager)

# Installation
---

### Client

```bash
npm install tb-share-client --save
```

### Server

Download 'server' directory, then run:

```bash
composer install
```

Drag contents of server directory into a publicly accessable directory, and you're good to go!

# Server Setup
---
**IMPORTANT** Rename 'keys.php.template' to 'keys.php'


Open up 'keys.php' in the root directory. This is where you will need to fill in your keys for the social media platforms you will be using. These can be obtained by creating apps in the developer platforms.

Once you're done getting your keys, open up 'config/settings.php'. There are three options here that you need to fill out.

- **domain**:  The fully qualified domain name of where the API exists (index.php). Please leave out any trailing /'s
- **enable_request_limiting**: Set to true if you want to set a max amount of requests per hour
- **max_requests_per_hour**: Max requests per hour. Only relevant is previous is set to true.


# Usage
---
First, require the client side libary

```javascript
import Share from 'tb-share-client'
```

Create a new instance of the class, passing in the following parameters as an object.

**pathToServer**: Same as server setup. FQD of where the API exists. Leave out trailing slash. **REQUIRED**   
**facebookAppId**: Only required if you plan on using the FB intent system. 

```javascript
let share = new Share({
    pathToServer: 'http://share.api',
    facebookAppId: '123456789'
});
```

# Functions
---
All functions have three parameters: params, success, and error. Params are data used for sharing, and success and error are callback functions. The callback functions are not required.

## Facebook

#### postFacebookStatus(params, success, error)

**params**   
message (required) : Text to post as Facebook status

#### postFacebookLink(params, success, error)
**params**    
link (required) : Link to a webpage you wish to share     
message : Text to go along with link

#### postFacebookPhoto(params, success, error)
**params**    
source (required) : Path to photo you wish to share          
message: Text to go along with photo

#### facebookIntent(params)
No OAuth flow is required for this function   
**params**      
picture : Path to image you wish to share       
caption : Text to go inside Facebook post          
link : URL to go to when the post is clicked

## Twitter
#### postTwitterTweet(params, success, error)
**params**      
message (required) : Text to tweet

#### postTwitterPhoto(params, success, error)
**params**     
source (required) : source to photo you wish to share     
message : text to go along with image     

## Tumblr
Tumblr has a little bit of a different flow. See the examples section if you are confused.
#### getTumblrBlogs(callback)
Since Tumblr requires you to send which blog you want to post to, this function **MUST** be called before anything else Tumblr related. When the callback function is called, you will be passed an array of the user's blogs. Use this array for the 'blogName' param in every other request. See examples section for examples.

#### postTumblrText(params, success, error)
**params**     
message (required) : Text to put in post     
blogName (required) : which blog to post to

#### postTumblrPhoto(params, success, error)
**params**     
source (required) : source of photo you wish to share     
blogName (required) : which blog to share to     
caption : caption of photo

# Examples

### Example Tumblr Flow
```javascript
share.getTumblrBlogs(tumblrCallback);

function tumblrCallback(blogs) {
    let selectedBlog = blogs[0]; //Use user's first blog for this example.
    share.postTumblrText({
        message: "TEST POST", blogName: selectedBlog
    }, successCallback);
}

function successCallback() {
    console.log("successfully made post");
}
```



