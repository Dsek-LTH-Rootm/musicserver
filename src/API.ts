"use server"
import axios from "axios";
import { apiCall, authenticate, getRefreshToken } from "./authenticate";

export async function search(query: string) {
  try {
    const accessToken = await apiCall();
    console.log(accessToken);
    const q = query.replaceAll(' ', '+');
    const response = await axios.get("https://api.spotify.com/v1/search?q=" + q + "&type=album%2Cplaylist%2Ctrack&market=SE", {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (response.data.status == 401) {
      await getRefreshToken();
      addToQueue(query);
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else if (error.message) {
      console.error(error.message);
    }

    if (error.config) {
      console.error(error.config);
    }
  }
}

export async function addToQueue(uri: string) {
  try {
    const accessToken = await apiCall();
    const q = uri.replaceAll(':', "%3A");
    const response = await axios.get("https://api.spotify.com/v1/me/player/queue?uri=" + q, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (response.data.status == 401) {
      await getRefreshToken();
      addToQueue(uri);
    }

    console.log(response.data);

  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else if (error.message) {
      console.error(error.message);
    }

    if (error.config) {
      console.error(error.config);
    }
  }
}

export async function resumePlayback(context_uri: string) {
  try {
    const accessToken = await apiCall();
    const response = await axios.put("https://api.spotify.com/v1/me/player/play", {
      context_uri: context_uri
    }, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (response.data.status == 401) {
      await getRefreshToken();
      resumePlayback(context_uri);
    }

    console.log(response.data);

  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else if (error.message) {
      console.error(error.message);
    }

    if (error.config) {
      console.error(error.config);
    }
  }
}

export async function skipNext() {
  try {
    const accessToken = await apiCall();
    const response = await axios.post("https://api.spotify.com/v1/me/player/next", {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (response.data.status == 401) {
      await getRefreshToken();
      skipNext();
    }

    console.log(response.data);

  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else if (error.message) {
      console.error(error.message);
    }

    if (error.config) {
      console.error(error.config);
    }
  }
}

export async function toggleShuffle(state: string) {
  try {
    const accessToken = await apiCall();
    const response = await axios.put("https://api.spotify.com/v1/me/player/shuffle?state=" + state, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (response.data.status == 401) {
      await getRefreshToken();
      toggleShuffle(state);
    }

    console.log(response.data);

  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else if (error.message) {
      console.error(error.message);
    }

    if (error.config) {
      console.error(error.config);
    }
  }
}

export async function setVolume(percent: string) {
  try {
    const accessToken = await apiCall();
    const response = await axios.put("https://api.spotify.com/v1/me/player/volume?=volume_percent=" + percent, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });

    if (response.data.status == 401) {
      await getRefreshToken();
      setVolume(percent);
    }

    console.log(response.data);

  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else if (error.message) {
      console.error(error.message);
    }

    if (error.config) {
      console.error(error.config);
    }
  }
}
