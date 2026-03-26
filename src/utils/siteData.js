import siteFallback from '../../data/site.json';
import { getSite } from '@utils/firebaseFunctions';

export async function loadSite() {
  let site = siteFallback;
  try {
    const snap = await getSite();
    const data = snap?.data();
    if (data) site = data;
  } catch {
    // Firestore offline — use static JSON
  }
  return site;
}

export { siteFallback };
