import { json } from "@sveltejs/kit";
import { getCommit, getBranch, getRemote, getVersion } from "@imput/version-info";

const safe = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
    try {
        return await fn();
    } catch {
        return fallback;
    }
};

export async function GET() {
    return json({
        commit: await safe(getCommit, process.env.VERCEL_GIT_COMMIT_SHA || "unknown"),
        branch: await safe(getBranch, process.env.VERCEL_GIT_COMMIT_REF || "main"),
        remote: await safe(getRemote, "Abdullakala/cobalt"),
        version: await safe(getVersion, "10.0.0")
    });
}

export const prerender = true;
