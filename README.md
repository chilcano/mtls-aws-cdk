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

#### Deploy the CDK project
```sh
## show the CloudFormation template to be executed
cdk synth

# deploy 
cdk deploy

``` 

### 3. Connect to the EC2 instance 

```sh
## get hostname of the EC2 instance created
export server="xxxxxxxxxxxx.compute.amazonaws.com"

ssh ubuntu@$server -i ~/.ssh/chilcan0.pub

## install all devops tooling
cd $HOME/playground/
wget -qN https://raw.githubusercontent.com/chilcano/how-tos/main/src/devops_tools_install_v3.sh
wget -qN https://raw.githubusercontent.com/chilcano/how-tos/main/src/devops_tools_remove_v3.sh
sudo chmod +x devops_tools_*.sh
sudo ./devops_tools_install_v3.sh

## load a custom prompt
curl -s https://raw.githubusercontent.com/chilcano/how-tos/master/src/custom_prompt_with_powerline_go.sh | bash
``` 

### 4. Clone GitHub repositories with the applications

```sh
## Simple Spring Boot Microservices and MTLS
$ git clone https://github.com/chilcano/mtls-java $HOME/playground/mtls-java/


## download dependencies, compile and run app
$ cd $HOME/playground/mtls-java/
$ cd server
$ mvn install
$ mvn spring-boot:run

## Emojivoto App and MTLS
$ git clone https://github.com/chilcano/mtls-emojivoto-tf $HOME/playground/mtls-java/

## aws config, init, plan and apply terraform
$ aws configure
$ terraform init
$ terraform plan
$ terraform apply 
  -var key_name="<your-key-name>" \
  -var puppet_ssh_privkey_filename="<your-key-name>" \
  -var instance_type="t2.medium" \
  -var region="eu-west-2"

## test
$ curl -I --cacert root_ca.crt https://web.emojivoto.local
``` 

### Destroy

```sh
$ terraform destroy 

$ terraform destroy \
  -var key_name="chilcan0" \
  -var puppet_ssh_privkey_filename="chilcan0" \
  -var instance_type="t2.medium" \
  -var region="eu-west-2"
``` 
