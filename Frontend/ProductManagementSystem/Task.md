Job interview
Requirements
Machine requirements:
Git - github
Node - web application.
Docker - DB - postgresql.
Angular - Application.
.net - Server.

GCP - Google Cloud Platform.

Webstorm - web.
Rider - .net

Links
AI:
https://www.phind.com/agent?home=true
https://chat.openai.com/
https://bard.google.com/chat

DB
https://supabase.com/

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

UI
BL
DAL,DAL2
DB , DB2

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
