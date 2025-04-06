
# Superhero Generator

This repository contains the source code and infrastructure setup for the Superhero Generator website, built for the Pulumi Deploy and Document Challenge. The project uses modern web technologies and cloud infrastructure to deliver a dynamic, AI-powered website that generates detailed superhero profiles.

---

## Table of Contents

- [Requirements](#requirements)
- [Installation and Setup](#installation-and-setup)
  - [Pulumi Setup](#pulumi-setup)
  - [AWS Setup](#aws-setup)
- [Deploying the Project](#deploying-the-project)
- [Additional Information](#additional-information)

---

## Requirements

- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **Pulumi CLI**
- **AWS CLI**
- An AWS account with necessary permissions (see AWS Setup below)
- A code editor (e.g., VSCode, Cursor)


---

## Installation and Setup

### Pulumi Setup

1. **Install the Pulumi CLI**  
   Download and install the Pulumi CLI by following the instructions on the [Pulumi documentation page](https://www.pulumi.com/docs/iac/download-install/). The CLI is essential for logging in, managing stacks, and automating resource provisioning.

2. **Create a Pulumi Account**  
   Sign up for a Pulumi account if you haven’t already. After creating your account, log in via the CLI:
   ```bash
   pulumi login
   ```

### AWS Setup

1. **AWS Account**  
   Ensure you have an AWS account. If you're new to AWS, sign up for a free tier account.

2. **Create an IAM User with Programmatic Access**  
   In the AWS Management Console, create an IAM user with programmatic access. Assign the following policies to ensure full access for deployment:
   - **AmazonS3FullAccess**
   - **CloudFrontFullAccess**
   - **IAMUserChangePassword**

3. **Install and Configure the AWS CLI**  
   Install the AWS CLI and configure it with your credentials:
   ```bash
   aws configure
   ```
   You will be prompted to enter your AWS Access Key ID, Secret Access Key, region, and output format.

4. **Set Up AWS Credentials for Pulumi**  
   You can provide AWS credentials to Pulumi using one of the following methods:

   **Using Environment Variables:**
   ```bash
   export AWS_ACCESS_KEY_ID="your-access-key-id"
   export AWS_SECRET_ACCESS_KEY="your-secret-access-key"
   export AWS_REGION="your-region"
   ```
   *(If using temporary credentials, also set `AWS_SESSION_TOKEN`.)*

   **Or, using a Shared Credentials File:**  
   Follow the instructions in the [Pulumi AWS installation guide](https://www.pulumi.com/registry/packages/aws/installation-configuration/#credentials).

5. **Test Your Configuration**  
   Run the following command to simulate a deployment and verify that your AWS credentials are working correctly:
   ```bash
   pulumi preview
   ```
   If any policy violation errors occur, ensure that your IAM user has the required permissions.

---

## Deploying the Project

1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/yashwanth-3000/pulumi-superhero-generator
   ```

2. **Navigate to the Project Directory:**  
   ```bash
   cd mysite
   ```

3. **Deploy with Pulumi:**  
   Execute the deployment script:
   ```bash
   pulumi up
   ```
   Upon successful deployment, Pulumi will create your AWS resources and provide you with URLs (both HTTP and HTTPS) for your live site.

---

## Additional Information

If you encounter any issues, ensure that your AWS permissions and Pulumi configurations are correctly set up as described above.

