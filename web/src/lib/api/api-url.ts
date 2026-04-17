import env, { officialApiURL } from "$lib/env";
import { get } from "svelte/store";
import settings from "$lib/state/settings";

export const currentApiURL = () => {
    const processingSettings = get(settings).processing;
    const customInstanceURL = processingSettings.customInstanceURL;

    if (processingSettings.enableCustomInstances && customInstanceURL.length > 0) {
        return new URL(customInstanceURL).origin;
    }

    // Use DEFAULT_API if set, otherwise fallback to official API
    const apiUrl = env.DEFAULT_API || officialApiURL;
    return new URL(apiUrl).origin;
}
