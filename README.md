# Photo Map Backend

This is the **AdonisJS v6 backend** for the PhotoMap application. It provides a REST API for user authentication, uploading geotagged photos, viewing photos on a map, and adding comments.  

## Features
- User authentication using JWT (login / register)
- Upload geotagged photos (with EXIF GPS coordinates)
- Store photos locally in development, S3 in production
- Retrieve photos with user info and comments
- Add comments to photos

## Tech Stack
- AdonisJS v6
- PostgreSQL
- JWT Authentication

## Setup

```bash
npm install
cp .env.example .env
node ace migration:run
npm run dev
