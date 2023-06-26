import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import changePlanIcon from '../../../public/svgs/change_plan.svg';
import changeProfileDataIcon from '../../../public/svgs/Icon_Change_profile_data.svg';
import styles from './profilePage.module.scss';

const UpgradePage = () => {
  const {
    mainContainer,
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
    planSecondTitle

  } = styles;

  return (
    <div className={mainContainer}>
      <Link className={backToSearchLink} href={'/2_1_First_Enter'} >{'<- Back to search'}</Link>
      <div className={leftSide}>
        <div className={formContainer}>
          <div className={topContainer}>
            <div className={topContainerTitle}>Account info</div>
            <Link href={'/'} className={logoutButton}>
              <Image width={20} src={''} alt="" />
              log out
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
              <div className={contactEmail}>
                john.doe@gmail.com
                  <Link href={''} >
                  <Image width={12} src={changeProfileDataIcon} alt="" />
                  Change email</Link>
              </div>
              <div className={contactPassword}>
                ***********
                <Link href={''} >
                <Image width={12} src={changeProfileDataIcon} alt="" />
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
              You are on a free plan and your credits will refresh on May 18, 2023
              </div> 
          </div>
          <Link href={''}>
            <Image width={13} src={changePlanIcon} alt="arrow" />
            Change plan
            </Link>  
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
