import CreateProposal from "pages/CreateProposal";
import { Route, Routes } from "react-router-dom";

import VotePage from "./VotePage";

export default function Vote() {
  return (
    <Routes>
      <Route path=":governorIndex/:id" element={<VotePage />} />
      <Route path="create-proposal" element={<CreateProposal />} />
    </Routes>
  );
}
