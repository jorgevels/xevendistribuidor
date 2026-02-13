
import { RiLogoutCircleLine } from "react-icons/ri";

import { Avatar } from "../Avatar/Avatar";
import "./AvatarDropdown.scss";

const SIZE = "24px";

export const AvatarDropdown = ({ photoURL, username, logout }) => (
  <div className="group relative flex">
    <Avatar photoURL={photoURL} username={username} />
    <ul className="absolute -right-0 top-8 z-10 hidden list-none overflow-hidden rounded border bg-white shadow-lg group-hover:block">
      <li>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2  px-4 py-2 font-body text-sm hover:bg-neutral-100"
        >
          {/* <BiUser /> */}
          <RiLogoutCircleLine size={SIZE} />
          Logout
        </button>
      </li>
    </ul>
  </div>
);
