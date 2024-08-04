'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from "react-query";
import Image from 'next/image';
import Link from 'next/link';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import Dropdown from '@/components/dropdown';
import IconMenu from '@/components/icon/icon-menu';
import IconUser from '@/components/icon/icon-user';
import IconLogout from '@/components/icon/icon-logout';
import { usePathname } from 'next/navigation';
import { useSession } from '@/hooks';
import {
  FETCH_CALLBACK_LEAD_KEY,
  fetchCallbackLeads
} from "@/client/endpoints";
import { ModalForm } from '@/components/modals';

const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { logout, session, userType } = useSession();
  const [show, setShow] = useState(false);

  const { data: leads } = useQuery(
    [FETCH_CALLBACK_LEAD_KEY, userType],
    fetchCallbackLeads,
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: userType === 'user' ? true : false
    }
  );

  console.log('>>>>>> leads', leads);

  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
      const all: any = document.querySelectorAll(
        'ul.horizontal-menu .nav-link.active',
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [pathname]);

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''
        }`}>
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
            <Link href="/" className="main-logo flex shrink-0 items-center justify-center w-[90%]">
              <img
                className="inline mx-[auto] h-[50px] ltr:-ml-1 rtl:-mr-1"
                src="/assets/images/logo.jpeg"
                alt="logo"
              />
              {/* <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">
                MYL
              </span> */}
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden"
              onClick={() => dispatch(toggleSidebar())}>
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            {leads && leads?.length ? (
              <div>
                <button type="button" className="relative mr-4" onClick={() => setShow(true)}>
                  Follow Up <span style={{
                    position: 'absolute',
                    height: '20px',
                    width: '20px',
                    background: 'red',
                    color: '#fff',
                    borderRadius: '50%',
                    top: '-15px',
                    fontSize: '12px',
                    right: '-15px',
                    fontWeight: 500
                  }}>{leads?.length}</span>
                </button>
              </div>
            ) : null}
            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={
                  <Image
                    src="/assets/images/default-user.jpg"
                    alt="img"
                    className="rounded-full"
                    height={40}
                    width={40}
                  />
                }>
                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <Image
                        src="/assets/images/default-user.jpg"
                        alt="img"
                        className="rounded-full"
                        height={40}
                        width={40}
                      />
                      <div className="truncate ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">
                          {session?.user.full_name ?? ''}
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                          {session?.user.email ?? ''}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link href="/profile" className="dark:hover:text-white">
                      <IconUser className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Profile
                    </Link>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <span
                      className="flex cursor-pointer !py-3 px-4 text-danger"
                      onClick={handleLogout}>
                      <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                      Sign Out
                    </span>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <ModalForm
        title="Follow up for today"
        show={show}
        toggle={() => setShow(!show)}
        onCancel={() => setShow(!show)}
        onConfirm={() => setShow(!show)}
        isConfirmDisabled={false}
        showConfirm={false}>
        {leads && leads?.length ? (
          <>
            {leads?.map((item: any) => {
              return (
                <div>
                  <h2>{item?.first_name} {item?.last_name}</h2>
                  <p className='text-sm mb-1'><strong>Email: </strong>{item?.email}</p>
                  <p className='text-sm mb-1'><strong>Phone:</strong> {item?.phone_code} {item?.contact_number}</p>
                  <p className='text-sm mb-1'><strong>Source:</strong> {item?.source}</p>
                  <p className='text-xs text-[grey]'>{item?.description}</p>
                  <hr className='my-3' />
                </div>
              )
            })}
          </>
        ) : null}
      </ModalForm>
    </header>
  );
};

export default Header;
