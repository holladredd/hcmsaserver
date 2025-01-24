# hcmsaserver
Root Endpoints:

GET / - Server status check
GET /api - API status check

Authentication Endpoints:
POST /api/signup - Create new user account
POST /api/login - User authentication
POST /api/refresh-token - Refresh access token

User Endpoints:

GET /api/users - Get all users
GET /api/users/:id - Get specific user
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user


Appointment Endpoints:

GET /api/appointments - Get all appointments
POST /api/appointments - Create new appointment
GET /api/appointments/:id - Get specific appointment
PUT /api/appointments/:id - Update appointment
DELETE /api/appointments/:id - Delete appointment

Post Endpoints:

GET /api/posts - Get all posts
POST /api/posts - Create new post
GET /api/posts/:id - Get specific post
PUT /api/posts/:id - Update post
DELETE /api/posts/:id - Delete post

Facility Endpoints:

GET /api/facilities - Get all facilities
POST /api/facilities - Create new facility
GET /api/facilities/:id - Get specific facility
PUT /api/facilities/:id - Update facility
DELETE /api/facilities/:id - Delete facility

Timeline Endpoints:

GET /api/timeline - Get all timeline events
POST /api/timeline - Create timeline event
GET /api/timeline/:id - Get specific timeline event
PUT /api/timeline/:id - Update timeline event
DELETE /api/timeline/:id - Delete timeline event

Pregnancy AI Tracking Endpoints:

GET /api/pregnancy/analyze/:patientId - Get AI analysis for patient
GET /api/pregnancy/insights/:patientId/:week - Get weekly pregnancy insights
POST /api/pregnancy/update/:patientId - Update pregnancy data

