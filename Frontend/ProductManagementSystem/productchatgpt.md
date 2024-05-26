As the first step of the project-product management system let's concentrate on the frontend part. Please write in Angular the next:
Write a simple product management system.
The system should support more than 2 different users and their products.
The products should be saved in the database for each user.
Any user can create a new product or edit an existing product that belongs to him.

Screens
Login page.
Register page.
Main page.
Products.
Create.
Edit.

Interfaces:
User:
Uid: striog (PK)
Email:string(Unique);
FirstName: string;
LastName: string;
Phone:string;
Password: string(hash);
CreateDate: Date;
LastConnection:Date;
Address:string(Optional);


Price
Amount:string;
Currency:string;

Size
Height:int;
Width:int;
Weight:int;
Measurement:string;

Product
Pid:string;
Name:string;
Price:Price;
Size:Size;

Very important:
**The first screen is the Login page.                                                                
**If the user doesn't has account, the user click on Register and move to the Register Page.                                                                                                                  **On succesfuly login the user move to the Main page- in the Main page the user see all his products.                                                                                 
**There is a "Create" click to create new product.
**Every product get a square, and an option to edit this current product.

notice: I have an app.config.ts instead of app.module.ts and app.routes.ts instead of app-routing.module.ts