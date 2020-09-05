
<script src="firebase2.js"></script>
// ----------------- AUTHENTICATION -----------------
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database',
];

const jwtClient = new google.auth.JWT(
  process.env.FIREBASE_CLIENT_EMAIL,
  null,
  process.env.FIREBASE_PRIVATE_KEY,
  scopes
);

const getAccessToken = async () => {
  return new Promise((resolve, reject) =>
    jwtClient.authorize((err, tokens) => {
      if (err) reject(err);
      else resolve(tokens.access_token);
    })
  );
};

// ----------------- HELPER FUNCTIONS -----------------

const parsePlacementRes = (res) => {
  return Object.keys(res).length + 1;
};

const parseTopRes = (res) => {
  const ordered = {};
  Object.keys(res)
    .sort((a, b) => {
      return res[b] - res[a];
    })
    .forEach((key) => {
      ordered[key] = res[key];
    });
  return ordered;
};

const performRequest = async (method, path, data, qs = '') => {
  let accessToken;
  try {
    accessToken = await getAccessToken();
  } catch (e) {
    console.log(e);
  }
  const baseUrl = process.env.FIREBASE_BASE_URL;
  const url = `${baseUrl}${path}?access_token=${accessToken}${qs}`;
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  });
  return await res.json();
};

// ----------------- EXPORTED / CALLABLE FUNCTIONS -----------------

export const setProduction = async (address, production) => {
  const res = await performRequest(
    'PUT',
    `production/${address}.json`,
    production
  );
  return res;
};

export const getProduction = async (address) => {
  const res = await performRequest(
    'GET',
    `production/${address}.json`,
    undefined
  );
  return res;
};

export const getTop = async (limit = 10) => {
  const res = await performRequest(
    'GET',
    'production.json',
    undefined,
    `&orderBy="$value"&limitToLast=${limit}`
  );
  return parseTopRes(res);
};

export const getPlacement = async (production) => {
  const res = await performRequest(
    'GET',
    'production.json',
    undefined,
    `&orderBy="$value"&startAt=${production}`
  );

  return parsePlacementRes(res);
};

/*
 * Example usage:
 * Note: Ensure environment variables are set (FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_BASE_URL)
 *
 * How to save/update a users' production value:
 * call: setProduction(address, production)
 * returns a number
 * note: Consider the decimals for the production value here
 *
 * How to get a users production value:
 * call: getProduction(address)
 * returns a number
 *
 * How to get top X leaderboard:
 * call: getTop(X)
 * return example from getTop(10):
 *  {
 *    ggg222: 603876,
 *    ggg5: 603876,
 *    ggg17: 566904,
 *    ggg11: 542256,
 *    ggg229: 542256,
 *    ggg241: 542256,
 *    ggg237: 517608,
 *    ggg239: 505284,
 *    ggg227: 468312,
 *    ggg9: 443664
 *  }
 * this is an object where the key is the address, and the value is the production.
 *
 * How to get a users' placement in the leaderboard:
 * call: getPlacement(address)
 * returns a number
 */
