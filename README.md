# MTLS for Microservices - AWS CDK Project

## Steps

### 1. Initialize the CDK project

#### If you create it from scratch
```sh
## remove older CDK globally
sudo npm update -g aws-cdk

## reinstall CDK globally
sudo npm uninstall -g aws-cdk
sudo npm install -g aws-cdk

## create a directory for our CDK project
mkdir <cdk-project>
cd <cdk-project>

## initialize your CDK project
cdk init --language typescript
rm -rf test/

## install required packages locally
npm install @aws-cdk/aws-ec2 @aws-cdk/aws-ecs @aws-cdk/aws-ecs-patterns
``` 

#### If you use existing Github repo
```sh
## clone this repo
git clone https://github.com/chilcano/mtls-aws-cdk
cd mtls-aws-cdk

## install packages defined in packages.json
npm install 
``` 

### 2. Tweak and deploy the CDK project

#### Configure your AWS account
```sh
export AWS_ACCESS_KEY_ID="AKIA...."
export AWS_SECRET_ACCESS_KEY="AvO..."
export AWS_DEFAULT_REGION="eu-west-2"
``` 

