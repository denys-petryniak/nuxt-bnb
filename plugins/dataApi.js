export default (context, inject) => {
  const appId = "HTQ6DUKPLH";
  const apiKey = "e2f285ffa12aabeb7f0e9ff5b326cf27";

  inject("dataApi", {
    getHome,
  });

  async function getHome(homeId) {
    const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers: {
        "X-Algolia-API-Key": apiKey,
        "X-Algolia-Application-Id": appId,
      },
    });

    const json = await response.json();

    return json;
  }
};
