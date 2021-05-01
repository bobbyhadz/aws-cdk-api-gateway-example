# API Gateway Example in AWS CDK - Complete Guide

A repository for an article on
[bobbyhadz.com](https://bobbyhadz.com/blog/aws-cdk-api-gateway-example)

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. Create the CDK stack

```bash
npx cdk deploy \
  --outputs-file ./cdk-outputs.json
```

4. Open the AWS CloudFormation Console and the stack should be created in your
   default region

5. Cleanup

```bash
npx cdk destroy
```
