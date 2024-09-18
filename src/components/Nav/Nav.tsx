import Link from "next/link";

import Container from "@/components/Container";
import UploadButton from "./UploadButton";
import { Cloud } from "lucide-react";

const Nav = () => {
  return (
    <nav className="flex items-center h-16 border border-zinc-200">
      <Container className="flex gap-6 items-center flex-row">
        <p className="w-40 flex-grow-0 mb-0">
          <Link
            href="/"
            className="inline-flex items-center justify-start gap-1 text-xl font-bold "
          >
            <Cloud
              strokeWidth={3}
              className="fill-sky-400 stroke-sky-700  h-8 w-8"
            />
            <span className="text-sky-700 w-max">CloudArchive</span>
          </Link>
        </p>
        <ul className="flex flex-grow justify-end gap-6 m-0">
          {/* <li>Link</li> */}
          <li>
            <UploadButton />
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Nav;
