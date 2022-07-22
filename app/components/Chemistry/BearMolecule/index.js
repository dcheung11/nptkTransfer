import React, { useState } from "react";
import SmileDrawerContainer from "./SmileDrawer";

const BearMolecule = () => {
  const [smilesStr, setSmilesStr] = useState("");

  return (
    <div className="App">
      <label style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ color: "light" }}>Enter valid smiles string:</p>
        <input
          type="text"
          value={smilesStr}
          onChange={(e) => setSmilesStr(e.target.value)}
        />
      </label>
      <SmileDrawerContainer smilesStr={smilesStr} />
    </div>
  );
};

export default BearMolecule;
