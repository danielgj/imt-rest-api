# IMT REST API

This Express + Moongose REST API has been developed as a Capstone Project for Coursera's Full Stack Development Certification Track.

It works in conjuction with a [Web Interface](https://github.com/danielgj/imt-web-interface) and an [Ionic mobile app](https://github.com/danielgj/imt-ionic-app).


## Functionallity

* Every mobile app development company handles many devices for development and testing purposes.
* When development teams grow, managing which devices are in used and who has loan a particular device gets more and more difficult.
* Inventory Management Tool (IMT) will allow inventory and loans management giving real time information on which devices are free or in use and will support searching for available devices based on its characteristics.
* IMT will implement a workflow for the loan process that determine the approvals needed to request or to finish a loan of one particular item.

## Setting Up & Running

For this to run, Mongo DB URL should been configured in config/config.js file.

To run it just run `node app` on any Node.js environment.

###API Specification
* [Endpoints](APIv1.md.md#endpoints)
* [Authentication](APIv1.md.md#authentication)
* [Verbs](APIv1.md.md#verbs)
* [Http Response Codes](APIv1.md#http-response-codes)
* [Resources](APIv1.md.md#resources)


###Endpoints

https://server_ip_address:server_port/api/v1/


###Authentication

Following methods are related to user authentication
  

| Method | Http Verb | Parameters Type |Parameters|Response Format| Response|
| ------------ | ------------- | ------------ |--------|-----|-----|
| /users/login | POST  | JSON |`{ 'username': 'user_name_value', 'password': 'password_value' }`|`{ 'status': 'request status message', 'success': [true,false], 'id_user': id_user_value_if_success, 'name': user_name_value, 'role': user_role_value, 'email' : user_email_value, 'token': authorization_token }`|HTTP Response Code (200,401,500)|
| /users/register | POST  | JSON |`{"username": username_value, "password": password_value, "firstname": firstname_value, "lastname": lastname_value,"email": user_email, "role": user_role}`|`{ 'id_usuario': 'valor_id', 'rol': 'valor_rol', 'email' : 'valor_email', 'username': 'valor_username', 'token': 'valor_token' }`|HTTP Response Code (200, 500)|

Login and Register methods will be the only ones witout authentication. For the rest of the API's methods, token-based authentication will be used.

	

###Verbs

|HTTP Verb|	Action (typical usage)|
|---------|----------------------|
|GET|	Retrieves a representation of a resource without side-effects (nothing changes on the server).|
|POST| Creates a resource.|
| PUT |	Modifies a resource.|
|DELETE| Deletes a resource.|

###HTTP Response Codes


| Code | Message | Description |
| ------------ | ------------- | ------------ |
|200 | OK | The GET request was successful, the resource(s) itself is returned as JSON |
|201 | OK | The PUT or POST request was successful, the resource(s) itself is returned as JSON |
|400| Bad Request|  A required attribute of the API request is missing, e.g. the title of an issue is not given
|401| Unauthorized|  The user is not authenticated, a valid user token is necessary, see above
|403| Forbidden|  The request is not allowed, e.g. the user is not allowed to delete a project
|404| Not Found|  A resource could not be accessed, e.g. an ID for a resource could not be found
|405| Method Not Allowed|  The request is not supported
|449| Expired Token|  The refresh token is expired
|500| Server Error|  While handling the request something went wrong on the server side

###Resources

| Resource | HTTP Verbs | Description |   
| ------------ | ------------- | ------------ |
| /users | GET, POST, PUT, DELETE | Users with access to the app| 
| /brand | GET, POST, PUT, DELETE | List of device brands | 
| /brand/:idBrand | GET, POST, PUT, DELETE | Specific device brand |
| /category | GET, POST, PUT, DELETE | List of device categories | 
| /category/:idCategory | GET, POST, PUT, DELETE | Specific device category |
| /item | GET, POST, PUT, DELETE | List of devices |
| /item/:idItem | GET, POST, PUT, DELETE | Specific device |
| /loan | GET, POST, DELETE | List of loan request | 
| /loan/:idLoan | GET, POST, PUT, DELETE | Specific loan |
| /loan/open | GET | List of open loans |
