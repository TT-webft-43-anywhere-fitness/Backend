# Backend

# Users
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| username | string | yes | yes | username |
| password | string | yes | no | password |
| role | integer | yes | no | role |

# Classes
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | primary |
| name | string | yes | no | |
| type | string | yes | no | |
| start_time | time | yes | no | |
| end_time | time | yes | no | |
| intensity | integer | yes | no | |
| location | string | yes | no | |
| enrolled | integer | yes | no | |
| max_size | integer | yes | no | |
| instructor_id | foreign | yes | no | |

# Atendees_by_Class
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | primary |
| user_id | integer | yes | no | foreign |
| class_id | integer | yes | no | foreign |

# Auth Endpoints 
| Request | URL | Description | Returns |
| ------- | --- | ----------- | ------- |
| POST | api/auth/register | post a new user| the new user Obj with the id |
| POST | api/auth/login | login an existing user | Obj with role, id, message, and token |

# User Endpoints
| Request | URL | Description | Returns |
| ------- | --- | ----------- | ------- |
| GET | api/users | gets a list of all users | array of all user objs |
| GET | api/users/:id | gets user with specified ID | user Obj |
| GET | api/users/:id/classes | gets all classes in which the user is the instructor | array of class Objs |
| DELETE | api/users/:id | deletes usr with specified ID | number of deleted objects |

# Classes Endpoints
| Request | URL | Description | Returns | Pending |
| ------- | --- | ----------- | ------- | ------- |
| POST | api/classes/ | post a new class| the new class Obj | |
| POST | api/classes/:id/attendees | post a new attendee to a specified class | array with attendies | * |
| GET | api/classes/ | gets all classes | array of all classes | |
| GET | api/classes/:id | gets the class with a specified ID | Obj with Class | |
| GET | api/classes/:id/attendees | gets all attendees for the class with a specified ID | array with attendies | * |
| PUT | api/classes/:id | updates class with specified ID | new Class Obj | |
| PUT | api/classes/:id/attendees | updates attendees for class with specified ID | new Class Obj | * |
| DELETE | api/classes/:id | deletes a class with specified ID | number of deleted objects | |






