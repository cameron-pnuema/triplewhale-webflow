# triplewhale-webflow
The back-end for Triplewhale webflow
TRIPLE WHALE CUSTOM CODE

BACKEND SERVER

The extract prompt–server.zip file and keep it in a safe file.

To run the file locally, open this extracted folder in VS Code or any code editor of your choice. In VS code terminal, or if using a separate terminal (like command prompt or something), navigate to the location where the extracted folder is located and type this command and press enter - 

	npm install		or 	yarn

This will install some dependencies. Make sure you have node js installed in your system for the above command to run.

Now, create a .env file in the root of this folder and add this line - 
	
	API_KEY=your-chat-gpt-key

Once the dependencies installation is complete, run this command - 
	
	npm run dev

It will spin up a local server. To deploy it to digital ocean, first upload these extracted files inside a new github repository as discussed above in the WEBFLOW section. Thereafter, To deploy it in Digital Ocean, signup in digital ocean and create an app there. After choosing your plan, you will get an option to connect your github repo to digital ocean. Add your server repository on github on digital ocean and proceed. It will start building and deploying your server.

Remember to add API_KEY in the environment variables option of your digital ocean too.



Once, the server is deployed, you will get a url like this - 
https://some-app-name.ondigitialocean.app

To this URL add /generate-response like this - 

https://some-app-name.ondigitialocean.app/generate-response


Copy this URL and replace it in line 134 of prompt-trial.js file (SEE NEXT SECTION FOR THIS ) - 

    const API_URL = `https://sea-turtle-app-uzgks.ondigitalocean.app/generate-response`;

To - 

 const API_URL=`https://some-app-name.ondigitialocean.app/generate-response`


WEBFLOW

The triplewhale zip file contains three files - index.html, pricing.js and prompt-trial.js
After extracting the files, copy them to a safe folder.
	
Next, In your github, create a new repository. Don’t use a fancy name with special characters or spaces. Keep it something like - triplewhale-webflow  . After you create the repository, click on upload an existing file -




You will see a screen like this - 




Drag the three files together (index.html, pricing.js and prompt-trial.js) into this region.

Click on the Save changes button. Next, click on the settings tab - 




Click on the pages link, and click on the “none” dropdown below the branches header and choose “main” branch and hit the “save” button.

Now, to use the scripts in webflow, you will need to two links, which will look like this -

https://username.github.io/repository_name/pricing.js
https://username.github.io/repository_name/prompt-trial.js

For example, if your github username is fireweb, and the repository name you chose was 
triplewhale-webflow, then your link will look like - 

https://fireweb.github.io/triplewhale-webflow/pricing.js

These links can be used with the script tags in webflow like - 

<script src=”https://fireweb.github.io/triplewhale-webflow/pricing.js”></script>
<script src=”https://fireweb.github.io/triplewhale-webflow/prompt-trial.js”></script>

Pranjal can guide you on where to add these scripts in webflow.






