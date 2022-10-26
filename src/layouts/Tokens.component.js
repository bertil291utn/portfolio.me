import ButtonComponent from '@components/common/Button.component';
import styles from './Token.module.scss';

const TokensComponent = () => {
  const getTokensAction = () => {
    console.log('get tokens');
  };
  return (
    <div className={styles['content']}>
      <span className={styles['title']}>Claim your free tokens</span>
      <p className={styles['description']}>
        With <b>$BATL</b> tokens, you'll able to rank, review repos and get in
        touch with Bertil 😂. Furthermore with these tokens you're going to
        participate in our DAO.
      </p>
      <div className={styles['button']}>
        <ButtonComponent
          buttonType='primary'
          // TODO:show connect wallet in case user has no connect wallet
          btnLabel='gimme my tokens'
          onClick={getTokensAction}
        />
      </div>
    </div>
  );
};

export default TokensComponent;
