import { useEffect, useState } from "react";

function App() {
  const [orgs, setOrgs] = useState<string[][] | undefined>(undefined);

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
        });
      setOrgs(newOrgs);
    })();
  }, []);

  const shuffle = () => {
    if (!orgs) {
      return;
    }
    setOrgs(undefined);
    const shuffledOrgs = [
      ...orgs.sort(() => {
        return Math.random() - 0.5;
      }),
    ];
    setOrgs(shuffledOrgs);
  };

  if (!orgs) {
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
        {orgs?.map((org) => {
          return (
            <div>
              <h3>
                <a target="_blank" href={org[1]}>
                  {org[0]}
                </a>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
