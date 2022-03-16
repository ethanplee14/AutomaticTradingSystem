import fetch from "node-fetch";
import spacTrackConfigs from "../../../config/spactrac.json";


export async function scrapeSpacUniverse() {
    const accessTokenRes = await fetch("https://api.spactrack.net/user/refreshToken", {
        method: "POST",
        headers: {authorization: `Bearer ${btoa(spacTrackConfigs.refreshToken)}`}
    })
    const accessToken = (await accessTokenRes.json())['token']
    const spacDataRes = await fetch(spacTrackConfigs.url, {
        headers: {authorization: `Bearer ${btoa(accessToken)}`}
    })
    const spacData = (await spacDataRes.json()).data
    return spacData
        .filter((spac: any) => spac.status.toLowerCase().includes("searching"))
        .map((spac: any) => spac.commonSymbol)
}

