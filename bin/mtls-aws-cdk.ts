#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MtlsAwsCdkStack } from '../lib/mtls-aws-cdk-stack';

const app = new cdk.App();
new MtlsAwsCdkStack(app, 'MtlsAwsCdkStack');
