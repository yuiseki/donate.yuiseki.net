import { useCallback, useEffect, useMemo, useState } from "react";

export const FaviconElement: React.FC<{ url: string }> = ({ url }) => {
  const [iconExists, setIconExists] = useState(true);
  const faviconUrl = useMemo(() => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      return "http://www.google.com/s2/favicons?domain=" + hostname;
    } catch (error) {
      setIconExists(false);
    }
  }, [url]);
  console.log(faviconUrl);

  const onError = useCallback(() => {
    setIconExists(false);
  }, []);

  useEffect(() => {
    setIconExists(true);
  }, [url]);

  return (
    <>
      {iconExists ? (
        <img loading="lazy" src={faviconUrl} onError={onError} />
      ) : (
        <img />
      )}
    </>
  );
};

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [orgData, setOrgData] = useState<string[][] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = await fetch("/npo_corporate_homepage.csv");
      const text = await res.text();
      const newOrgs = text
        .split("\n")
        .map((line) => {
          return line.split(",");
        })
        .sort(() => {
          return Math.random() - 0.5;
        })
        .reverse();
      setOrgData(newOrgs);
    })();
  }, []);

  const shuffle = () => {
    if (!orgData) {
      return;
    }
    setOrgData(undefined);
    const shuffledOrgData = shuffleArray(orgData).reverse();
    setOrgData([...shuffledOrgData]);
  };

  if (!orgData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flexStart",
        alignContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginTop: "30px",
            marginBottom: "30px",
            minWidth: "21.25rem",
          }}
        >
          <input
            type="button"
            value="ガチャを引く"
            style={{
              fontSize: "1em",
              lineHeight: "1",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "0px",
              padding: "1rem 1.5rem",
              width: "100%",
            }}
            onClick={shuffle}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "repeat(auto-fill, 400px)",
          columnGap: "30px",
          rowGap: "30px",
        }}
      >
        {orgData?.map((org) => {
          return (
            <div key={org[0]}>
              <h3>{org[0]}</h3>
              <h4>
                <FaviconElement url={org[1]} />
                <a target="_blank" href={org[1]}>
                  {org[1]}
                </a>
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
