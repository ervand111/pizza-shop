import React from 'react';
import AgreementIndex from '../../components/rule/agreementIndex';
import App from '../../components/Layouts/app';

const UserAgreement = () => {
  return (
    <div>
      <AgreementIndex/>
    </div>
  );
};

UserAgreement.getLayout = function getLayout(page) {
  return (
    <App>
      {page}
    </App>
  )
}

export default UserAgreement;