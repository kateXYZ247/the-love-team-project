# The Love Team Web Application Fontend

## IDE setup

- Install Prettier plugin, enable Settings &rarr; Languages & Frameworks &rarr; JavaScript &rarr; Prettier:
    1. select Prettier package
    1. check "On code reformat"
    1. check "On save"
- Settings &rarr; Other Settings &rarr; Save Actions:
    1. check "Activate save actions on save"
    1. check "Reformat file"

## Usage

Install with `npm install`.

In the project directory, you can run `npm start` and Open [http://localhost:3000](http://localhost:3000) to view it in
the browser.

## Deploy to AWS EC2

1. `git clone repo` to EC2
1. modify environment variable `REACT_APP_BACKEND_SERVER` in EC2/Dockerfile.prod to reflect backend server address (
   including port)
1. `sudo docker build -f Dockerfile.prod -t tlt-frontend:dev .`
1. `sudo docker run -d -p 80:80 tlt-frontend:dev`
1. open `http://YOUR_EC2_ADDRESS/` in web browser