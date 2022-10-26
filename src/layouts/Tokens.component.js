import ButtonComponent from '@components/common/Button.component';
import { tokenPageLabel } from '@placeholders/tokens.placeholder';
import styles from './Token.module.scss';

const TokensComponent = () => {
  const getTokensAction = () => {
    console.log('get tokens');
  };
  return (
    <div className={styles['content']}>
      <span className={styles['title']}>{tokenPageLabel.title}</span>
      <p
        className={styles['description']}
        dangerouslySetInnerHTML={{ __html: tokenPageLabel.description }}
      ></p>
      <div className={styles['button']}>
        <ButtonComponent
          buttonType='primary'
          // TODO:show connect wallet in case user has no connect wallet
          btnLabel={tokenPageLabel.buttonLabel}
          onClick={getTokensAction}
        />
      </div>
    </div>
  );
};

export default TokensComponent;
