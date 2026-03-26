import ButtonComponent from '@components/common/Button.component';
import { useSite } from '@context/SiteContext';
import { useRouter } from 'next/router';
import styles from '../css/error.module.scss';

export default function Custom404() {
  const site = useSite();
  const labels = site.ui.errorPage;
  const router = useRouter();

  return (
    <div className={styles['container']}>
      <h1>{labels.title}</h1>
      <ButtonComponent
        className={styles['button']}
        buttonType="primary"
        btnLabel={labels.btnLabel}
        onClick={() => router.push('/')}
      />
    </div>
  );
}
