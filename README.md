First convert the Excel sheet containing image metadata to a .json file named
output.json.  Then run index.js to upload to oam-api. 

Requires environment variable
```
JWT_SECRET_KEY=secretsigningkey
```
To sign the token used for api calls.
