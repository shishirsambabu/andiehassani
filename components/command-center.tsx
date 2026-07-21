"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { primaryNav, utilityNav } from "@/lib/site";

export function CommandCenter() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  useEffect(() => {
    const open = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        dialogRef.current?.showModal();
      }
    };
    window.addEventListener("keydown", open);
    return () => window.removeEventListener("keydown", open);
  }, []);

  return (
    <>
      <button className="command-trigger" type="button" onClick={() => dialogRef.current?.showModal()}>
        Navigate <span>⌘ K</span>
      </button>
      <dialog className="command-center" ref={dialogRef} onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="command-sheet">
          <div className="command-heading">
            <div><span>AH</span><p>Red Thread<br />Decision Studio</p></div>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close navigation">Close ×</button>
          </div>
          <p className="command-label">Choose a pathway</p>
          <nav className="command-primary" aria-label="Site directory">
            {primaryNav.map((item) => (
              <Link href={item.href} key={item.href}>
                <small>{item.index}</small><strong>{item.label}</strong><span>↗</span>
              </Link>
            ))}
          </nav>
          <nav className="command-utility" aria-label="More pages">
            {utilityNav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
          <p className="command-footnote">Dubai · Worldwide · EN / FR / IT / FA</p>
        </div>
      </dialog>
    </>
  );
}
