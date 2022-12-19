import { localStorageKeys } from '@keys/localStorage';

export const isTokenCheckPassed = ({
  setClaimTokensModal,
  setStakeTokensModal,
  userCustomTokenBalance,
  isStakeHolder,
}) => {
  if (!window.localStorage.getItem(localStorageKeys.isWeb3User)) {
    return true;
  }

  if (!userCustomTokenBalance || userCustomTokenBalance?.toString() == 0) {
    setClaimTokensModal(true);
    return false;
  }
  if (!isStakeHolder) {
    setStakeTokensModal(true);
    return false;
  }
  return true;
};


export async function gql({URL,query, variables = {}}) {
  const data = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  return data.json();
}