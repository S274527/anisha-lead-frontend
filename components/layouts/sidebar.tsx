'use client';
import { useEffect, Fragment, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import IconMenuUsers from '../icon/menu/icon-menu-users';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMinus from '@/components/icon/icon-minus';
import IconNotes from '@/components/icon/icon-notes';
import IconLock from '@/components/icon/icon-lock';
import { useSession } from '@/hooks';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark,
  );
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const { userType } = useSession();

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue: string) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any =
          ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]',
    );
    selector?.classList.add('active');
  };

  const menuClassName = 'shrink-0 group-hover:!text-primary';
  const menuItems = [
    {
      name: t('dashboard'),
      Icon: <IconMenuDashboard className={menuClassName} />,
      route: '/dashboard',
      items: [],
      heading: '',
    },
    {
      name: t('Leads'),
      Icon: <IconMenuUsers className={menuClassName} />,
      route: '/leads',
      items: [],
      heading: '',
    }
  ];

  if (userType === 'admin') {
    menuItems.push({
      name: t('Permissions'),
      Icon: <IconLock className={menuClassName} />,
      route: '/permissions',
      items: [],
      heading: '',
    });
    menuItems.push({
      name: t('Users'),
      Icon: <IconMenuUsers className={menuClassName} />,
      route: '/users',
      items: [],
      heading: '',
    });
    menuItems.push({
      name: t('Faqs'),
      Icon: <IconNotes className={menuClassName} />,
      route: '/faq',
      items: [],
      heading: '',
    });
  }

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''
          }`}>
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center justify-center w-[90%]">
              <img
                className="mx-[auto] h-[50px] flex-none"
                src="/assets/images/logo.jpeg"
                alt="logo"
              />
              {/* <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
                MYL
              </span> */}
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}>
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="nav-item">
                <ul>
                  {menuItems?.map(menuItem => {
                    if (!menuItem.items?.length) {
                      return (
                        <Fragment key={menuItem.route}>
                          {menuItem?.heading && (
                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                              <IconMinus className="hidden h-5 w-4 flex-none" />
                              <span>{menuItem?.heading}</span>
                            </h2>
                          )}
                          <li className="nav-item">
                            <Link href={menuItem.route} className="group">
                              <div className="flex items-center">
                                {menuItem.Icon}
                                <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                  {menuItem.name}
                                </span>
                              </div>
                            </Link>
                          </li>
                        </Fragment>
                      );
                    } else {
                      return (
                        <li className="menu nav-item" key={menuItem.name}>
                          {menuItem?.heading && (
                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                              <IconMinus className="hidden h-5 w-4 flex-none" />
                              <span>{menuItem?.heading}</span>
                            </h2>
                          )}
                          <button
                            type="button"
                            className={`${currentMenu === menuItem.name ? 'active' : ''
                              } nav-link group w-full`}
                            onClick={() => toggleMenu(menuItem.name)}>
                            <div className="flex items-center">
                              {menuItem.Icon}
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                                {menuItem.name}
                              </span>
                            </div>

                            <div
                              className={
                                currentMenu !== menuItem.name
                                  ? '-rotate-90 rtl:rotate-90'
                                  : ''
                              }>
                              <IconCaretDown />
                            </div>
                          </button>

                          {/* <AnimateHeight
                            duration={300}
                            height={currentMenu === menuItem.name ? 'auto' : 0}>
                            <ul className="sub-menu text-gray-500">
                              {menuItem.items.map(subItem => {
                                return (
                                  <li key={subItem.route}>
                                    <Link href={subItem.route}>
                                      {subItem.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </AnimateHeight> */}
                        </li>
                      );
                    }
                  })}
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
