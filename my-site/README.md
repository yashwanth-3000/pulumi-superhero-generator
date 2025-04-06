# Next.js Application Deployment with Pulumi

This project demonstrates how to deploy a Next.js application to AWS using Pulumi with S3 and CloudFront.

## Architecture

The deployment uses the following AWS services:
- S3 for static file hosting
- CloudFront for content delivery
- Simple serverless approach with no containers or servers to manage

## Prerequisites

- Node.js 14 or later
- AWS CLI installed and configured
- Pulumi CLI installed

## Project Structure

- `/app` - Next.js application
- `index.ts` - Pulumi infrastructure code
- `Pulumi.yaml` and `Pulumi.dev.yaml` - Pulumi configuration files

## Getting Started

1. Build the Next.js application as a static export:
   ```
   cd app
   npm install
   npm run export
   ```

2. Deploy the infrastructure:
   ```
   cd ..
   pulumi up
   ```

3. Access the deployed application:
   After deployment completes, the application URL will be displayed in the output.

## Development

To run the Next.js application locally:

1. Navigate to the app directory:
   ```
   cd app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Cleaning Up

To tear down the deployed infrastructure:
```
pulumi destroy
```

## Additional Resources

- [Pulumi Documentation](https://www.pulumi.com/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Static Exports](https://nextjs.org/docs/advanced-features/static-html-export)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/) 