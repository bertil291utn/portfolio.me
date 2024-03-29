import ButtonComponent from '@components/common/Button.component';
import { PageLabel } from '@placeholders/error.placeholders';
import { useRouter } from 'next/router';
import styles from '../css/error.module.scss';

export default function Custom404() {
  const router = useRouter();
  return (
    <div className={styles['container']}>
      <h1>{PageLabel.title}</h1>
      <ButtonComponent
        className={styles['button']}
        buttonType='primary'
        btnLabel={PageLabel.btnLabel}
        onClick={() => router.push('/')}
      />
    </div>
  )
}