"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/store";
import { useRouter, usePathname } from "next/navigation";
import {
  toggleRTL,
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from "@/store/themeConfigSlice";
import Loading from "@/components/layouts/loading";
import { getTranslation } from "@/i18n";
import { useSession } from "@/hooks";
import { LINKS } from "@/constants";

function App({ children }: PropsWithChildren) {
  const [retry, setRetry] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();
  const { initLocale } = getTranslation();
  const { session } = useSession();

  useEffect(() => {
    if(session == null){
      setRetry(retry + 1);
    }
  }, [session])

  useEffect(() => {
    const userSession = session;
    if(userSession != null && retry >= 1){
      if (userSession && userSession?.accessToken) {
        if (pathname === LINKS.login.route) {
          router.push(LINKS.dashboard.route);
        }
      } else {
        if (pathname !== LINKS.login.route) {
          router.push(LINKS.login.route);
        }
      }
    }else if(userSession == null && retry >= 1){
      if (pathname !== LINKS.login.route) {
        router.push(LINKS.login.route);
      }
    }
  }, [session, retry]);

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem("layout") || themeConfig.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem("rtlClass") || themeConfig.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem("animation") || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar)
    );
    dispatch(
      toggleSemidark(localStorage.getItem("semidark") || themeConfig.semidark)
    );
    // locale
    initLocale(themeConfig.locale);
  }, [
    dispatch,
    initLocale,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.locale,
    themeConfig.semidark,
  ]);

  return (
    <div
      className={`${(themeConfig.sidebar && "toggle-sidebar") || ""} ${
        themeConfig.menu
      } ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section relative font-nunito text-sm font-normal antialiased`}
    >
      {children}
    </div>
  );
}

export default App;
