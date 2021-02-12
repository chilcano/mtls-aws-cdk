import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { readFileSync } from 'fs';

export class MtlsAwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // vpc
    const vpc = new ec2.Vpc(this, "VPC", { 
      maxAzs: 1,
      cidr: '10.0.0.0/21', 
      subnetConfiguration: [{
          subnetType: ec2.SubnetType.PUBLIC,
          name: 'subnetPub',
          cidrMask: 24
        }]
    });

    // security-group
    const secGrp = new ec2.SecurityGroup(this, 'SG', {
      vpc: vpc,
      securityGroupName: 'mtlsSg',
      description: 'Allow HTTP traffic to EC2 instance from anywhere',
      allowAllOutbound: true 
    });

    secGrp.addIngressRule(
      ec2.Peer.anyIpv4(), 
      ec2.Port.tcp(8080), // server listen on 8080 port 
      'Allow ingress HTTP traffic'                                                                                                                                                     
    );
    secGrp.addIngressRule(
      ec2.Peer.anyIpv4(), 
      ec2.Port.tcp(8443), // server listen on 8443 port 
      'Allow ingress HTTPS traffic'                                                                                                                                                     
    );
    secGrp.addIngressRule(
      ec2.Peer.anyIpv4(), 
      ec2.Port.tcp(22), 
      'Allow ingress SSH traffic'                                                                                                                                                     
    );

    // https://cloud-images.ubuntu.com/locator/ec2/
    // owner: 099720109477 (ubuntu) 
    const imgLinuxUbu = new ec2.GenericLinuxImage({
      'eu-central-1': 'ami-0932440befd74cdba',
      'eu-north-1': 'ami-09b44b5f46219ee86',
      'eu-south-1': 'ami-0e0812e2467b24796',
      'eu-west-1': 'ami-022e8cc8f0d3c52fd',
      'eu-west-2': 'ami-005383956f2e5fb96',
      'eu-west-3': 'ami-00f6fe7d6cbb56a78',
      'us-east-1': 'ami-03d315ad33b9d49c4',
      'us-east-2': 'ami-0996d3051b72b5b2c',
      'us-west-1': 'ami-0ebef2838fb2605b7',
      'us-west-2': 'ami-0928f4202481dfdf6'
    });

    const instance =  new ec2.Instance(this, 'EC2', {
      vpc: vpc,
      machineImage: imgLinuxUbu,
      instanceName: 'mtls-java-1',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      securityGroup: secGrp
    });

    // running bash script in recently created EC2 instance
    const userData = readFileSync('_assets/scripts/deploy_tools_and_scripts.sh', 'utf-8');
    instance.addUserData( userData );
    instance.instance.addPropertyOverride('KeyName', 'chilcan0');

  }
}
