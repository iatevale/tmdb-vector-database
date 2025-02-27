import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { Power, PowerOff } from "lucide-react";

const GoogleLogin = async () => {
  const session = await auth();

  if (session?.user?.email) {
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="m-0 p-0 h-6"
      >
        <button type="submit">
          <PowerOff className="w-6 h-6 hover:text-red-800" />
        </button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className="m-0 p-0 h-6"
    >
      <button type="submit">
        <Power className="w-6 h-6 hover:text-red-800" />
      </button>
    </form>
  );
};

export default GoogleLogin;
