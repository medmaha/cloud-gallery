import "@/app/globals.css";
import { FileImage, ImageIcon, VideoIcon } from "lucide-react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SidebarLinks from "@/components/SidebarLinks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Nav />
      <main className="grid grid-rows-[auto_1fr] divide-x md:grid-rows-none md:grid-cols-[14rem_auto]">
        <aside className="md:my-6 pr-4">
          <SidebarLinks
            links={[
              {
                icon: <FileImage className="w-5 h-5" />,
                label: "All",
                path: "/",
              },
              {
                icon: <ImageIcon className="w-5 h-5" />,
                label: "Photos",
                path: "/photos",
              },
              {
                icon: <VideoIcon className="w-5 h-5" />,
                label: "Views",
                path: "/videos",
              },
            ]}
          />
        </aside>
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
