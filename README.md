# URL SHORTNER APP
## Setup guide

URL shortner is an application which can be used to transform long URLs into short URLs.
Please make sure docker is installed on your system.

- Clone the repository
- cd into the root folder
- Create a docker image. RUN `docker build -t url-shortner`
- Check if the image has been created. RUN `docker images`
- RUN container for the above created image `docker run -d -p 8000:8000 url-shortner`
- ✨Magic ✨
- Your application is runnning on port 8000.
- Go to POSTMAN or any other API testing tool and hit the following url to start using the API.

```sh
METHOD: POST
URL: http://localhost:8000/short-url
BODY: {
	"longUrl": "http://localhost:8000/this-is-a-long-url"
}
```

You should be able to get a reponse similar to the one below.

```sh
{
    "statusCode": 200,
    "data": {
        "url": "https://localhost/s0iopp5jdv"
    }
}
```