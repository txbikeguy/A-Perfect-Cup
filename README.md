# GroupProject1

As of Wed, Jan. 10, 2018

-project title-
"Find Me A Cup" ???

-team members-
Emren
Tonye
Kadiro
Ben

-project description-
Helps you find coffee shops near where you are and then gives you information pulled from multiple 
review sites. Also shows a map of shops in the nearby area. 

-sketch of final product-

-APIs to be used-
google maps
yelp
open weather maps

-rough breakdown of tasks-
tonye - html and framework layout
ben - basic api calls
emren - firebase
kadiro - framework research

--January 13, 2018--

Logo/Layout creation - Tonye

HTML/CSS - responsive utilizing Materialize - Emren
	- Various pages (index.html, feedback.html, about.html)
	- Main colors: 
	  - Brown: #6b2504
	  - Light Brown: #e1d3cd
	  - Teal: #00a098
	  - Dark Teal: #00605b
	- Fonts:
	  - Roboto
	  - Rouge Script

Search form 
 - Creation - Tonye
 - Connection to firebase - Emren

Feeback form creation, validation and connect to firebase - Kadiro

Content creation for the About page - Emren

Connecting the Google and Yelp APIs
 - Google API - Ben
 - Yelp API - Tonye

Integrating AJAX - Ben/Tonye

Modals - error message popup after form validation (https://v4-alpha.getbootstrap.com/components/modal/) - Kadiro

Library or technology
 - Font Awesome for icons (http://fontawesome.io/icons/)
 - Foundation/Abide for form validation (https://foundation.zurb.com/sites/docs/abide.html)
 - Semantic UI for multi select in dropdown (https://semantic-ui.com/modules/dropdown.html)

CSS framework - Materialize (http://materializecss.com/)

Repeating elements
 - Results
 	- Business Name - pulled from Google
 	- Miles away from location - pulled from Google
 	- Hours of operation - pulled from Google
 	- Rating - pulled from Yelp
 	- Amenities available - pulle from Yelp
 	  - Open Now
 	  - Outdoor seating
 	  - Good for groups
 	  - Wheelchair Accessible
 	  - Alcohol
 	  - Food available
 	  - Parking
 	  - WiFi
 	- Reviews - linked out to Google & Yelp reviews

Show/hide of the reslts - jQuery Toggle - Tonye