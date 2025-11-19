import "server-only";

import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

export const S3 = new S3Client({
	region: "auto",
	endpoint: env.AWS_ENDPOINT_URL_S3,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	},
	forcePathStyle: true,
});
