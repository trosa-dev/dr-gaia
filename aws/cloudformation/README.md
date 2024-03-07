# DR Gaia CloudFormation Setup

This CloudFormation template is used to set up the infrastructure required for the DR Gaia project.

## Prerequisites

- AWS CLI installed and configured with appropriate permissions.
- Knowledge of AWS CloudFormation.

## Usage

From the root of your project directory, run the following command in your terminal:

```bash
aws cloudformation create-stack --stack-name DRGaiaStack --template-body ./aws/cloudformation/aws-cloudformation.yml
```
