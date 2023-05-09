# CS-546-ShareSpace
Share Space - One Stop to All your Storing Solutions <br />
Some Screenshots : <br />
![image](https://github.com/yash9323/sharespace/assets/50073863/cd721b0d-d381-489e-ab35-d42452a31520)
![image](https://github.com/yash9323/sharespace/assets/50073863/168870e2-8e2f-4120-813e-b8e8122c06d8)

<br />
To Run this project :
1.	Open your terminal at this project 
2.	Now “npm i” or “npm install” to install all dependencies
3.	Now run your seed file to run seed use this command “npm run seed”
4.	Now to run the project use command “npm start”

Dummy Users to access Features :<br />
Temp user 1 -<br />
email - yash@sharespace.com<br />
pass - Yash123@<br />

Temp user 2 -<br />
email - rreynolds@sharespace.com<br />
pass- Yash123@<br />

Temp user 3 -<br />
email - johnwick@sharespace.com<br />
pass - Yash123@<br />

Core Features Implemented :<br />

Home Page or Landing combined with all listings page:  <br />
Shows users the ability to view listings that are posted by other users and themselves <br />
Available on get /home but only to authenticated users<br />
Shows Map view(extra feature) and list view to show listings<br />
Displays add banners to display ads (extra feature)<br />
Shows hyperlinks to your bookings, your listings, add listing and logout <br />

User Profile Page :<br />
Divided into sections <br />

Get Your bookings : get /viewbookings ( Shows all the bookings made by you) <br />
Your listings : get  /mylistings (shows all the listings owned by you)<br />
Modify Listing : get /modifylisting/:id (id is listing id) allows you to modify a listing <br />
Delete Listing : post /deletelisting/:id (id is listing id) allows you to delete a listing <br />
View user listing : get /viewlisting/:id (id is listing id) allows you to view the reviews and comments on that listing<br />
Post details :<br />
View listings page allows you to view your listing and reserve it so that you can use it<br />
Get /vlisting/:id - shows you the listing details <br />

Extra Functionality :
  1. Allows you to book a listing 
  2. Allows you to leave comments for a listing 
  3. Map view shows the listings around you on map
  4. Adbanners shows ads if linked to external ad platform like adsense 
  5. Adding a listing 

Endpoints Summary :<br />
Get : <br />
![image](https://github.com/yash9323/sharespace/assets/50073863/909b2d12-3528-4629-ae4f-43bb2bd20917)
<br />
Post : <br />
![image](https://github.com/yash9323/sharespace/assets/50073863/4c0b5e7f-dd10-45ae-a3e4-4246e92c7e86)
