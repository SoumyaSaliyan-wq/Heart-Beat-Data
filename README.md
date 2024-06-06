# Process Heart Rate Data

# Installation
    - git clone https://github.com/SoumyaSaliyan-wq/caremonitor.git
    - Navigate to the root folder and install npm packages using command  "npm i "
    - Configure .env variables as per the deployment environment [development, production,staging].Please refer the sample 
    env file for more information

# Development
- To run the process locally "npm start".Server will run at "localhost:3011"

# Production
- "pm2 start server.js --name=app" - To start the server 
- "pm2 ls" - To check the server status

# Heart Rate 
- POST {{SERVER}}/heart-rate/ - Accepts a .json file(since the payload will be large) which contains the metrics

    curl --location '{{SERVER}}/heart-rate' \
    --form 'file=@"/C:/Users/BAPS/Downloads/clinical_metrics.json"'
 
