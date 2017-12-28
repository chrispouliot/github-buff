# Github-buff

Buff your Github contributor graph with daily commits to a repository of your choosing.

## Usage

Easily run on a schedule of your choosing using AWS Lamba and a CloudWatch scheduled event as a trigger. Upload release zip as code to your Lambda function.

Required environment variables

```bash
REPO_URL      # URL to the repository. Public or private
GITHUB_TOKEN  # API Token
REPO_NAME     # Name of repository
COMMIT_FILE   # Name of file to write to
AUTHOR_NAME   # Your name
AUTHOR_EMAIL  # Your email address
```

You can setup Github-Buff in two ways

[Using the AWS CLI](#using-the-aws-cli)

[Using the AWS Console](#using-the-aws-console)


### Using the AWS CLI

Get the [AWS CLI](https://aws.amazon.com/cli/) and configure it using `aws configure`

Download the release code zip file and run the following command to create an AWS Lambda function

```bash
aws lambda create-function \
--region us-west-2 \
--function-name github-buff \
--zip-file fileb:GITHUB_BUFF_ZIP_PATH \
--role ARN_ROLE \
--handler bundle.handler \
--runtime nodejs6.10 \
--profile adminuser \
--timeout 15
```

In order to create the daily schedule, run the following commands

```bash
aws events put-rule \
--name github-buff-schedule \
--schedule-expression 'rate(1 day)'
```

This will give you a repsonse similar to 
```bash
{
    "version": "0",
    ...
    "resources": [
        "arn:aws:events:us-east-1:123456789012:rule/my-scheduled-rule"
    ]
}
```

Use the resources ARN ID from the reponse in the following command

```bash
aws lambda add-permission \
--function-name github-buff \
--statement-id my-scheduled-event \
--action 'lambda:InvokeFunction' \
--principal events.amazonaws.com \
--source-arn arn:aws:events:us-east-1:123456789012:rule/my-scheduled-rule
```

Finally, add the rule to your Lambda function
```bash
aws events put-targets --rule github-buff-schedule --targets "Id"="<theID>","Arn"="<theLambdaARN>"
```

### Using the AWS Console

Start by creating a Lambda Function using the AWS Lambda console

<img src="https://dl.dropboxusercontent.com/s/bbia1r1ix1m9cru/Screenshot%202017-12-29%2009.40.05.png?dl=0" width="700" alt="Image of AWS Lambda console">

Click the Create Function button and edit the function to have the following properties

<img src="https://dl.dropboxusercontent.com/s/skaj570mro5guuh/Screenshot%202017-12-29%2009.42.37.png?dl=0" width="700" alt="Image of AWS Lambda function configuration editor">

Once created, go into the function and change the Code Entry Type to `Upload a .Zip File` and upload the release zip of Github-buff as your code

<img src="https://dl.dropboxusercontent.com/s/g1fav2ix6gl8lvf/Screenshot%202017-12-29%2009.43.49.png?dl=0" width="700" alt="AWS Lambda code editor">

The next step is to save the environment variables for use by the script. Place your own information here

<img src="https://dl.dropboxusercontent.com/s/xwvbjg7zncuwri5/Screenshot%202017-12-29%2010.01.55.png?dl=0" width="700" alt="AWS Lambda environment variables">

Setting up Git and cloning the repository can take time during execution. I recommend setting a 15 second timeout

<img src="https://dl.dropboxusercontent.com/s/2e7r6646w7197ts/Screenshot%202017-12-30%2010.23.01.png?dl=0" width="700" alt="AWS Lambda timeout configuration">

Finally, create a scheduled trigger for the Lambda function. Choose a CloudWatch Event trigger

<img src="https://dl.dropboxusercontent.com/s/mxlek9cu92767i4/Screenshot%202017-12-29%2009.46.34.png?dl=0" width="700" alt="AWS Lambda trigger selection">

Configure the CloudWatch trigger to run on a daily schedule by setting the rate to `rate(1 day)` 

<img src="https://dl.dropboxusercontent.com/s/aukpobeqqwuzkvx/Screenshot%202017-12-29%2009.48.45.png?dl=0" width="700" alt="AWS CloudWatch trigger configuration">

Once this is completed, save the Lambda function.

You're all set! You will now get daily commits to the repository of your choosing.

