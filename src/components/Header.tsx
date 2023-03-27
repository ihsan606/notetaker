import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <div className="navbar bg-slate-900 dark:bg-sky-600">
        <div className="flex-1">
          <a className="btn-ghost btn text-xl normal-case text-success">
            {" "}
            {`Welcome To Notejs, ${
              sessionData?.user.name?.split(" ")[0] || ""
            }`}
          </a>
          {!sessionData?.user && (
            <div className="">
              <div className="flex justify-center py-1">
                <pre data-prefix=">" className="text-success ">
                  <code> Notejs</code>
                </pre>
              </div>
            </div>
          )}
        </div>
        <div className="flex-none">
          <div className="dropdown-end dropdown"></div>
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                {sessionData != undefined && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      sessionData?.user.image ?? sessionData?.user?.image ?? ""
                    }
                    alt="avatar"
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => void signOut()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
