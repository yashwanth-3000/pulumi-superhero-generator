import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as synced_folder from "@pulumi/synced-folder";

// Import the program's configuration settings.
const config = new pulumi.Config();
const appPath = config.get("appPath") || "./dynamic-ui-app";
const indexDocument = config.get("indexDocument") || "index.html";
const errorDocument = config.get("errorDocument") || "index.html";

// Explicitly create an AWS provider with the correct region
const awsRegion = aws.config.region;
console.log(`Using AWS region: ${awsRegion}`);

// Create an S3 bucket and configure it as a website.
const bucket = new aws.s3.BucketV2("dynamicui-bucket", {
    // Add additional configuration for website
    forceDestroy: true // This helps with testing - can delete bucket even if it has content
});

// Configure public access settings on the S3 bucket FIRST
// This must be applied before bucket policy can be added
const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("public-access-block", {
    bucket: bucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false,
});

// Configure ownership controls for the S3 bucket
const ownershipControls = new aws.s3.BucketOwnershipControls("ownership-controls", {
    bucket: bucket.id,
    rule: {
        objectOwnership: "ObjectWriter",
    },
}, { dependsOn: [publicAccessBlock] });

// Configure the bucket for website hosting
const bucketWebsite = new aws.s3.BucketWebsiteConfigurationV2("bucketWebsite", {
    bucket: bucket.id,
    indexDocument: { suffix: indexDocument },
    errorDocument: { key: errorDocument },
}, { dependsOn: [publicAccessBlock] });

// Add a bucket policy to allow public read access
// This must come AFTER the public access block settings
const bucketPolicy = new aws.s3.BucketPolicy("bucket-policy", {
    bucket: bucket.id,
    policy: bucket.id.apply(bucketName => JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
        }],
    })),
}, { dependsOn: [publicAccessBlock] });

// Use a synced folder to manage the files of the website.
const bucketFolder = new synced_folder.S3BucketFolder("bucket-folder", {
    path: appPath,
    bucketName: bucket.id,
    acl: "public-read",
}, { dependsOn: [ownershipControls, publicAccessBlock, bucketPolicy] });

// Create a CloudFront CDN to distribute and cache the website.
const cdn = new aws.cloudfront.Distribution("dynamicui-cdn", {
    enabled: true,
    origins: [{
        originId: bucket.arn,
        domainName: bucketWebsite.websiteEndpoint,
        customOriginConfig: {
            originProtocolPolicy: "http-only",
            httpPort: 80,
            httpsPort: 443,
            originSslProtocols: ["TLSv1.2"],
        },
    }],
    defaultCacheBehavior: {
        targetOriginId: bucket.arn,
        viewerProtocolPolicy: "redirect-to-https",
        allowedMethods: [
            "GET",
            "HEAD",
            "OPTIONS",
        ],
        cachedMethods: [
            "GET",
            "HEAD",
            "OPTIONS",
        ],
        defaultTtl: 600,
        maxTtl: 600,
        minTtl: 600,
        forwardedValues: {
            queryString: true,
            cookies: {
                forward: "all",
            },
        },
    },
    priceClass: "PriceClass_100",
    customErrorResponses: [{
        errorCode: 404,
        responseCode: 200,
        responsePagePath: `/${indexDocument}`,
    }],
    restrictions: {
        geoRestriction: {
            restrictionType: "none",
        },
    },
    viewerCertificate: {
        cloudfrontDefaultCertificate: true,
    },
}, { dependsOn: [bucketWebsite] });

// Export the URLs and hostnames of the bucket and distribution.
export const websiteUrl = pulumi.interpolate`http://${bucketWebsite.websiteEndpoint}`;
export const cdnUrl = pulumi.interpolate`https://${cdn.domainName}`;
export const cdnHostname = cdn.domainName;
