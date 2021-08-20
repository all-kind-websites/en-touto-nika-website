import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul>
      <li>
        <Link to="/en-touto-nika">ΕΝ ΤΟΥΤΩ ΝΙΚΑ</Link>
      </li>
      <li>
        <Link to="/winners">Νικητές</Link>
      </li>
      <li>
        <Link to="/settings">Ρυθμίσεις</Link>
      </li>
      <li>
        <Link to="/create">Δημιουργία</Link>
      </li>
      <li>
        <Link to="/logout">Έξοδος</Link>
      </li>
      <li>
        <Link to="/login">Εγγραφή</Link>
      </li>
    </ul>
  );
};

export default NavBar;
