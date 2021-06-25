import { Handler } from '@netlify/functions';
import { createHmac, timingSafeEqual } from 'crypto';
import { Octokit } from '@octokit/core';

function loadSecret(key: string): string {
    const secret = process.env[key];
    if (typeof secret !== 'string') {
        throw new Error(`Could not load secret '${key}' from env.`);
    }
    return secret;
}

const webhookSecret = loadSecret('WEBHOOK_SECRET');
const expectedPrefix = 'sha256=';

const githubToken = loadSecret('GITHUB_TOKEN');
const octokit = new Octokit({ auth: githubToken });

async function isSignatureValid(signature: string, payload: string): Promise<boolean> {
    if (!signature.startsWith(expectedPrefix)) return false;
    const actualSignature = Buffer.from(signature.slice(expectedPrefix.length), 'hex');
    if (actualSignature.length !== 32) return false;

    const hmac = createHmac('sha256', webhookSecret);
    hmac.write(payload);
    hmac.end();

    let expectedSignature: Buffer | undefined = undefined;
    for await (const chunk of hmac) {
        // an Hmac stream only writes once, producing the signature.
        if (chunk instanceof Buffer) {
            expectedSignature = chunk;
        } else {
            return false;
        }
    }
    if (!expectedSignature) return false;

    return timingSafeEqual(expectedSignature, actualSignature);
}

// returns whether successful
async function triggerAction(): Promise<boolean> {
    try {
        await octokit.request('POST /repos/{owner}/{repo}/dispatches', {
            owner: 'theos',
            repo: 'theos',
            event_type: 'org_push'
        });
    } catch {
        return false;
    }
    return true;
}

const handler: Handler = async (event) => {
    const { body, httpMethod } = event;
    if (httpMethod !== 'POST') {
        return { statusCode: 405 };
    }

    if (typeof body !== 'string') {
        return { statusCode: 400 };
    }

    const sig = event.headers['x-hub-signature-256'];
    if (typeof sig !== 'string') {
        return { statusCode: 401 };
    }

    const isValid = await isSignatureValid(sig, body);
    if (!isValid) {
        return { statusCode: 403 };
    }

    const result = await triggerAction();
    return { statusCode: result ? 200 : 500 };
}

export { handler };
