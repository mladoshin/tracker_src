import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyFetchPackageQuery } from '../../api/api_index';

function PackageView() {
  const { packageId } = useParams();
  const [getPackage, { data }] = useLazyFetchPackageQuery();
  useEffect(() => {
    if (packageId) {
      getPackage(packageId);
    }
  }, [packageId]);

  console.log(data);
  return <div></div>;
}

export default PackageView;
