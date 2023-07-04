import Image from 'next/image';
import KmButton from '../../km-button/KmButton';
import Link from 'next/link';
import React from 'react';
import backToSearchIcon from '../../../public/svgs/Icon_Arrow_Back_to_search.svg';
import changePlanIcon from '../../../public/svgs/change_plan.svg';
import changeProfileDataIcon from '../../../public/svgs/Icon_Change_profile_data.svg';
import { deleteCookie } from 'cookies-next';
import logOutIcon from '../../../public/svgs/Icon_Logout.svg';
import styles from './profilePage.module.scss';

const UpgradePage = () => {
  const {
    mainContainer,
    topSection,
    logo,
    leftRightSideContainer,
    leftSide,
    rightSide,
    formContainer,
    topContainer,
    topContainerTitle,
    logoutButton,
    backToSearchLink,
    proFileForm,
    topFormSection,
    contactEmail,
    contactPassword,
    rightSideTitle,
    planTitlesContainer,
    planContainer,
    planMainTitle,
    planSecondTitle,
    lineFirst,
    lineSecond,
    kmButtonContainer
  } = styles;

  const handleLogOut = () => {
   window.localStorage.clear();
   deleteCookie('token');
   deleteCookie('refreshToken');
  };

  return (
    <div className={mainContainer}>
      <div className={topSection}>
        <div className={logo}>Logo</div>
        <div className={kmButtonContainer}>
         <KmButton />
        </div>
      </div>
      <Link className={backToSearchLink} href={'/admin'} >
        <Image width={20} src={backToSearchIcon} alt="arrow to left" />
        Back to search</Link>
        <div className={leftRightSideContainer}>
          <div className={leftSide}>
            <div className={formContainer}>
              <div className={topContainer}>
                <div className={topContainerTitle}>Account info</div>
                <Link href={'/'} className={logoutButton} onClick={handleLogOut}>
                  <Image width={16} src={logOutIcon} alt="" />
                  Log out
                </Link>
              </div>
              <div className={proFileForm}>
                  <div className={topFormSection}>
                    <label >
                      First Name
                      <input type="text" value={'John'} />
                    </label>
                    <label >
                      Last Name
                      <input type="text" value={'Doe'} />
                    </label>
                  </div>
                    <div className={lineFirst}></div>
                  <div className={contactEmail}>
                    john.doe@gmail.com
                      <Link href={'#'} >
                      <Image width={16} src={changeProfileDataIcon} alt="" />
                      Change email</Link>
                  </div>
                  <div className={lineSecond}></div>

                  <div className={contactPassword}>
                    <div>***********</div>
                    <Link href={'#'} >
                    <Image width={16} src={changeProfileDataIcon} alt="" />
                      Change password</Link>
                  </div>
              </div>
            </div>
          </div>
          <div className={rightSide}>
            <div className={rightSideTitle}>Subscription</div>
            <div className={planContainer}>
              <div className={planTitlesContainer}>
                <div className={planMainTitle}>Free Plan</div>   
                <div className={planSecondTitle}>
                  You are on a free plan and your credits will refresh on May 18, 2023.
                  </div> 
              </div>
              <Link href={'#'}>
                <Image width={13} src={changePlanIcon} alt="arrow" />
                Change plan
                </Link>  
            </div>
          </div>
        </div>
    </div>
  );
};

export default UpgradePage;
