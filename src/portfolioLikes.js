const likesApiUrl = import.meta.env.VITE_LIKES_API_URL?.trim();

export function isPortfolioLikesConfigured() {
  return Boolean(likesApiUrl);
}

export async function fetchPortfolioLikes(signal) {
  const response = await fetch(requireLikesApiUrl(), { signal });
  return parseLikesResponse(response);
}

export async function likePortfolio() {
  const response = await fetch(requireLikesApiUrl(), {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  return parseLikesResponse(response);
}

function requireLikesApiUrl() {
  if (!likesApiUrl) {
    throw new Error("Set VITE_LIKES_API_URL to connect the portfolio likes API.");
  }

  return likesApiUrl;
}

async function parseLikesResponse(response) {
  if (!response.ok) {
    throw new Error(`Portfolio likes request failed (${response.status}).`);
  }

  const result = await response.json();
  if (
    !result ||
    !Number.isSafeInteger(result.count) ||
    result.count < 0 ||
    typeof result.liked !== "boolean"
  ) {
    throw new Error("Portfolio likes API returned an invalid response.");
  }

  return { count: result.count, liked: result.liked };
}
